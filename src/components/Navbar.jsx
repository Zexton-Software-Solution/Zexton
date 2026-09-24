import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, ChevronDown, Code2, Headphones, LifeBuoy, Mail, Menu, MessageSquare, Receipt, ShieldCheck, X } from 'lucide-react';
import { extraServiceLinks, inr, lowestPrice, productGroups, productsInGroup } from '../productPagesData';
import { routeMetadata } from '../siteMetadata';
import { productIcons } from './productIcons';
import './Navbar.css';

const productMenus = productGroups.map((group) => ({
  ...group,
  links: productsInGroup(group.id).map((page) => {
    const price = lowestPrice(page);
    return {
      href: page.path,
      label: page.breadcrumbLabel,
      desc: page.navDesc,
      icon: productIcons[page.icon],
      price: price === 0 ? 'Free' : `From ${inr(price)}`,
    };
  }),
}));

const menus = [
  ...productMenus,
  {
    id: 'services',
    label: 'Services',
    blurb: 'Custom software, apps, AI and managed IT from the Zexton engineering team.',
    links: extraServiceLinks.map(([route, label]) => ({
      href: routeMetadata[route].path,
      label,
      desc: routeMetadata[route].description.split(/[.:]/)[0],
      icon: Code2,
    })),
  },
  {
    id: 'support',
    label: 'Support',
    blurb: 'Help articles, tickets and people who answer — 24 hours a day.',
    links: [
      { href: '/support', label: 'Help Center', desc: 'Guides for domains, hosting, email & servers', icon: LifeBuoy },
      { href: '/contact', label: 'Raise a Ticket', desc: 'Technical, billing and sales help', icon: MessageSquare },
      { href: '/pricing', label: 'Project Pricing', desc: 'Website & software cost calculator', icon: Receipt },
      { href: '/insights', label: 'Knowledge & Insights', desc: 'Articles and technology guides', icon: BookOpen },
      { href: '/about', label: 'About Zexton', desc: 'Who we are and how we work', icon: ShieldCheck },
    ],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(null);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') { setOpen(null); setDrawer(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawer]);

  const close = () => { setOpen(null); setDrawer(false); };

  return (
    <header className="zx-header">
      <div className="zx-topbar">
        <div className="zx-bar">
          <span><ShieldCheck size={14} /> Free SSL, migration &amp; 24/7 support on every hosting plan</span>
          <nav aria-label="Utility">
            <a href="/support"><Headphones size={14} /> Help Center</a>
            <a href="mailto:info@zexton.com"><Mail size={14} /> info@zexton.com</a>
            <a href="/contact">Contact Sales</a>
          </nav>
        </div>
      </div>

      <div className="zx-main" onMouseLeave={() => setOpen(null)}>
        <div className="zx-bar">
          <a href="/" className="zx-logo" aria-label="Zexton home" onClick={close}><img src="/ZextonLogo.png" alt="Zexton" /></a>

          <nav className={`zx-nav ${drawer ? 'is-open' : ''}`} aria-label="Primary navigation">
            <ul>
              {menus.map((menu) => (
                <li key={menu.id} className={open === menu.id ? 'is-active' : ''} onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setOpen(menu.id)}>
                  <button type="button" aria-expanded={open === menu.id} onClick={() => setOpen(open === menu.id ? null : menu.id)}>
                    {menu.label} <ChevronDown size={15} />
                  </button>
                  <div className="zx-panel">
                    <div className="zx-panel__inner">
                      <div className="zx-panel__intro">
                        <strong>{menu.label}</strong>
                        <p>{menu.blurb}</p>
                        <a href="/contact" onClick={close}>Talk to an expert <ArrowRight size={15} /></a>
                      </div>
                      <div className="zx-panel__links">
                        {menu.links.map(({ href, label, desc, icon: Icon, price }) => (
                          <a key={href} href={href} onClick={close}>
                            <span className="zx-panel__icon">{Icon && <Icon size={19} />}</span>
                            <span>
                              <strong>{label}</strong>
                              <small>{desc}</small>
                              {price && <em>{price}</em>}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <a className="zx-cta zx-cta--mobile" href="/contact" onClick={close}>Get Started <ArrowRight size={16} /></a>
          </nav>

          <a className="zx-cta" href="/contact">Get Started <ArrowRight size={16} /></a>
          <button type="button" className="zx-burger" aria-label={drawer ? 'Close menu' : 'Open menu'} aria-expanded={drawer} onClick={() => setDrawer(!drawer)}>
            {drawer ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
