import { extraServiceLinks, productGroups, productsInGroup } from '../productPagesData';
import { legalPages } from '../legalPagesData';
import { routeMetadata } from '../siteMetadata';
import './Footer.css';

const columns = [
  ...productGroups.map((group) => ({
    title: group.label,
    links: productsInGroup(group.id).map((page) => [page.path, page.breadcrumbLabel]),
  })),
  { title: 'Services', links: extraServiceLinks.map(([route, label]) => [routeMetadata[route].path, label]) },
  {
    title: 'Company',
    links: [['/support', 'Help Center'], ['/contact', 'Contact'], ['/about', 'About'], ['/work', 'Our work'], ['/insights', 'Guides'], ['/careers', 'Careers'], ...productsInGroup('partners').map((page) => [page.path, page.breadcrumbLabel])],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <a href="/" aria-label="Zexton home"><img src="/zexton-logo.webp" alt="Zexton IT Solutions" width="120" height="56" /></a>
            <p>Domains, hosting, servers, email and websites for growing businesses.</p>
            <a href="mailto:info@zexton.com">info@zexton.com</a>
            <p>Serving businesses across the United States.</p>
          </div>
          <nav className="site-footer__nav" aria-label="Footer">
            {columns.map((column) => (
              <div key={column.title}>
                <h2>{column.title}</h2>
                <ul>{column.links.map(([href, label]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Zexton. Prices in USD. Taxes applicable at checkout.</span>
          <nav aria-label="Legal">{Object.values(legalPages).map((page) => <a key={page.path} href={page.path}>{page.breadcrumbLabel}</a>)}</nav>
        </div>
      </div>
    </footer>
  );
}
