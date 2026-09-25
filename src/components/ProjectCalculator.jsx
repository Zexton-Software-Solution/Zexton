import { useMemo, useState } from 'react';
import './ProjectCalculator.css';

const bases = { landing: 299, business: 999, ecommerce: 2499, webapp: 4999, saas: 8999 };

export default function ProjectCalculator({ onOpenContact }) {
  const [type, setType] = useState('business');
  const [pages, setPages] = useState(6);
  const [features, setFeatures] = useState({ cms: true, commerce: false, auth: false, ai: false, urgent: false });

  const estimate = useMemo(() => {
    let value = bases[type] + Math.max(0, pages - 3) * 75;
    if (features.cms) value += 300;
    if (features.commerce) value += 1200;
    if (features.auth) value += 900;
    if (features.ai) value += 1500;
    if (features.urgent) value *= 1.25;
    return value;
  }, [features, pages, type]);

  const format = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  const toggle = (key) => setFeatures((current) => ({ ...current, [key]: !current[key] }));

  return (
    <section className="project-calculator" id="project-calculator">
      <div>
        <span className="eyebrow">PROJECT COST CALCULATOR</span>
        <h2>Plan a realistic starting budget.</h2>
        <p>Choose the project type, approximate size, and important features to get an instant indicative estimate in US dollars.</p>
      </div>
      <div className="calculator-panel">
        <label>Project type
          <select value={type} onChange={(event) => setType(event.target.value)}>
            <option value="landing">Landing or local business website</option>
            <option value="business">Business growth website</option>
            <option value="ecommerce">E-commerce website</option>
            <option value="webapp">Custom web application</option>
            <option value="saas">SaaS platform</option>
          </select>
        </label>
        <label>Approximate screens or pages
          <input type="range" min="1" max="30" value={pages} onChange={(event) => setPages(Number(event.target.value))} />
          <strong>{pages}</strong>
        </label>
        <div className="calculator-options" aria-label="Optional project features">
          {[['cms', 'CMS'], ['commerce', 'Payments & Checkout'], ['auth', 'User Accounts / Login'], ['ai', 'AI Workflows'], ['urgent', 'Priority delivery']].map(([key, label]) => (
            <button type="button" aria-pressed={features[key]} className={features[key] ? 'active' : ''} key={key} onClick={() => toggle(key)}>{label}</button>
          ))}
        </div>
        <div className="calculator-result">
          <div>
            <span>Indicative planning range</span>
            <strong>{format(estimate * 0.85)} – {format(estimate * 1.2)}</strong>
          </div>
        </div>
        <p className="calculator-disclaimer">Planning estimate only in USD ($). A written proposal confirms final scope, timeline, and exact deliverables.</p>
        <button className="btn-primary" onClick={onOpenContact}>Request a scoped estimate</button>
      </div>
    </section>
  );
}
