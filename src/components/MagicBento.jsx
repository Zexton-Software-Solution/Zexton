import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import './MagicBento.css';

const items = [
  { label: 'PRODUCT', title: 'SaaS Product Strategy', description: 'Discovery, user flows, MVP scope, multi-tenant architecture, subscriptions, analytics, and a roadmap tied to product adoption.' },
  { label: 'WEB ENGINEERING', title: 'Full-Stack Development', description: 'Responsive React interfaces connected to secure Node.js, .NET, or Python APIs, databases, search, payments, and business integrations.' },
  { label: 'INTELLIGENCE', title: 'AI Automation', description: 'Retrieval, practical AI agents, document workflows, evaluations, approvals, observability, and integrations for measurable business tasks.' },
  { label: 'MOBILE', title: 'React Native Apps', description: 'Cross-platform Android products with native-quality interfaces, secure APIs, offline data, notifications, payments, and store delivery.' },
  { label: 'PLATFORM', title: 'Cloud & DevOps', description: 'AWS infrastructure, containers, CI/CD, monitoring, backups, performance engineering, security controls, and cost-conscious scaling.' },
  { label: 'DISCOVERABILITY', title: 'Technical SEO & Analytics', description: 'Crawlable architecture, structured content, metadata, schema, Core Web Vitals, analytics, and conversion measurement built into delivery.' },
];

function BentoCard({ item, index, disabled, glowColor }) {
  const ref = useRef(null);
  const [ripples, setRipples] = useState([]);
  const move = (event) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    ref.current.style.setProperty('--mx', `${x}px`);
    ref.current.style.setProperty('--my', `${y}px`);
    gsap.to(ref.current, { rotateX: -((y / rect.height) - .5) * 7, rotateY: ((x / rect.width) - .5) * 7, x: ((x / rect.width) - .5) * 5, y: ((y / rect.height) - .5) * 5, duration: .2, ease: 'power2.out' });
  };
  const leave = () => { if (ref.current) gsap.to(ref.current, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: .35, ease: 'power2.out' }); };
  const click = (event) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const ripple = { id: Date.now(), x: event.clientX - rect.left, y: event.clientY - rect.top };
    setRipples((current) => [...current, ripple]);
    window.setTimeout(() => setRipples((current) => current.filter((entry) => entry.id !== ripple.id)), 750);
  };
  return (
    <article ref={ref} className={`magic-bento-card magic-bento-card--${index + 1}`} onMouseMove={move} onMouseLeave={leave} onClick={click} style={{ '--magic-glow': glowColor }}>
      <div className="magic-bento-card__stars" aria-hidden="true">{Array.from({ length: 8 }, (_, star) => <i key={star} style={{ '--star': star }} />)}</div>
      {ripples.map((ripple) => <span key={ripple.id} className="magic-bento-ripple" style={{ left: ripple.x, top: ripple.y }} />)}
      <span className="magic-bento-card__label">{item.label}</span>
      <div><h3>{item.title}</h3><p>{item.description}</p><a href="/capabilities">Explore capability <ArrowUpRight size={16} /></a></div>
    </article>
  );
}

export default function MagicBento({ glowColor = '34, 92, 255' }) {
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px), (prefers-reduced-motion: reduce)');
    const update = () => setDisabled(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return <div className="magic-bento-grid">{items.map((item, index) => <BentoCard key={item.title} item={item} index={index} disabled={disabled} glowColor={glowColor} />)}</div>;
}
