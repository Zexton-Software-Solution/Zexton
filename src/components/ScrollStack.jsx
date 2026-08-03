import { useCallback, useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <article className="scroll-stack-card">
    <div className={`scroll-stack-card__surface ${itemClassName}`.trim()}>{children}</div>
  </article>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);
  const cardsRef = useRef([]);
  const cardTopsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const stackCompletedRef = useRef(false);

  const parseViewportPosition = useCallback((value, viewportHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (Number.parseFloat(value) / 100) * viewportHeight;
    }
    return Number.parseFloat(value) || 0;
  }, []);

  const toStickyInset = useCallback((value) => {
    if (typeof value === 'string' && value.includes('%')) {
      return `${Number.parseFloat(value)}vh`;
    }
    return value;
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return { scrollTop: window.scrollY, viewportHeight: window.innerHeight };
    }

    const scroller = scrollerRef.current;
    return { scrollTop: scroller?.scrollTop || 0, viewportHeight: scroller?.clientHeight || 0 };
  }, [useWindowScroll]);

  const getStaticOffset = useCallback((element) => {
    let top = 0;
    let current = element;

    while (current) {
      top += current.offsetTop;
      current = current.offsetParent;
    }

    return top;
  }, []);

  const updateSurfaces = useCallback((scrollTopOverride) => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const { scrollTop: currentScrollTop, viewportHeight } = getScrollData();
    const scrollTop = Number.isFinite(scrollTopOverride) ? scrollTopOverride : currentScrollTop;
    if (!viewportHeight) return;

    const stackPositionPx = parseViewportPosition(stackPosition, viewportHeight);
    const scaleEndPositionPx = parseViewportPosition(scaleEndPosition, viewportHeight);
    let activeIndex = 0;

    if (blurAmount > 0) {
      cardTopsRef.current.forEach((cardTop, index) => {
        if (scrollTop >= cardTop - stackPositionPx - itemStackDistance * index) {
          activeIndex = index;
        }
      });
    }

    cards.forEach(({ surface }, index) => {
      const cardTop = cardTopsRef.current[index];
      const pinStart = cardTop - stackPositionPx - itemStackDistance * index;
      const scaleEnd = Math.max(pinStart + 1, cardTop - scaleEndPositionPx);
      const progress = Math.min(1, Math.max(0, (scrollTop - pinStart) / (scaleEnd - pinStart)));
      const targetScale = Math.min(1, baseScale + index * itemScale);
      const scale = 1 - progress * (1 - targetScale);
      const rotation = rotationAmount * index * progress;
      const blur = index < activeIndex ? (activeIndex - index) * blurAmount : 0;
      const nextTransform = {
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };
      const previousTransform = lastTransformsRef.current.get(index);
      const changed = !previousTransform
        || Math.abs(previousTransform.scale - nextTransform.scale) > 0.001
        || Math.abs(previousTransform.rotation - nextTransform.rotation) > 0.1
        || Math.abs(previousTransform.blur - nextTransform.blur) > 0.1;

      if (changed) {
        surface.style.transform = `translateZ(0) scale(${nextTransform.scale}) rotate(${nextTransform.rotation}deg)`;
        surface.style.filter = nextTransform.blur ? `blur(${nextTransform.blur}px)` : '';
        lastTransformsRef.current.set(index, nextTransform);
      }

      if (index === cards.length - 1) {
        const isComplete = scrollTop >= pinStart;
        if (isComplete && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isComplete) {
          stackCompletedRef.current = false;
        }
      }
    });
  }, [
    baseScale,
    blurAmount,
    getScrollData,
    itemScale,
    itemStackDistance,
    onStackComplete,
    parseViewportPosition,
    rotationAmount,
    scaleEndPosition,
    stackPosition,
  ]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card'))
      .map((card) => ({ card, surface: card.querySelector('.scroll-stack-card__surface') }))
      .filter(({ surface }) => surface);
    const motionDisabled = window.matchMedia(
      '(max-width: 768px), (prefers-reduced-motion: reduce)'
    ).matches;
    const stickyInset = toStickyInset(stackPosition);
    const transformsCache = lastTransformsRef.current;
    let animationFrame = null;
    let measureFrame = null;

    cardsRef.current = cards;
    cards.forEach(({ card, surface }, index) => {
      card.style.marginBottom = index < cards.length - 1
        ? `${motionDisabled ? Math.min(itemDistance, 20) : itemDistance}px`
        : '';
      card.style.zIndex = String(index + 1);
      card.style.position = motionDisabled ? '' : 'sticky';
      card.style.top = motionDisabled ? '' : `calc(${stickyInset} + ${index * itemStackDistance}px)`;
      surface.style.willChange = motionDisabled ? 'auto' : 'transform, filter';
    });

    if (motionDisabled) {
      return () => {
        cardsRef.current = [];
      };
    }

    const measure = () => {
      cardTopsRef.current = cards.map(({ card }) => getStaticOffset(card));
      transformsCache.clear();
      updateSurfaces();
    };

    const requestMeasure = () => {
      if (measureFrame !== null) return;
      measureFrame = requestAnimationFrame(() => {
        measureFrame = null;
        measure();
      });
    };

    const lenis = new Lenis(
      useWindowScroll
        ? {
            lerp: 0.1,
            smoothWheel: true,
            syncTouch: true,
            syncTouchLerp: 0.075,
          }
        : {
            wrapper: scroller,
            content: scroller.querySelector('.scroll-stack-inner'),
            lerp: 0.1,
            smoothWheel: true,
            syncTouch: true,
            syncTouchLerp: 0.075,
          }
    );

    lenis.on('scroll', ({ scroll }) => updateSurfaces(scroll));
    const animate = (time) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(requestMeasure);
    resizeObserver.observe(scroller);
    cards.forEach(({ card }) => resizeObserver.observe(card));
    window.addEventListener('resize', requestMeasure);
    measure();

    return () => {
      window.removeEventListener('resize', requestMeasure);
      resizeObserver.disconnect();
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      if (measureFrame !== null) cancelAnimationFrame(measureFrame);
      lenis.destroy();
      cards.forEach(({ card, surface }) => {
        card.style.marginBottom = '';
        card.style.zIndex = '';
        card.style.position = '';
        card.style.top = '';
        surface.style.transform = '';
        surface.style.filter = '';
        surface.style.willChange = '';
      });
      cardsRef.current = [];
      cardTopsRef.current = [];
      transformsCache.clear();
      stackCompletedRef.current = false;
    };
  }, [
    getStaticOffset,
    itemDistance,
    itemStackDistance,
    stackPosition,
    toStickyInset,
    updateSurfaces,
    useWindowScroll,
  ]);

  // Kept for API compatibility with the React Bits component.
  void scaleDuration;

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" aria-hidden="true" />
      </div>
    </div>
  );
};

export default ScrollStack;
