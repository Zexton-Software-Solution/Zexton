import { useState } from 'react';
import { ArrowUpRight, Check, Clock3, IndianRupee, Server, Globe, ShieldCheck } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import ProjectCalculator from './ProjectCalculator';
import { HostingPricing } from './HomeSections';
import Seo from './Seo';
import { routeMetadata } from '../siteMetadata';
import './Pricing.css';

const devPlans = [
  {
    id: 'local',
    number: '01',
    label: 'LOCAL LAUNCH',
    name: 'Local Business Starter Website',
    price: '₹10,000 – ₹25,000',
    billing: 'one-time project',
    timeline: '5–10 working days',
    ideal: 'Shops, consultants, clinics, service providers, and local businesses',
    description: 'A clean, credible online presence that makes your business searchable, mobile-friendly, and easy to contact.',
    includes: [
      '1–3 Custom responsive pages',
      'Free SSL & High-Speed Hosting Setup',
      'WhatsApp, Call, Map, and Enquiry actions',
      'Basic Local SEO & Google Search setup',
      'Speed and Mobile optimization',
      '1 Revision round + 30-day launch support',
    ],
    note: 'Domain name and yearly hosting renewal billed separately if not bundled.',
    theme: 'ice',
  },
  {
    id: 'business',
    number: '02',
    label: 'MOST POPULAR',
    name: 'Business Growth Website',
    price: '₹49,000',
    billing: 'typical project starting price',
    timeline: '3–5 weeks',
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
    note: 'Final scope commonly lands between ₹35,000 and ₹75,000 depending on custom requirements.',
    theme: 'blue',
    featured: true,
  },
  {
    id: 'commerce',
    number: '03',
    label: 'COMMERCE / MVP',
    name: 'Commerce Store or Custom MVP',
    price: '₹1.25L – ₹3.5L',
    billing: 'project range',
    timeline: '6–12 weeks',
    ideal: 'D2C brands, funded pilots, marketplaces, and first-version software products',
    description: 'A launch-ready e-commerce experience or custom software MVP with the workflows required to test real demand.',
    includes: [
      'Custom product UX and responsive interface',
      'Customer login, cart, and payment gateway',
      'Admin dashboard & order management',
      'Transactional email & SMS notifications',
      'Core API and database development',
      'Cloud deployment, daily backups & monitoring',
      'QA, launch plan, and 60-day warranty',
    ],
    note: 'Large catalog migrations, custom mobile apps, and multi-vendor systems scoped separately.',
    theme: 'violet',
  },
  {
    id: 'saas',
    number: '04',
    label: 'GROWTH PRODUCT',
    name: 'SaaS & Automation Platform',
    price: '₹4L – ₹12L+',
    billing: 'phased engagement',
    timeline: '3–6 months',
    ideal: 'Startups and established teams building scalable software or AI-enabled operations',
    description: 'A production product foundation built for customers, internal teams, secure operations, and repeatable growth.',
    includes: [
      'Product discovery and technical architecture',
      'Multi-tenant accounts, teams, and permissions',
      'Subscriptions, usage, and billing workflows',
      'Dashboards, notifications, and audit history',
      'Third-party APIs and business automation',
      'AI or LLM workflows where they add value',
      'CI/CD, observability, automated testing, and handover',
    ],
    note: 'Delivered in milestone phases. Ongoing engineering squads typically start around ₹1.5L/month.',
    theme: 'dark',
  },
  {
    id: 'enterprise',
    number: '05',
    label: 'ENTERPRISE',
    name: 'Enterprise Transformation',
    price: '₹15L – ₹50L+',
    billing: 'discovery-led estimate',
    timeline: '6–12+ months',
    ideal: 'Enterprises modernizing critical systems, data workflows, or high-scale customer products',
    description: 'Cross-functional engineering for complex, secure, integrated systems with visible delivery governance.',
    includes: [
      'Stakeholder workshops and roadmap planning',
      'Architecture, security, and compliance planning',
      'SSO, RBAC, audit logs, and approval workflows',
      'Legacy modernization and data migration',
      'High availability, disaster recovery, and SRE',
      'Enterprise integrations and AI automation',
      'Delivery leadership, QA, and documentation',
    ],
    note: 'A paid discovery phase is recommended. Cloud usage and third-party software licenses are excluded.',
    theme: 'rose',
  },
];

const currencyPrices = [
  { USD: '$120 – $300', EUR: '€110 – €275' },
  { USD: '≈ $590', EUR: '≈ €540' },
  { USD: '$1.5k – $4.2k', EUR: '€1.4k – €3.9k' },
  { USD: '$4.8k – $14.5k', EUR: '€4.4k – €13.2k' },
  { USD: '$18k – $60k+', EUR: '€16.5k – €55k+' },
];

export default function Pricing({ onOpenContact }) {
  const [activeTab, setActiveTab] = useState('hosting'); // 'hosting' | 'development'

  return (
    <main className="pricing-page">
      <Seo {...routeMetadata.pricing} type={routeMetadata.pricing.schemaType} items={routeMetadata.pricing.schemaItems} />

      <section className="pricing-hero">
        <span className="eyebrow">TRANSPARENT PRICING &amp; PACKAGES</span>
        <h1>Simple, Upfront Pricing For Hosting &amp; Software</h1>
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
        <span><IndianRupee size={17} /> Transparent, milestone-based billing</span>
        <span><Clock3 size={17} /> Written timeline &amp; scope</span>
        <span><Check size={17} /> 100% Source-code &amp; account ownership</span>
        <span><ShieldCheck size={17} /> 99.9% Uptime &amp; 24/7 Support</span>
      </div>

      {activeTab === 'hosting' ? (
        <HostingPricing />
      ) : (
        <section id="pricing-stack" className="pricing-stack-section">
          <div className="container" style={{ marginBottom: '32px', textAlign: 'center' }}>
            <span className="eyebrow">DEVELOPMENT PACKAGES</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800 }}>
              Website &amp; Custom Software Packages
            </h2>
          </div>
          <ScrollStack useWindowScroll itemDistance={64} itemStackDistance={16} baseScale={0.9} itemScale={0.022} stackPosition="14%" scaleEndPosition="7%">
            {devPlans.map((plan, index) => (
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
                      <div className="pricing-tier__conversions" aria-label="Approximate US dollar and euro prices">
                        <em><small>USD</small>{currencyPrices[index].USD}</em>
                        <em><small>EUR</small>{currencyPrices[index].EUR}</em>
                      </div>
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
            <strong>These are planning ranges and transparent starting prices.</strong> Scope, complexity, integrations, migration, and custom requirements shape final agreements.
          </p>
          <p>
            USD and EUR values are approximate planning conversions. GST and domain registrations are billed transparently. You retain 100% source code and infrastructure ownership upon project completion.
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
