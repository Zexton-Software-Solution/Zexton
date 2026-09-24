import { useEffect, useState } from 'react';
import { BookOpen, ChevronDown, Code2, LifeBuoy, Menu, MessageSquare, Receipt, ShieldCheck, X } from 'lucide-react';
import { extraServiceLinks, lowestPrice, productGroups, productsInGroup } from '../productPagesData';
import { money, useRegion } from '../region';
import { routeMetadata } from '../siteMetadata';
import { productIcons } from './productIcons';
import RegionSelect from './RegionSelect';
import './Navbar.css';

const programLinks = productsInGroup('partners').map((page) => ({ href: page.path, label: page.breadcrumbLabel, desc: page.navDesc, icon: productIcons[page.icon] }));

const menus = [
  ...productGroups.map((group) => ({
    ...group,
    links: productsInGroup(group.id).map((page) => ({
      href: page.path,
      label: page.breadcrumbLabel,
      desc: page.navDesc,
      icon: productIcons[page.icon],
      price: lowestPrice(page),
    })),
  })),
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
    blurb: 'Help articles, tickets, and programs for partners and resellers.',
    links: [
      { href: '/support', label: 'Help Center', desc: 'Guides for domains, hosting, email & servers', icon: LifeBuoy },
      { href: '/contact', label: 'Raise a ticket', desc: 'Technical, billing and sales help', icon: MessageSquare },
      { href: '/pricing', label: 'Project pricing', desc: 'Website & software cost calculator', icon: Receipt },
      { href: '/insights', label: 'Guides & insights', desc: 'Articles and technology guides', icon: BookOpen },
      { href: '/about', label: 'About Zexton', desc: 'Who we are and how we work', icon: ShieldCheck },
      ...programLinks,
    ],
  },
];

export default function Navbar() {
  const region = useRegion();
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
    <header className="zx-header" onMouseLeave={() => setOpen(null)}>
      <div className="zx-bar wrap">
        <a href="/" className="zx-logo" aria-label="Zexton home" onClick={close}><img src="/zexton-logo.webp" alt="Zexton IT Solutions" width="120" height="56" /></a>

        <nav className={`zx-nav ${drawer ? 'is-open' : ''}`} aria-label="Primary navigation">
          <ul>
            {menus.map((menu) => (
              <li key={menu.id} className={open === menu.id ? 'is-active' : ''} onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setOpen(menu.id)}>
                <button type="button" aria-expanded={open === menu.id} onClick={() => setOpen(open === menu.id ? null : menu.id)}>
                  {menu.label} <ChevronDown size={14} aria-hidden="true" />
                </button>
                <div className="zx-panel">
                  <div className="zx-panel__inner wrap">
                    <div className="zx-panel__intro">
                      <strong>{menu.label}</strong>
                      <p>{menu.blurb}</p>
                    </div>
                    <div className="zx-panel__links">
                      {menu.links.map(({ href, label, desc, icon: Icon, price }) => (
                        <a key={href} href={href} onClick={close}>
                          {Icon && <Icon size={16} aria-hidden="true" />}
                          <span>
                            <strong>{label}{price !== undefined && <em className="num">{price === 0 ? 'Free' : `from ${money(price, region)}`}</em>}</strong>
                            <small>{desc}</small>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="zx-nav__mobile-actions">
            <RegionSelect />
            <a className="btn btn--primary btn--lg btn--block" href="/contact" onClick={close}>Get started</a>
          </div>
        </nav>

        <div className="zx-actions">
          <RegionSelect />
          <a className="zx-actions__link" href="/contact">Contact sales</a>
          <a className="btn btn--primary" href="/contact">Get started</a>
        </div>
        <button type="button" className="zx-burger" aria-label={drawer ? 'Close menu' : 'Open menu'} aria-expanded={drawer} onClick={() => setDrawer(!drawer)}>
          {drawer ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
