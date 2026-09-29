import { industries } from '../workData';
import './WorkCard.css';

const industryName = Object.fromEntries(industries.map((item) => [item.id, item.name]));

export default function WorkCard({ site }) {
  return (
    <div className="work-card">
      <div className="work-card__logo">
        {site.logo
          ? <img src={site.logo} alt={`${site.name} logo`} loading="lazy" />
          : <span className="work-card__wordmark">{site.name}</span>}
        <span className="work-card__live"><i /> Live</span>
      </div>
      <div className="work-card__body">
        <strong>{site.name}</strong>
        <span>{[site.location, industryName[site.industry]].filter(Boolean).join(' · ')}</span>
      </div>
    </div>
  );
}
