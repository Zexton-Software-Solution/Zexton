import { motion } from 'framer-motion';
import { ArrowRight, Check, Gauge, Search, Smartphone } from 'lucide-react';
import { lowestPrice, productPages } from '../productPagesData';
import { money, useRegion } from '../region';
import './Hero.css';

const ease = [0.21, 0.6, 0.35, 1];
const rise = (delay) => ({ initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease, delay } });

const chips = [
  { icon: Smartphone, label: 'Mobile-first design', className: 'home-hero-chip--a', delay: 0.9 },
  { icon: Gauge, label: 'Built for speed', className: 'home-hero-chip--b', delay: 1.05 },
  { icon: Search, label: 'SEO-ready from day one', className: 'home-hero-chip--c', delay: 1.2 },
];

export default function Hero() {
  const region = useRegion();
  const design = productPages['product:website-design'];

  return (
    <section className="home-hero panel panel--dark">
      <div className="wrap home-hero__grid">
        <div className="home-hero__copy">
          <motion.p className="home-hero__eyebrow" {...rise(0)}>
            <span /> Website design &amp; development company
          </motion.p>
          <motion.h1 {...rise(0.08)}>Websites that win customers — designed, built and hosted by one team.</motion.h1>
          <motion.p className="home-hero__lead" {...rise(0.16)}>
            Zexton designs and develops fast, mobile-first business websites, online stores and web applications — then keeps them secure and online with our own hosting and 24/7 support.
          </motion.p>
          <motion.div className="home-hero__actions" {...rise(0.24)}>
            <a className="btn btn--light btn--lg" href="/contact?service=websites">Start your website <ArrowRight size={16} /></a>
            <a className="btn btn--ghost-dark btn--lg" href={design.path}>See packages · from {money(lowestPrice(design), region)}</a>
          </motion.div>
          <motion.ul className="home-hero__proof" {...rise(0.32)}>
            <li><Check size={16} aria-hidden="true" /> You own the design, code &amp; domain</li>
            <li><Check size={16} aria-hidden="true" /> Free hosting for the first year</li>
            <li><Check size={16} aria-hidden="true" /> Launch in as little as 7–10 days</li>
          </motion.ul>
        </div>

        <div className="home-hero__visual" aria-hidden="true">
          <motion.div className="home-hero__img home-hero__img--main" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease, delay: 0.2 }}>
            <img className="img-cover" src="/images/team-collaboration.webp" alt="" width="1600" height="900" fetchPriority="high" />
          </motion.div>
          <motion.div className="home-hero__img home-hero__img--side" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease, delay: 0.45 }}>
            <img className="img-cover" src="/images/website-wireframe.webp" alt="" width="1600" height="1200" />
          </motion.div>
          {chips.map(({ icon: Icon, label, className, delay }) => (
            <motion.div key={label} className={`home-hero-chip ${className}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay }}>
              <span><Icon size={16} /></span>{label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
