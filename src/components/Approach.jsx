import { motion } from 'framer-motion';
import { Bot, Code2, CloudCog, ArrowUpRight } from 'lucide-react';
import MagicBento from './MagicBento';

const services = [
  {
    number: '01',
    title: 'SaaS Product Engineering',
    description: 'Validate the product, map critical workflows, and launch a secure multi-tenant SaaS platform with subscriptions, permissions, analytics, integrations, and cloud infrastructure ready for real users.',
    icon: CloudCog,
    className: 'service-visual--saas',
    visual: 'SAAS / CLOUD',
  },
  {
    number: '02',
    title: 'Custom Web & Mobile Development',
    description: 'Build responsive websites, business applications, portals, dashboards, and React Native mobile products connected to reliable Node.js, .NET, or Python backends.',
    icon: Code2,
    className: 'service-visual--stack',
    visual: 'WEB / MOBILE',
  },
  {
    number: '03',
    title: 'AI Automation & Agents',
    description: 'Apply AI where it creates measurable value: retrieval, document workflows, support assistants, operational automation, approvals, evaluations, monitoring, and secure tool integrations.',
    icon: Bot,
    className: 'service-visual--ai',
    visual: 'AI / AUTOMATION',
  },
];

export default function Approach() {
  return (
    <section id="approach" className="approach section-space">
      <div className="container">
        <div className="section-heading">
          <div><span className="eyebrow">SOFTWARE DEVELOPMENT SERVICES</span><h2>What we help you build.</h2></div>
          <p>Strategy, design, engineering, and cloud delivery work as one practical team—from defining the right first release to improving a live product after launch.</p>
        </div>

        <div className="approach__grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article className="service" key={service.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .55, delay: index * .1 }}>
                <div className={`service-visual ${service.className}`}><span className="service-visual__label">{service.visual}</span><Icon className="service-visual__icon" strokeWidth={1.25} /><span className="service-visual__number">{service.number}</span></div>
                <div className="service__content"><h3>{service.title}</h3><p>{service.description}</p><a href="/services" className="text-link">Explore services <ArrowUpRight size={17} /></a></div>
              </motion.article>
            );
          })}
        </div>

        <div className="approach__bento-heading">
          <span className="eyebrow">CONNECTED CAPABILITIES</span>
          <h2>Everything needed to ship and scale.</h2>
          <p>Product thinking, interface design, full-stack development, mobile engineering, cloud operations, and AI systems connected through one accountable delivery process.</p>
        </div>
        <MagicBento />
      </div>
    </section>
  );
}
