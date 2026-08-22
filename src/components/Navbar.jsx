import CardNav from './CardNav';

const items = [
  {
    label: 'Hosting',
    eyebrow: '01 / CLOUD & INFRASTRUCTURE',
    description: 'High-speed NVMe web hosting, cloud VPS, business email, and managed cloud servers.',
    variant: 'company',
    bgColor: '#ffffff',
    textColor: '#111827',
    links: [
      { label: 'Web Hosting (Shared NVMe)', href: '/#hosting' },
      { label: 'Cloud VPS Servers', href: '/#hosting' },
      { label: 'WordPress & E-Com Hosting', href: '/#hosting' },
      { label: 'Business Email Suite', href: '/contact?service=business-email' },
      { label: 'Domain Registration', href: '/contact?service=domain-hosting' },
      { label: 'Hosting & Server Pricing', href: '/pricing' },
    ],
  },
  {
    label: 'Services',
    eyebrow: '02 / DESIGN & DEVELOPMENT',
    description: 'Custom business websites, e-commerce, software engineering, mobile apps, and AI solutions.',
    variant: 'build',
    bgColor: '#225cff',
    textColor: '#fff',
    links: [
      { label: 'Website Design & Dev', href: '/services/web-application-development' },
      { label: 'Custom Software Development', href: '/services/custom-software-development' },
      { label: 'SaaS Product Engineering', href: '/services/saas-development' },
      { label: 'React Native Mobile Apps', href: '/services/mobile-app-development' },
      { label: 'AI Automation & Agents', href: '/services/ai-automation' },
      { label: 'Cloud & Modernization', href: '/services/cloud-devops-modernization' },
    ],
  },
  {
    label: 'Company',
    eyebrow: '03 / DECISIONS & WORK',
    description: 'About Zexton, portfolio, engineering insights, planning guides, and contact.',
    variant: 'explore',
    bgColor: '#d94382',
    textColor: '#fff',
    links: [
      { label: 'About Zexton', href: '/about' },
      { label: 'Portfolio & Work Standards', href: '/work' },
      { label: 'Pricing & Cost Calculator', href: '/pricing' },
      { label: 'Planning Resources & Briefs', href: '/resources' },
      { label: 'Engineering Insights', href: '/insights' },
      { label: 'Contact Our Team', href: '/contact' },
    ],
  },
];

export default function Navbar() {
  return (
    <CardNav
      logo="/ZextonLogo.png"
      logoAlt="Zexton Web Hosting & Custom Software Development"
      items={items}
      baseColor="rgba(255,255,255,.98)"
      menuColor="#111827"
      buttonBgColor="#225cff"
      buttonTextColor="#fff"
      ease="power3.out"
    />
  );
}
