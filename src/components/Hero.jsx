import { ArrowRight, Check } from 'lucide-react';
import { lowestPrice, productPages } from '../productPagesData';
import { money, useRegion } from '../region';
import DomainSearch from './DomainSearch';
import './Hero.css';

const startingPrices = [
  ['Web hosting', 'product:web-hosting', '/mo'],
  ['WordPress hosting', 'product:wordpress-hosting', '/mo'],
  ['Cloud VPS', 'product:vps-hosting', '/mo'],
  ['Business email', 'product:business-email', '/mo'],
  ['SSL certificate', 'product:ssl-certificates', '/yr'],
  ['Website design', 'product:website-design', ' one-time'],
].map(([label, route, unit]) => ({ label, unit, price: lowestPrice(productPages[route]), href: productPages[route].path }));

export default function Hero() {
  const region = useRegion();
  return (
    <section className="hero-v2">
      <div className="wrap hero-v2__grid">
        <div>
          <p className="hero-v2__eyebrow">Domains · Hosting · Servers · Email · Websites</p>
          <h1>Everything your business needs to get online.</h1>
          <p className="hero-v2__lead">Register a domain, host your website, run cloud servers and professional email — with engineers on call 24/7 when you need help.</p>
          <DomainSearch />
          <ul className="hero-v2__proof">
            <li><Check size={16} aria-hidden="true" /> 99.9% uptime SLA</li>
            <li><Check size={16} aria-hidden="true" /> Free SSL &amp; migration</li>
            <li><Check size={16} aria-hidden="true" /> 30-day money-back</li>
          </ul>
        </div>

        <aside className="hero-v2__prices" aria-labelledby="starting-prices">
          <div className="hero-v2__prices-head"><span id="starting-prices">Starting prices</span><span>{region.currency}</span></div>
          <ul>
            {startingPrices.map(({ label, unit, price, href }) => (
              <li key={label}>
                <a href={href}>
                  <span>{label}</span>
                  <span className="num"><strong>{money(price, region)}</strong>{unit}</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p>{region.tax}</p>
        </aside>
      </div>
    </section>
  );
}
