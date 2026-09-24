import { useState } from 'react';
import { Search, Globe, ShieldCheck, Zap, Headphones, CheckCircle2, ArrowRight } from 'lucide-react';
import { domainSearchUrl, inr, tlds } from '../productPagesData';
import './DomainSearchBanner.css';

export default function DomainSearchBanner() {
  const [domainInput, setDomainInput] = useState('');
  const [selectedTld, setSelectedTld] = useState('.com');

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = domainSearchUrl(domainInput, selectedTld);
  };

  return (
    <section className="domain-banner-section">
      <div className="container">
        <div className="domain-banner-card">
          <div className="domain-banner-header">
            <span className="domain-banner-badge">
              <Globe size={15} /> DOMAIN REGISTRATION &amp; CLOUD HOSTING
            </span>
            <h2>Find Your Perfect Domain &amp; Launch Today</h2>
            <p>
              Register your business identity with instant DNS setup, free WHOIS privacy, and 1-click connection to our high-speed cloud hosting.
            </p>
          </div>

          <form className="domain-search-bar" onSubmit={handleSearch}>
            <div className="domain-search-input-wrapper">
              <Search className="domain-search-icon" size={20} />
              <input
                type="text"
                className="domain-search-input"
                placeholder="Enter your business name or domain (e.g. yourbrand)"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                aria-label="Domain search"
              />
              <span className="domain-search-ext-preview">{selectedTld}</span>
            </div>

            <button type="submit" className="domain-search-btn">
              <span>Check Availability</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="domain-tld-list">
            {tlds.slice(0, 6).map((item) => (
              <button
                key={item.ext}
                type="button"
                className={`domain-tld-pill ${selectedTld === item.ext ? 'is-active' : ''}`}
                onClick={() => setSelectedTld(item.ext)}
              >
                <span className="domain-tld-ext">{item.ext}</span>
                <span className="domain-tld-price">{inr(item.price)}/yr</span>
                {item.tag && <span className="domain-tld-tag">{item.tag}</span>}
              </button>
            ))}
          </div>

          <div className="domain-trust-row">
            <div className="domain-trust-item">
              <Zap size={17} className="domain-trust-icon" />
              <span>99.9% Uptime Guarantee</span>
            </div>
            <div className="domain-trust-item">
              <ShieldCheck size={17} className="domain-trust-icon" />
              <span>Free Lifetime SSL &amp; DDoS Shield</span>
            </div>
            <div className="domain-trust-item">
              <Headphones size={17} className="domain-trust-icon" />
              <span>24/7 Expert Technical Support</span>
            </div>
            <div className="domain-trust-item">
              <CheckCircle2 size={17} className="domain-trust-icon" />
              <span>Free 1-Click Migration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
