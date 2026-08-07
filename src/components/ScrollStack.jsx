import { useLayoutEffect, useRef, useCallback } from 'react';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className="scroll-stack-card">
    <div className={`scroll-stack-card__surface ${itemClassName}`.trim()}>{children}</div>
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 280,
  itemScale = 0.03,
  itemStackDistance = 28,
  stackPosition = '80px',
  baseScale = 0.88,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const cardsRef = useRef([]);
  const cardTopsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const stackCompletedRef = useRef(false);

  const parseViewportPosition = useCallback((value, viewportHeight) => {
    if (typeof value === 'string' && value.includes('px')) {
      return parseFloat(value) || 80;
    }
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * viewportHeight;
    }
    return parseFloat(value) || 80;
  }, []);

  const toStickyInset = useCallback((value) => {
    if (typeof value === 'string' && value.includes('px')) {
      return value;
    }
    if (typeof value === 'string' && value.includes('%')) {
      return `${parseFloat(value)}vh`;
    }
    return typeof value === 'number' ? `${value}px` : '80px';
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

  const updateCardTransforms = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const { scrollTop, viewportHeight } = getScrollData();
    if (!viewportHeight) return;

    const stackPositionPx = parseViewportPosition(stackPosition, viewportHeight);
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
      const scaleEnd = pinStart + viewportHeight * 0.4;
      const progress = Math.min(1, Math.max(0, (scrollTop - pinStart) / (scaleEnd - pinStart)));
      const targetScale = Math.min(1, baseScale + index * itemScale);
      const scale = 1 - progress * (1 - targetScale);
      const rotation = rotationAmount ? rotationAmount * index * progress : 0;
      const blur = index < activeIndex ? (activeIndex - index) * blurAmount : 0;

      const nextTransform = {
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const previousTransform = lastTransformsRef.current.get(index);
      const changed =
        !previousTransform ||
        Math.abs(previousTransform.scale - nextTransform.scale) > 0.001 ||
        Math.abs(previousTransform.rotation - nextTransform.rotation) > 0.1 ||
        Math.abs(previousTransform.blur - nextTransform.blur) > 0.1;

      if (changed) {
        surface.style.transform = `scale(${nextTransform.scale}) rotate(${nextTransform.rotation}deg)`;
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
    stackPosition
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

    cardsRef.current = cards;

    cards.forEach(({ card, surface }, index) => {
      const isLast = index === cards.length - 1;
      card.style.marginBottom = isLast ? '0px' : `${motionDisabled ? 20 : itemDistance}px`;
      card.style.zIndex = String(index + 1);
      card.style.position = motionDisabled ? 'relative' : 'sticky';
      card.style.top = motionDisabled ? 'auto' : `calc(${stickyInset} + ${index * itemStackDistance}px)`;
      surface.style.willChange = motionDisabled ? 'auto' : 'transform, filter';
      surface.style.transformOrigin = 'top center';
    });

    if (motionDisabled) {
      return () => {
        cardsRef.current = [];
      };
    }

    const measure = () => {
      cardTopsRef.current = cards.map(({ card }) => getStaticOffset(card));
      transformsCache.clear();
      updateCardTransforms();
    };

    let animationFrame = null;
    const handleScroll = () => {
      if (animationFrame) return;
      animationFrame = requestAnimationFrame(() => {
        animationFrame = null;
        updateCardTransforms();
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', measure);
    measure();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', measure);
      if (animationFrame) cancelAnimationFrame(animationFrame);
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
    updateCardTransforms
  ]);

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
