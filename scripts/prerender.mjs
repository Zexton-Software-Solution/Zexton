import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getInsightBySlug, insightArticles } from '../src/insightsData.js';
import { absoluteUrl, buildSeoGraph, imageContentType } from '../src/seoSchema.js';
import {
  DEFAULT_SOCIAL_IMAGE,
  DEFAULT_SOCIAL_IMAGE_ALT,
  SITE_LOCALE,
  SITE_NAME,
  routeMetadata,
} from '../src/siteMetadata.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const baseHtml = await readFile(path.join(distDir, 'index.html'), 'utf8');
const defaultRobots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const escapeRegExp = (value = '') => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const upsertMeta = (html, attribute, key, content) => {
  const matcher = new RegExp(`<meta[^>]*${attribute}=["']${escapeRegExp(key)}["'][^>]*>`, 'i');
  if (!content) return html.replace(matcher, '');
  const tag = `<meta ${attribute}="${escapeHtml(key)}" content="${escapeHtml(content)}" />`;
  return matcher.test(html) ? html.replace(matcher, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
};

const breadcrumbsFor = (metadata, article) => article
  ? [
      { name: 'Home', path: '/' },
      { name: 'Insights', path: '/insights' },
      { name: article.title, path: article.path },
    ]
  : metadata.path === '/'
    ? [{ name: 'Home', path: '/' }]
    : [
        { name: 'Home', path: '/' },
        { name: metadata.breadcrumbLabel || metadata.heading, path: metadata.path },
      ];

const schemaItemsFor = (metadata) => metadata.collection === 'insights'
  ? insightArticles.map((article) => ({
      type: 'BlogPosting',
      name: article.title,
      description: article.excerpt,
      path: article.path,
      image: article.image,
    }))
  : metadata.schemaItems || [];

const renderInsightDirectory = () => `
    <section class="prerender-insights" aria-labelledby="prerender-insights-title">
      <h2 id="prerender-insights-title">Software engineering insights</h2>
      <p>Original long-form guidance about software products, SaaS architecture, mobile delivery, modernization, product teams, and responsible AI.</p>
      <ul>${insightArticles.map((article) => `<li><article><img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.imageAlt)}" width="320" height="180" loading="lazy" /><p>${escapeHtml(article.category)}</p><h3><a href="${escapeHtml(article.path)}">${escapeHtml(article.title)}</a></h3><p>${escapeHtml(article.excerpt)}</p></article></li>`).join('')}</ul>
    </section>`;

const renderCrawlSections = (metadata) => (metadata.crawlSections || []).map((section, index) => `
      <section aria-labelledby="crawl-section-${index + 1}">
        <h2 id="crawl-section-${index + 1}">${escapeHtml(section.title)}</h2>
        <p>${escapeHtml(section.text)}</p>
      </section>`).join('');

const renderRelatedRoutes = (metadata) => {
  const links = (metadata.relatedRoutes || [])
    .map((routeKey) => routeMetadata[routeKey])
    .filter(Boolean);
  if (!links.length) return '';

  return `
      <nav aria-label="Related Zexton pages">
        <h2>Explore related software topics</h2>
        <ul>${links.map((item) => `<li><a href="${escapeHtml(item.path)}">${escapeHtml(item.breadcrumbLabel || item.heading)}</a><p>${escapeHtml(item.summary)}</p></li>`).join('')}</ul>
      </nav>`;
};

const renderGenericPage = (metadata) => {
  const insightDirectory = metadata.path === '/' || metadata.path === '/insights'
    ? renderInsightDirectory()
    : '';

  return `
  <div class="prerender-shell">
    <header class="prerender-header"><a href="/" aria-label="Zexton home"><img src="/ZextonLogo.png" width="96" height="54" alt="Zexton" /></a><nav aria-label="Primary navigation"><a href="/services">Services</a><a href="/work">Work</a><a href="/insights">Insights</a><a href="/pricing">Pricing</a><a href="/contact">Contact</a></nav></header>
    <main class="prerender-main">
      <header>
        <p>${escapeHtml(metadata.eyebrow)}</p>
        <h1>${escapeHtml(metadata.heading)}</h1>
        <p>${escapeHtml(metadata.summary)}</p>
      </header>
      ${renderCrawlSections(metadata)}
      ${insightDirectory}
      ${renderRelatedRoutes(metadata)}
      <section aria-labelledby="prerender-contact-title"><h2 id="prerender-contact-title">Plan the next useful software decision</h2><p>Share the users, current workflow, desired outcome, constraints, and open questions.</p><p><a href="/contact">Discuss a software project with Zexton</a></p></section>
    </main>
  </div>`;
};

const renderArticlePage = (article) => {
  const sections = article.sections.map((section, index) => `
        <section id="${escapeHtml(section.id)}" class="insight-article__section">
          <p class="insight-article__section-number">${String(index + 1).padStart(2, '0')}</p>
          <h2>${escapeHtml(section.title)}</h2>
          ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n          ')}
          ${section.points?.length ? `<ul class="insight-article__points">${section.points.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}</ul>` : ''}
        </section>`).join('');

  const toc = article.sections.map((section) => `<li><a href="#${escapeHtml(section.id)}">${escapeHtml(section.title)}</a></li>`).join('');
  const takeaways = article.takeaways.map((takeaway) => `<li>${escapeHtml(takeaway)}</li>`).join('');
  const related = article.relatedSlugs
    .map((slug) => getInsightBySlug(slug))
    .filter(Boolean)
    .map((relatedArticle) => `<li><a href="${escapeHtml(relatedArticle.path)}">${escapeHtml(relatedArticle.title)}</a></li>`)
    .join('');

  return `
    <main class="insight-article-page">
      <article class="insight-article" itemscope itemtype="https://schema.org/BlogPosting">
        <header class="insight-article__hero">
          <div class="insight-article__hero-inner">
            <nav class="insight-article__breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/insights">Insights</a></li><li aria-current="page">${escapeHtml(article.category)}</li></ol></nav>
            <p class="insight-article__category">${escapeHtml(article.category)}</p>
            <h1 itemprop="headline">${escapeHtml(article.title)}</h1>
            <p class="insight-article__dek" itemprop="description">${escapeHtml(article.dek)}</p>
            <div class="insight-article__meta"><span>By <a href="${escapeHtml(article.author.url)}" itemprop="author">${escapeHtml(article.author.name)}</a></span><span><time datetime="${escapeHtml(article.publishedDate)}" itemprop="datePublished">${escapeHtml(article.displayDate)}</time></span><span>${escapeHtml(article.readTime)}</span></div>
          </div>
        </header>
        <figure class="insight-article__cover"><img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.imageAlt)}" width="1600" height="900" itemprop="image" /></figure>
        <div class="insight-article__reading-layout">
          <aside class="insight-article__rail" aria-label="Article navigation"><div class="insight-article__rail-inner"><p>In this insight</p><ol>${toc}</ol><a class="insight-article__rail-back" href="/insights">All insights</a></div></aside>
          <div class="insight-article__body" itemprop="articleBody">
            <section class="insight-article__takeaways"><p class="insight-article__section-label">Key takeaways</p><h2>The short version</h2><ul>${takeaways}</ul></section>
            ${sections}
            <section class="insight-article__closing"><div><h2>${escapeHtml(article.closing.title)}</h2><p>${escapeHtml(article.closing.text)}</p></div></section>
            <footer class="insight-article__author-note"><div><p>Written by</p><h2>${escapeHtml(article.author.name)}</h2><span>Practical perspectives on product engineering, software architecture, delivery, and responsible AI.</span></div></footer>
          </div>
        </div>
      </article>
      <section class="insight-related" aria-labelledby="related-insights-title"><div class="insight-related__heading"><div><p class="insight-article__section-label">Continue reading</p><h2 id="related-insights-title">Related engineering insights</h2></div><a href="/insights">View all insights</a></div><ul>${related}</ul></section>
      <section class="insight-article-cta"><div><p>Have a product or platform decision to make?</p><h2>Turn the next engineering question into a clear delivery plan.</h2></div><a class="insight-article-cta__button" href="/contact">Start a conversation</a></section>
    </main>`;
};

const buildDocument = (metadata) => {
  const article = metadata.articleSlug ? getInsightBySlug(metadata.articleSlug) : null;
  const title = article?.seoTitle || metadata.title;
  const description = article?.description || metadata.description;
  const image = article?.image || metadata.image || DEFAULT_SOCIAL_IMAGE;
  const imageAlt = article?.imageAlt || metadata.imageAlt || DEFAULT_SOCIAL_IMAGE_ALT;
  const imageWidth = article ? 1600 : metadata.imageWidth;
  const imageHeight = article ? 900 : metadata.imageHeight;
  const topics = article?.keywords || metadata.topics || [];
  const lastModified = article?.modifiedDate || metadata.lastModified;
  const items = schemaItemsFor(metadata);
  const body = article ? renderArticlePage(article) : renderGenericPage(metadata);
  const { url, imageUrl, schema } = buildSeoGraph({
    title,
    description,
    path: metadata.path,
    type: metadata.schemaType,
    image,
    imageAlt,
    imageWidth,
    imageHeight,
    topics,
    lastModified,
    article,
    breadcrumbs: breadcrumbsFor(metadata, article),
    breadcrumbLabel: metadata.breadcrumbLabel,
    items,
    itemType: metadata.itemType,
  });

  let html = baseHtml
    .replace(/<html[^>]*>/i, '<html lang="en-IN">')
    .replace(/<title>.*?<\/title>/is, `<title>${escapeHtml(title)}</title>`)
    .replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${escapeHtml(url)}" />`)
    .replace(/<div id="root"><\/div>/, `<div id="root">${body}</div>`);

  html = upsertMeta(html, 'name', 'description', description);
  html = upsertMeta(html, 'name', 'keywords', '');
  html = upsertMeta(html, 'name', 'geo.region', '');
  html = upsertMeta(html, 'name', 'geo.placename', '');
  html = upsertMeta(html, 'name', 'robots', defaultRobots);
  html = upsertMeta(html, 'name', 'googlebot', defaultRobots);
  html = upsertMeta(html, 'name', 'bingbot', defaultRobots);
  html = upsertMeta(html, 'name', 'author', article?.author.name || SITE_NAME);
  html = upsertMeta(html, 'name', 'application-name', SITE_NAME);
  html = upsertMeta(html, 'property', 'og:type', article ? 'article' : 'website');
  html = upsertMeta(html, 'property', 'og:site_name', SITE_NAME);
  html = upsertMeta(html, 'property', 'og:locale', SITE_LOCALE);
  html = upsertMeta(html, 'property', 'og:url', url);
  html = upsertMeta(html, 'property', 'og:title', title);
  html = upsertMeta(html, 'property', 'og:description', description);
  html = upsertMeta(html, 'property', 'og:image', imageUrl);
  html = upsertMeta(html, 'property', 'og:image:secure_url', imageUrl);
  html = upsertMeta(html, 'property', 'og:image:alt', imageAlt);
  html = upsertMeta(html, 'property', 'og:image:width', imageWidth);
  html = upsertMeta(html, 'property', 'og:image:height', imageHeight);
  html = upsertMeta(html, 'property', 'og:image:type', imageContentType(image));
  html = upsertMeta(html, 'property', 'og:updated_time', lastModified);
  html = upsertMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = upsertMeta(html, 'name', 'twitter:title', title);
  html = upsertMeta(html, 'name', 'twitter:description', description);
  html = upsertMeta(html, 'name', 'twitter:image', imageUrl);
  html = upsertMeta(html, 'name', 'twitter:image:alt', imageAlt);
  html = upsertMeta(html, 'property', 'article:published_time', article?.publishedDate);
  html = upsertMeta(html, 'property', 'article:modified_time', article?.modifiedDate);
  html = upsertMeta(html, 'property', 'article:section', article?.category);
  html = upsertMeta(html, 'property', 'article:author', article?.author.url ? absoluteUrl(article.author.url) : '');

  const schemaTag = `<script id="route-schema" type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`;
  return html.replace('</head>', `    ${schemaTag}\n  </head>`);
};

let generated = 0;
for (const metadata of Object.values(routeMetadata)) {
  const relativePath = metadata.path === '/' ? '' : metadata.path.slice(1);
  const outputDir = path.join(distDir, relativePath);
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, 'index.html'), buildDocument(metadata), 'utf8');
  generated += 1;
}

console.log(`Generated ${generated} crawlable route documents.`);
