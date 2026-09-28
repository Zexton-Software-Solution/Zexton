// Run: node --experimental-websocket scripts/capture-work-logos.mjs <work-status.json>
// Opens each live portfolio site in headless Chrome, finds the header logo and screenshots that element
// into public/work/logos/<slug>.png (converted to .webp afterwards). Needs google-chrome.
import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const statusFile = process.argv[2];
const only = process.argv.slice(3);
const sites = JSON.parse(await readFile(statusFile, 'utf8')).filter((site) => (site.live || site.protected) && (!only.length || only.includes(site.slug)));
const outDir = new URL('../public/work/logos/', import.meta.url);
await mkdir(outDir, { recursive: true });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const port = 9400 + Math.floor(Math.random() * 400);
const chrome = spawn('google-chrome', ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`, '--window-size=1440,900', 'about:blank'], { stdio: 'ignore' });

let targets = [];
for (let i = 0; i < 50 && !targets.length; i += 1) {
  try { targets = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).filter((t) => t.type === 'page'); } catch { /* starting */ }
  await sleep(200);
}
const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
await new Promise((resolve) => ws.addEventListener('open', resolve));
let nextId = 0;
const pending = new Map();
ws.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (pending.has(message.id)) { pending.get(message.id)(message); pending.delete(message.id); }
});
const send = (method, params = {}) => new Promise((resolve) => { nextId += 1; pending.set(nextId, resolve); ws.send(JSON.stringify({ id: nextId, method, params })); });

// Runs inside the client page: scores likely logo elements and returns the best bounding box.
const findLogo = `(() => {
  const host = location.hostname.replace(/^www\\./, '').split('.')[0].toLowerCase();
  const text = (el) => [el.id, el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className, el.getAttribute('alt'), el.getAttribute('src'), el.getAttribute('aria-label'), el.getAttribute('title')].join(' ').toLowerCase();
  const nodes = [...document.querySelectorAll('img, svg, [class*="logo" i], [id*="logo" i]')];
  let best = null;
  for (const el of nodes) {
    const r = el.getBoundingClientRect();
    if (r.width < 30 || r.height < 16 || r.width > 520 || r.height > 260 || r.top > 320 || r.top < -5) continue;
    const style = getComputedStyle(el);
    if (style.visibility === 'hidden' || style.display === 'none' || +style.opacity === 0) continue;
    const isMedia = el.tagName === 'IMG' || el.tagName === 'svg' || style.backgroundImage !== 'none';
    if (!isMedia) continue;
    const t = text(el);
    let score = 0;
    if (/logo|brand/.test(t)) score += 10;
    if (host && t.replace(/[^a-z]/g, '').includes(host.slice(0, 6))) score += 4;
    if (el.closest('header, nav, [class*="header" i], [id*="header" i]')) score += 5;
    const link = el.closest('a');
    if (link && /^(\\/|https?:\\/\\/(www\\.)?[^/]*\\/?)(index\\.[a-z]+)?$/i.test(link.getAttribute('href') || '') ) score += 4;
    if (r.width / r.height > 1.3) score += 2;
    if (r.width < 60 && r.height < 60) score -= 3;
    score -= r.top / 200;
    if (!best || score > best.score) best = { score, x: r.left, y: r.top, width: r.width, height: r.height, tag: el.tagName };
  }
  if (best && best.score >= 4) return best;
  // Text logos: the business name set in a large font near the top of the page.
  const words = document.title.toLowerCase().split(/[^a-z0-9&']+/).filter((w) => w.length > 3);
  let textBest = null;
  for (const el of document.querySelectorAll('h1, h2, a, [class*="title" i], [class*="brand" i], [class*="name" i]')) {
    const r = el.getBoundingClientRect();
    const label = (el.innerText || '').trim();
    if (!label || label.length > 45 || label.includes('\n\n') || r.top > 260 || r.top < 0 || r.width < 60 || r.height < 18 || r.width > 700) continue;
    const size = parseFloat(getComputedStyle(el).fontSize);
    if (size < 18) continue;
    const lower = label.toLowerCase();
    const hits = words.filter((w) => lower.includes(w)).length + (lower.replace(/[^a-z]/g, '').includes(host.slice(0, 5)) ? 2 : 0);
    if (!hits) continue;
    const score = hits * 3 + size / 10 - r.top / 100;
    if (!textBest || score > textBest.score) textBest = { score, x: r.left, y: r.top, width: r.width, height: r.height, tag: 'TEXT' };
  }
  return textBest;
})()`;

const results = {};
await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
for (const site of sites) {
  const url = site.finalUrl || site.url;
  process.stderr.write(`${site.slug} ... `);
  await send('Page.navigate', { url });
  await sleep(6000);
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
  await sleep(400);
  const { result } = await send('Runtime.evaluate', { expression: findLogo, returnByValue: true });
  const box = result?.result?.value;
  if (!box) {
    // Last resort: the site's own app icon (apple-touch-icon or largest declared icon).
    const { result: iconResult } = await send('Runtime.evaluate', { returnByValue: true, expression: `(() => { const links = [...document.querySelectorAll('link[rel*="icon" i]')].map((l) => ({ href: l.href, size: parseInt((l.sizes && l.sizes.value) || (/apple/i.test(l.rel) ? '180' : '16'), 10) || 16 })); links.sort((a, b) => b.size - a.size); return links[0] && links[0].size >= 96 ? links[0].href : null; })()` });
    const iconUrl = iconResult?.result?.value;
    if (iconUrl) {
      const response = await fetch(iconUrl).catch(() => null);
      if (response?.ok) {
        await writeFile(new URL(`${site.slug}.png`, outDir), Buffer.from(await response.arrayBuffer()));
        results[site.slug] = { tag: 'ICON' };
        process.stderr.write('ok (app icon)\n');
        continue;
      }
    }
    results[site.slug] = null;
    process.stderr.write('no logo found\n');
    continue;
  }
  const pad = 10;
  const clip = { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: box.width + pad * 2, height: box.height + pad * 2, scale: 2 };
  const shot = await send('Page.captureScreenshot', { format: 'png', clip, captureBeyondViewport: false });
  await writeFile(new URL(`${site.slug}.png`, outDir), Buffer.from(shot.result.data, 'base64'));
  results[site.slug] = { tag: box.tag, width: Math.round(box.width), height: Math.round(box.height) };
  process.stderr.write(`ok (${box.tag} ${Math.round(box.width)}x${Math.round(box.height)})\n`);
}
console.log(JSON.stringify(results, null, 2));
ws.close();
chrome.kill();
