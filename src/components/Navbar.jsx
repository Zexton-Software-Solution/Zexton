import CardNav from './CardNav';

const items = [
  {
    label: 'Company',
    eyebrow: '01 / ORGANISATION',
    description: 'Purpose, people, principles, and the direction behind Zexton.',
    variant: 'company',
    bgColor: '#ffffff',
    textColor: '#111827',
    links: [
      { label: 'Company Overview', href: '/company' },
      { label: 'About Zexton', href: '/about' },
      { label: 'Team & Roles', href: '/who-we-are' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    label: 'Build',
    eyebrow: '02 / DELIVERY',
    description: 'Choose an outcome, then connect the capabilities required to ship it.',
    variant: 'build',
    bgColor: '#225cff',
    textColor: '#fff',
    links: [
      { label: 'Software Services', href: '/services' },
      { label: 'Custom Software', href: '/services/custom-software-development' },
      { label: 'SaaS Development', href: '/services/saas-development' },
      { label: 'AI Automation', href: '/services/ai-automation' },
      { label: 'Technical Capabilities', href: '/capabilities' },
      { label: 'Work & Case Studies', href: '/work' },
    ],
  },
  {
    label: 'Explore',
    eyebrow: '03 / DECISIONS',
    description: 'Planning notes, engineering viewpoints, pricing, and the next conversation.',
    variant: 'explore',
    bgColor: '#d94382',
    textColor: '#fff',
    links: [
      { label: 'Engineering Insights', href: '/insights' },
      { label: 'Planning Resources', href: '/resources' },
      { label: 'Pricing & Calculator', href: '/pricing' },
      { label: 'Contact Zexton', href: '/contact' },
    ],
  },
];

export default function Navbar() {
  return <CardNav logo="/ZextonLogo.png" logoAlt="Zexton custom software development company" items={items} baseColor="rgba(255,255,255,.97)" menuColor="#111827" buttonBgColor="#225cff" buttonTextColor="#fff" ease="power3.out" />;
}
