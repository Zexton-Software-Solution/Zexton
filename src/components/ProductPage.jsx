import { ArrowRight, Check } from 'lucide-react';
import { lowestPrice, productGroups, productPages, tlds } from '../productPagesData';
import { localize, money, useRegion } from '../region';
import { routeMetadata } from '../siteMetadata';
import DomainSearch from './DomainSearch';
import PlanTable from './PlanTable';
import Seo from './Seo';
import './ProductPage.css';

export default function ProductPage({ route }) {
  const region = useRegion();
  const page = productPages[route];
  const metadata = routeMetadata[route];
  if (!page || !metadata) return null;

  const group = productGroups.find((item) => item.id === page.group);
  const from = lowestPrice(page);
  const unit = page.priceUnit || page.plans?.find((plan) => plan.price === from)?.unit || '';
  const breadcrumbs = [{ name: 'Home', path: '/' }, { name: page.breadcrumbLabel, path: page.path }];

  return (
    <main className="product-page">
      <Seo {...metadata} type={metadata.schemaType} breadcrumbs={breadcrumbs} items={metadata.schemaItems} />

      <header className="pp-hero">
        <div className="wrap pp-hero__grid">
          <div>
            <nav className="pp-crumbs" aria-label="Breadcrumb">
              <ol><li><a href="/">Home</a></li><li>{group?.label || page.groupLabel}</li><li aria-current="page">{page.breadcrumbLabel}</li></ol>
            </nav>
            <h1>{page.heading}</h1>
            <p className="pp-hero__summary">{page.summary}</p>
            {page.showDomainSearch ? <DomainSearch id="domain-search" /> : (
              <>
                <p className="pp-hero__price num">
                  {from === 0 ? <strong>{page.freeLabel || 'Free'}</strong> : <>From <strong>{money(from, region)}</strong>{unit}</>}
                </p>
                <div className="pp-hero__actions">
                  <a className="btn btn--primary btn--lg" href={page.plans ? '#plans' : '/contact'}>{page.plans ? 'See plans' : 'Get started'}</a>
                  <a className="btn btn--secondary btn--lg" href="/contact">Talk to sales</a>
                </div>
              </>
            )}
          </div>
          <aside className="pp-glance" aria-label="At a glance">
            <p>At a glance</p>
            <ul>{page.features.slice(0, 5).map(([title]) => <li key={title}><Check size={16} aria-hidden="true" />{title}</li>)}</ul>
          </aside>
        </div>
      </header>

      {page.plans && (
        <section id="plans" className="section">
          <div className="wrap">
            <div className="section-head"><div><span className="kicker">Pricing</span><h2 className="h2">{page.plansHeading || 'Plans and pricing'}</h2></div></div>
            <PlanTable route={route} />
          </div>
        </section>
      )}

      {page.showTldTable && (
        <section className="section section--surface">
          <div className="wrap">
            <div className="section-head"><div><span className="kicker">Domain pricing</span><h2 className="h2">Popular extensions</h2><p className="lead">First-year and renewal prices per year. {region.tax}</p></div></div>
            <div className="pp-table">
              <table className="num">
                <thead><tr><th scope="col">Extension</th><th scope="col">Register</th><th scope="col">Renew</th><th scope="col">Best for</th></tr></thead>
                <tbody>
                  {tlds.map((tld) => (
                    <tr key={tld.ext}>
                      <th scope="row">{tld.ext}</th>
                      <td>{money(tld.price, region)}/yr</td>
                      <td>{money(tld.renew, region)}/yr</td>
                      <td>{tld.tag.charAt(0) + tld.tag.slice(1).toLowerCase()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <div className="section-head"><div><span className="kicker">Features</span><h2 className="h2">What’s included</h2></div></div>
          <div className="pp-features">
            {page.features.map(([title, text]) => <div key={title}><h3>{title}</h3><p>{localize(text, region)}</p></div>)}
          </div>
        </div>
      </section>

      {page.specs && (
        <section className="section section--surface">
          <div className="wrap pp-split">
            <div><span className="kicker">Specifications</span><h2 className="h2">Technical details</h2></div>
            <dl className="pp-specs">{page.specs.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
          </div>
        </section>
      )}

      {page.steps && (
        <section className="section">
          <div className="wrap">
            <div className="section-head"><div><span className="kicker">How it works</span><h2 className="h2">Up and running in {page.steps.length} steps</h2></div></div>
            <ol className="pp-steps">
              {page.steps.map(([title, text], index) => <li key={title}><span className="num">{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></li>)}
            </ol>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap pp-split">
          <div>
            <span className="kicker">FAQ</span>
            <h2 className="h2">Questions, answered</h2>
            <p className="lead">Can’t find what you need? <a className="text-link" href="/support">Visit the help center</a></p>
          </div>
          <div className="faq-list">{page.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{localize(answer, region)}</p></details>)}</div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="wrap pp-cta">
          <div><h2 className="h2">Not sure which plan fits?</h2><p className="lead">Tell us about your website and traffic. We’ll recommend the right setup — no obligation.</p></div>
          <div className="pp-hero__actions">
            <a className="btn btn--primary btn--lg" href="/contact">Talk to sales <ArrowRight size={16} /></a>
            <a className="btn btn--secondary btn--lg" href="/support">Help center</a>
          </div>
        </div>
      </section>
    </main>
  );
}
