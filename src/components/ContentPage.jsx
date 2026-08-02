import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  CloudCog,
  Code2,
  Compass,
  Database,
  Gauge,
  Layers3,
  Mail,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import Seo from './Seo';
import { insightArticles } from '../insightsData';
import { routeMetadata } from '../siteMetadata';
import './SitePages.css';

const insightImageStyle = {
  position: 'static',
  inset: 'auto',
  display: 'block',
  width: '100%',
  height: 'auto',
  aspectRatio: '16 / 9',
  objectFit: 'contain',
};

const aboutPrinciples = [
  ['Clarity before code', 'Define users, workflows, constraints, and success signals before committing to architecture.'],
  ['Visible delivery', 'Work in reviewable milestones with written decisions, known risks, and a shared view of progress.'],
  ['Secure by default', 'Treat identity, permissions, data handling, recovery, and monitoring as core product behavior.'],
  ['Useful after launch', 'Build for maintainability, handover, operating cost, measurement, and continued improvement.'],
];

const workFormats = [
  { type: 'SAAS PRODUCT', title: 'From product hypothesis to a production platform', text: 'The future case study will show discovery decisions, user flows, multi-tenant architecture, subscription logic, launch scope, and measurable product outcomes.', color: 'blue' },
  { type: 'BUSINESS SYSTEM', title: 'Replacing fragmented operations with one clear workflow', text: 'This format will document the process before and after, integrations, permissions, automation, reporting, and verified operational impact.', color: 'violet' },
  { type: 'CUSTOMER EXPERIENCE', title: 'Turning a complex buying journey into a simple digital path', text: 'Approved work can cover information architecture, responsive UX, performance, search visibility, conversion events, and business results.', color: 'orange' },
  { type: 'AI AUTOMATION', title: 'Applying AI to a measurable business task', text: 'A responsible AI case study should include data boundaries, evaluation, human review, fallback behavior, monitoring, and verified time or quality gains.', color: 'green' },
];

const services = [
  { number: '01', title: 'Product discovery & UX', text: 'Turn an unclear requirement into prioritized workflows, a delivery roadmap, interaction design, and a testable first release.', tags: ['Workshops', 'User flows', 'Prototypes', 'MVP scope'] },
  { number: '02', title: 'Custom web applications', text: 'Build portals, dashboards, marketplaces, operational tools, e-commerce experiences, and customer-facing platforms around real business rules.', tags: ['React', 'Node.js', '.NET', 'Python'] },
  { number: '03', title: 'SaaS product engineering', text: 'Engineer multi-tenant products with teams, roles, subscriptions, usage, notifications, administration, analytics, and resilient cloud foundations.', tags: ['Multi-tenancy', 'Billing', 'RBAC', 'Analytics'] },
  { number: '04', title: 'React Native mobile apps', text: 'Deliver cross-platform mobile products with secure APIs, offline behavior, notifications, payments, and store-ready release workflows.', tags: [ 'Android', 'Offline data', 'Push'] },
  { number: '05', title: 'AI automation & agents', text: 'Connect models to approved data and tools with retrieval, evaluations, human controls, observability, and clear operational ownership.', tags: ['RAG', 'Agents', 'Evaluation', 'Guardrails'] },
  { number: '06', title: 'Cloud, DevOps & modernization', text: 'Improve deployment, reliability, monitoring, recovery, security, performance, and legacy systems without disrupting critical operations.', tags: ['AWS', 'Docker', 'CI/CD', 'Observability'] },
];

const resources = [
  { label: 'PROJECT BRIEF', title: 'What a useful software brief should contain', text: 'A practical outline for users, workflows, constraints, integrations, content, risks, and success measures.', number: '01' },
  { label: 'ESTIMATION', title: 'Why software estimates vary so widely', text: 'Understand how scope, quality, content readiness, migration, security, and delivery speed shape investment.', number: '02' },
  { label: 'AI READINESS', title: 'A checklist before adding AI to a workflow', text: 'Review the task, data access, evaluation criteria, human oversight, privacy, failure modes, and ownership.', number: '03' },
  { label: 'LAUNCH', title: 'The production-readiness review', text: 'Check accessibility, performance, security, analytics, monitoring, backups, content, support, and rollback planning.', number: '04' },
];

const capabilityLayers = [
  { icon: Compass, title: 'Product & experience', text: 'Discovery, journey mapping, UX architecture, responsive interfaces, accessibility, design systems, and product analytics.', tech: ['Figma', 'React', 'Next.js', 'Analytics'] },
  { icon: Code2, title: 'Application engineering', text: 'Typed frontend and backend systems, APIs, authentication, payments, search, integrations, and administrative workflows.', tech: ['TypeScript', 'Node.js', '.NET', 'Python'] },
  { icon: Smartphone, title: 'Mobile delivery', text: 'Cross-platform Android experiences with native capabilities, offline data, secure APIs, notifications, and store releases.', tech: ['React Native', 'Android', 'Push'] },
  { icon: Database, title: 'Data & intelligence', text: 'Relational data, search, reporting, retrieval, model integration, evaluation, tool use, and approval workflows.', tech: ['PostgreSQL', 'Vector search', 'RAG', 'Agents'] },
  { icon: CloudCog, title: 'Platform & operations', text: 'Cloud infrastructure, containers, delivery pipelines, monitoring, backups, recovery, security controls, and cost visibility.', tech: ['AWS', 'Docker', 'CI/CD', 'Monitoring'] },
];

const careerTracks = [
  ['PRODUCT & DESIGN', 'Product thinking, research, interaction design, systems thinking, and clear written decisions.'],
  ['SOFTWARE ENGINEERING', 'Frontend, backend, mobile, platform, quality, security, and dependable delivery fundamentals.'],
  ['AI & DATA SYSTEMS', 'Retrieval, evaluation, automation, data workflows, observability, and responsible human controls.'],
];

function RouteCta({ className = '', eyebrow, title, text, action = 'Start a conversation', href = '/contact' }) {
  return <section className={`route-cta ${className}`}><span>{eyebrow}</span><h2>{title}</h2><p>{text}</p><a href={href}>{action}<ArrowUpRight size={18} /></a></section>;
}

function AboutPage() {
  return <>
    <header className="about-hero"><div><span className="route-kicker">ABOUT ZEXTON</span><h1>Software engineering with less noise and more ownership.</h1></div><aside><strong>OUR ROLE</strong><p>Translate a business problem into a clear product, build the important workflows well, and leave the system ready to operate and improve.</p><a href="/company">Read the company overview <ArrowRight size={17} /></a></aside></header>
    <section className="about-narrative"><div className="about-narrative__index">01<small>OUR POINT OF VIEW</small></div><div><h2>Good software begins with the decisions around it.</h2><p>A polished interface cannot rescue an unclear workflow, and modern technology cannot compensate for missing ownership. Zexton starts by understanding the user, operational reality, risk, and outcome that matter.</p><p>Product strategy, UX, engineering, cloud, and quality then work as one connected delivery system. This keeps technical decisions explainable and reduces the gaps that appear when every discipline works in isolation.</p></div></section>
    <section className="about-principles"><div className="about-principles__heading"><span className="route-kicker">WORKING PRINCIPLES</span><h2>Four standards for every engagement.</h2></div><div className="about-principles__grid">{aboutPrinciples.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="about-operating"><span className="route-kicker">THE OPERATING MODEL</span><div>{['Understand the real workflow','Define the useful first release','Build in visible milestones','Measure, support, and improve'].map((step, index) => <article key={step}><strong>{index + 1}</strong><p>{step}</p></article>)}</div></section>
    <RouteCta className="route-cta--about" eyebrow="A PRACTICAL FIRST STEP" title="Bring the problem before the specification." text="You do not need a finished requirements document. Share the users, current workflow, constraints, and desired outcome." />
  </>;
}

function WorkPage() {
  return <>
    <header className="work-hero"><span className="route-kicker route-kicker--light">OUR WORK</span><h1>Show the decisions.<br />Prove the outcome.</h1><p>Zexton will publish real case studies only after project details, visuals, links, and client permissions are verified. Until then, this page shows the structure every future story will follow.</p></header>
    <section className="work-canvas" aria-label="Future case study formats">{workFormats.map((item, index) => <article className={`work-case work-case--${item.color}`} key={item.title}><div><span>{item.type}</span><strong>0{index + 1}</strong></div><h2>{item.title}</h2><p>{item.text}</p><footer><span>AWAITING VERIFIED PROJECT DATA</span><ArrowUpRight size={18} /></footer></article>)}</section>
    <section className="work-proof"><div><span className="route-kicker">WHAT A CASE STUDY MUST SHOW</span><h2>Context is more useful than a gallery.</h2></div><ol>{['The original workflow and business constraint','The product and architecture decisions made','What was delivered and how quality was checked','Approved evidence of customer or operational impact'].map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol></section>
    <RouteCta className="route-cta--work" eyebrow="YOUR PROJECT CAN START HERE" title="Need a product team that explains its decisions?" text="We can help turn the first problem statement into scope, architecture, delivery milestones, and a reliable launch." action="Plan the engagement" />
  </>;
}

function ServicesPage() {
  return <>
    <header className="services-hero"><div><span className="route-kicker route-kicker--light">OUR SERVICES</span><h1>One delivery system.<br />Six ways to move forward.</h1></div><div className="services-hero__note"><Layers3 size={28} /><p>Start with one focused problem or assemble a connected team across product, engineering, mobile, cloud, and AI.</p></div></header>
    <section className="service-ledger">{services.map((service) => <article key={service.number}><span className="service-ledger__number">{service.number}</span><div><h2>{service.title}</h2><p>{service.text}</p></div><ul>{service.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><a href="/contact" aria-label={`Discuss ${service.title}`}><ArrowUpRight size={20} /></a></article>)}</section>
    <section className="service-models"><div className="service-models__heading"><span className="route-kicker">ENGAGEMENT MODELS</span><h2>Match the team to the decision.</h2></div><div className="service-models__grid"><article><Sparkles /><h3>Discovery sprint</h3><p>Clarify users, workflows, scope, risk, architecture, and a realistic delivery plan before a larger build.</p></article><article><BriefcaseBusiness /><h3>Project delivery</h3><p>A defined outcome delivered through milestones with design, engineering, quality, deployment, and handover.</p></article><article><Gauge /><h3>Product evolution</h3><p>An ongoing team for roadmap delivery, experiments, reliability, performance, and operational improvement.</p></article></div></section>
    <RouteCta className="route-cta--services" eyebrow="CHOOSE THE OUTCOME FIRST" title="Not sure which service label fits?" text="Describe the workflow and business goal. We will recommend the smallest sensible engagement, not the longest menu of work." />
  </>;
}

function ResourcesPage() {
  return <>
    <header className="resources-hero"><div className="resources-hero__issue">Z / FIELD NOTES <span>01</span></div><div><span className="route-kicker">RESOURCES</span><h1>Better inputs create better software decisions.</h1><p>Practical planning notes for founders, operators, and product teams buying or rebuilding digital systems.</p></div></header>
    <section className="resource-library"><article className="resource-feature"><span>FEATURED FRAMEWORK</span><h2>Before requesting an estimate, map the critical workflow.</h2><p>Identify who starts the process, what information enters, which decisions occur, where approvals happen, what systems connect, and what a successful completion looks like.</p><div>{['User and trigger','Data and decisions','Integrations and exceptions','Success and ownership'].map((item) => <span key={item}>{item}</span>)}</div></article><div className="resource-index">{resources.map((resource) => <article key={resource.number}><span>{resource.number} / {resource.label}</span><h3>{resource.title}</h3><p>{resource.text}</p></article>)}</div></section>
    <section className="resource-question"><div><span className="route-kicker">ONE QUESTION TO START</span><h2>What happens today when the software does not exist?</h2></div><p>The manual workaround often reveals the real users, hidden rules, duplicate effort, risk, and highest-value opportunity more clearly than a feature wish list.</p></section>
    <RouteCta className="route-cta--resources" eyebrow="APPLY THE FRAMEWORK" title="Bring your current process to a discovery conversation." text="We will help identify the product boundary, open questions, risk, and the next useful decision." action="Discuss the workflow" />
  </>;
}

function InsightsPage() {
  const [featuredArticle, ...moreArticles] = insightArticles;

  return <>
    <header className="insights-route-hero"><div><span className="route-kicker route-kicker--light">ZEXTON INSIGHTS</span><h1>Engineering perspective without the trend theatre.</h1></div><div className="insights-route-hero__edition"><span>EDITORIAL INDEX</span><strong>2026 / 01</strong><p>Product, architecture, cloud, mobile, AI, and delivery decisions explained for people responsible for outcomes.</p></div></header>
    <section className="insight-index" aria-label="Software engineering insights">
      <a className="insight-index__lead" href={featuredArticle.path}>
        <span>FEATURED INSIGHT</span>
        <div className="insight-index__lead-image"><img src={featuredArticle.image} alt={featuredArticle.imageAlt} width="1600" height="900" style={insightImageStyle} /></div>
        <div className="insight-index__lead-copy"><small>{featuredArticle.category}</small><h2>{featuredArticle.title}</h2><p>{featuredArticle.excerpt}</p></div>
        <div className="insight-index__lead-meta"><span>{featuredArticle.readTime}</span><strong>Read insight <ArrowUpRight size={17} /></strong></div>
      </a>
      <div className="insight-index__list">
        {moreArticles.map((article, index) => (
          <a href={article.path} key={article.slug}>
            <span>{String(index + 2).padStart(2, '0')}</span>
            <div className="insight-index__thumb"><img src={article.image} alt="" width="1600" height="900" style={insightImageStyle} loading="lazy" decoding="async" /></div>
            <div className="insight-index__item-copy"><small>{article.category}</small><h3>{article.title}</h3></div>
            <strong>{article.readTime}</strong>
            <ArrowRight aria-hidden="true" size={18} />
          </a>
        ))}
      </div>
    </section>
    <section className="insight-standard"><ShieldCheck size={34} /><div><span className="route-kicker">EDITORIAL STANDARD</span><h2>No invented research, client results, or technical certainty.</h2></div><p>Published articles distinguish evidence, experience, assumptions, and opinion. Real project examples will only appear with approval and enough context to be useful.</p></section>
    <RouteCta className="route-cta--insights" eyebrow="A DECISION WORTH EXAMINING" title="Have an architecture or product question?" text="Share the context. It may become the starting point for a practical technical conversation." action="Ask the engineering team" />
  </>;
}

function CapabilitiesPage() {
  return <>
    <header className="capabilities-hero"><div><span className="route-kicker">CAPABILITIES</span><h1>Connected from interface to infrastructure.</h1><p>A modern product succeeds when experience, application logic, data, cloud operations, quality, and discoverability work as one system.</p></div><div className="capabilities-hero__visual" aria-hidden="true"><span>PRODUCT</span><span>ENGINEERING</span><span>PLATFORM</span><span>INTELLIGENCE</span><i /></div></header>
    <section className="capability-stack">{capabilityLayers.map(({ icon: Icon, title, text, tech }, index) => <article key={title}><div className="capability-stack__index"><Icon size={24} /><span>0{index + 1}</span></div><div><h2>{title}</h2><p>{text}</p></div><ul>{tech.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</section>
    <section className="capability-quality"><div><span className="route-kicker route-kicker--light">QUALITY ACROSS EVERY LAYER</span><h2>The non-feature work users still depend on.</h2></div><div>{[['Security','Identity, access, data protection, dependency hygiene'],['Reliability','Monitoring, recovery, fallbacks, operational visibility'],['Performance','Fast interfaces, efficient APIs, cost-aware infrastructure'],['Accessibility','Keyboard, semantics, contrast, readable interactions']].map(([title, text]) => <article key={title}><Check size={17} /><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <RouteCta className="route-cta--capabilities" eyebrow="ASSEMBLE THE RIGHT LAYERS" title="Your project may not need every capability." text="Architecture should match the users, risk, operating reality, and stage of the product—not a fashionable stack diagram." />
  </>;
}

function CareersPage() {
  return <>
    <header className="careers-hero"><div><span className="route-kicker route-kicker--light">CAREERS AT ZEXTON</span><h1>Do careful work.<br />Explain your thinking.</h1><p>Zexton is building a culture for people who combine strong fundamentals, product judgment, respectful communication, and dependable delivery.</p><a href="mailto:careers@zexton.com">Introduce yourself <Mail size={18} /></a></div><div className="careers-hero__orbit" aria-hidden="true"><span>CURIOUS</span><span>DIRECT</span><span>RELIABLE</span><i>+</i></div></header>
    <section className="career-manifesto"><div><span className="route-kicker">HOW WE WANT TO WORK</span><h2>Ownership without ego. Standards without theatre.</h2></div><div><p>Good teams ask clear questions, write down important decisions, expose risk early, review work thoughtfully, and care about what happens after release.</p><p>We value people who can move between detail and outcome—understanding both how a system works and why it should exist.</p></div></section>
    <section className="career-tracks">{careerTracks.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{text}</p><ArrowUpRight size={20} /></article>)}</section>
    <section className="career-openings"><div><span className="route-kicker">CURRENT OPENINGS</span><h2>No verified vacancies are published right now.</h2></div><div><p>When roles are approved, the title, responsibilities, working arrangement, and application process will appear here. Zexton never charges candidates a recruitment fee.</p><a href="mailto:careers@zexton.com">Share relevant work <Mail size={17} /></a></div></section>
    <RouteCta className="route-cta--careers" eyebrow="WORK WITH THE DELIVERY TEAM" title="Looking for a project conversation instead?" text="Use the project enquiry page for software, SaaS, cloud, mobile, and AI requirements." action="Contact Zexton" />
  </>;
}

const pageComponents = {
  about: AboutPage,
  work: WorkPage,
  services: ServicesPage,
  resources: ResourcesPage,
  insights: InsightsPage,
  capabilities: CapabilitiesPage,
  careers: CareersPage,
};

export default function ContentPage({ page }) {
  const metadata = routeMetadata[page] || routeMetadata.about;
  const Page = pageComponents[page] || AboutPage;
  const schemaItems = metadata.collection === 'insights'
    ? insightArticles.map((article) => ({
        type: 'BlogPosting',
        name: article.title,
        description: article.excerpt,
        path: article.path,
        image: article.image,
      }))
    : metadata.schemaItems;

  return <main className={`route-page route-page--${page}`}><Seo {...metadata} type={metadata.schemaType} items={schemaItems} /><Page /></main>;
}
