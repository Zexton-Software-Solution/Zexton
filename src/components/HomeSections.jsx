import { ArrowRight, CheckCircle2, MessageSquare, Clock3, Headphones, LayoutTemplate, LifeBuoy, Mail, Palette, RotateCcw, ShieldCheck } from 'lucide-react';
import { inr, lowestPrice, productGroups, productPages, productsInGroup } from '../productPagesData';
import { groupIcons } from './productIcons';
import './HomeSections.css';

export function ProductGrid() {
  return (
    <section className="hs-section" id="products">
      <div className="hs-wrap">
        <div className="hs-heading">
          <span>ALL PRODUCTS</span>
          <h2>Everything you need to go online</h2>
          <p>From your first domain to dedicated servers — pick a product and see plans, features and pricing.</p>
        </div>
        <div className="hs-products">
          {productGroups.map((group) => {
            const Icon = groupIcons[group.id];
            const pages = productsInGroup(group.id);
            const from = Math.min(...pages.map(lowestPrice).filter(Boolean));
            return (
              <article key={group.id} className="hs-product">
                <div className="hs-product__top">
                  <span className="hs-product__icon"><Icon size={24} /></span>
                  <span className="hs-product__from">from <strong>{inr(from)}</strong></span>
                </div>
                <h3>{group.label}</h3>
                <p>{group.blurb}</p>
                <ul>
                  {pages.map((page) => <li key={page.path}><a href={page.path}>{page.breadcrumbLabel} <ArrowRight size={14} /></a></li>)}
                </ul>
              </article>
            );
          })}
          <article className="hs-product hs-product--cta">
            <span className="hs-product__icon"><MessageSquare size={24} /></span>
            <h3>Not sure what you need?</h3>
            <p>Tell us about your business and our team will recommend the right domain, hosting and website setup — free.</p>
            <a href="/contact">Talk to an expert <ArrowRight size={16} /></a>
          </article>
        </div>
      </div>
    </section>
  );
}

const builder = productPages['product:website-builder'];
const design = productPages['product:website-design'];

export function WebsiteOptions() {
  return (
    <section className="hs-section hs-section--tint">
      <div className="hs-wrap">
        <div className="hs-heading">
          <span>WEBSITES</span>
          <h2>Get a website your way</h2>
          <p>Build it yourself in an afternoon, or let our designers create a site that wins customers.</p>
        </div>
        <div className="hs-web">
          <article>
            <span className="hs-web__icon"><LayoutTemplate size={26} /></span>
            <small>DO IT YOURSELF</small>
            <h3>Website Builder</h3>
            <p>{builder.summary}</p>
            <ol>{builder.steps.map(([title]) => <li key={title}>{title}</li>)}</ol>
            <div className="hs-web__foot"><span>From <strong>{inr(lowestPrice(builder))}</strong>/mo</span><a href={builder.path}>Start building <ArrowRight size={16} /></a></div>
          </article>
          <article className="is-dark">
            <span className="hs-web__icon"><Palette size={26} /></span>
            <small>DONE FOR YOU</small>
            <h3>Website Design &amp; Development</h3>
            <p>{design.summary}</p>
            <ul>{design.plans.slice(0, 3).map((plan) => <li key={plan.name}><CheckCircle2 size={16} />{plan.name} <em>{plan.tag}</em></li>)}</ul>
            <div className="hs-web__foot"><span>From <strong>{inr(lowestPrice(design))}</strong> one-time</span><a href={design.path}>View packages <ArrowRight size={16} /></a></div>
          </article>
        </div>
      </div>
    </section>
  );
}

const promises = [
  { icon: Clock3, title: '99.9% uptime', text: 'Monitored infrastructure in Tier-III data centres.' },
  { icon: Headphones, title: '24/7 support', text: 'Real engineers by ticket and email, any time of day.' },
  { icon: RotateCcw, title: '30-day money-back', text: 'Not happy with your hosting? Get a refund within 30 days.' },
  { icon: ShieldCheck, title: 'Free SSL & migration', text: 'We move your site and email and secure it with HTTPS.' },
];

const homeFaqs = [
  ['What do I need to start a website?', 'Three things: a domain name (your address, e.g. yourbusiness.in), web hosting (where the site files live) and the website itself — built with our Website Builder, WordPress, or by our design team.'],
  ['Which hosting is right for me?', 'Most small business websites start on Linux Web Hosting. Choose WordPress Hosting for WordPress sites, Cloud Hosting for high traffic, and a VPS or dedicated server for custom applications that need root access.'],
  ['Can you move my existing website to Zexton?', 'Yes. Website, database and email migration is free on hosting plans. Our team copies everything and checks it before you switch DNS, so there is no downtime.'],
  ['Are prices inclusive of GST?', 'Prices shown are exclusive of 18% GST. GST invoices are issued for every order so registered businesses can claim input credit.'],
];

export function SupportBand() {
  return (
    <section className="hs-section">
      <div className="hs-wrap">
        <div className="hs-promises">
          {promises.map(({ icon: Icon, title, text }) => (
            <div key={title}><Icon size={26} /><strong>{title}</strong><p>{text}</p></div>
          ))}
        </div>
        <div className="hs-help">
          <div>
            <span className="hs-help__label">NEED HELP?</span>
            <h2>Answers to common questions</h2>
            <p>New to domains and hosting? Start here, or talk to our team.</p>
            <div className="hs-help__actions">
              <a href="/support"><LifeBuoy size={18} /> Visit Help Center</a>
              <a href="mailto:info@zexton.com"><Mail size={18} /> info@zexton.com</a>
            </div>
          </div>
          <div className="hs-help__faq">
            {homeFaqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
          </div>
        </div>
      </div>
    </section>
  );
}
