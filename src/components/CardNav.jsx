import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import './CardNav.css';

export default function CardNav({
  logo,
  logoAlt = 'Logo',
  items = [],
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor = '#111827',
  buttonBgColor = '#225cff',
  buttonTextColor = '#fff',
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const timelineRef = useRef(null);

  const calculateHeight = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return 350;
    const content = nav.querySelector('.card-nav-content');
    if (!content) return 350;

    const prevPos = content.style.position;
    const prevH = content.style.height;
    const prevVis = content.style.visibility;
    const prevTop = content.style.top;

    content.style.position = 'absolute';
    content.style.top = '64px';
    content.style.height = 'auto';
    content.style.visibility = 'hidden';

    const measuredH = content.offsetHeight || content.scrollHeight || 480;
    const totalH = 64 + measuredH + 16;

    content.style.position = prevPos;
    content.style.height = prevH;
    content.style.visibility = prevVis;
    content.style.top = prevTop;

    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
      return Math.min(totalH, Math.round(window.innerHeight * 0.96));
    }

    return Math.max(totalH, 348);
  }, []);

  const createTimeline = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return null;
    const baseH = isCompact ? 58 : 72;
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    
    gsap.set(nav, { height: baseH });
    gsap.set(cardsRef.current.filter(Boolean), { y: isMobile ? 16 : 26, opacity: 0 });

    const targetH = calculateHeight();

    return gsap
      .timeline({ paused: true })
      .to(nav, { height: targetH, duration: 0.38, ease })
      .to(
        cardsRef.current.filter(Boolean),
        { y: 0, opacity: 1, duration: 0.32, ease, stagger: 0.05 },
        '-=0.2'
      );
  }, [calculateHeight, ease, isCompact]);

  useLayoutEffect(() => {
    timelineRef.current = createTimeline();
    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [createTimeline]);

  useLayoutEffect(() => {
    const handleResize = () => {
      timelineRef.current?.kill();
      timelineRef.current = createTimeline();
      if (isExpanded) timelineRef.current?.progress(1);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [createTimeline, isExpanded]);

  useEffect(() => {
    const updateCompactState = () => {
      const nextCompact = window.scrollY > 160;
      setIsCompact((current) => {
        if (current === nextCompact) return current;
        if (nextCompact) {
          timelineRef.current?.pause(0);
          setIsExpanded(false);
        }
        if (navRef.current) gsap.to(navRef.current, { height: nextCompact ? 58 : 72, duration: 0.3, ease: 'power3.out' });
        return nextCompact;
      });
    };
    updateCompactState();
    window.addEventListener('scroll', updateCompactState, { passive: true });
    return () => window.removeEventListener('scroll', updateCompactState);
  }, []);

  const openMenu = useCallback(() => {
    if (isCompact) return;
    const timeline = timelineRef.current;
    if (!timeline) return;
    setIsExpanded(true);
    timeline.eventCallback('onReverseComplete', null);
    timeline.play();
  }, [isCompact]);

  const closeMenu = useCallback(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    timeline.eventCallback('onReverseComplete', () => setIsExpanded(false));
    timeline.reverse();
  }, []);

  const toggleMenu = () => {
    if (isCompact) return;
    if (isExpanded) closeMenu();
    else openMenu();
  };

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
