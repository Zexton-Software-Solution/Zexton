import { useState } from 'react';
import { ArrowRight, Cpu, Headphones, Lock, Mail, Search, Server, ShieldCheck, Zap } from 'lucide-react';
import { domainSearchUrl, inr, lowestPrice, productPages, tlds } from '../productPagesData';
import './Hero.css';

const badges = [
  { icon: Zap, label: '99.9% uptime guarantee' },
  { icon: ShieldCheck, label: 'Free SSL & migration' },
  { icon: Headphones, label: '24/7 expert support' },
];

const quick = [
  [Server, 'Web Hosting', 'product:web-hosting', '/mo'],
  [Cpu, 'Cloud VPS', 'product:vps-hosting', '/mo'],
  [Mail, 'Business Email', 'product:business-email', '/mo'],
  [Lock, 'SSL Certificate', 'product:ssl-certificates', '/yr'],
].map(([icon, label, route, unit]) => ({ icon, label, unit, price: lowestPrice(productPages[route]), href: productPages[route].path }));

export default function Hero() {
  const [query, setQuery] = useState('');

  const submit = (event) => {
    event.preventDefault();
    window.location.href = domainSearchUrl(query);
  };

  return (
    <section className="zx-hero">
      <div className="zx-hero__inner">
        <div className="zx-hero__copy">
          <span className="zx-hero__pill"><span /> DOMAINS · HOSTING · SERVERS · EMAIL · WEBSITES</span>
          <h1>Build your digital future <em>with Zexton</em></h1>
          <p>Domains, hosting, cloud servers, business email, websites and IT solutions — everything your business needs to get online and grow, in one place.</p>

          <form className="zx-hero__search" onSubmit={submit} role="search">
            <Search size={20} aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find your perfect domain, e.g. yourbusiness.com" aria-label="Search for a domain name" />
            <button type="submit">Search Domain</button>
          </form>

          <ul className="zx-hero__tlds">
            {tlds.slice(0, 6).map((tld) => <li key={tld.ext}><strong>{tld.ext}</strong> {inr(tld.price)}</li>)}
          </ul>

          <ul className="zx-hero__badges">
            {badges.map(({ icon: Icon, label }) => <li key={label}><Icon size={16} />{label}</li>)}
          </ul>
        </div>

        <aside className="zx-hero__panel" aria-label="Popular products">
          <span className="zx-hero__panel-label">POPULAR RIGHT NOW</span>
          {quick.map(({ icon: Icon, label, price, unit, href }) => (
            <a key={label} href={href}>
              <span className="zx-hero__panel-icon"><Icon size={20} /></span>
              <span className="zx-hero__panel-name">{label}<small>Starting at</small></span>
              <span className="zx-hero__panel-price">{inr(price)}<small>{unit}</small></span>
              <ArrowRight size={16} />
            </a>
          ))}
          <a className="zx-hero__panel-cta" href="/websites/website-design">Need a website built for you? <strong>See design packages →</strong></a>
        </aside>
      </div>
    </section>
  );
}
