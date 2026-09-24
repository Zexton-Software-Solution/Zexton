import { Globe, Server, Mail, Code2, Smartphone, Bot, ArrowRight, CheckCircle2 } from 'lucide-react';
import './ServicesShowcase.css';

const services = [
  {
    id: 'web-design',
    icon: Globe,
    badge: 'FLAGSHIP SERVICE',
    title: 'Website Design & Development',
    description: 'Custom, fast-loading, mobile-friendly business websites, landing pages, and e-commerce stores designed to build trust and convert visitors into customers.',
    highlights: ['5–10 Page Corporate Websites', 'E-Commerce & Online Stores', '100% Mobile Responsive UX', 'SEO & Speed Optimized'],
    link: '/websites/website-design',
    color: '#225cff',
  },
  {
    id: 'hosting-cloud',
    icon: Server,
    badge: 'INFRASTRUCTURE',
    title: 'Web Hosting & Cloud Servers',
    description: 'High-speed NVMe shared hosting, scalable Cloud VPS, dedicated bare-metal servers, and managed cloud deployments with 99.9% uptime and 24/7 support.',
    highlights: ['Pure NVMe High-Speed Storage', 'Full Root Access & KVM VPS', 'Free SSL & 1-Click Backup', '24/7 Real Human Support'],
    link: '/hosting/web-hosting',
    color: '#0891b2',
  },
  {
    id: 'business-email',
    icon: Mail,
    badge: 'COMMUNICATION',
    title: 'Business Email & Domain Solutions',
    description: 'Professional email accounts (@yourdomain.com) with anti-spam security, webmail, mobile sync, and Google Workspace / Microsoft 365 setup.',
    highlights: ['Custom Domain Business Emails', 'Spam & Phishing Shield', 'Outlook, iOS & Android Sync', 'DNS, DKIM & SPF Setup'],
    link: '/email/business-email',
    color: '#d946ef',
  },
  {
    id: 'custom-software',
    icon: Code2,
    badge: 'ENGINEERING',
    title: 'Custom Software & SaaS Platforms',
    description: 'Bespoke web applications, SaaS products, management portals, ERPs, and internal tools built around your exact business rules and workflows.',
    highlights: ['Multi-Tenant SaaS Architecture', 'Customer Portals & Dashboards', 'Secure APIs & Database Design', 'Zero Technical Debt'],
    link: '/services/custom-software-development',
    color: '#4f46e5',
  },
  {
    id: 'mobile-apps',
    icon: Smartphone,
    badge: 'MOBILE PRODUCTS',
    title: 'React Native Mobile App Development',
    description: 'Cross-platform iOS and Android mobile apps with smooth 60fps performance, offline support, push notifications, and app store release management.',
    highlights: ['iOS & Android from One Codebase', 'Native Performance & Smooth UX', 'Push Notifications & Payments', 'App Store & Play Store Launch'],
    link: '/services/mobile-app-development',
    color: '#059669',
  },
  {
    id: 'ai-automation',
    icon: Bot,
    badge: 'MODERN TECH',
    title: 'AI Automation & Intelligent Agents',
    description: 'Practical AI integration for business workflows: automated document processing, custom customer AI chatbots, workflow automation, and smart tools.',
    highlights: ['Custom AI Chat Assistants', 'Document & Workflow Automation', 'CRM & ERP AI Integrations', 'Measurable ROI & Time Savings'],
    link: '/services/ai-automation',
    color: '#ea580c',
  },
];

export default function ServicesShowcase() {
  return (
    <section id="services-showcase" className="services-showcase-section">
      <div className="container">
        <div className="services-showcase-header">
          <span className="eyebrow">WHAT WE DO</span>
          <h2>Everything You Need To Build, Host &amp; Grow Online</h2>
          <p>
            From domain registration and ultra-fast cloud hosting to custom website design and scalable software engineering, Zexton provides end-to-end digital solutions.
          </p>
        </div>

        <div className="services-grid">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div key={srv.id} className="service-card" style={{ '--accent-color': srv.color }}>
                <div className="service-card-top">
                  <div className="service-icon-box">
                    <Icon size={24} />
                  </div>
                  <span className="service-badge">{srv.badge}</span>
                </div>

                <h3 className="service-title">{srv.title}</h3>
                <p className="service-desc">{srv.description}</p>

                <div className="service-highlights-list">
                  {srv.highlights.map((h) => (
                    <div key={h} className="service-highlight-item">
                      <CheckCircle2 size={15} className="highlight-icon" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <a href={srv.link} className="service-action-link">
                  <span>Learn more</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
