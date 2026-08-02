import { ArrowUpRight } from 'lucide-react';
import { routeMetadata } from '../siteMetadata';
import './RelatedRoutes.css';

export default function RelatedRoutes({ routes = [] }) {
  const items = routes.map((routeKey) => routeMetadata[routeKey]).filter(Boolean);
  if (!items.length) return null;

  return (
    <nav className="related-routes" aria-labelledby="related-routes-title">
      <div className="related-routes__heading">
        <span>EXPLORE ZEXTON</span>
        <h2 id="related-routes-title">Continue with a related software topic.</h2>
      </div>
      <div className="related-routes__grid">
        {items.map((item, index) => (
          <a href={item.path} key={item.path}>
            <span>{String(index + 1).padStart(2, '0')} / {item.eyebrow}</span>
            <h3>{item.breadcrumbLabel || item.heading}</h3>
            <p>{item.summary}</p>
            <strong>Explore page <ArrowUpRight aria-hidden="true" size={17} /></strong>
          </a>
        ))}
      </div>
    </nav>
  );
}
