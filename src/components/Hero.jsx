import { ArrowRight, Globe, Server, Mail, Code2, ShieldCheck, Zap, Headphones } from 'lucide-react';
import './Hero.css';

const heroBadges = [
  { icon: Zap, label: '99.9% Uptime Guarantee' },
  { icon: ShieldCheck, label: 'Free SSL & Migration' },
  { icon: Headphones, label: '24/7 Expert Support' },
];

const quickCards = [
  {
    icon: Server,
    title: 'Web & Cloud Hosting',
    price: 'From ₹79 / mo',
    desc: 'NVMe storage, free SSL, cPanel, and 99.9% uptime for websites.',
    link: '#hosting',
    cta: 'View Hosting Plans',
    badge: 'Popular',
  },
  {
    icon: Globe,
    title: 'Website Design & Dev',
    price: 'From ₹10,000',
    desc: 'High-converting, responsive business websites and e-commerce stores.',
    link: '/services/web-application-development',
    cta: 'Get Scoped Quote',
    badge: 'Top Service',
  },
  {
    icon: Mail,
    title: 'Business Email Suite',
    price: 'From ₹119 / mo',
    desc: 'Professional @yourdomain.com email with anti-spam and mobile sync.',
    link: '/contact?service=business-email',
    cta: 'Setup Mailboxes',
    badge: 'Essential',
  },
  {
    icon: Code2,
    title: 'Custom Software & SaaS',
    price: 'Milestone-based',
    desc: 'Tailored web portals, SaaS platforms, React Native mobile apps & AI.',
    link: '/services/custom-software-development',
    cta: 'Discuss Project',
    badge: 'Custom Build',
  },
];

export default function Hero() {
  return (
    <section id="home" className="hero-clean">
      <div className="container">
        <div className="hero-main-block">
          <div className="hero-eyebrow-pill">
            <span className="hero-pill-dot" />
            <span>CLOUD HOSTING · WEBSITE DESIGN · SOFTWARE ENGINEERING</span>
          </div>

          <h1 className="hero-title">
            Reliable Web Hosting, Modern Websites &amp; Custom Software
          </h1>

          <p className="hero-subtitle">
            Zexton helps businesses launch fast, secure websites, deploy scalable cloud servers, manage professional business emails, and build custom software applications with 99.9% uptime and 24/7 support.
          </p>

          <div className="hero-cta-row">
            <a className="btn-hero-primary" href="#hosting">
              <span>Explore Hosting Plans</span>
              <ArrowRight size={18} />
            </a>
            <a className="btn-hero-secondary" href="/contact">
              <span>Request Website Quote</span>
            </a>
          </div>

          <div className="hero-trust-badges">
            {heroBadges.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.label} className="hero-badge-item">
                  <Icon className="hero-badge-check" size={16} />
                  <span>{b.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Flagship Hero Quick-Pillars */}
        <div className="hero-quick-grid">
          {quickCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="hero-quick-card">
                <div className="hero-quick-card-top">
                  <div className="hero-quick-icon">
                    <Icon size={22} />
                  </div>
                  <span className="hero-quick-badge">{card.badge}</span>
                </div>

                <h3 className="hero-quick-title">{card.title}</h3>
                <span className="hero-quick-price">{card.price}</span>
                <p className="hero-quick-desc">{card.desc}</p>

                <a href={card.link} className="hero-quick-link">
                  <span>{card.cta}</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
