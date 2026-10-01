  import { useState } from 'react';
import { ArrowUpRight, Check, Clock3, DollarSign, Server, Globe, ShieldCheck } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import ProjectCalculator from './ProjectCalculator';
import { HostingPricing } from './HomeSections';
import Seo from './Seo';
import { routeMetadata } from '../siteMetadata';
import { useRegion } from '../region';
import './Pricing.css';

const getDevPlans = (isINR) => [
  {
    id: 'local',
    number: '01',
    label: 'LOCAL LAUNCH',
    name: 'Local Business Starter Website',
    price: isINR ? '₹3,000' : '$199 – $499',
    billing: 'one-time project',
    timeline: isINR ? '3–5 working days' : '5–10 working days',
    ideal: 'Shops, consultants, clinics, service providers, and local businesses',
    description: 'A clean, credible online presence that makes your business searchable, mobile-friendly, and easy to contact.',
    includes: [
      '1–3 Custom responsive pages',
      'Free SSL & High-Speed Hosting Setup',
      'Call, Map, Contact, and WhatsApp button',
      'Basic Local SEO & Google Search setup',
      'Speed and Mobile optimization',
      '1 Revision round + 30-day launch support',
    ],
    note: isINR ? 'Free domain and first-year hosting included.' : 'Domain name and yearly hosting renewal billed separately if not bundled.',
    theme: 'ice',
  },
  {
    id: 'business',
    number: '02',
    label: 'MOST POPULAR',
    name: 'Business Growth Website',
    price: isINR ? '₹5,000' : '$999',
    billing: 'typical project starting price',
    timeline: isINR ? '7–10 days' : '2–4 weeks',
    ideal: 'Growing companies and service businesses that need qualified leads',
    description: 'Strategy, conversion-focused UI/UX design, CMS, integrations, technical SEO, analytics, and launch.',
    includes: [
      'Up to 8 Custom-designed pages',
      'Free 1-Year NVMe Business Hosting + Domain',
      'CMS for services, blogs, and case studies',
      'Lead capture forms with email/CRM routing',
      'On-page SEO, schema & Core Web Vitals pass',
      'Google Analytics & Search Console setup',
      '2 Revision rounds + 45-day warranty',
    ],
    note: isINR ? 'All-inclusive business package with free domain and hosting.' : 'Final scope commonly lands between $699 and $1,499 depending on custom requirements.',
    theme: 'blue',
    featured: true,
  },
  {
    id: 'commerce',
    number: '03',
    label: 'COMMERCE / MVP',
    name: 'Commerce Store or Custom MVP',
    price: isINR ? '₹7,500' : '$2,499 – $6,999',
    billing: isINR ? 'complete online store' : 'project range',
    timeline: isINR ? '2–3 weeks' : '4–8 weeks',
    ideal: 'D2C brands, product sellers, marketplaces, and catalog stores',
    description: 'A launch-ready e-commerce store with product catalogue, payment gateway, shipping, and automated order alerts.',
    includes: [
      'Custom product UX and responsive interface',
      'Customer login, cart, and payment gateway (Razorpay/UPI/Cards)',
      'Admin dashboard & order management',
      'Transactional email & WhatsApp notifications',
      'Core API and database development',
      'Cloud deployment, daily backups & monitoring',
      'QA, launch plan, and 60-day warranty',
    ],
    note: isINR ? 'Razorpay, PhonePe & Paytm payment gateway setup included.' : 'Large catalog migrations, custom mobile apps, and multi-vendor systems scoped separately.',
    theme: 'violet',
  },
  {
    id: 'enterprise',
    number: '04',
    label: 'ENTERPRISE',
    name: 'Enterprise Business Website / Portal',
    price: isINR ? '₹10,000' : '$7,999 – $24,999+',
    billing: isINR ? 'full business portal' : 'phased engagement',
    timeline: isINR ? '3–4 weeks' : '2–5 months',
    ideal: 'Enterprises, institutions, portals, and businesses needing complete web infrastructure',
    description: 'Comprehensive web architecture with unlimited sections, role-based workflows, custom integrations, and SLA.',
    includes: [
      'Stakeholder consultation & custom layout',
      'Role-based access & dynamic customer portal',
      'CRM, WhatsApp, and API integrations',
      'High-speed cloud deployment + SSL',
      'Advanced SEO & lead generation funnel',
      '1 Year dedicated maintenance & support',
    ],
    note: isINR ? 'Top-tier comprehensive business solution capped at ₹10,000.' : 'A paid discovery phase is recommended. Cloud usage and third-party software licenses are excluded.',
    theme: 'rose',
  },
];

export default function Pricing({ onOpenContact }) {
  const region = useRegion();
  const isINR = region.currency === 'INR';
  const devPlans = getDevPlans(isINR);
  const [activeTab, setActiveTab] = useState('hosting'); // 'hosting' | 'development'

  return (
    <main className="pricing-page">
      <Seo {...routeMetadata.pricing} type={routeMetadata.pricing.schemaType} items={routeMetadata.pricing.schemaItems} />

      <section className="pricing-hero">
        <span className="eyebrow">TRANSPARENT PRICING &amp; PACKAGES</span>
        <h1>Simple, Upfront Pricing in {region.currency}</h1>
        <div className="pricing-hero__copy">
          <p>
            Explore high-speed cloud hosting plans or transparent pricing ranges for business websites, e-commerce, custom applications, and SaaS platforms.
          </p>

          <div className="pricing-main-tab-switcher">
            <button
              type="button"
              className={`main-tab-btn ${activeTab === 'hosting' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('hosting')}
            >
              <Server size={18} />
              <span>Web Hosting &amp; Cloud Servers</span>
            </button>
            <button
              type="button"
              className={`main-tab-btn ${activeTab === 'development' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('development')}
            >
              <Globe size={18} />
              <span>Website &amp; Software Development</span>
            </button>
          </div>
        </div>
      </section>

      <div className="pricing-trust-strip">
        <span><DollarSign size={17} /> Transparent, milestone-based billing</span>
        <span><Clock3 size={17} /> Written timeline &amp; scope</span>
        <span><Check size={17} /> 100% Source-code &amp; account ownership</span>
        <span><ShieldCheck size={17} /> 99.9% Uptime &amp; 24/7 Support</span>
      </div>

      {activeTab === 'hosting' ? (
        <section className="section"><div className="wrap"><span className="kicker">Hosting</span><h2 className="h2" style={{ marginBottom: 32 }}>Hosting plans</h2><HostingPricing /></div></section>
      ) : (
        <section id="pricing-stack" className="pricing-stack-section">
          <div className="container" style={{ marginBottom: '32px', textAlign: 'center' }}>
            <span className="eyebrow">DEVELOPMENT PACKAGES</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800 }}>
              Website &amp; Custom Software Packages
            </h2>
          </div>
          <ScrollStack useWindowScroll itemDistance={64} itemStackDistance={16} baseScale={0.9} itemScale={0.022} stackPosition="14%" scaleEndPosition="7%">
            {devPlans.map((plan) => (
              <ScrollStackItem key={plan.id} itemClassName={`pricing-tier pricing-tier--${plan.theme}`}>
                <div className="pricing-tier__top">
                  <span className="pricing-tier__number">{plan.number}</span>
                  <span className={`pricing-tier__label ${plan.featured ? 'pricing-tier__label--featured' : ''}`}>
                    {plan.label}
                  </span>
                </div>
                <div className="pricing-tier__main">
                  <div className="pricing-tier__intro">
                    <h2>{plan.name}</h2>
                    <p>{plan.description}</p>
                    <div className="pricing-tier__price">
                      <strong>{plan.price}</strong>
                      <span>{plan.billing}</span>
                    </div>
                    <button type="button" onClick={onOpenContact}>
                      Discuss this package <ArrowUpRight size={18} />
                    </button>
                  </div>
                  <div className="pricing-tier__details">
                    <div className="pricing-tier__meta">
                      <div>
                        <span>DELIVERY</span>
                        <strong>{plan.timeline}</strong>
                      </div>
                      <div>
                        <span>BEST FOR</span>
                        <strong>{plan.ideal}</strong>
                      </div>
                    </div>
                    <h3>What you receive</h3>
                    <ul>
                      {plan.includes.map((item) => (
                        <li key={item}>
                          <Check size={16} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="pricing-tier__note">{plan.note}</p>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </section>
      )}

      <section className="pricing-clarity">
        <div>
          <span className="eyebrow">BEFORE YOU BUY</span>
          <h2>Clear scope creates better software &amp; hosting.</h2>
        </div>
        <div className="pricing-clarity__points">
          <p>
            <strong>These are planning ranges and transparent starting prices in {region.currency}.</strong> Scope, complexity, integrations, migration, and custom requirements shape final agreements.
          </p>
          <p>
            All engagements receive a formal written proposal and timeline. You retain 100% source code and infrastructure ownership upon project completion.
          </p>
          <button className="btn-primary" onClick={onOpenContact}>
            Get a custom scoped estimate <ArrowUpRight size={18} />
          </button>
        </div>
      </section>

      <ProjectCalculator onOpenContact={onOpenContact} />
    </main>
  );
}
