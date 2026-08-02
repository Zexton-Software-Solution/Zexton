import { useEffect } from 'react';
import {
  DEFAULT_SOCIAL_IMAGE,
  DEFAULT_SOCIAL_IMAGE_ALT,
  SITE_LOCALE,
  SITE_NAME,
} from '../siteMetadata';
import { absoluteUrl, buildSeoGraph, imageContentType } from '../seoSchema';

const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

export default function Seo({
  title,
  description,
  path = '/',
  type = 'WebPage',
  image = DEFAULT_SOCIAL_IMAGE,
  imageAlt = DEFAULT_SOCIAL_IMAGE_ALT,
  imageWidth,
  imageHeight,
  topics = [],
  lastModified,
  article = null,
  breadcrumbs = null,
  breadcrumbLabel,
  items = [],
  itemType = 'Thing',
  robots = DEFAULT_ROBOTS,
}) {
  useEffect(() => {
    const isArticle = Boolean(article);
    const indexable = !robots.toLowerCase().includes('noindex');
    const resolvedWidth = imageWidth || (isArticle ? 1600 : '');
    const resolvedHeight = imageHeight || (isArticle ? 900 : '');
    const { url, imageUrl, schema } = buildSeoGraph({
      title,
      description,
      path,
      type,
      image,
      imageAlt,
      imageWidth,
      imageHeight,
      topics,
      lastModified,
      article,
      breadcrumbs,
      breadcrumbLabel,
      items,
      itemType,
    });

    const upsertMeta = (attribute, key, value) => {
      const selector = `meta[${attribute}="${key}"]`;
      let element = document.querySelector(selector);

      if (!value) {
        element?.remove();
        return;
      }

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', String(value));
    };

    document.title = title;
    document.documentElement.lang = 'en-IN';
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'keywords', '');
    upsertMeta('name', 'geo.region', '');
    upsertMeta('name', 'geo.placename', '');
    upsertMeta('name', 'author', article?.author?.name || SITE_NAME);
    upsertMeta('name', 'robots', robots);
    upsertMeta('name', 'googlebot', robots);
    upsertMeta('name', 'bingbot', robots);
    upsertMeta('name', 'application-name', SITE_NAME);
    upsertMeta('property', 'og:type', isArticle ? 'article' : 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', SITE_LOCALE);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('property', 'og:image:secure_url', imageUrl);
    upsertMeta('property', 'og:image:alt', imageAlt);
    upsertMeta('property', 'og:image:width', resolvedWidth);
    upsertMeta('property', 'og:image:height', resolvedHeight);
    upsertMeta('property', 'og:image:type', imageContentType(image));
    upsertMeta('property', 'og:updated_time', lastModified || article?.dateModified || '');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageUrl);
    upsertMeta('name', 'twitter:image:alt', imageAlt);
    upsertMeta('property', 'article:published_time', article?.datePublished || '');
    upsertMeta('property', 'article:modified_time', article?.dateModified || '');
    upsertMeta('property', 'article:section', article?.articleSection || '');
    upsertMeta('property', 'article:author', article?.author?.url ? absoluteUrl(article.author.url) : '');

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    let routeSchema = document.getElementById('route-schema');
    if (!indexable) {
      routeSchema?.remove();
      return;
    }

    if (!routeSchema) {
      routeSchema = document.createElement('script');
      routeSchema.id = 'route-schema';
      routeSchema.type = 'application/ld+json';
      document.head.appendChild(routeSchema);
    }
    routeSchema.textContent = JSON.stringify(schema).replace(/</g, '\\u003c');
  }, [article, breadcrumbLabel, breadcrumbs, description, image, imageAlt, imageHeight, imageWidth, itemType, items, lastModified, path, robots, title, topics, type]);

  return null;
}
