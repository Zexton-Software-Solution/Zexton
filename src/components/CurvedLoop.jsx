import { useEffect, useId, useMemo, useRef, useState } from 'react';
import './CurvedLoop.css';

export default function CurvedLoop({
  marqueeText = '',
  speed = 1,
  className = '',
  curveAmount = 280,
  direction = 'left',
  interactive = true,
}) {
  const text = useMemo(() => `${marqueeText.trimEnd()}\u00A0`, [marqueeText]);
  const measureRef = useRef(null);
  const textPathRef = useRef(null);
  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const directionRef = useRef(direction);
  const velocityRef = useRef(0);
  const [spacing, setSpacing] = useState(0);
  const id = useId().replace(/:/g, '');
  const pathId = `curve-${id}`;

  // A pronounced U-curve that stays fully inside the 360px SVG viewBox.
  const pathD = `M -200,100 Q 720,${100 + curveAmount} 1640,100`;

  const repeatedText = spacing
    ? Array(Math.ceil(2400 / spacing) + 3).fill(text).join('')
    : text;

  useEffect(() => {
    const measure = () => {
      if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [text, className]);

  useEffect(() => {
    if (!spacing || !textPathRef.current) return;
    textPathRef.current.setAttribute('startOffset', `${-spacing}px`);
  }, [spacing]);

  useEffect(() => {
    if (!spacing) return undefined;
    let frameId;
    const animate = () => {
      if (!dragRef.current && textPathRef.current) {
        const current = Number.parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
        const delta = directionRef.current === 'right' ? speed : -speed;
        let next = current + delta;
        if (next <= -spacing) next += spacing;
        if (next > 0) next -= spacing;
        textPathRef.current.setAttribute('startOffset', `${next}px`);
      }
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [spacing, speed]);

  const handlePointerDown = (e) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!interactive || !dragRef.current || !textPathRef.current || !spacing) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velocityRef.current = dx;
    const current = Number.parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
    let next = current + dx;
    if (next <= -spacing) next += spacing;
    if (next > 0) next -= spacing;
    textPathRef.current.setAttribute('startOffset', `${next}px`);
  };

  const handlePointerEnd = () => {
    if (!interactive) return;
    dragRef.current = false;
    if (velocityRef.current !== 0) directionRef.current = velocityRef.current > 0 ? 'right' : 'left';
  };

  return (
    <div
      className={`curved-loop-wrapper ${interactive ? 'curved-loop-wrapper--interactive' : ''}`}
      style={{ visibility: spacing ? 'visible' : 'hidden' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onPointerLeave={handlePointerEnd}
      role="img"
      aria-label={marqueeText}
    >
      <svg
        className="curved-loop-svg"
        viewBox="0 45 1440 250"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Hidden measurement text */}
        <text
          ref={measureRef}
          className={`curved-loop-text ${className}`}
          xmlSpace="preserve"
          style={{ visibility: 'hidden', position: 'absolute' }}
        >
          {text}
        </text>

        <defs>
          <path id={pathId} d={pathD} fill="none" />
        </defs>

        <path className="curved-loop-ribbon" d={pathD} aria-hidden="true" />

        {spacing > 0 && (
          <text className={`curved-loop-text ${className}`} xmlSpace="preserve">
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset={`${-spacing}px`}
            >
              {repeatedText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
}
