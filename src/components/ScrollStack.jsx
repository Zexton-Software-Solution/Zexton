import { useCallback, useLayoutEffect, useRef } from 'react';
import './ScrollStack.css';

export function ScrollStackItem({ children, itemClassName = '' }) {
  return <article className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</article>;
}

export default function ScrollStack({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.025,
  itemStackDistance = 26,
  stackPosition = '16%',
  scaleEndPosition = '8%',
  baseScale = 0.88,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete,
}) {
  const rootRef = useRef(null);
  const cardsRef = useRef([]);
  const cardTopsRef = useRef([]);
  const frameRef = useRef(null);
  const motionDisabledRef = useRef(false);
  const completedRef = useRef(false);

  const parsePercent = useCallback((value) => {
    if (typeof value === 'string' && value.includes('%')) return Number.parseFloat(value);
    return Number.parseFloat(value) || 0;
  }, []);

  const update = useCallback(() => {
    const root = rootRef.current;
    const cards = cardsRef.current;
    if (!root || !cards.length || motionDisabledRef.current) return;

    const scrollTop = useWindowScroll ? window.scrollY : root.scrollTop;
    const viewportHeight = useWindowScroll ? window.innerHeight : root.clientHeight;
    const stackY = (parsePercent(stackPosition) / 100) * viewportHeight;
    const scaleEndY = (parsePercent(scaleEndPosition) / 100) * viewportHeight;
    let activeIndex = 0;

    if (blurAmount > 0) {
      cardTopsRef.current.forEach((top, index) => {
        if (scrollTop >= top - stackY - itemStackDistance * index) activeIndex = index;
      });
    }

    cards.forEach((card, index) => {
      const cardTop = cardTopsRef.current[index];
      const pinStart = cardTop - stackY - itemStackDistance * index;
      const scaleEnd = Math.max(pinStart + 1, cardTop - scaleEndY);
      const scaleProgress = Math.min(1, Math.max(0, (scrollTop - pinStart) / (scaleEnd - pinStart)));
      const targetScale = Math.min(1, baseScale + index * itemScale);
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount * index * scaleProgress;

      card.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
      if (blurAmount > 0) {
        const blur = index < activeIndex ? (activeIndex - index) * blurAmount : 0;
        card.style.filter = blur ? `blur(${blur}px)` : '';
      }
    });

    const lastIndex = cards.length - 1;
    const lastStart = cardTopsRef.current[lastIndex] - stackY - itemStackDistance * lastIndex;
    const isComplete = scrollTop >= lastStart;
    if (isComplete && !completedRef.current) {
      completedRef.current = true;
      onStackComplete?.();
    } else if (!isComplete) {
      completedRef.current = false;
    }
  }, [
    baseScale,
    blurAmount,
    itemScale,
    itemStackDistance,
    onStackComplete,
    parsePercent,
    rotationAmount,
    scaleEndPosition,
    stackPosition,
    useWindowScroll,
  ]);

  const requestUpdate = useCallback(() => {
    if (motionDisabledRef.current || frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      update();
    });
  }, [update]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const cards = Array.from(root.querySelectorAll('.scroll-stack-card'));
    const motionQuery = window.matchMedia('(max-width: 760px), (prefers-reduced-motion: reduce)');
    const scrollTarget = useWindowScroll ? window : root;
    const stackPercent = parsePercent(stackPosition);
    cardsRef.current = cards;

    const clearStyles = () => {
      cards.forEach((card) => {
        card.style.transform = '';
        card.style.filter = '';
      });
    };

    const applyLayout = () => {
      const disabled = motionDisabledRef.current;
      cards.forEach((card, index) => {
        card.style.marginBottom = index < cards.length - 1 ? `${disabled ? 20 : itemDistance}px` : '';
        if (disabled) {
          card.style.position = '';
          card.style.top = '';
          card.style.zIndex = '';
        } else {
          card.style.position = 'sticky';
          card.style.top = `calc(${stackPercent}vh + ${index * itemStackDistance}px)`;
          card.style.zIndex = String(index + 1);
        }
      });
    };

    const measure = () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      clearStyles();
      cardTopsRef.current = cards.map((card) => (
        useWindowScroll ? card.getBoundingClientRect().top + window.scrollY : card.offsetTop
      ));
      if (!motionDisabledRef.current) update();
    };

    const updateMotionMode = () => {
      motionDisabledRef.current = motionQuery.matches;
      applyLayout();
      measure();
    };

    updateMotionMode();
    scrollTarget.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', measure);
    motionQuery.addEventListener('change', updateMotionMode);

    return () => {
      scrollTarget.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', measure);
      motionQuery.removeEventListener('change', updateMotionMode);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      clearStyles();
      cards.forEach((card) => {
        card.style.marginBottom = '';
        card.style.position = '';
        card.style.top = '';
        card.style.zIndex = '';
      });
      cardsRef.current = [];
      completedRef.current = false;
    };
  }, [itemDistance, itemStackDistance, parsePercent, requestUpdate, stackPosition, update, useWindowScroll]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={rootRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" aria-hidden="true" />
      </div>
    </div>
  );
}
