import { ArrowUpRight, Mail, MapPin, ShieldCheck, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="/" className="footer__logo" aria-label="Zexton home">
              <img src="/ZextonLogo.png" alt="Zexton" />
            </a>
            <p>
              High-speed web hosting, cloud infrastructure, custom website design, SaaS platforms, and enterprise software solutions.
            </p>
            <a href="mailto:info@zexton.com" className="footer__contact">
              <Mail size={15} /> info@zexton.com
            </a>
            <span className="footer__location">
              <MapPin size={15} /> Hyderabad, India · Serving Clients Globally
            </span>
            <div className="footer__badges" style={{ display: 'flex', gap: '16px', marginTop: '16px', color: '#94a3b8', fontSize: '12px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Zap size={14} color="#225cff" /> 99.9% Uptime</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><ShieldCheck size={14} color="#22c55e" /> Free SSL &amp; Security</span>
            </div>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div>
              <h3>Hosting &amp; Cloud</h3>
              <a href="/#hosting">Web Hosting</a>
              <a href="/#hosting">Cloud VPS Servers</a>
              <a href="/#hosting">WordPress Hosting</a>
              <a href="/contact?service=business-email">Business Email</a>
              <a href="/contact?service=domain-hosting">Domain Names</a>
              <a href="/pricing">Hosting Pricing</a>
            </div>

            <div>
              <h3>Services</h3>
              <a href="/services/web-application-development">Website Design</a>
              <a href="/services/custom-software-development">Custom Software</a>
              <a href="/services/saas-development">SaaS Platforms</a>
              <a href="/services/mobile-app-development">Mobile Apps (iOS/Android)</a>
              <a href="/services/ai-automation">AI Automation</a>
              <a href="/services/cloud-devops-modernization">Cloud Modernization</a>
            </div>

            <div>
              <h3>Company</h3>
              <a href="/company">Company Overview</a>
              <a href="/about">About Zexton</a>
              <a href="/work">Portfolio &amp; Work</a>
              <a href="/who-we-are">Who We Are</a>
              <a href="/careers">Careers</a>
            </div>

            <div>
              <h3>Explore</h3>
              <a href="/pricing">Pricing &amp; Calculator</a>
              <a href="/resources">Planning Resources</a>
              <a href="/insights">Engineering Insights</a>
              <a href="/contact">Contact Our Team</a>
              <a className="footer__conversation" href="/contact">
                Start a conversation <ArrowUpRight size={16} />
              </a>
            </div>
          </nav>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Zexton. All rights reserved.</span>
          <a href="/contact">Deploy website or software</a>
        </div>
      </div>
    </footer>
  );
}
