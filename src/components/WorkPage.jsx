import { useMemo, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { industries, portfolioSites, WORK_VERIFIED } from '../workData';
import Reveal from './Reveal';
import WorkCard from './WorkCard';
import './WorkPage.css';

const counts = portfolioSites.reduce((total, site) => ({ ...total, [site.industry]: (total[site.industry] || 0) + 1 }), { all: portfolioSites.length });
const locations = new Set(portfolioSites.map((site) => site.location.split(', ')[1]).filter((state) => /^[A-Z]{2}$/.test(state)));

export default function WorkPage() {
  const [industry, setIndustry] = useState('all');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return portfolioSites.filter((site) => (industry === 'all' || site.industry === industry)
      && (!term || `${site.name} ${site.location} ${site.domain}`.toLowerCase().includes(term)))
      .sort((a, b) => Number(Boolean(b.logo)) - Number(Boolean(a.logo)));
  }, [industry, query]);

  return (
    <div className="work-v2">
      <header className="work-v2__hero">
        <div className="wrap">
          <Reveal>
            <span className="kicker">Our work</span>
            <h1>{portfolioSites.length} live websites we’ve built for real businesses.</h1>
            <p className="lead">Inns, B&amp;Bs, restaurants, wineries, campgrounds, wedding venues and local businesses — every site below is designed, built and hosted for our clients.</p>
          </Reveal>
          <Reveal className="work-v2__stats" delay={0.1}>
            <div><strong className="num">{portfolioSites.length}</strong><span>Live client websites</span></div>
            <div><strong className="num">{locations.size}+</strong><span>US states</span></div>
            <div><strong className="num">{industries.length - 1}</strong><span>Industries</span></div>
          </Reveal>
        </div>
      </header>

      <section className="section work-v2__list">
        <div className="wrap">
          <div className="work-v2__controls">
            <div className="tabs" role="tablist" aria-label="Filter by industry">
              {industries.map((item) => (
                <button key={item.id} type="button" role="tab" aria-selected={industry === item.id} className={industry === item.id ? 'is-active' : ''} onClick={() => setIndustry(item.id)}>
                  {item.name} <span className="num">{counts[item.id] || 0}</span>
                </button>
              ))}
            </div>
            <label className="work-v2__search">
              <Search size={16} aria-hidden="true" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name or place" aria-label="Search our work" />
            </label>
          </div>

          <div className="work-v2__grid">
            {visible.map((site) => <WorkCard key={site.slug} site={site} />)}
          </div>
          {!visible.length && <p className="work-v2__empty">No projects match “{query}”.</p>}
          <p className="work-v2__note">All sites verified live on {new Date(WORK_VERIFIED).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}. Logos belong to their respective owners.</p>
        </div>
      </section>

      <section className="closing panel panel--dark">
        <Reveal className="wrap closing__inner">
          <h2 className="h2">Your website could be next.</h2>
          <p>Tell us about your business and we’ll send ideas, a timeline and a fixed quote within one working day.</p>
          <div>
            <a className="btn btn--light btn--lg" href="/contact?service=websites">Start your project <ArrowRight size={16} /></a>
            <a className="btn btn--ghost-dark btn--lg" href="/websites/website-design">View packages</a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
