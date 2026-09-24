import { ArrowRight, Check, CheckCircle2, Headphones, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { inr, lowestPrice, productGroups, productPages, tlds } from '../productPagesData';
import { routeMetadata } from '../siteMetadata';
import DomainSearchBanner from './DomainSearchBanner';
import { productIcons } from './productIcons';
import Seo from './Seo';
import './ProductPage.css';

const orderUrl = (page, plan) => `/contact?service=${page.group}&plan=${encodeURIComponent(`${page.breadcrumbLabel} – ${plan}`)}`;

export default function ProductPage({ route }) {
  const page = productPages[route];
  const metadata = routeMetadata[route];
  if (!page || !metadata) return null;

  const group = productGroups.find((item) => item.id === page.group);
  const Icon = productIcons[page.icon] || Zap;
  const from = lowestPrice(page);
  const unit = page.priceUnit || page.plans?.find((plan) => plan.price === from)?.unit || '';
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: page.breadcrumbLabel, path: page.path },
  ];

  return (
    <main className="product-page">
      <Seo {...metadata} type={metadata.schemaType} breadcrumbs={breadcrumbs} items={metadata.schemaItems} />

      <header className="pp-hero">
        <div className="pp-wrap pp-hero__grid">
          <div>
            <nav className="pp-crumbs" aria-label="Breadcrumb">
              <ol><li><a href="/">Home</a></li><li>{group?.label || page.groupLabel}</li><li aria-current="page">{page.breadcrumbLabel}</li></ol>
            </nav>
            <span className="pp-eyebrow"><Icon size={15} /> {page.eyebrow}</span>
            <h1>{page.heading}</h1>
            <p className="pp-hero__summary">{page.summary}</p>
            <div className="pp-hero__price">
              {from === 0 ? <strong>{page.freeLabel || 'Free'}</strong> : <>Starting at <strong>{inr(from)}</strong><span>{unit}</span></>}
            </div>
            <div className="pp-hero__actions">
              <a className="pp-btn pp-btn--primary" href={page.plans ? '#plans' : page.showDomainSearch ? '#domain-search' : '/contact'}>
                {page.plans ? 'View plans' : 'Get started'} <ArrowRight size={18} />
              </a>
              <a className="pp-btn pp-btn--ghost" href="/contact">Talk to an expert</a>
            </div>
            <ul className="pp-hero__trust">
              <li><ShieldCheck size={16} /> Secure & reliable</li>
              <li><Headphones size={16} /> 24/7 expert support</li>
              <li><Zap size={16} /> Quick setup</li>
            </ul>
          </div>
          <aside className="pp-hero__card" aria-label="Key features">
            <span>WHAT YOU GET</span>
            <ul>{page.features.slice(0, 5).map(([title]) => <li key={title}><CheckCircle2 size={18} />{title}</li>)}</ul>
          </aside>
        </div>
      </header>

      {page.showDomainSearch && <div id="domain-search"><DomainSearchBanner /></div>}

      {page.plans && (
        <section id="plans" className="pp-section">
          <div className="pp-wrap">
            <div className="pp-heading">
              <span className="pp-label">PLANS & PRICING</span>
              <h2>{page.plansHeading || `Choose your ${page.breadcrumbLabel} plan`}</h2>
              <p>{page.plansNote || 'All prices in INR, exclusive of 18% GST. Upgrade or change plans anytime.'}</p>
            </div>
            <div className={`pp-plans pp-plans--${Math.min(page.plans.length, 4)}`}>
              {page.plans.map((plan) => (
                <article key={plan.name} className={`pp-plan ${plan.popular ? 'is-popular' : ''}`}>
                  {plan.popular && <span className="pp-plan__ribbon"><Sparkles size={13} /> MOST POPULAR</span>}
                  <span className="pp-plan__tag">{plan.tag}</span>
                  <h3>{plan.name}</h3>
                  <div className="pp-plan__price"><strong>{plan.priceText || inr(plan.price)}</strong><span>{plan.unit}</span></div>
                  <small>{plan.note || ' '}</small>
                  <a className="pp-btn pp-btn--block" href={orderUrl(page, plan.name)}>{page.planCta || 'Buy now'} <ArrowRight size={16} /></a>
                  <ul>{plan.features.map((feature) => <li key={feature}><Check size={16} />{feature}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.showTldTable && (
        <section className="pp-section pp-section--tint">
          <div className="pp-wrap">
            <div className="pp-heading">
              <span className="pp-label">DOMAIN PRICING</span>
              <h2>Popular domain extensions</h2>
              <p>First-year price and renewal price per year, exclusive of GST.</p>
            </div>
            <div className="pp-table-wrap">
              <table className="pp-table">
                <thead><tr><th>Extension</th><th>Register</th><th>Renew</th><th>Best for</th><th /></tr></thead>
                <tbody>
                  {tlds.map((tld) => (
                    <tr key={tld.ext}>
                      <td><strong>{tld.ext}</strong></td>
                      <td>{inr(tld.price)}/yr</td>
                      <td>{inr(tld.renew)}/yr</td>
                      <td><span className="pp-chip">{tld.tag}</span></td>
                      <td><a href="#domain-search">Search <ArrowRight size={14} /></a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <section className="pp-section">
        <div className="pp-wrap">
          <div className="pp-heading">
            <span className="pp-label">FEATURES</span>
            <h2>Everything included with {page.breadcrumbLabel}</h2>
          </div>
          <div className="pp-features">
            {page.features.map(([title, text]) => (
              <article key={title}><span><Check size={18} /></span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      {page.specs && (
        <section className="pp-section pp-section--tint">
          <div className="pp-wrap pp-specs">
            <div className="pp-heading"><span className="pp-label">TECHNICAL SPECIFICATIONS</span><h2>Under the hood</h2></div>
            <dl>{page.specs.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
          </div>
        </section>
      )}

      {page.steps && (
        <section className="pp-section">
          <div className="pp-wrap">
            <div className="pp-heading"><span className="pp-label">HOW IT WORKS</span><h2>Up and running in {page.steps.length} simple steps</h2></div>
            <ol className="pp-steps">
              {page.steps.map(([title, text], index) => <li key={title}><span>{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}
            </ol>
          </div>
        </section>
      )}

      <section className="pp-section pp-section--tint">
        <div className="pp-wrap pp-faq">
          <div className="pp-heading"><span className="pp-label">FAQ</span><h2>Frequently asked questions</h2><p>Can’t find your answer? <a href="/support">Visit the help center</a> or <a href="/contact">contact us</a>.</p></div>
          <div>{page.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="pp-cta">
        <div className="pp-wrap">
          <div><h2>Need help choosing?</h2><p>Our specialists will recommend the right plan for your website, traffic and budget — no obligation.</p></div>
          <a className="pp-btn pp-btn--light" href="/contact">Talk to an expert <ArrowRight size={18} /></a>
        </div>
      </section>
    </main>
  );
}
