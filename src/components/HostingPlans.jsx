import { useState } from 'react';
import { Check, ShieldCheck, Zap, Server, Globe, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { hostingCategories, hostingAddons } from '../hostingData';
import './HostingPlans.css';

const categoryIcons = {
  shared: Globe,
  vps: Server,
  email: Mail,
  wordpress: Zap,
};

export default function HostingPlans({ onOpenContact }) {
  const [activeCategory, setActiveCategory] = useState('shared');
  const [billingCycle, setBillingCycle] = useState('yearly'); // 'monthly' | 'yearly'
  const [currency, setCurrency] = useState('INR'); // 'INR' | 'USD' | 'EUR'

  const currentCategory = hostingCategories.find((c) => c.id === activeCategory) || hostingCategories[0];

  const formatPrice = (plan) => {
    if (currency === 'USD') {
      const p = billingCycle === 'yearly' ? (plan.priceUSD * 0.85).toFixed(2) : plan.priceUSD.toFixed(2);
      return `$${p}`;
    }
    if (currency === 'EUR') {
      const p = billingCycle === 'yearly' ? (plan.priceEUR * 0.85).toFixed(2) : plan.priceEUR.toFixed(2);
      return `€${p}`;
    }
    const p = billingCycle === 'yearly' ? plan.priceYearlyINR : plan.priceMonthlyINR;
    return `₹${p}`;
  };

  const handleSelectPlan = (planName) => {
    const query = encodeURIComponent(`${currentCategory.name} - ${planName} (${billingCycle})`);
    if (onOpenContact) {
      window.location.href = `/contact?service=hosting&plan=${query}`;
    } else {
      window.location.href = `/contact?service=hosting&plan=${query}`;
    }
  };

  return (
    <section id="hosting" className="hosting-section">
      <div className="container">
        <div className="hosting-header">
          <span className="eyebrow">HIGH-PERFORMANCE CLOUD &amp; HOSTING</span>
          <h2>Reliable Hosting Solutions Built For Speed &amp; Uptime</h2>
          <p>
            Whether launching your first website, scaling a cloud application, or hosting professional company email, Zexton delivers enterprise hardware with 99.9% uptime.
          </p>
        </div>

        {/* Currency & Billing Control Bar */}
        <div className="hosting-controls-bar">
          <div className="hosting-cat-tabs">
            {hostingCategories.map((cat) => {
              const Icon = categoryIcons[cat.id] || Server;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`hosting-cat-tab ${activeCategory === cat.id ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <Icon size={17} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          <div className="hosting-settings-right">
            <div className="billing-cycle-toggle">
              <button
                type="button"
                className={`billing-btn ${billingCycle === 'monthly' ? 'is-active' : ''}`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`billing-btn ${billingCycle === 'yearly' ? 'is-active' : ''}`}
                onClick={() => setBillingCycle('yearly')}
              >
                Yearly <span className="save-badge">Save 20%</span>
              </button>
            </div>

            <div className="currency-selector">
              <button
                type="button"
                className={`curr-btn ${currency === 'INR' ? 'is-active' : ''}`}
                onClick={() => setCurrency('INR')}
              >
                ₹ INR
              </button>
              <button
                type="button"
                className={`curr-btn ${currency === 'USD' ? 'is-active' : ''}`}
                onClick={() => setCurrency('USD')}
              >
                $ USD
              </button>
              <button
                type="button"
                className={`curr-btn ${currency === 'EUR' ? 'is-active' : ''}`}
                onClick={() => setCurrency('EUR')}
              >
                € EUR
              </button>
            </div>
          </div>
        </div>

        <div className="hosting-category-tagline">
          <span className="cat-badge">{currentCategory.badge}</span>
          <p>{currentCategory.tagline}</p>
        </div>

        {/* Plan Cards Grid */}
        <div className="hosting-plans-grid">
          {currentCategory.plans.map((plan) => (
            <div
              key={plan.id}
              className={`hosting-plan-card ${plan.popular ? 'is-popular' : ''}`}
            >
              {plan.popular && (
                <div className="popular-ribbon">
                  <Sparkles size={13} /> MOST POPULAR
                </div>
              )}

              <div className="plan-card-header">
                <span className="plan-tag">{plan.tag}</span>
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-pricing">
                  <span className="plan-price-val">{formatPrice(plan)}</span>
                  <span className="plan-price-period">/ month</span>
                </div>
                {billingCycle === 'yearly' && (
                  <span className="billed-annually-note">Billed annually</span>
                )}
              </div>

              <button
                type="button"
                className={`plan-select-btn ${plan.popular ? 'plan-select-btn--popular' : ''}`}
                onClick={() => handleSelectPlan(plan.name)}
              >
                <span>Choose Plan</span>
                <ArrowRight size={16} />
              </button>

              <div className="plan-features-divider" />

              <div className="plan-features-list">
                <span className="features-title">Included Features:</span>
                <ul>
                  {plan.features.map((feat) => (
                    <li key={feat}>
                      <Check className="check-icon" size={16} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Hosting Guarantees & Free Inclusions */}
        <div className="hosting-addons-strip">
          <div className="addons-title">
            <ShieldCheck size={20} className="shield-icon" />
            <span>Every Zexton Cloud Plan Includes:</span>
          </div>
          <div className="addons-grid">
            {hostingAddons.map((addon) => (
              <div key={addon.name} className="addon-item">
                <div className="addon-dot" />
                <div>
                  <strong>{addon.name}:</strong> <span>{addon.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
