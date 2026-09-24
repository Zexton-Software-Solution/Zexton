import { ArrowRight } from 'lucide-react';
import { routeMetadata } from '../siteMetadata';
import './RelatedRoutes.css';

export default function RelatedRoutes({ routes = [] }) {
  const items = routes.map((routeKey) => routeMetadata[routeKey]).filter(Boolean);
  if (!items.length) return null;

  return (
    <nav className="section related-routes" aria-labelledby="related-routes-title">
      <div className="wrap">
        <h2 id="related-routes-title">Related</h2>
        <div className="related-routes__grid">
          {items.map((item) => (
            <a href={item.path} key={item.path}>
              <strong>{item.breadcrumbLabel || item.heading} <ArrowRight size={15} aria-hidden="true" /></strong>
              <p>{item.summary}</p>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
