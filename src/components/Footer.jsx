import { ArrowUpRight, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="/" className="footer__logo" aria-label="Zexton home"><img src="/ZextonLogo.png" alt="Zexton" /></a>
            <p>Custom software, SaaS, web, React Native, .NET, cloud, and AI engineering for businesses that need reliable digital products.</p>
            <a href="mailto:info@zexton.com" className="footer__contact"><Mail size={15} /> info@zexton.com</a>
            <span className="footer__location"><MapPin size={15} /> Hyderabad, India · Working worldwide</span>
          </div>
          <nav className="footer__nav" aria-label="Footer navigation">
            <div><h3>Company</h3><a href="/company">Company</a><a href="/about">About Us</a><a href="/work">Our Work</a><a href="/who-we-are">Who We Are</a><a href="/careers">Careers</a></div>
            <div><h3>Build</h3><a href="/services">All Services</a><a href="/services/custom-software-development">Custom Software</a><a href="/services/saas-development">SaaS Development</a><a href="/services/web-application-development">Web Applications</a><a href="/services/mobile-app-development">Mobile Apps</a><a href="/services/ai-automation">AI Automation</a><a href="/services/cloud-devops-modernization">Cloud & Modernization</a><a href="/capabilities">Capabilities</a><a href="/pricing">Pricing</a></div>
            <div><h3>Explore</h3><a href="/resources">Resources</a><a href="/insights">Insights</a><a href="/contact">Contact</a><a className="footer__conversation" href="/contact">Start a conversation <ArrowUpRight size={16} /></a></div>
          </nav>
        </div>
        <div className="footer__bottom"><span>© {new Date().getFullYear()} Zexton. All rights reserved.</span><a href="/contact">Plan a software project</a></div>
      </div>
    </footer>
  );
}
