import { ArrowRight } from 'lucide-react';
import { insightArticles } from '../insightsData';

export default function HomeGuides() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <div><span className="kicker">Guides</span><h2 className="h2">Learn from our engineers</h2></div>
          <a className="text-link" href="/insights">All articles <ArrowRight size={15} /></a>
        </div>
        <ul className="link-rows">
          {insightArticles.slice(0, 4).map((article) => (
            <li key={article.slug}>
              <a href={article.path}>
                <span><strong>{article.title}</strong><small>{article.category} · {article.excerpt}</small></span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
