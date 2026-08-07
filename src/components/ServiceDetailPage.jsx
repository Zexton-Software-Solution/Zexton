import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { servicePages } from '../servicePagesData';
import { routeMetadata } from '../siteMetadata';
import Seo from './Seo';
import './ServiceDetailPage.css';

export default function ServiceDetailPage({ route }) {
  const page = servicePages[route];
  const metadata = routeMetadata[route];
  if (!page || !metadata) return null;

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: page.breadcrumbLabel, path: page.path },
  ];

  return (
    <main className="service-detail">
      <Seo {...metadata} type={metadata.schemaType} breadcrumbs={breadcrumbs} items={metadata.schemaItems} />
      <nav className="service-detail__breadcrumbs" aria-label="Breadcrumb">
        <ol><li><a href="/">Home</a></li><li><a href="/services">Services</a></li><li aria-current="page">{page.breadcrumbLabel}</li></ol>
      </nav>
      <header className="service-detail__hero">
        <div><span>{page.eyebrow}</span><h1>{page.heading}</h1><p>{page.summary}</p><div className="service-detail__actions"><a href="/contact">Discuss your project <ArrowUpRight size={18} /></a><a href="/pricing">View planning ranges <ArrowRight size={18} /></a></div></div>
        <aside><strong>THE CHALLENGE</strong><p>{page.challenge}</p></aside>
      </header>
      <section className="service-detail__outcome"><span>THE INTENDED OUTCOME</span><h2>{page.outcome}</h2></section>
      <section className="service-detail__split" aria-label={`${page.breadcrumbLabel} scope`}>
        <div><span className="service-detail__label">GOOD FIT FOR</span><h2>Where this service creates value</h2><ul>{page.goodFor.map((item) => <li key={item}><CheckCircle2 size={18} />{item}</li>)}</ul></div>
        <div><span className="service-detail__label">DELIVERY CAN INCLUDE</span><h2>Connected from decision to production</h2><ul>{page.deliverables.map((item) => <li key={item}><CheckCircle2 size={18} />{item}</li>)}</ul></div>
      </section>
      <section className="service-detail__process"><div className="service-detail__section-heading"><span className="service-detail__label">A PRACTICAL DELIVERY PATH</span><h2>Reduce uncertainty before increasing investment.</h2></div><div>{page.process.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="service-detail__faq"><div className="service-detail__section-heading"><span className="service-detail__label">COMMON QUESTIONS</span><h2>{page.breadcrumbLabel} FAQ</h2></div><div>{page.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
      <section className="service-detail__cta"><div><span>START WITH THE WORKFLOW</span><h2>Bring the problem before the specification.</h2><p>Share the users, current process, systems, constraints, timeline, and desired outcome. We will identify the next useful decision.</p></div><a href="/contact">Contact Zexton <ArrowUpRight size={19} /></a></section>
    </main>
  );
}
