import { useMemo, useState } from 'react';
import './ProjectCalculator.css';

const bases = { landing:10000, business:35000, ecommerce:100000, webapp:150000, saas:300000 };
const inrPerCurrencyUnit = { INR:1, USD:83, EUR:90 };
const locales = { INR:'en-IN', USD:'en-US', EUR:'de-DE' };
export default function ProjectCalculator({ onOpenContact }) {
  const [type, setType] = useState('business');
  const [pages, setPages] = useState(6);
  const [currency, setCurrency] = useState('INR');
  const [features, setFeatures] = useState({ cms:true, commerce:false, auth:false, ai:false, urgent:false });
  const estimate = useMemo(() => {
    let value = bases[type] + Math.max(0, pages - 3) * 2500;
    if (features.cms) value += 15000;
    if (features.commerce) value += 65000;
    if (features.auth) value += 50000;
    if (features.ai) value += 90000;
    if (features.urgent) value *= 1.25;
    return value;
  }, [features, pages, type]);
  const format = (value) => new Intl.NumberFormat(locales[currency], { style:'currency', currency, maximumFractionDigits:0 }).format(value / inrPerCurrencyUnit[currency]);
  const toggle = (key) => setFeatures((current) => ({ ...current, [key]:!current[key] }));

  return (
    <section className="project-calculator" id="project-calculator">
      <div><span className="eyebrow">WEBSITE DEVELOPMENT CALCULATOR</span><h2>Plan a realistic starting budget.</h2><p>Choose the project type, approximate size, and important features. The calculator updates instantly in Indian rupees, US dollars, or euros.</p></div>
      <div className="calculator-panel">
        <label>Project type<select value={type} onChange={(event) => setType(event.target.value)}><option value="landing">Landing or local business website</option><option value="business">Business growth website</option><option value="ecommerce">E-commerce website</option><option value="webapp">Custom web application</option><option value="saas">SaaS platform</option></select></label>
        <label>Approximate screens or pages<input type="range" min="1" max="30" value={pages} onChange={(event) => setPages(Number(event.target.value))} /><strong>{pages}</strong></label>
        <div className="calculator-options" aria-label="Optional project features">{[['cms','CMS'],['commerce','Payments'],['auth','Accounts / login'],['ai','AI automation'],['urgent','Priority delivery']].map(([key, label]) => <button type="button" aria-pressed={features[key]} className={features[key] ? 'active' : ''} key={key} onClick={() => toggle(key)}>{label}</button>)}</div>
        <div className="calculator-result"><div><span>Indicative planning range</span><strong>{format(estimate * .85)} – {format(estimate * 1.2)}</strong></div><div className="currency-switch" aria-label="Estimate currency">{Object.keys(inrPerCurrencyUnit).map((code) => <button type="button" aria-pressed={currency === code} className={currency === code ? 'active' : ''} key={code} onClick={() => setCurrency(code)}>{code}</button>)}</div></div>
        <p className="calculator-disclaimer">Planning estimate only. USD and EUR use fixed display assumptions of ₹83/USD and ₹90/EUR; a proposal confirms the final scope, taxes, currency, and exchange rate.</p>
        <button className="btn-primary" onClick={onOpenContact}>Request a scoped estimate</button>
      </div>
    </section>
  );
}
