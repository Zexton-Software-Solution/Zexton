import { ArrowRight, Check } from 'lucide-react';
import { servicePages } from '../servicePagesData';
import { routeMetadata } from '../siteMetadata';
import Seo from './Seo';
import './ProductPage.css';

export default function ServiceDetailPage({ route }) {
  const page = servicePages[route];
  const metadata = routeMetadata[route];
  if (!page || !metadata) return null;

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: page.breadcrumbLabel, path: page.path },
  ];

  return (
    <main className="product-page">
      <Seo {...metadata} type={metadata.schemaType} breadcrumbs={breadcrumbs} items={metadata.schemaItems} />
      <header className="pp-hero">
        <div className="wrap pp-hero__grid">
          <div>
            <nav className="pp-crumbs" aria-label="Breadcrumb">
              <ol><li><a href="/">Home</a></li><li><a href="/services">Services</a></li><li aria-current="page">{page.breadcrumbLabel}</li></ol>
            </nav>
            <h1>{page.heading}</h1>
            <p className="pp-hero__summary">{page.summary}</p>
            <div className="pp-hero__actions">
              <a className="btn btn--primary btn--lg" href="/contact">Discuss your project</a>
              <a className="btn btn--secondary btn--lg" href="/pricing">See pricing</a>
            </div>
          </div>
          <aside className="pp-glance" aria-label="The challenge">
            <p>The challenge</p>
            <div className="pp-glance__text">{page.challenge}</div>
          </aside>
        </div>
      </header>

      <section className="section section--surface">
        <div className="wrap pp-split">
          <div><span className="kicker">The outcome</span><h2 className="h2">What you end up with</h2></div>
          <p className="pp-outcome">{page.outcome}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap pp-two-lists">
          <div>
            <span className="kicker">Good fit for</span>
            <h2 className="h2">Where this helps</h2>
            <ul className="pp-checks">{page.goodFor.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul>
          </div>
          <div>
            <span className="kicker">Deliverables</span>
            <h2 className="h2">What’s included</h2>
            <ul className="pp-checks">{page.deliverables.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head"><div><span className="kicker">Process</span><h2 className="h2">How we work</h2></div></div>
          <ol className="pp-steps">
            {page.process.map(([title, text], index) => <li key={title}><span className="num">{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap pp-split">
          <div><span className="kicker">FAQ</span><h2 className="h2">Questions, answered</h2></div>
          <div className="faq-list">{page.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="wrap pp-cta">
          <div><h2 className="h2">Bring the problem, not a specification.</h2><p className="lead">Share your users, current process, systems and timeline. We’ll suggest a sensible first step.</p></div>
          <div className="pp-hero__actions"><a className="btn btn--primary btn--lg" href="/contact">Contact us <ArrowRight size={16} /></a></div>
        </div>
      </section>
    </main>
  );
}
