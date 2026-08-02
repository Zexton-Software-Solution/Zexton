import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Sparkles,
} from 'lucide-react';
import { getInsightBySlug } from '../insightsData';
import Seo from './Seo';
import './InsightArticlePage.css';

const insightImageStyle = {
  position: 'static',
  inset: 'auto',
  display: 'block',
  width: '100%',
  height: 'auto',
  aspectRatio: '16 / 9',
  objectFit: 'contain',
};

const sectionHref = (sectionId) => `#${sectionId}`;

export default function InsightArticlePage({ slug }) {
  const article = getInsightBySlug(slug);

  if (!article) {
    return (
      <main className="insight-article-page insight-article-page--missing">
        <p>That insight could not be found.</p>
        <a href="/insights"><ArrowLeft size={16} /> Browse all insights</a>
      </main>
    );
  }

  const relatedArticles = article.relatedSlugs
    .map((relatedSlug) => getInsightBySlug(relatedSlug))
    .filter(Boolean);

  const articleSchema = {
    headline: article.title,
    author: article.author,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate,
    articleSection: article.category,
  };

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
    { name: article.title, path: article.path },
  ];

  return (
    <>
      <Seo
        title={article.seoTitle}
        description={article.description}
        path={article.path}
        type="BlogPosting"
        image={article.image}
        imageAlt={article.imageAlt}
        imageWidth={1600}
        imageHeight={900}
        topics={article.keywords}
        lastModified={article.modifiedDate}
        article={articleSchema}
        breadcrumbs={breadcrumbs}
      />

      <main className="insight-article-page">
        <article className="insight-article" itemScope itemType="https://schema.org/BlogPosting">
          <header className="insight-article__hero">
            <div className="insight-article__hero-inner">
              <nav className="insight-article__breadcrumbs" aria-label="Breadcrumb">
                <ol>
                  <li><a href="/">Home</a></li>
                  <li><a href="/insights">Insights</a></li>
                  <li aria-current="page">{article.category}</li>
                </ol>
              </nav>

              <p className="insight-article__category">{article.category}</p>
              <h1 itemProp="headline">{article.title}</h1>
              <p className="insight-article__dek" itemProp="description">{article.dek}</p>

              <div className="insight-article__meta" aria-label="Article details">
                <span className="insight-article__author">
                  By <a href={article.author.url} itemProp="author">{article.author.name}</a>
                </span>
                <span><CalendarDays aria-hidden="true" size={17} /><time dateTime={article.publishedDate} itemProp="datePublished">{article.displayDate}</time></span>
                <span><Clock3 aria-hidden="true" size={17} />{article.readTime}</span>
              </div>
            </div>
          </header>

          <figure className="insight-article__cover">
            <img
              src={article.image}
              alt={article.imageAlt}
              width="1600"
              height="900"
              decoding="async"
              fetchPriority="high"
              style={insightImageStyle}
              itemProp="image"
            />
          </figure>

          <div className="insight-article__reading-layout">
            <aside className="insight-article__rail" aria-label="Article navigation">
              <div className="insight-article__rail-inner">
                <p>In this insight</p>
                <ol>
                  {article.sections.map((section) => (
                    <li key={section.id}><a href={sectionHref(section.id)}>{section.title}</a></li>
                  ))}
                </ol>
                <a className="insight-article__rail-back" href="/insights"><ArrowLeft size={15} /> All insights</a>
              </div>
            </aside>

            <div className="insight-article__body" itemProp="articleBody">
              <details className="insight-article__mobile-toc">
                <summary>In this insight</summary>
                <ol>
                  {article.sections.map((section) => (
                    <li key={section.id}><a href={sectionHref(section.id)}>{section.title}</a></li>
                  ))}
                </ol>
              </details>

              <section className="insight-article__takeaways" aria-labelledby="key-takeaways">
                <p className="insight-article__section-label">Key takeaways</p>
                <h2 id="key-takeaways">The short version</h2>
                <ul>
                  {article.takeaways.map((takeaway) => (
                    <li key={takeaway}><span><Check aria-hidden="true" size={17} /></span>{takeaway}</li>
                  ))}
                </ul>
              </section>

              {article.sections.map((section, index) => (
                <section className="insight-article__section" id={section.id} key={section.id}>
                  <p className="insight-article__section-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</p>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.points?.length > 0 && (
                    <ul className="insight-article__points">
                      {section.points.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                  )}
                </section>
              ))}

              <section className="insight-article__closing" aria-labelledby="article-closing">
                <span><Sparkles aria-hidden="true" size={20} /></span>
                <div>
                  <h2 id="article-closing">{article.closing.title}</h2>
                  <p>{article.closing.text}</p>
                </div>
              </section>

              <footer className="insight-article__author-note">
                <div className="insight-article__author-mark" aria-hidden="true">Z</div>
                <div>
                  <p>Written by</p>
                  <h2>{article.author.name}</h2>
                  <span>Practical perspectives on product engineering, software architecture, delivery, and responsible AI.</span>
                </div>
              </footer>
            </div>
          </div>
        </article>

        <section className="insight-related" aria-labelledby="related-insights-title">
          <div className="insight-related__heading">
            <div>
              <p className="insight-article__section-label">Continue reading</p>
              <h2 id="related-insights-title">Related engineering insights</h2>
            </div>
            <a href="/insights">View all insights <ArrowRight size={17} /></a>
          </div>
          <div className="insight-related__grid">
            {relatedArticles.map((relatedArticle) => (
              <a className="insight-related__card" href={relatedArticle.path} key={relatedArticle.slug}>
                <div className="insight-related__image">
                  <img src={relatedArticle.image} alt="" width="1600" height="900" style={insightImageStyle} loading="lazy" decoding="async" />
                </div>
                <div className="insight-related__content">
                  <p>{relatedArticle.category}</p>
                  <h3>{relatedArticle.title}</h3>
                  <span>Read insight <ArrowRight aria-hidden="true" size={16} /></span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="insight-article-cta" aria-labelledby="insight-cta-title">
          <div>
            <p>Have a product or platform decision to make?</p>
            <h2 id="insight-cta-title">Turn the next engineering question into a clear delivery plan.</h2>
          </div>
          <a className="insight-article-cta__button" href="/contact">Start a conversation <ArrowRight size={18} /></a>
        </section>
      </main>
    </>
  );
}
