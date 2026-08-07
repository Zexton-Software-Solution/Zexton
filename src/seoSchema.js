import {
  DEFAULT_SOCIAL_IMAGE,
  DEFAULT_SOCIAL_IMAGE_ALT,
  SITE_LANGUAGE,
  SITE_NAME,
  SITE_URL,
} from './siteMetadata.js';

export const absoluteUrl = (value = '/') => new URL(value || '/', `${SITE_URL}/`).href;

export const imageContentType = (image = '') => {
  const extension = image.split('?')[0].split('.').pop()?.toLowerCase();
  if (extension === 'png') return 'image/png';
  if (extension === 'jpg' || extension === 'jpeg') return 'image/jpeg';
  if (extension === 'webp') return 'image/webp';
  if (extension === 'svg') return 'image/svg+xml';
  return '';
};

const articleValue = (article, primary, fallback) => article?.[primary] ?? article?.[fallback];

const buildCollectionItem = (item, index, itemType, pageUrl) => {
  const type = item.type || itemType || 'Thing';
  const itemUrl = item.url || (item.path ? absoluteUrl(item.path) : pageUrl);
  const schemaItem = {
    '@type': type,
    name: item.name,
    ...(item.description ? { description: item.description } : {}),
    ...(itemUrl ? { url: itemUrl } : {}),
    ...(item.image ? { image: absoluteUrl(item.image) } : {}),
    ...(type === 'BlogPosting' ? { headline: item.name } : {}),
    ...(type === 'Service' ? { provider: { '@id': `${SITE_URL}/#organization` } } : {}),
  };

  return {
    '@type': 'ListItem',
    position: index + 1,
    item: schemaItem,
  };
};

export const buildSeoGraph = ({
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
}) => {
  const canonicalPath = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`;
  const url = `${SITE_URL}${canonicalPath}`;
  const imageUrl = absoluteUrl(image);
  const isArticle = Boolean(article);
  const isServicePage = !isArticle && itemType === 'Service' && items.length === 1;
  const normalizedTopics = [...new Set((topics || []).filter(Boolean))];
  const articleHeadline = articleValue(article, 'headline', 'title');
  const articlePublished = articleValue(article, 'datePublished', 'publishedDate');
  const articleModified = articleValue(article, 'dateModified', 'modifiedDate');
  const articleSection = articleValue(article, 'articleSection', 'category');
  const articleAuthor = article?.author;
  const resolvedWidth = imageWidth || (isArticle ? 1600 : undefined);
  const resolvedHeight = imageHeight || (isArticle ? 900 : undefined);

  const breadcrumbItems = breadcrumbs?.length
    ? breadcrumbs
    : isArticle
      ? [
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
          { name: articleHeadline, path: canonicalPath },
        ]
      : canonicalPath === '/'
        ? [{ name: 'Home', path: '/' }]
        : [
            { name: 'Home', path: '/' },
            { name: breadcrumbLabel || title.split('|')[0].trim(), path: canonicalPath },
          ];

  const breadcrumbGraph = breadcrumbItems.length > 1 ? {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  } : null;

  const itemListGraph = items.length && !isServicePage ? {
    '@type': 'ItemList',
    '@id': `${url}#itemlist`,
    name: `${breadcrumbLabel || title.split('|')[0].trim()} topics`,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => buildCollectionItem(item, index, itemType, url)),
  } : null;

  const serviceGraph = isServicePage ? {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: items[0].name,
    description: items[0].description || description,
    url,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    serviceType: items[0].name,
    ...(normalizedTopics.length ? { keywords: normalizedTopics.join(', ') } : {}),
  } : null;

  const primaryImage = {
    '@type': 'ImageObject',
    '@id': `${url}#primaryimage`,
    url: imageUrl,
    contentUrl: imageUrl,
    caption: imageAlt,
    ...(resolvedWidth ? { width: resolvedWidth } : {}),
    ...(resolvedHeight ? { height: resolvedHeight } : {}),
  };

  const about = [
    { '@id': `${SITE_URL}/#organization` },
    ...normalizedTopics.map((topic) => ({ '@type': 'Thing', name: topic })),
  ];

  const webpage = {
    '@type': isArticle ? 'WebPage' : type,
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    about,
    primaryImageOfPage: { '@id': `${url}#primaryimage` },
    inLanguage: SITE_LANGUAGE,
    ...(lastModified ? { dateModified: lastModified } : {}),
    ...(normalizedTopics.length ? { keywords: normalizedTopics.join(', ') } : {}),
    ...(breadcrumbGraph ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
    ...(isArticle ? { mainEntity: { '@id': `${url}#article` } } : {}),
    ...(isServicePage ? { mainEntity: { '@id': `${url}#service` } } : {}),
    ...(!isArticle && itemListGraph ? { mainEntity: { '@id': `${url}#itemlist` } } : {}),
  };

  const graph = [webpage, primaryImage];

  if (isArticle) {
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      url,
      mainEntityOfPage: { '@id': `${url}#webpage` },
      headline: articleHeadline,
      description,
      image: { '@id': `${url}#primaryimage` },
      thumbnailUrl: imageUrl,
      datePublished: articlePublished,
      dateModified: articleModified,
      author: {
        '@type': 'Organization',
        name: articleAuthor?.name || SITE_NAME,
        url: absoluteUrl(articleAuthor?.url || '/about'),
      },
      publisher: { '@id': `${SITE_URL}/#organization` },
      articleSection,
      ...(normalizedTopics.length ? { keywords: normalizedTopics.join(', ') } : {}),
      isAccessibleForFree: true,
      inLanguage: SITE_LANGUAGE,
    });
  }

  if (serviceGraph) graph.push(serviceGraph);
  if (itemListGraph) graph.push(itemListGraph);
  if (breadcrumbGraph) graph.push(breadcrumbGraph);

  return {
    canonicalPath,
    url,
    imageUrl,
    schema: {
      '@context': 'https://schema.org',
      '@graph': graph,
    },
  };
};
