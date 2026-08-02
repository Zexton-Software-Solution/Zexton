import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './FlowingMenu.css';

function distanceSquared(x, y, x2, y2) {
  const xDiff = x - x2;
  const yDiff = y - y2;
  return xDiff * xDiff + yDiff * yDiff;
}

function closestEdge(mouseX, mouseY, width, height) {
  const topDistance = distanceSquared(mouseX, mouseY, width / 2, 0);
  const bottomDistance = distanceSquared(mouseX, mouseY, width / 2, height);
  return topDistance < bottomDistance ? 'top' : 'bottom';
}

function FlowingMenuItem({ link, text, image, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor, reduceMotion }) {
  const itemRef = useRef(null);
  const overlayRef = useRef(null);
  const trackRef = useRef(null);
  const loopRef = useRef(null);
  const [repetitions, setRepetitions] = useState(4);

  useEffect(() => {
    const calculateRepetitions = () => {
      const firstPart = trackRef.current?.querySelector('.flowing-menu__part');
      if (!firstPart) return;
      const contentWidth = firstPart.offsetWidth;
      if (!contentWidth) return;
      setRepetitions(Math.max(4, Math.ceil(window.innerWidth / contentWidth) + 2));
    };
    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [image, text]);

  useEffect(() => {
    const track = trackRef.current;
    const firstPart = track?.querySelector('.flowing-menu__part');
    if (!track || !firstPart || !firstPart.offsetWidth) return undefined;
    loopRef.current?.kill();
    gsap.set(track, { x: 0 });
    if (reduceMotion) return undefined;
    loopRef.current = gsap.to(track, {
      x: -firstPart.offsetWidth,
      duration: speed,
      ease: 'none',
      repeat: -1,
    });
    return () => {
      loopRef.current?.kill();
      loopRef.current = null;
    };
  }, [reduceMotion, repetitions, speed]);

  const reveal = (edge = 'bottom') => {
    if (!overlayRef.current || !trackRef.current) return;
    const direction = edge === 'top' ? '-101%' : '101%';
    gsap.timeline({ defaults: { duration: reduceMotion ? 0 : 0.55, ease: 'expo.out' } })
      .set(overlayRef.current, { y: direction }, 0)
      .set(trackRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([overlayRef.current, trackRef.current], { y: '0%' }, 0);
  };

  const hide = (edge = 'bottom') => {
    if (!overlayRef.current || !trackRef.current) return;
    gsap.timeline({ defaults: { duration: reduceMotion ? 0 : 0.48, ease: 'expo.inOut' } })
      .to(overlayRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(trackRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  const edgeFromEvent = (event) => {
    const rect = itemRef.current?.getBoundingClientRect();
    if (!rect) return 'bottom';
    return closestEdge(event.clientX - rect.left, event.clientY - rect.top, rect.width, rect.height);
  };

  return (
    <div ref={itemRef} className="flowing-menu__item" style={{ borderColor }}>
      <a
        className="flowing-menu__link"
        href={link}
        style={{ color: textColor }}
        onMouseEnter={(event) => reveal(edgeFromEvent(event))}
        onMouseLeave={(event) => hide(edgeFromEvent(event))}
        onFocus={() => reveal('bottom')}
        onBlur={() => hide('bottom')}
      >
        <span>{text}</span>
        <span className="flowing-menu__arrow" aria-hidden="true">↗</span>
      </a>
      <div ref={overlayRef} className="flowing-menu__overlay" style={{ backgroundColor: marqueeBgColor }} aria-hidden="true">
        <div className="flowing-menu__viewport">
          <div ref={trackRef} className="flowing-menu__track">
            {Array.from({ length: repetitions }, (_, index) => (
              <div className="flowing-menu__part" key={`${text}-${index}`} style={{ color: marqueeTextColor }}>
                <span>{text}</span>
                <div className="flowing-menu__image" style={{ backgroundImage: `url(${image})` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FlowingMenu({
  items = [],
  speed = 15,
  textColor = '#fff',
  bgColor = '#120f17',
  marqueeBgColor = '#fff',
  marqueeTextColor = '#120f17',
  borderColor = 'rgba(255,255,255,.35)',
  ariaLabel = 'Explore Zexton services',
}) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <div className="flowing-menu" style={{ backgroundColor: bgColor }}>
      <nav className="flowing-menu__nav" aria-label={ariaLabel}>
        {items.map((item) => (
          <FlowingMenuItem
            key={item.text}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            reduceMotion={reduceMotion}
          />
        ))}
      </nav>
    </div>
  );
}
