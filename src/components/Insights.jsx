import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { insightArticles } from '../insightsData';
import TechStackExplorer from './TechStackExplorer';

const themes = ['blue', 'dark', 'violet', 'orange', 'cyan', 'pink', 'green', 'indigo', 'red'];

export default function Insights() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? insightArticles : insightArticles.slice(0, 6);

  return (
    <section id="insights" className="insights">
      <TechStackExplorer />
      <div className="insights__content container">
        <div className="section-heading">
          <div><span className="eyebrow">SOFTWARE ENGINEERING INSIGHTS</span><h2>Practical ideas for building better.</h2></div>
          <p>Clear perspectives on custom software, SaaS architecture, React Native, cloud platforms, product delivery, and responsible AI automation.</p>
        </div>
        <div className="insights__grid">
          {visible.map((article, index) => (
            <motion.a
              href={article.path}
              className={`insight insight--${themes[index]}`}
              key={article.slug}
              aria-label={`Read ${article.title}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .45, delay: (index % 3) * .08 }}
            >
              <span className="insight__category">{article.category.toUpperCase()}</span>
              <div>
                <h3>{article.title}</h3>
                <span className="insight__action">Read insight <ArrowUpRight size={18} /></span>
              </div>
            </motion.a>
          ))}
        </div>
        {!showAll && <button type="button" className="load-more" onClick={() => setShowAll(true)}>Load more <span>+</span></button>}
      </div>
    </section>
  );
}
