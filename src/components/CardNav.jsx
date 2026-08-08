import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import './CardNav.css';

export default function CardNav({
  logo,
  logoAlt = 'Logo',
  items = [],
  className = '',
  baseColor = '#fff',
  menuColor = '#111827',
  buttonBgColor = '#225cff',
  buttonTextColor = '#fff',
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);

  const openMenu = useCallback(() => {
    if (isCompact) return;
    const nav = navRef.current;
    if (!nav) return;

    setIsExpanded(true);

    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    const content = nav.querySelector('.card-nav-content');

    let targetH = isMobile ? 560 : 360;

    if (content) {
      const prevPos = content.style.position;
      const prevH = content.style.height;
      const prevVis = content.style.visibility;
      const prevDisplay = content.style.display;

      content.style.position = 'relative';
      content.style.height = 'auto';
      content.style.visibility = 'hidden';
      content.style.display = 'flex';

      const measuredH = content.offsetHeight || content.scrollHeight || 460;
      const headerH = isMobile ? 64 : 72;
      const totalH = headerH + measuredH + 16;

      content.style.position = prevPos;
      content.style.height = prevH;
      content.style.visibility = prevVis;
      content.style.display = prevDisplay;

      if (isMobile) {
        targetH = Math.min(totalH, Math.round(window.innerHeight * 0.94));
      } else {
        targetH = Math.max(totalH, 350);
      }
    }

    gsap.killTweensOf(nav);
    gsap.killTweensOf(cardsRef.current.filter(Boolean));

    gsap.to(nav, { height: targetH, duration: 0.4, ease: 'power3.out' });
    gsap.fromTo(
      cardsRef.current.filter(Boolean),
      { y: isMobile ? 18 : 26, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out', stagger: 0.06, delay: 0.08 }
    );
  }, [isCompact]);

  const closeMenu = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;

    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    const baseH = isCompact ? 58 : (isMobile ? 64 : 72);

    gsap.killTweensOf(nav);
    gsap.killTweensOf(cardsRef.current.filter(Boolean));

    gsap.to(cardsRef.current.filter(Boolean), {
      y: 16,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      stagger: 0.03
    });

    gsap.to(nav, {
      height: baseH,
      duration: 0.35,
      ease: 'power3.inOut',
      onComplete: () => setIsExpanded(false)
    });
  }, [isCompact]);

  const toggleMenu = () => {
    if (isCompact) return;
    if (isExpanded) closeMenu();
    else openMenu();
  };

  useEffect(() => {
    const updateCompactState = () => {
      const nextCompact = window.scrollY > 160;
      setIsCompact((current) => {
        if (current === nextCompact) return current;
        if (nextCompact && isExpanded) {
          closeMenu();
        }
        const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
        const defaultH = isMobile ? 64 : 72;
        if (navRef.current) gsap.to(navRef.current, { height: nextCompact ? 58 : defaultH, duration: 0.3, ease: 'power3.out' });
        return nextCompact;
      });
    };
    updateCompactState();
    window.addEventListener('scroll', updateCompactState, { passive: true });
    return () => window.removeEventListener('scroll', updateCompactState);
  }, [closeMenu, isExpanded]);

  const handleLink = () => {
    if (isExpanded) closeMenu();
  };

  const supportsDesktopHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const handlePointerEnter = () => {
    if (supportsDesktopHover()) openMenu();
  };

  const handlePointerLeave = () => {
    if (!supportsDesktopHover()) return;
    window.requestAnimationFrame(() => {
      const nav = navRef.current;
      if (!nav || nav.contains(document.activeElement)) return;
      closeMenu();
    });
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget) && !event.currentTarget.matches(':hover')) closeMenu();
  };

  const handleKeyDown = (event) => {
    if (event.key !== 'Escape' || !isExpanded) return;
    event.preventDefault();
    closeMenu();
    event.currentTarget.querySelector('.hamburger-menu')?.focus();
  };

  return (
    <div
      className={`card-nav-container ${isCompact ? 'is-compact' : ''} ${className}`.trim()}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onBlurCapture={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: baseColor }} aria-label="Primary navigation">
        <div className="card-nav-top">
          <button type="button" className={`hamburger-menu ${isExpanded ? 'open' : ''}`} onClick={toggleMenu} aria-label={isExpanded ? 'Close menu' : 'Open menu'} aria-expanded={isExpanded} style={{ color: menuColor }}>
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>

          <a href="/" className="card-nav-logo" aria-label="Zexton home">
            <img src={logo} alt={logoAlt} />
          </a>

          <a href="/contact" className="card-nav-cta-button" style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}>
            Work With Us <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {items.slice(0, 3).map((item, index) => (
            <div key={item.label} className={`nav-card nav-card--${item.variant || index + 1}`} ref={(element) => { cardsRef.current[index] = element; }} style={{ backgroundColor: item.bgColor, color: item.textColor }}>
              <div className="nav-card-header">
                <span className="nav-card-eyebrow">{item.eyebrow || `0${index + 1}`}</span>
                <div className="nav-card-label">{item.label}</div>
                {item.description && <p className="nav-card-description">{item.description}</p>}
              </div>
              <div className="nav-card-links">
                {item.links.map((link, linkIndex) => (
                  <a key={link.label} className="nav-card-link" href={link.href} aria-label={link.ariaLabel || link.label} onClick={handleLink}>
                    <span className="nav-card-link-number">{String(linkIndex + 1).padStart(2, '0')}</span>
                    <span>{link.label}</span>
                    <ArrowUpRight className="nav-card-link-icon" size={15} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
