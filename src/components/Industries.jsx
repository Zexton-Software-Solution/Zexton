import { Landmark, HeartPulse, ShoppingBag, Building2, Cpu, Truck, GraduationCap } from 'lucide-react';

const industries = [
  { name: 'FinTech', icon: Landmark },
  { name: 'Healthcare', icon: HeartPulse },
  { name: 'Commerce', icon: ShoppingBag },
  { name: 'Enterprise', icon: Building2 },
  { name: 'AI & Data', icon: Cpu },
  { name: 'Logistics', icon: Truck },
  { name: 'EdTech', icon: GraduationCap },
];

function IndustryLogo({ industry }) {
  const Icon = industry.icon;
  return <div className="industry-logo"><Icon size={24} strokeWidth={1.6} /><span>{industry.name}</span></div>;
}

export default function Industries() {
  return (
    <section id="industries" className="logo-section logo-section--industries">
      <h2 className="logo-section__title">INDUSTRIES WE BUILD FOR</h2>
      <div className="marquee marquee--reverse" role="region" aria-label="Industries we serve">
        <div className="marquee__track">
          <div className="marquee__group">{industries.map((industry) => <IndustryLogo key={industry.name} industry={industry} />)}</div>
          <div className="marquee__group" aria-hidden="true">{industries.map((industry) => <IndustryLogo key={`copy-${industry.name}`} industry={industry} />)}</div>
        </div>
      </div>
    </section>
  );
}
