import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getInsightBySlug, insightArticles } from '../src/insightsData.js';
import { SITE_NAME, SITE_URL, routeMetadata } from '../src/siteMetadata.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
await mkdir(publicDir, { recursive: true });

const xml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const routes = Object.values(routeMetadata).sort((a, b) => {
  if (a.path === '/') return -1;
  if (b.path === '/') return 1;
  return a.path.localeCompare(b.path);
});

const sitemapEntries = routes.map((metadata) => {
  const article = metadata.articleSlug ? getInsightBySlug(metadata.articleSlug) : null;
  const lastModified = article?.modifiedDate || metadata.lastModified;
  const image = article ? `\n    <image:image><image:loc>${xml(`${SITE_URL}${article.image}`)}</image:loc><image:title>${xml(article.title)}</image:title><image:caption>${xml(article.imageAlt)}</image:caption></image:image>` : '';
  return `  <url>\n    <loc>${xml(`${SITE_URL}${metadata.path}`)}</loc>\n    <lastmod>${xml(lastModified)}</lastmod>${image}\n  </url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${sitemapEntries.join('\n')}\n</urlset>\n`;

const redirects = `${routes.map(({ path: routePath }) => {
  const output = routePath === '/' ? '/index.html' : `${routePath}/index.html`;
  return `${routePath.padEnd(48)} ${output.padEnd(58)} 200`;
}).join('\n')}\n/*                                               /404.html                                                  404\n`;

const primaryRoutes = routes.filter((metadata) => !metadata.articleSlug);
const llms = `# ${SITE_NAME}\n\n> Zexton plans and builds custom software, SaaS platforms, web and mobile applications, cloud systems, modernization programs, and responsible AI automation.\n\nThis file is an AI-readable map of the canonical public website. Service and editorial content is factual and does not claim unverified clients, reviews, team members, research, or guaranteed outcomes.\n\n## Primary pages\n\n${primaryRoutes.map((metadata) => `- [${metadata.breadcrumbLabel || metadata.heading}](${SITE_URL}${metadata.path}): ${metadata.description}`).join('\n')}\n\n## Engineering insights\n\n${insightArticles.map((article) => `- [${article.title}](${SITE_URL}${article.path}): ${article.excerpt}`).join('\n')}\n\n## Discovery and contact\n\n- Canonical site: ${SITE_URL}/\n- XML sitemap: ${SITE_URL}/sitemap.xml\n- Crawling policy: ${SITE_URL}/robots.txt\n- Public language: English (India), en-IN\n- Project enquiries: info@zexton.com\n`;

const llm = `# ${SITE_NAME} AI-readable site guide\n\nThe canonical, comprehensive guide is available at:\n${SITE_URL}/llms.txt\n\nKey entry points:\n- Services: ${SITE_URL}/services\n- Custom software: ${SITE_URL}/services/custom-software-development\n- SaaS development: ${SITE_URL}/services/saas-development\n- Web applications: ${SITE_URL}/services/web-application-development\n- Mobile applications: ${SITE_URL}/services/mobile-app-development\n- AI automation: ${SITE_URL}/services/ai-automation\n- Cloud and modernization: ${SITE_URL}/services/cloud-devops-modernization\n- Insights: ${SITE_URL}/insights\n- Sitemap: ${SITE_URL}/sitemap.xml\n`;

const robots = `# ${SITE_NAME} public crawling policy\n# Public pages and assets are crawlable. API endpoints and the static error document are excluded.\nUser-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /404.html\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;

await Promise.all([
  writeFile(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8'),
  writeFile(path.join(publicDir, '_redirects'), redirects, 'utf8'),
  writeFile(path.join(publicDir, 'llms.txt'), llms, 'utf8'),
  writeFile(path.join(publicDir, 'llm.txt'), llm, 'utf8'),
  writeFile(path.join(publicDir, 'robots.txt'), robots, 'utf8'),
]);

console.log(`Generated SEO discovery files for ${routes.length} canonical routes.`);
