// Run: node scripts/check-work-sites.mjs > work-status.json
// Checks every portfolio domain: HTTP status, final URL, page title, and whether it looks parked/for sale.
import { portfolioSites, retiredDomains } from '../src/workData.js';

// Re-checks live sites and retired domains (a retired one may come back).
const slugs = [...portfolioSites, ...retiredDomains].map((site) => site.slug);
const PARKED = /is for sale|buy this domain|this domain (name )?(may be|is) for sale|parked (free|domain)|domain parking|directnic parking|hugedomains|\bdan\.com|afternic|\bsedo\.com|domain has expired|account suspended|index of \//i;
// Domains that expired and were taken over by spam/gambling sites.
const HIJACKED = /togel|slot|casino|mostbet|\bbet\b|judi|gacor|toto/i;
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';

const check = async (slug) => {
  const candidates = [`https://${slug}.com`, `https://www.${slug}.com`, `http://${slug}.com`, `http://www.${slug}.com`];
  for (const url of candidates) {
    try {
      const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20000), headers: { 'User-Agent': UA } });
      const html = (await response.text()).slice(0, 300000);
      const title = (html.match(/<title[^>]*>([^<]*)</i)?.[1] || '').trim().replace(/\s+/g, ' ');
      const finalHost = new URL(response.url).hostname.replace(/^www\./, '');
      const sameSite = finalHost.includes(slug.replace(/-/g, '')) || finalHost.includes(slug);
      const parked = PARKED.test(title) || (html.length < 4000 && PARKED.test(html)) || /hugedomains|afternic|\bdan\.com|sedo\.com|parkingcrew|bodis/i.test(response.url);
      const hijacked = HIJACKED.test(title);
      // Cloudflare / security challenges block scripts but the site itself is up for real visitors.
      const protectedSite = response.status === 403 && /cloudflare|security check|attention required/i.test(title + html.slice(0, 3000));
      const live = response.ok && !parked && !hijacked && html.length > 1500;
      if (!live && !protectedSite && !parked && !hijacked && url !== candidates.at(-1)) continue;
      return { slug, url, status: response.status, finalUrl: response.url, sameSite, title, parked, hijacked, protected: protectedSite, live };
    } catch (error) {
      if (url === candidates.at(-1)) return { slug, url, status: 0, error: error.cause?.code || error.name, live: false };
    }
  }
};

const results = [];
for (let i = 0; i < slugs.length; i += 10) results.push(...await Promise.all(slugs.slice(i, i + 10).map(check)));
console.log(JSON.stringify(results, null, 2));
