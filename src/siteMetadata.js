import { insightRouteSlugs } from './insightRoutes.js';
import { serviceRouteMetadata } from './servicePagesData.js';

export const SITE_URL = 'https://zexton.com';
export const SITE_NAME = 'Zexton';
export const SITE_LANGUAGE = 'en-IN';
export const SITE_LOCALE = 'en_IN';
export const DEFAULT_SOCIAL_IMAGE = '/ZextonLogo.png';
export const DEFAULT_SOCIAL_IMAGE_ALT = 'Zexton software engineering company logo';
export const SITE_LAST_MODIFIED = '2026-08-03';

const corePage = (metadata) => ({
  image: DEFAULT_SOCIAL_IMAGE,
  imageAlt: DEFAULT_SOCIAL_IMAGE_ALT,
  lastModified: SITE_LAST_MODIFIED,
  ...metadata,
});

const insightRouteMetadata = Object.fromEntries(
  insightRouteSlugs.map((slug) => [
    `insight:${slug}`,
    {
      path: `/insights/${slug}`,
      schemaType: 'BlogPosting',
      articleSlug: slug,
      lastModified: SITE_LAST_MODIFIED,
    },
  ]),
);

export const routeMetadata = {
  home: corePage({
    path: '/',
    title: 'Custom Software, SaaS & AI Development Company | Zexton',
    description: 'Zexton plans and builds custom software, SaaS platforms, web and mobile applications, cloud systems, and responsible AI automation.',
    eyebrow: 'CUSTOM SOFTWARE DEVELOPMENT COMPANY',
    heading: 'Custom Software, SaaS & AI Development',
    summary: 'Product strategy, UX design, full-stack engineering, cloud delivery, mobile development, and practical AI automation for startups and growing businesses.',
    breadcrumbLabel: 'Home',
    schemaType: 'WebPage',
    searchIntent: 'custom software development company',
    topics: ['custom software development', 'SaaS product development', 'web application development', 'React Native development', 'cloud engineering', 'AI automation'],
    relatedRoutes: ['services', 'capabilities', 'pricing', 'insights'],
    crawlSections: [
      { title: 'Software products from strategy to production', text: 'Zexton connects product discovery, user experience, full-stack application engineering, mobile delivery, cloud operations, quality, and responsible AI into one delivery path.' },
      { title: 'Engineering for useful business workflows', text: 'The focus is custom applications, SaaS platforms, customer experiences, internal systems, integrations, modernization, and automation designed around real users and operating constraints.' },
      { title: 'Practical technical guidance', text: 'Explore detailed engineering insights about SaaS architecture, scalable systems, mobile products, legacy modernization, product teams, AI agents, and sustainable delivery.' },
    ],
  }),
  company: corePage({
    path: '/company',
    title: 'Zexton Company Direction, Values & Engineering Focus',
    description: 'Explore Zexton’s company direction, engineering values, industry focus, and connected approach to software, AI, cloud, mobile, and enterprise systems.',
    eyebrow: 'ZEXTON COMPANY OVERVIEW',
    heading: 'Engineering intelligent software for modern businesses',
    summary: 'The Zexton company overview explains its mission, service direction, engineering values, industry focus, and approach to dependable digital systems.',
    breadcrumbLabel: 'Company',
    schemaType: 'AboutPage',
    searchIntent: 'Zexton company overview',
    topics: ['Zexton company', 'software engineering values', 'technology partner', 'digital transformation', 'software delivery principles'],
    relatedRoutes: ['about', 'services', 'capabilities', 'contact'],
    crawlSections: [
      { title: 'Useful technology with a clear business purpose', text: 'Zexton focuses on customer experiences, business applications, operational platforms, mobile products, cloud systems, integrations, and AI-enabled workflows.' },
      { title: 'One connected path from decisions to production', text: 'Product strategy, UX, frontend, backend, mobile, cloud, quality, security, and automation are planned together to reduce handoffs and keep technical choices tied to user needs.' },
    ],
  }),
  about: corePage({
    path: '/about',
    title: 'About Zexton | Product Engineering Approach & Principles',
    description: 'Learn how Zexton approaches software discovery, UX, architecture, secure engineering, visible delivery, launch, handover, and continued improvement.',
    eyebrow: 'ABOUT ZEXTON',
    heading: 'Software engineering built around business outcomes',
    summary: 'Zexton starts with users, workflows, risk, and desired outcomes, then connects product, design, engineering, cloud, and quality through visible delivery.',
    breadcrumbLabel: 'About',
    schemaType: 'AboutPage',
    searchIntent: 'Zexton software development approach',
    topics: ['product engineering approach', 'software discovery', 'secure software delivery', 'software project ownership', 'software development principles'],
    relatedRoutes: ['company', 'work', 'services', 'contact'],
    crawlSections: [
      { title: 'Clarity before code', text: 'Useful software begins by defining users, workflows, constraints, risks, and success signals before committing to features or architecture.' },
      { title: 'Visible and secure delivery', text: 'Reviewable milestones, written decisions, secure defaults, maintainability, observability, documentation, and responsible handover are part of the delivery system.' },
    ],
  }),
  work: corePage({
    path: '/work',
    title: 'Software Delivery & Case Study Standards | Zexton',
    description: 'See how Zexton structures software delivery stories around verified context, product and architecture decisions, delivered workflows, and approved evidence.',
    eyebrow: 'SOFTWARE DELIVERY STANDARDS',
    heading: 'Show the decisions. Prove the outcome.',
    summary: 'This page explains the evidence and context Zexton requires before publishing a software project as a case study. Unverified client claims are not presented.',
    breadcrumbLabel: 'Work',
    schemaType: 'CollectionPage',
    searchIntent: 'software project case study standards',
    topics: ['software delivery process', 'software case study', 'product engineering decisions', 'software project outcomes', 'responsible project evidence'],
    relatedRoutes: ['services', 'about', 'insights', 'contact'],
    crawlSections: [
      { title: 'Context before a project gallery', text: 'A useful case study should explain the original workflow, business constraints, users, risks, and why the chosen product and architecture decisions were appropriate.' },
      { title: 'Evidence before outcome claims', text: 'Project screenshots, links, client identities, and performance results should be published only when verified, approved, and supported by enough context to be useful.' },
    ],
  }),
  'who-we-are': corePage({
    path: '/who-we-are',
    title: 'How Zexton Product & Engineering Roles Collaborate',
    description: 'See how product, UX, full-stack, mobile, cloud, quality, and applied AI roles collaborate through ownership, written decisions, and visible milestones.',
    eyebrow: 'HOW WE COLLABORATE',
    heading: 'Connected roles focused on serious product outcomes',
    summary: 'This page describes the delivery roles and collaboration model. Names and portraits remain clearly marked as placeholders until verified profiles are supplied.',
    breadcrumbLabel: 'Who We Are',
    schemaType: 'AboutPage',
    searchIntent: 'software product team roles',
    topics: ['product engineering team', 'cross-functional software team', 'UX and engineering collaboration', 'cloud engineering roles', 'AI engineering roles'],
    relatedRoutes: ['about', 'company', 'careers', 'contact'],
    crawlSections: [
      { title: 'Cross-functional product delivery', text: 'Product thinking, interface design, software engineering, mobile delivery, cloud operations, quality, and applied AI work through shared context rather than isolated handoffs.' },
      { title: 'Verified people, honest representation', text: 'Role descriptions explain needed capabilities, while names and portraits are not presented as real employees until verified team profiles are available.' },
    ],
  }),
  services: corePage({
    path: '/services',
    title: 'Custom Software, SaaS, Web, Mobile & AI Services | Zexton',
    description: 'Software development services for product discovery, custom web apps, SaaS, React Native, cloud modernization, DevOps, integrations, and AI automation.',
    eyebrow: 'SOFTWARE DEVELOPMENT SERVICES',
    heading: 'End-to-end software development services',
    summary: 'Choose a focused discovery engagement or a connected delivery team across product strategy, UX, application engineering, mobile, cloud, integrations, and AI.',
    breadcrumbLabel: 'Services',
    schemaType: 'CollectionPage',
    itemType: 'Service',
    searchIntent: 'software development services',
    topics: ['custom software development services', 'SaaS development services', 'web application development', 'React Native app development', 'cloud modernization', 'AI automation services'],
    relatedRoutes: ['service:custom-software-development', 'service:saas-development', 'service:ai-automation', 'contact'],
    schemaItems: [
      { name: 'Product discovery and UX', description: 'Workflow discovery, product scope, UX architecture, prototypes, and delivery planning.' },
      { name: 'Custom web application development', description: 'Portals, dashboards, marketplaces, operational tools, commerce, and customer platforms.' },
      { name: 'SaaS product engineering', description: 'Multi-tenant products with identity, billing, administration, analytics, and cloud foundations.' },
      { name: 'React Native mobile development', description: 'Cross-platform mobile products with secure APIs, offline behavior, notifications, and release workflows.' },
      { name: 'AI automation and agents', description: 'Model-powered workflows with approved data, evaluations, human controls, and observability.' },
      { name: 'Cloud, DevOps and modernization', description: 'Deployment, monitoring, recovery, security, performance, and incremental legacy modernization.' },
    ],
    crawlSections: [
      { title: 'Product discovery and experience design', text: 'Turn an unclear requirement into prioritized workflows, a delivery roadmap, interaction design, and a testable first release.' },
      { title: 'Application, SaaS, and mobile engineering', text: 'Build custom web applications, multi-tenant SaaS products, secure APIs, and React Native mobile experiences around real business rules.' },
      { title: 'Cloud modernization and responsible AI', text: 'Improve deployment and reliability, modernize legacy systems incrementally, and connect AI to approved data and tools with evaluation and human control.' },
    ],
  }),
  ...Object.fromEntries(Object.entries(serviceRouteMetadata).map(([route, metadata]) => [route, corePage(metadata)])),
  resources: corePage({
    path: '/resources',
    title: 'Software Project Planning Resources & Buyer Guides | Zexton',
    description: 'Practical guides for software briefs, project estimates, AI readiness, architecture decisions, production readiness, security, content, and launch planning.',
    eyebrow: 'SOFTWARE PLANNING RESOURCES',
    heading: 'Practical guidance for software buyers and product teams',
    summary: 'Use these planning frameworks to clarify workflows, scope, investment, architecture, AI readiness, risk, content, and production responsibilities.',
    breadcrumbLabel: 'Resources',
    schemaType: 'CollectionPage',
    itemType: 'CreativeWork',
    searchIntent: 'software project planning guide',
    topics: ['software project planning', 'software requirements brief', 'software cost estimation', 'AI readiness checklist', 'production readiness checklist'],
    relatedRoutes: ['services', 'pricing', 'insights', 'contact'],
    schemaItems: [
      { name: 'What a useful software brief should contain', description: 'Users, workflows, constraints, integrations, content, risks, and success measures.' },
      { name: 'Why software estimates vary', description: 'How scope, quality, content, migration, security, and delivery speed shape investment.' },
      { name: 'AI workflow readiness checklist', description: 'Task definition, data access, evaluation, human oversight, privacy, failure modes, and ownership.' },
      { name: 'Production-readiness review', description: 'Accessibility, performance, security, analytics, monitoring, backups, content, support, and rollback.' },
    ],
    crawlSections: [
      { title: 'Plan the workflow before the feature list', text: 'A useful brief identifies who starts the process, what information enters, which decisions occur, where approvals happen, what systems connect, and what success looks like.' },
      { title: 'Make risk and readiness visible', text: 'Estimation, AI readiness, security, content, migration, production operations, and launch responsibilities should be discussed before they become late delivery surprises.' },
    ],
  }),
  insights: corePage({
    path: '/insights',
    title: 'Software, SaaS, Cloud, Mobile & AI Insights | Zexton',
    description: 'Long-form engineering insights about SaaS architecture, custom software, React Native, cloud modernization, product delivery, and trustworthy AI systems.',
    eyebrow: 'SOFTWARE ENGINEERING INSIGHTS',
    heading: 'Practical ideas for building better digital products',
    summary: 'Original, detailed perspectives for product owners and engineering teams making software, platform, cloud, mobile, delivery, and AI decisions.',
    breadcrumbLabel: 'Insights',
    schemaType: 'CollectionPage',
    itemType: 'BlogPosting',
    collection: 'insights',
    searchIntent: 'software engineering insights',
    topics: ['software engineering articles', 'SaaS architecture', 'scalable software architecture', 'React Native product development', 'legacy modernization', 'trustworthy AI agents'],
    relatedRoutes: ['services', 'resources', 'capabilities', 'contact'],
    crawlSections: [
      { title: 'Original engineering perspectives', text: 'Each article explains decisions, trade-offs, failure modes, and practical operating considerations without invented research, clients, or technical certainty.' },
      { title: 'Product, platform, and AI topics', text: 'The editorial library covers SaaS delivery, multi-tenancy, scalable architecture, mobile product quality, modernization, product teams, AI opportunities, agents, and engineering debt.' },
    ],
  }),
  pricing: corePage({
    path: '/pricing',
    title: 'Website, SaaS & Custom Software Development Pricing | Zexton',
    description: 'Indicative website, e-commerce, SaaS, custom software, and enterprise modernization price ranges in INR, USD, and EUR, plus a project calculator.',
    eyebrow: 'SOFTWARE DEVELOPMENT PRICING',
    heading: 'Transparent planning ranges for websites and software',
    summary: 'Compare indicative packages and use the project calculator to form a starting range. Final proposals depend on verified scope, risk, integrations, and delivery needs.',
    breadcrumbLabel: 'Pricing',
    schemaType: 'WebPage',
    searchIntent: 'software development pricing India',
    topics: ['software development cost India', 'website development pricing', 'SaaS development cost', 'custom software estimate', 'software project cost calculator'],
    relatedRoutes: ['services', 'resources', 'capabilities', 'contact'],
    crawlSections: [
      { title: 'Planning ranges, not instant quotations', text: 'Complexity, content readiness, integrations, compliance, migration, quality, and delivery speed affect the final software project estimate.' },
      { title: 'Understand what the range includes', text: 'The pricing page separates delivery scope from infrastructure, domains, app-store fees, paid APIs, software licenses, taxes, and other external costs unless explicitly included.' },
    ],
  }),
  capabilities: corePage({
    path: '/capabilities',
    title: 'Full-Stack, React Native, Cloud, .NET & AI Capabilities',
    description: 'Explore product, UX, React, React Native, Node.js, .NET, Python, PostgreSQL, AWS, DevOps, security, data, and applied AI engineering capabilities.',
    eyebrow: 'ENGINEERING CAPABILITIES',
    heading: 'A modern technology capability stack connected end to end',
    summary: 'Product and UX decisions connect directly with frontend, backend, mobile, cloud, data, AI, security, performance, accessibility, and operational quality.',
    breadcrumbLabel: 'Capabilities',
    schemaType: 'CollectionPage',
    itemType: 'Thing',
    searchIntent: 'software engineering capabilities',
    topics: ['full-stack development', 'React development', 'React Native development', '.NET development', 'Node.js development', 'AWS cloud engineering', 'AI engineering'],
    relatedRoutes: ['services', 'insights', 'pricing', 'contact'],
    schemaItems: [
      { name: 'Product and experience', description: 'Discovery, UX architecture, responsive interfaces, accessibility, design systems, and analytics.' },
      { name: 'Application engineering', description: 'Typed frontend and backend systems, APIs, authentication, payments, integrations, and administration.' },
      { name: 'Mobile delivery', description: 'React Native applications with native capabilities, offline data, secure APIs, notifications, and releases.' },
      { name: 'Data and intelligence', description: 'Relational data, search, reporting, retrieval, model integration, evaluation, tools, and approvals.' },
      { name: 'Platform and operations', description: 'Cloud infrastructure, containers, delivery pipelines, monitoring, backups, recovery, and security.' },
    ],
    crawlSections: [
      { title: 'From interface to infrastructure', text: 'Modern products need connected decisions across product strategy, experience design, application logic, data, mobile, cloud operations, security, and quality.' },
      { title: 'Technology chosen for the operating context', text: 'React, React Native, Node.js, .NET, Python, PostgreSQL, AWS, containers, delivery pipelines, and AI are selected according to product needs rather than a fixed stack.' },
    ],
  }),
  careers: corePage({
    path: '/careers',
    title: 'Software Engineering Careers & Future Roles at Zexton',
    description: 'Learn about future product, UX, full-stack, mobile, cloud, quality, and applied AI role areas at Zexton. No active vacancy is implied unless published.',
    eyebrow: 'CAREERS AT ZEXTON',
    heading: 'Do careful work. Explain your thinking.',
    summary: 'Zexton values strong fundamentals, product judgment, respectful communication, clear written decisions, and dependable delivery. Verified openings appear when available.',
    breadcrumbLabel: 'Careers',
    schemaType: 'WebPage',
    searchIntent: 'Zexton software engineering careers',
    topics: ['Zexton careers', 'software engineering roles', 'product design roles', 'cloud engineering roles', 'AI and data roles'],
    relatedRoutes: ['who-we-are', 'company', 'about', 'contact'],
    crawlSections: [
      { title: 'Ownership without ego', text: 'The working culture described here values clear questions, written decisions, early risk visibility, thoughtful review, and responsibility for what happens after release.' },
      { title: 'Verified openings only', text: 'Role areas explain future capability needs. An active vacancy is not implied unless a title, responsibilities, working arrangement, and application process are explicitly published.' },
    ],
  }),
  contact: corePage({
    path: '/contact',
    title: 'Contact Zexton About a Software Development Project',
    description: 'Contact Zexton about a website, custom software, SaaS, React Native, cloud, modernization, integration, or responsible AI automation requirement.',
    eyebrow: 'CONTACT ZEXTON',
    heading: 'Tell us what you need to build',
    summary: 'Share the users, current workflow, business goal, priorities, timeline, budget range, integrations, and constraints so the delivery team can assess a practical next step.',
    breadcrumbLabel: 'Contact',
    schemaType: 'ContactPage',
    searchIntent: 'contact software development company',
    topics: ['software project enquiry', 'custom software consultation', 'SaaS development enquiry', 'React Native project enquiry', 'AI automation consultation'],
    relatedRoutes: ['services', 'pricing', 'resources', 'insights'],
    crawlSections: [
      { title: 'Start with the workflow and outcome', text: 'A useful enquiry explains who uses the system, what happens today, what should improve, which systems connect, and which constraints matter.' },
      { title: 'A specification is not required', text: 'Early project information can be incomplete. The first step is to identify the product boundary, open questions, risk, and the smallest sensible planning or delivery engagement.' },
    ],
  }),
  ...insightRouteMetadata,
};

export const routeFromPath = (pathname = '/') => {
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
  if (!cleanPath) return 'home';
  const match = Object.entries(routeMetadata).find(([, metadata]) => metadata.path.slice(1) === cleanPath);
  return match?.[0] || cleanPath;
};

export const pathForRoute = (route) => routeMetadata[route]?.path || `/${route}`;
export const isKnownRoute = (route) => Boolean(routeMetadata[route]);
