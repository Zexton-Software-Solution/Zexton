import { useState } from 'react';
import { ArrowRight, Bot, Code2, Gauge, LayoutTemplate, MessagesSquare, PenTool, Rocket, Search, ShieldCheck, ShoppingCart, Smartphone, TrendingUp } from 'lucide-react';
import { SiDocker, SiDotnet, SiFigma, SiFlutter, SiGooglecloud, SiLaravel, SiNextdotjs, SiNodedotjs, SiPhp, SiPostgresql, SiRazorpay, SiReact, SiShopify, SiStripe, SiTailwindcss, SiTypescript, SiWoocommerce, SiWordpress } from 'react-icons/si';
import { lowestPrice, productGroups, productPages, productsInGroup } from '../productPagesData';
import { money, useRegion } from '../region';
import DomainSearch from './DomainSearch';
import PlanTable from './PlanTable';
import Reveal from './Reveal';
import './HomeSections.css';

const tech = [
  [SiReact, 'React'], [SiNextdotjs, 'Next.js'], [SiWordpress, 'WordPress'], [SiShopify, 'Shopify'], [SiWoocommerce, 'WooCommerce'],
  [SiLaravel, 'Laravel'], [SiNodedotjs, 'Node.js'], [SiDotnet, '.NET'], [SiTypescript, 'TypeScript'], [SiTailwindcss, 'Tailwind'],
  [SiFlutter, 'Flutter'], [SiFigma, 'Figma'], [SiPhp, 'PHP'], [SiPostgresql, 'PostgreSQL'], [SiDocker, 'Docker'],
  [SiGooglecloud, 'Google Cloud'], [SiRazorpay, 'Razorpay'], [SiStripe, 'Stripe'],
];

export function TechStrip() {
  const row = tech.map(([Icon, name]) => <li key={name}><Icon size={22} aria-hidden="true" />{name}</li>);
  return (
    <section className="tech-strip" aria-label="Technologies we build with">
      <p>Technologies we build with</p>
      <div className="tech-strip__track">
        <ul>{row}</ul>
        <ul aria-hidden="true">{row}</ul>
      </div>
    </section>
  );
}

const services = [
  {
    icon: LayoutTemplate,
    kicker: 'Website design & development',
    title: 'Business websites that turn visitors into enquiries',
    text: 'From a 5-page company site to a 30-page corporate website: custom design, clear messaging, fast pages and a CMS so your team can update content without a developer.',
    points: ['Custom UI/UX, not recycled templates', 'WordPress, Next.js or custom code', 'On-page SEO, analytics & Search Console', 'Hosting, SSL and business email included'],
    image: '/images/website-wireframe.webp',
    route: 'product:website-design',
  },
  {
    icon: ShoppingCart,
    kicker: 'E-commerce development',
    title: 'Online stores ready to take payments from day one',
    text: 'WooCommerce, Shopify or custom stores with UPI, cards and COD, courier integration, GST invoices and a checkout designed to reduce abandoned carts.',
    points: ['Razorpay, Stripe, UPI & COD', 'Shiprocket and courier integration', 'Product upload and catalogue setup', 'Abandoned-cart emails & coupons'],
    image: '/images/ecommerce-checkout.webp',
    route: 'product:ecommerce-website',
  },
  {
    icon: Code2,
    kicker: 'Web applications & custom software',
    title: 'Portals, dashboards and SaaS built around your workflow',
    text: 'Customer portals, booking systems, CRMs, ERPs and SaaS products with secure logins, roles, integrations and cloud deployment — engineered to be maintained for years.',
    points: ['React, Node.js, .NET & Laravel', 'Role-based access & audit trails', 'Payment, ERP & API integrations', 'Cloud deployment and monitoring'],
    image: '/images/developers-office.webp',
    route: 'service:web-application-development',
  },
  {
    icon: Smartphone,
    kicker: 'Mobile app development',
    title: 'iOS and Android apps from one codebase',
    text: 'Cross-platform apps in React Native or Flutter with offline support, push notifications and app-store release handled for you.',
    points: ['React Native & Flutter', 'Push notifications & offline mode', 'App Store and Play Store release', 'Connected to your website & backend'],
    image: '/images/mobile-app-design.webp',
    route: 'service:mobile-app-development',
  },
];

const moreServices = [
  { icon: TrendingUp, title: 'SEO & digital marketing', text: 'Rank on Google and run ads that bring enquiries, with monthly reporting.', image: '/images/analytics-laptop.webp', route: 'product:seo-services' },
  { icon: Bot, title: 'AI chatbots & automation', text: 'Website and WhatsApp assistants that answer customers 24/7 and capture leads.', image: '/images/code-screen.webp', route: 'product:ai-chatbot' },
  { icon: ShieldCheck, title: 'Hosting, security & support', text: 'Fast NVMe hosting, SSL, backups and engineers on call after launch.', image: '/images/server-rack.webp', route: 'product:web-hosting' },
];

const pathFor = (route) => (productPages[route] || { path: `/services/${route.split(':')[1]}` }).path;

export function Services() {
  return (
    <section className="section services" id="services">
      <div className="wrap">
        <Reveal className="section-head">
          <div><span className="kicker">What we build</span><h2 className="h2">Websites and software, designed and engineered in-house</h2></div>
          <p className="lead">One team handles strategy, design, development, hosting and support — so nothing gets lost between agencies.</p>
        </Reveal>

        <div className="feature-rows">
          {services.map(({ icon: Icon, kicker, title, text, points, image, route }, index) => (
            <article key={title} className={`feature-row ${index % 2 ? 'is-flipped' : ''}`}>
              <Reveal className="feature-row__media" y={40}>
                <img className="img-cover" src={image} alt="" loading="lazy" width="1600" height="1067" />
              </Reveal>
              <Reveal className="feature-row__body" delay={0.1}>
                <span className="feature-row__icon"><Icon size={20} /></span>
                <p className="feature-row__kicker">{kicker}</p>
                <h3>{title}</h3>
                <p className="feature-row__text">{text}</p>
                <ul>{points.map((point) => <li key={point}>{point}</li>)}</ul>
                <a className="text-link" href={pathFor(route)}>Learn more <ArrowRight size={15} /></a>
              </Reveal>
            </article>
          ))}
        </div>

        <div className="tiles">
          {moreServices.map(({ icon: Icon, title, text, image, route }, index) => (
            <Reveal key={title} as="a" href={pathFor(route)} className="tile" delay={index * 0.08}>
              <div className="tile__media"><img className="img-cover" src={image} alt="" loading="lazy" width="1600" height="1067" /></div>
              <div className="tile__body">
                <span className="feature-row__icon"><Icon size={18} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="text-link">Explore <ArrowRight size={15} /></span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  [MessagesSquare, 'Discover', 'A short call to understand your business, customers, competitors and goals.'],
  [PenTool, 'Design', 'Homepage and key pages designed in Figma. You review and request changes.'],
  [Code2, 'Build', 'We develop every page, form and integration and test on real phones.'],
  [Rocket, 'Launch & grow', 'Go live on fast hosting with SSL, analytics and ongoing support.'],
];

export function Process() {
  return (
    <section className="section section--surface">
      <div className="wrap">
        <Reveal className="section-head">
          <div><span className="kicker">How we work</span><h2 className="h2">From first call to launch in four clear steps</h2></div>
          <p className="lead">Fixed scope, a written timeline and one point of contact from start to finish.</p>
        </Reveal>
        <ol className="process">
          {steps.map(([Icon, title, text], index) => (
            <Reveal as="li" key={title} delay={index * 0.1}>
              <span className="process__icon"><Icon size={20} /></span>
              <span className="process__num num">Step {index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function WebsitePackages() {
  return (
    <section className="section" id="packages">
      <div className="wrap">
        <Reveal className="section-head">
          <div><span className="kicker">Website packages</span><h2 className="h2">Transparent pricing for every stage of business</h2></div>
          <a className="text-link" href="/websites/website-design">Full package details <ArrowRight size={15} /></a>
        </Reveal>
        <Reveal><PlanTable route="product:website-design" /></Reveal>
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
    <div>
      <div className="tabs" role="tablist" aria-label="Hosting products">
        {hostingTabs.map(([route, label]) => (
          <button key={route} type="button" role="tab" aria-selected={active === route} className={active === route ? 'is-active' : ''} onClick={() => setActive(route)}>{label}</button>
        ))}
      </div>
      <div role="tabpanel"><PlanTable key={active} route={active} /></div>
    </div>
  );
}

export function Hosting() {
  return (
    <section className="section" id="hosting">
      <div className="panel hosting-panel">
        <div className="wrap hosting-panel__grid">
          <Reveal>
            <span className="kicker">Domains &amp; hosting</span>
            <h2 className="h2">Already have a website? Host it with us.</h2>
            <p className="lead">NVMe hosting, business email and SSL on the same infrastructure we use for client projects — with free migration from your current host.</p>
            <div className="hosting-panel__search"><DomainSearch /></div>
            <ul className="hosting-panel__facts">
              <li><Gauge size={16} /> NVMe SSD + LiteSpeed</li>
              <li><ShieldCheck size={16} /> Free SSL &amp; daily backups</li>
              <li><Search size={16} /> 50+ domain extensions</li>
            </ul>
          </Reveal>
          <Reveal className="hosting-panel__media" y={40} delay={0.1}>
            <img className="img-cover" src="/images/server-rack.webp" alt="" loading="lazy" width="1600" height="1067" />
          </Reveal>
        </div>
      </div>
      <div className="wrap hosting-plans">
        <Reveal><HostingPricing /></Reveal>
      </div>
    </section>
  );
}

const numbers = [
  ['99.9%', 'Uptime SLA', 'Service credits if we miss it.'],
  ['24/7', 'Human support', 'Engineers, not scripts, by ticket and email.'],
  ['7–10 days', 'Starter website launch', 'For a 5–7 page business website.'],
  ['100%', 'Ownership', 'Your design, code, content and domain.'],
];

export function Numbers() {
  return (
    <section className="section">
      <div className="wrap numbers">
        {numbers.map(([value, label, text], index) => (
          <Reveal key={label} delay={index * 0.08}><strong className="num">{value}</strong><span>{label}</span><p>{text}</p></Reveal>
        ))}
      </div>
    </section>
  );
}

export function ProductIndex() {
  const region = useRegion();
  return (
    <section className="section section--surface" id="products">
      <div className="wrap">
        <Reveal className="section-head">
          <div><span className="kicker">All products</span><h2 className="h2">Everything else your business needs online</h2></div>
          <p className="lead">Domains, hosting, email, security, marketing and AI — on one account and one invoice.</p>
        </Reveal>
        <div className="product-index">
          {productGroups.map((group) => {
            const pages = productsInGroup(group.id);
            const from = Math.min(...pages.map(lowestPrice).filter(Boolean));
            return (
              <Reveal key={group.id} className="product-index__row" y={12}>
                <div><h3>{group.label}</h3><p>{group.blurb}</p></div>
                <ul>{pages.map((page) => <li key={page.path}><a href={page.path}>{page.breadcrumbLabel}</a></li>)}</ul>
                <p className="product-index__from num">from <strong>{money(from, region)}</strong></p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const homeFaqs = [
  ['How much does a website cost?', 'Our Starter Website (5–7 pages) starts at the price shown in the packages above and includes a free domain and first-year hosting. Larger business sites, online stores and custom portals are priced by scope — we send a fixed quote after a short call.'],
  ['How long does it take to build a website?', 'A starter website usually launches in 7–10 days, a 10–15 page business website in 2–3 weeks, and online stores in 2–4 weeks, depending on how quickly content and feedback arrive.'],
  ['Will I be able to update the website myself?', 'Yes. Business packages and above include a CMS so you can edit text, images, blog posts and products without a developer.'],
  ['Do you redesign existing websites?', 'Yes. We can redesign on your current platform or migrate to a faster one, keeping your SEO rankings by preserving URLs and setting up redirects.'],
  ['Which currency will I be billed in?', 'Prices show in your local currency based on your location — INR in India, USD in the US, and GBP, EUR or AED in those regions. Change it from the selector at the top of the page.'],
];

export function HomeFaq() {
  return (
    <section className="section">
      <div className="wrap split">
        <Reveal>
          <span className="kicker">FAQ</span>
          <h2 className="h2">Questions, answered</h2>
          <p className="lead">More answers in the <a className="text-link" href="/support">help center</a>, or <a className="text-link" href="/contact">talk to our team</a>.</p>
        </Reveal>
        <Reveal className="faq-list" delay={0.1}>{homeFaqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</Reveal>
      </div>
    </section>
  );
}

export function ClosingCta() {
  return (
    <section className="closing panel panel--dark">
      <img className="closing__bg" src="/images/team-smiling.webp" alt="" loading="lazy" width="1600" height="1067" />
      <Reveal className="wrap closing__inner">
        <h2 className="h2">Let’s build a website your customers remember.</h2>
        <p>Tell us about your business. We’ll reply within one working day with ideas, a timeline and a fixed quote.</p>
        <div>
          <a className="btn btn--light btn--lg" href="/contact?service=websites">Start your project <ArrowRight size={16} /></a>
          <a className="btn btn--ghost-dark btn--lg" href="/websites/website-design">View packages</a>
        </div>
      </Reveal>
    </section>
  );
}
