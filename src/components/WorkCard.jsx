import { ArrowUpRight } from 'lucide-react';
import { industries } from '../workData';
import './WorkCard.css';

const industryName = Object.fromEntries(industries.map((item) => [item.id, item.name]));

export default function WorkCard({ site }) {
  return (
    <a className="work-card" href={site.url} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} — visit live website (opens in a new tab)`}>
      <div className="work-card__logo">
        {site.logo
          ? <img src={site.logo} alt={`${site.name} logo`} loading="lazy" />
          : <span className="work-card__wordmark">{site.name}</span>}
        <span className="work-card__live"><i /> Live</span>
      </div>
      <div className="work-card__body">
        <strong>{site.name}</strong>
        <span>{[site.location, industryName[site.industry]].filter(Boolean).join(' · ')}</span>
        <em>{site.domain} <ArrowUpRight size={14} aria-hidden="true" /></em>
      </div>
    </a>
  );
}
