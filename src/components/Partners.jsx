import { motion } from 'framer-motion';

const disciplines = [
  { name: 'Product Strategy', mark: 'PS' },
  { name: 'UX & UI Design', mark: 'UX' },
  { name: 'Web Engineering', mark: 'WEB' },
  { name: 'Mobile Products', mark: 'RN' },
  { name: 'Cloud Platforms', mark: 'AWS' },
  { name: 'AI Automation', mark: 'AI' },
];

function DisciplineMark({ item, hidden = false }) {
  return <div className="logo-mark" aria-hidden={hidden || undefined}><span className="logo-mark__symbol">{item.mark}</span><span className="logo-mark__name">{item.name}</span></div>;
}

export default function Partners() {
  return (
    <section className="logo-section" aria-labelledby="delivery-title">
      <motion.h2 id="delivery-title" className="logo-section__title" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        ONE TEAM ACROSS THE PRODUCT LIFECYCLE
      </motion.h2>
      <div className="marquee" role="region" aria-label="Zexton product engineering disciplines">
        <div className="marquee__track">
          <div className="marquee__group">{disciplines.map((item) => <DisciplineMark key={item.name} item={item} />)}</div>
          <div className="marquee__group" aria-hidden="true">{disciplines.map((item) => <DisciplineMark key={`copy-${item.name}`} item={item} hidden />)}</div>
        </div>
      </div>
    </section>
  );
}
