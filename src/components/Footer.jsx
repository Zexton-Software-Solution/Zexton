import { Headphones, Mail, MapPin, ShieldCheck, Zap } from 'lucide-react';
import { extraServiceLinks, productGroups, productsInGroup } from '../productPagesData';
import { routeMetadata } from '../siteMetadata';

const columns = [
  ...productGroups.map((group) => ({
    title: group.label,
    links: productsInGroup(group.id).map((page) => [page.path, page.breadcrumbLabel]),
  })),
  { title: 'Services', links: extraServiceLinks.map(([route, label]) => [routeMetadata[route].path, label]) },
  {
    title: 'Company & Support',
    links: [['/support', 'Help Center'], ['/contact', 'Contact Us'], ['/about', 'About Zexton'], ['/work', 'Our Work'], ['/pricing', 'Project Pricing'], ['/insights', 'Insights & Guides'], ['/careers', 'Careers']],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top footer__top--wide">
          <div className="footer__brand">
            <a href="/" className="footer__logo" aria-label="Zexton home">
              <img src="/ZextonLogo.png" alt="Zexton" />
            </a>
            <p>Domains, hosting, cloud servers, business email, websites and IT solutions — everything your business needs online, in one place.</p>
            <a href="mailto:info@zexton.com" className="footer__contact"><Mail size={15} /> info@zexton.com</a>
            <span className="footer__location"><MapPin size={15} /> Hyderabad, India · Serving clients globally</span>
            <div className="footer__badges">
              <span><Zap size={14} /> 99.9% Uptime</span>
              <span><ShieldCheck size={14} /> Free SSL</span>
              <span><Headphones size={14} /> 24/7 Support</span>
            </div>
          </div>

          <nav className="footer__nav footer__nav--wide" aria-label="Footer navigation">
            {columns.map((column) => (
              <div key={column.title}>
                <h3>{column.title}</h3>
                {column.links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
              </div>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Zexton IT Solutions. All rights reserved. Prices exclude GST.</span>
          <a href="/contact">Talk to sales</a>
        </div>
      </div>
    </footer>
  );
}
