import { ArrowUpRight, Check, Clock3, IndianRupee } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import ProjectCalculator from './ProjectCalculator';
import Seo from './Seo';
import { routeMetadata } from '../siteMetadata';
import './Pricing.css';

const plans = [
  { id:'local', number:'01', label:'LOCAL LAUNCH', name:'Local Business Starter', price:'₹10,000 – ₹25,000', billing:'one-time project', timeline:'5–10 working days', ideal:'Shops, consultants, clinics, creators, and new local businesses', description:'A focused online presence that makes your business credible, searchable, and easy to contact.', includes:['1–3 responsive pages','WhatsApp, call, map, and enquiry actions','Basic local SEO setup','Speed and mobile optimization','Google Analytics integration','1 revision round and launch support'], note:'Domain, hosting, paid themes, copywriting, and third-party subscriptions are billed separately.', theme:'ice' },
  { id:'business', number:'02', label:'MOST POPULAR', name:'Business Growth Website', price:'₹49,000', billing:'typical project starting price', timeline:'3–5 weeks', ideal:'Growing service businesses that need qualified leads and a stronger brand', description:'Strategy, conversion-focused design, content management, integrations, technical SEO, analytics, and launch.', includes:['Up to 8 custom-designed pages','CMS for services, blogs, or case studies','Lead forms with email or CRM routing','Technical and on-page SEO foundation','Analytics, Search Console, and conversion events','Performance, accessibility, and security pass','2 revision rounds plus 30-day support'], note:'Final scope commonly lands between ₹35,000 and ₹75,000 depending on content and integrations.', theme:'blue', featured:true },
  { id:'commerce', number:'03', label:'COMMERCE / MVP', name:'Commerce or Custom MVP', price:'₹1.25L – ₹3.5L', billing:'project range', timeline:'6–12 weeks', ideal:'D2C brands, funded pilots, marketplaces, and first-version software products', description:'A launch-ready commerce experience or custom MVP with the workflows required to test real demand.', includes:['Product UX and responsive interface','Customer login and role-based access','Payment gateway and transactional email','Admin dashboard and content operations','Core API and database development','Cloud deployment, monitoring, and backups','QA, launch plan, and 45-day warranty'], note:'Large catalog migration, mobile apps, advanced ERP, and recurring SaaS modules are scoped separately.', theme:'violet' },
  { id:'saas', number:'04', label:'GROWTH PRODUCT', name:'SaaS & Automation Platform', price:'₹4L – ₹12L+', billing:'phased engagement', timeline:'3–6 months', ideal:'Startups and established teams building scalable software or AI-enabled operations', description:'A production product foundation built for customers, internal teams, secure operations, and repeatable growth.', includes:['Product discovery and technical architecture','Multi-tenant accounts, teams, and permissions','Subscriptions, usage, and billing workflows','Dashboards, notifications, and audit history','Third-party APIs and business automation','AI or LLM workflows where they add value','CI/CD, observability, automated testing, and handover'], note:'Usually delivered in paid milestones. Ongoing product squads typically start around ₹1.5L/month.', theme:'dark' },
  { id:'enterprise', number:'05', label:'ENTERPRISE', name:'Enterprise Transformation', price:'₹15L – ₹50L+', billing:'discovery-led estimate', timeline:'6–12+ months', ideal:'Enterprises modernizing critical systems, data workflows, or high-scale customer products', description:'Cross-functional engineering for complex, secure, integrated systems with visible delivery governance.', includes:['Stakeholder workshops and roadmap','Architecture, security, and compliance planning','SSO, RBAC, audit logs, and approvals','Legacy modernization and data migration','High availability, disaster recovery, and SRE','Enterprise integrations and AI automation','Delivery leadership, QA, and documentation'], note:'A paid discovery phase is recommended. Procurement, cloud usage, and software licenses are excluded.', theme:'rose' },
];

const currencyPrices = [
  { USD:'$120 – $300', EUR:'€110 – €275' },
  { USD:'≈ $590', EUR:'≈ €540' },
  { USD:'$1.5k – $4.2k', EUR:'€1.4k – €3.9k' },
  { USD:'$4.8k – $14.5k', EUR:'€4.4k – €13.2k' },
  { USD:'$18k – $60k+', EUR:'€16.5k – €55k+' },
];

export default function Pricing({ onOpenContact }) {
  return (
    <main className="pricing-page">
      <Seo {...routeMetadata.pricing} type={routeMetadata.pricing.schemaType} items={routeMetadata.pricing.schemaItems} />
      <section className="pricing-hero"><span className="eyebrow">PRICING IN INR, USD &amp; EUR</span><h1>Start lean.<br />Scale without rebuilding.</h1><div className="pricing-hero__copy"><p>Transparent planning ranges for business websites, e-commerce, custom applications, SaaS platforms, and enterprise modernization. Every engagement receives written scope and milestones before work begins.</p><a href="#pricing-stack" className="pricing-hero__link">View packages <ArrowUpRight size={18} /></a></div></section>
      <div className="pricing-trust-strip"><span><IndianRupee size={17} /> Milestone-based billing</span><span><Clock3 size={17} /> Written timeline &amp; scope</span><span><Check size={17} /> Source-code ownership after payment</span></div>

      <section id="pricing-stack" className="pricing-stack-section">
        <ScrollStack
          useWindowScroll
          itemDistance={160}
          itemStackDistance={44}
          baseScale={0.80}
          itemScale={0.045}
          stackPosition="25%"
          scaleEndPosition="12%"
          rotationAmount={-0.5}
          blurAmount={1}
        >
          {plans.map((plan, index) => <ScrollStackItem key={plan.id} itemClassName={`pricing-tier pricing-tier--${plan.theme}`}>
            <div className="pricing-tier__top"><span className="pricing-tier__number">{plan.number}</span><span className={`pricing-tier__label ${plan.featured ? 'pricing-tier__label--featured' : ''}`}>{plan.label}</span></div>
            <div className="pricing-tier__main">
              <div className="pricing-tier__intro"><h2>{plan.name}</h2><p>{plan.description}</p><div className="pricing-tier__price"><strong>{plan.price}</strong><span>{plan.billing}</span><div className="pricing-tier__conversions" aria-label="Approximate US dollar and euro prices"><em><small>USD</small>{currencyPrices[index].USD}</em><em><small>EUR</small>{currencyPrices[index].EUR}</em></div></div><button type="button" onClick={onOpenContact}>Discuss this package <ArrowUpRight size={18} /></button></div>
              <div className="pricing-tier__details"><div className="pricing-tier__meta"><div><span>DELIVERY</span><strong>{plan.timeline}</strong></div><div><span>BEST FOR</span><strong>{plan.ideal}</strong></div></div><h3>What you receive</h3><ul>{plan.includes.map((item) => <li key={item}><Check size={16} /><span>{item}</span></li>)}</ul><p className="pricing-tier__note">{plan.note}</p></div>
            </div>
          </ScrollStackItem>)}
        </ScrollStack>
      </section>

      <section className="pricing-clarity"><div><span className="eyebrow">BEFORE YOU BUY</span><h2>Clear scope creates better software.</h2></div><div className="pricing-clarity__points"><p><strong>These are planning ranges, not instant quotations.</strong> Complexity, content readiness, integrations, compliance, migration, and delivery speed affect the final estimate.</p><p>USD and EUR values are approximate planning conversions. The written proposal confirms currency and exchange assumptions. GST, cloud infrastructure, domains, app-store fees, paid APIs, and licenses are separate unless included.</p><button className="btn-primary" onClick={onOpenContact}>Get a scoped estimate <ArrowUpRight size={18} /></button></div></section>
      <ProjectCalculator onOpenContact={onOpenContact} />
    </main>
  );
}
