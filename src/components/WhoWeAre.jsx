import ProfileCard from './ProfileCard';
import Seo from './Seo';
import { routeMetadata } from '../siteMetadata';
import './SitePages.css';

const avatar = (initials, color) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="${color}"/><stop offset="1" stop-color="#0c1220"/></linearGradient></defs><rect width="600" height="800" fill="url(#g)"/><circle cx="300" cy="310" r="135" fill="rgba(255,255,255,.16)"/><path d="M90 800c25-205 140-300 210-300s185 95 210 300" fill="rgba(255,255,255,.16)"/><text x="300" y="335" text-anchor="middle" fill="white" font-family="Arial" font-weight="700" font-size="96">${initials}</text></svg>`)}`;
const team = [
  { name: 'Founding Team', title: 'Product Strategy & Delivery', handle: 'founding-team', avatarUrl: avatar('FT', '#225cff') },
  { name: 'Engineering Lead', title: 'Full-Stack, Mobile & Cloud', handle: 'engineering', avatarUrl: avatar('EL', '#653ac7') },
  { name: 'AI Systems Lead', title: 'AI Automation & Data', handle: 'ai-systems', avatarUrl: avatar('AI', '#d94382') },
];

export default function WhoWeAre({ onOpenContact }) {
  return (
    <main className="site-page">
      <Seo {...routeMetadata['who-we-are']} type={routeMetadata['who-we-are'].schemaType} items={routeMetadata['who-we-are'].schemaItems} />
      <header className="site-page__hero"><span className="eyebrow">WHO WE ARE</span><h1>Small senior teams.<br />Serious product outcomes.</h1><p>Zexton connects product thinking, interface design, software engineering, mobile delivery, cloud operations, and applied AI through clear ownership and visible milestones.</p></header>
      <section className="team-section"><div className="site-page__heading"><h2>Team roles</h2><p>Names and portraits are intentionally marked as placeholders until verified team profiles are supplied. No fictional people are presented as employees.</p></div><div className="team-grid">{team.map((person) => <ProfileCard key={person.handle} {...person} contactText="Work with us" onContactClick={onOpenContact} />)}</div></section>
      <section className="site-page__split"><h2>How we work</h2><div><p><strong>Senior attention from discovery to launch.</strong> We reduce handoffs, write down important decisions, test critical workflows, and ship in measurable milestones.</p><p>Every engagement has clear ownership, regular visibility, practical documentation, source-code handover, and an agreed support plan after launch.</p><a href="/contact" className="btn-primary">Discuss your project</a></div></section>
    </main>
  );
}
