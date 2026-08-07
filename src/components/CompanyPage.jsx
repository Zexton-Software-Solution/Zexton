import { ArrowUpRight } from 'lucide-react';
import FlowingMenu from './FlowingMenu';
import Seo from './Seo';
import { companyServiceMenu, companyValues, industryFocus } from '../companyData';
import { routeMetadata } from '../siteMetadata';
import './CompanyPage.css';

export default function CompanyPage() {
  const metadata = routeMetadata.company;

  return (
    <main className="company-page">
      <Seo {...metadata} type={metadata.schemaType} items={metadata.schemaItems} />

      <header className="company-hero">
        <div className="company-hero__main">
          <span className="eyebrow">ZEXTON SOFTWARE SOLUTIONS OVERVIEW</span>
          <h1>Engineering intelligent software for modern businesses.</h1>
        </div>
        <div className="company-hero__copy">
          <p>Zexton brings product thinking, interface design, software engineering, cloud delivery, and practical AI automation into one focused technology partner.</p>
          <p>The company direction is simple: understand the operational problem, design the smallest useful solution, build it responsibly, and create a clear path for future scale.</p>
          <a className="btn-primary" href="/contact">Discuss a software project <ArrowUpRight size={18} /></a>
        </div>
      </header>

      <section className="company-story" aria-labelledby="story-title">
        <div className="company-story__title"><span className="eyebrow eyebrow--light">THE ZEXTON DIRECTION</span><h2 id="story-title">Useful technology.<br />Clear business purpose.</h2></div>
        <div className="company-story__chapters">
          <article><span>01 / WHAT WE SOLVE</span><h3>Complex workflows that need a simpler digital system.</h3><p>We focus on customer experiences, business applications, operational platforms, mobile products, cloud systems, integrations, and AI-enabled workflows where thoughtful software can remove friction or create new value.</p></article>
          <article><span>02 / HOW WE BUILD</span><h3>One connected path from product decisions to production.</h3><p>Strategy, UX, frontend, backend, mobile, cloud, quality, and automation are planned together. That reduces handoffs, keeps technical choices tied to user needs, and makes delivery easier to understand.</p></article>
          <article><span>03 / WHAT MATTERS</span><h3>Reliability after launch—not just a polished demo.</h3><p>Maintainable code, secure defaults, performance, accessibility, observability, documentation, and practical operating costs are treated as product requirements from the beginning.</p></article>
        </div>
      </section>

      <section className="company-offering" aria-labelledby="offering-title">
        <div className="company-offering__heading"><span className="eyebrow eyebrow--light">CONNECTED SERVICE ARCHITECTURE</span><h2 id="offering-title">AI · Software · Cloud · Enterprise</h2><p>Hover or focus a row to explore the Zexton delivery model. The abstract visuals are local design assets and can be replaced with approved project media later.</p></div>
        <div className="company-offering__menu"><FlowingMenu items={companyServiceMenu} speed={15} textColor="#ffffff" bgColor="#0b101b" marqueeBgColor="#f4f7ff" marqueeTextColor="#111827" borderColor="rgba(255,255,255,.22)" /></div>
      </section>

      <section className="company-purpose" aria-labelledby="purpose-title">
        <div className="company-purpose__intro"><span className="eyebrow">MISSION &amp; VISION</span><h2 id="purpose-title">A clear direction for the company.</h2><p>Business value and engineering quality should reinforce each other. The goal is software that teams can trust, operate, and improve.</p></div>
        <div className="company-purpose__cards">
          <article><span>MISSION</span><h3>Empower businesses through reliable, scalable, and intelligent software solutions.</h3></article>
          <article><span>VISION</span><h3>Become a trusted global technology partner for businesses embracing AI and digital transformation.</h3></article>
        </div>
      </section>

      <section className="company-values" aria-labelledby="values-title">
        <div className="company-values__heading"><span className="eyebrow">CORE VALUES</span><h2 id="values-title">How the work should be done.</h2></div>
        <div className="company-values__grid">{companyValues.map(([title, description], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>

      <section className="company-industries" aria-labelledby="industries-title">
        <div><span className="eyebrow eyebrow--light">INDUSTRY FOCUS AREAS</span><h2 id="industries-title">Software shaped around real operations.</h2><p>Every sector has different users, rules, data, and workflows. Discovery starts with those realities rather than forcing the same template onto every business.</p></div>
        <ul>{industryFocus.map((industry) => <li key={industry}>{industry}<ArrowUpRight size={16} /></li>)}</ul>
      </section>

      <section className="company-cta"><span className="eyebrow eyebrow--light">BUILD WHAT MATTERS</span><h2>Have a real software problem worth solving?</h2><p>Share the users, workflow, constraints, and intended outcome. Zexton can help shape a practical first release and a responsible path to scale.</p><a className="btn-light" href="/contact">Start a conversation <ArrowUpRight size={18} /></a></section>
    </main>
  );
}
