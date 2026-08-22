import { Shield, Zap, DollarSign, Key, Users, ArrowRightLeft } from 'lucide-react';
import './WhyChooseZexton.css';

const reasons = [
  {
    icon: Zap,
    title: '99.9% Uptime & Ultra-Fast NVMe',
    desc: 'High-speed cloud infrastructure with pure NVMe storage ensures your website and software load in milliseconds.',
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing, Zero Hidden Fees',
    desc: 'Clear upfront pricing for hosting, website design, and software. You always know exactly what you are paying for.',
  },
  {
    icon: Key,
    title: '100% Source Code & Account Ownership',
    desc: 'You retain full ownership of all source code, domain names, hosting accounts, and database credentials.',
  },
  {
    icon: ArrowRightLeft,
    title: 'Free Website & Email Migration',
    desc: 'Moving from GoDaddy, Hostinger, or Bluehost? Our engineers will transfer your files, databases, and emails with zero downtime.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security & Daily Backups',
    desc: 'Free SSL certificates, DDoS protection, automated daily cloud snapshots, and malware protection included on every plan.',
  },
  {
    icon: Users,
    title: '24/7 Real Human Support',
    desc: 'No confusing bot loops. Get direct assistance from engineers who understand your setup via Phone, WhatsApp, and Tickets.',
  },
];

export default function WhyChooseZexton() {
  return (
    <section className="why-zexton-section">
      <div className="container">
        <div className="why-zexton-header">
          <span className="eyebrow">THE ZEXTON ADVANTAGE</span>
          <h2>Why Businesses Choose Zexton</h2>
          <p>
            We combine high-performance web hosting with expert software engineering to give businesses a dependable digital foundation.
          </p>
        </div>

        <div className="why-zexton-grid">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="why-card">
                <div className="why-icon-wrapper">
                  <Icon size={22} />
                </div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
