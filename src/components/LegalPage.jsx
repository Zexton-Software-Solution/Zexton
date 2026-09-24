import { LEGAL_UPDATED, legalPages } from '../legalPagesData';
import { routeMetadata } from '../siteMetadata';
import Seo from './Seo';
import './LegalPage.css';

const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export default function LegalPage({ route }) {
  const page = legalPages[route];
  const metadata = routeMetadata[route];
  if (!page) return null;

  return (
    <main className="legal-page">
      <Seo {...metadata} type={metadata.schemaType} breadcrumbs={[{ name: 'Home', path: '/' }, { name: page.breadcrumbLabel, path: page.path }]} />
      <header className="legal-hero">
        <div className="legal-wrap">
          <span>LEGAL</span>
          <h1>{page.breadcrumbLabel}</h1>
          <p>Last updated: {new Date(LEGAL_UPDATED).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </header>
      <div className="legal-wrap legal-body">
        <aside>
          <strong>Legal documents</strong>
          <nav aria-label="Legal documents">
            {Object.entries(legalPages).map(([key, item]) => <a key={key} href={item.path} aria-current={key === route ? 'page' : undefined}>{item.breadcrumbLabel}</a>)}
          </nav>
          <strong>On this page</strong>
          <nav aria-label="Sections">{page.sections.map(([title]) => <a key={title} href={`#${slug(title)}`}>{title}</a>)}</nav>
        </aside>
        <article>
          <p className="legal-intro">{page.intro}</p>
          {page.sections.map(([title, items], index) => (
            <section key={title} id={slug(title)}>
              <h2>{index + 1}. {title}</h2>
              <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          ))}
          <p className="legal-contact">Questions about this document? Email <a href="mailto:info@zexton.com">info@zexton.com</a>.</p>
        </article>
      </div>
    </main>
  );
}
