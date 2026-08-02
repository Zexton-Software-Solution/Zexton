import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function AgenticCallout() {
  return (
    <section className="callout">
      <div className="container">
        <motion.div className="callout__inner" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65 }}>
          <span className="eyebrow eyebrow--light">FROM REQUIREMENTS TO RELEASE</span>
          <h2>Turn a useful software idea into a reliable product.</h2>
          <p>Bring us the business problem, users, and constraints. We will help shape the scope, architecture, delivery plan, and smallest sensible first release—without adding technology you do not need.</p>
          <a className="btn-light" href="/contact">Discuss Your Project <ArrowUpRight size={18} /></a>
        </motion.div>
      </div>
    </section>
  );
}

