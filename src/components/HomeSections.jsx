import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { extraServiceLinks, lowestPrice, productGroups, productPages, productsInGroup } from '../productPagesData';
import { money, useRegion } from '../region';
import { routeMetadata } from '../siteMetadata';
import PlanTable from './PlanTable';
import './HomeSections.css';

export function ProductIndex() {
  const region = useRegion();
  return (
    <section className="section" id="products">
      <div className="wrap">
        <div className="section-head">
          <div><span className="kicker">Products</span><h2 className="h2">One provider for your whole online presence</h2></div>
          <p className="lead">Start with a domain and add hosting, email, security and a website as you grow — all on one account and one invoice.</p>
        </div>
        <div className="product-index">
          {productGroups.map((group) => {
            const pages = productsInGroup(group.id);
            const from = Math.min(...pages.map(lowestPrice).filter(Boolean));
            return (
              <div key={group.id} className="product-index__row">
                <div>
                  <h3>{group.label}</h3>
                  <p>{group.blurb}</p>
                </div>
                <ul>{pages.map((page) => <li key={page.path}><a href={page.path}>{page.breadcrumbLabel}</a></li>)}</ul>
                <p className="product-index__from num">from <strong>{money(from, region)}</strong></p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const hostingTabs = [
  ['product:web-hosting', 'Web hosting'],
  ['product:wordpress-hosting', 'WordPress'],
  ['product:vps-hosting', 'Cloud VPS'],
  ['product:business-email', 'Business email'],
];

export function HostingPricing() {
  const [active, setActive] = useState(hostingTabs[0][0]);
  return (
    <section className="section section--surface" id="hosting">
      <div className="wrap">
        <div className="section-head">
          <div><span className="kicker">Pricing</span><h2 className="h2">Simple plans. No surprises at checkout.</h2></div>
          <a className="text-link" href={productPages[active].path}>All {productPages[active].breadcrumbLabel} details <ArrowRight size={15} /></a>
        </div>
        <div className="tabs" role="tablist" aria-label="Hosting products">
          {hostingTabs.map(([route, label]) => (
            <button key={route} type="button" role="tab" aria-selected={active === route} className={active === route ? 'is-active' : ''} onClick={() => setActive(route)}>{label}</button>
          ))}
        </div>
        <div role="tabpanel"><PlanTable key={active} route={active} /></div>
      </div>
    </section>
  );
}

const numbers = [
  ['99.9%', 'Uptime SLA', 'Service credits if we miss it.'],
  ['24/7', 'Human support', 'Engineers, not scripts, by ticket and email.'],
  ['30 days', 'Money-back', 'On all shared and cloud hosting plans.'],
  ['Free', 'Migration', 'We move your site and email with zero downtime.'],
];

export function Numbers() {
  return (
    <section className="section">
      <div className="wrap numbers">
        {numbers.map(([value, label, text]) => (
          <div key={label}><strong className="num">{value}</strong><span>{label}</span><p>{text}</p></div>
        ))}
      </div>
    </section>
  );
}

const websiteRoutes = ['product:website-builder', 'product:website-design', 'product:ecommerce-website'];

export function Websites() {
  const region = useRegion();
  return (
    <section className="section">
      <div className="wrap split">
        <div>
          <span className="kicker">Websites</span>
          <h2 className="h2">Build it yourself, or let us build it for you.</h2>
          <p className="lead">Launch in an afternoon with the website builder, or work with our designers on a site that’s fast, mobile-first and ready for Google.</p>
        </div>
        <ul className="link-rows">
          {websiteRoutes.map((route) => {
            const page = productPages[route];
            const cheapest = page.plans.find((plan) => plan.price === lowestPrice(page));
            return (
              <li key={route}>
                <a href={page.path}>
                  <span><strong>{page.breadcrumbLabel}</strong><small>{page.navDesc}</small></span>
                  <span className="num">from {money(lowestPrice(page), region)}{cheapest.unit}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Engineering() {
  return (
    <section className="section section--surface">
      <div className="wrap split">
        <div>
          <span className="kicker">Engineering services</span>
          <h2 className="h2">When you need more than hosting.</h2>
          <p className="lead">The same team builds custom software, mobile apps and AI automation, and manages servers for businesses without an IT department.</p>
        </div>
        <ul className="link-rows">
          {extraServiceLinks.map(([route, label]) => (
            <li key={route}>
              <a href={routeMetadata[route].path}>
                <span><strong>{label}</strong><small>{routeMetadata[route].summary.split('. ')[0]}.</small></span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const homeFaqs = [
  ['What do I need to start a website?', 'Three things: a domain name (your address, e.g. yourbusiness.com), web hosting (where the site files live) and the website itself — built with our Website Builder, WordPress, or by our design team.'],
  ['Which hosting is right for me?', 'Most small business websites start on Linux Web Hosting. Choose WordPress Hosting for WordPress sites, Cloud Hosting for high traffic, and a VPS or dedicated server for custom applications that need root access.'],
  ['Can you move my existing website to Zexton?', 'Yes. Website, database and email migration is free on hosting plans. Our team copies everything and checks it before you switch DNS, so there is no downtime.'],
  ['Which currency will I be billed in?', 'Prices are shown in your local currency based on your location — INR in India, USD in the US, and GBP, EUR or AED in those regions. You can change the currency from the selector at the top of the page.'],
  ['Are taxes included?', 'Prices exclude taxes. In India 18% GST is added at checkout and a GST invoice is issued for every order.'],
];

export function HomeFaq() {
  return (
    <section className="section">
      <div className="wrap split">
        <div>
          <span className="kicker">FAQ</span>
          <h2 className="h2">Questions, answered</h2>
          <p className="lead">More answers in the <a className="text-link" href="/support">help center</a>, or <a className="text-link" href="/contact">talk to our team</a>.</p>
        </div>
        <div className="faq-list">{homeFaqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </div>
    </section>
  );
}

export function ClosingCta() {
  return (
    <section className="section section--surface">
      <div className="wrap closing-cta">
        <h2 className="h2">Get your business online today.</h2>
        <div>
          <a className="btn btn--primary btn--lg" href="/domains/domain-registration">Find a domain</a>
          <a className="btn btn--secondary btn--lg" href="/contact">Talk to sales</a>
        </div>
      </div>
    </section>
  );
}
