import { useCallback, useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className="scroll-stack-card-wrapper">
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
  </div>
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
  const endTopRef = useRef(0);
  const lastTransformsRef = useRef(new Map());
  const stackCompletedRef = useRef(false);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (Number.parseFloat(value) / 100) * containerHeight;
    }
    return Number.parseFloat(value) || 0;
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return { scrollTop: window.scrollY, containerHeight: window.innerHeight };
    }

    const scroller = scrollerRef.current;
    return { scrollTop: scroller?.scrollTop || 0, containerHeight: scroller?.clientHeight || 0 };
  }, [useWindowScroll]);

  const getElementOffset = useCallback((element) => {
    if (useWindowScroll) {
      return element.getBoundingClientRect().top + window.scrollY;
    }
    return element.offsetTop;
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const { scrollTop, containerHeight } = getScrollData();
    if (!containerHeight) return;

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const pinEnd = endTopRef.current - containerHeight / 2;
    let topCardIndex = 0;

    if (blurAmount > 0) {
      cardTopsRef.current.forEach((cardTop, index) => {
        if (scrollTop >= cardTop - stackPositionPx - itemStackDistance * index) {
          topCardIndex = index;
        }
      });
    }

    cards.forEach((card, index) => {
      const cardTop = cardTopsRef.current[index];
      const pinStart = cardTop - stackPositionPx - itemStackDistance * index;
      const scaleEnd = Math.max(pinStart + 1, cardTop - scaleEndPositionPx);
      const scaleProgress = Math.min(1, Math.max(0, (scrollTop - pinStart) / (scaleEnd - pinStart)));
      const targetScale = Math.min(1, baseScale + index * itemScale);
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount * index * scaleProgress;

      let translateY = 0;
      if (scrollTop >= pinStart) {
        translateY = Math.min(scrollTop, pinEnd) - cardTop + stackPositionPx + itemStackDistance * index;
      }

      const blur = index < topCardIndex ? (topCardIndex - index) * blurAmount : 0;
      const nextTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };
      const previousTransform = lastTransformsRef.current.get(index);
      const changed = !previousTransform
        || Math.abs(previousTransform.translateY - nextTransform.translateY) > 0.1
        || Math.abs(previousTransform.scale - nextTransform.scale) > 0.001
        || Math.abs(previousTransform.rotation - nextTransform.rotation) > 0.1
        || Math.abs(previousTransform.blur - nextTransform.blur) > 0.1;

      if (changed) {
        card.style.transform = `translate3d(0, ${nextTransform.translateY}px, 0) scale(${nextTransform.scale}) rotate(${nextTransform.rotation}deg)`;
        card.style.filter = nextTransform.blur ? `blur(${nextTransform.blur}px)` : '';
        lastTransformsRef.current.set(index, nextTransform);
      }

      if (index === cards.length - 1) {
        const isComplete = scrollTop >= pinStart && scrollTop <= pinEnd;
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
    parsePercentage,
    rotationAmount,
    scaleEndPosition,
    stackPosition,
  ]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const transformsCache = lastTransformsRef.current;
    let animationFrame = null;
    let measureFrame = null;
    const wrappers = Array.from(scroller.querySelectorAll('.scroll-stack-card-wrapper'));
    const cards = wrappers
      .map((wrapper) => wrapper.querySelector('.scroll-stack-card'))
      .filter(Boolean);
    const endElement = scroller.querySelector('.scroll-stack-end');
    const motionDisabled = window.matchMedia(
      '(max-width: 768px), (prefers-reduced-motion: reduce)'
    ).matches;

    cardsRef.current = cards;
    cards.forEach((card, index) => {
      const wrapper = wrappers[index];
      wrapper.style.marginBottom = index < cards.length - 1
        ? `${motionDisabled ? Math.min(itemDistance, 20) : itemDistance}px`
        : '';
      card.style.zIndex = String(index + 1);
      card.style.willChange = motionDisabled ? 'auto' : 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.webkitBackfaceVisibility = 'hidden';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    if (motionDisabled) {
      cards.forEach((card) => {
        card.style.transform = '';
        card.style.filter = '';
      });
      return () => {
        cardsRef.current = [];
      };
    }

    const measure = () => {
      cardTopsRef.current = wrappers.map(getElementOffset);
      endTopRef.current = endElement ? getElementOffset(endElement) : 0;
      lastTransformsRef.current.clear();
      updateCardTransforms();
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
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            syncTouch: true,
            syncTouchLerp: 0.075,
          }
        : {
            wrapper: scroller,
            content: scroller.querySelector('.scroll-stack-inner'),
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            syncTouch: true,
            syncTouchLerp: 0.075,
          }
    );

    lenis.on('scroll', updateCardTransforms);
    const animate = (time) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(requestMeasure);
    resizeObserver.observe(scroller);
    wrappers.forEach((wrapper) => resizeObserver.observe(wrapper));
    window.addEventListener('resize', requestMeasure);
    measure();

    return () => {
      window.removeEventListener('resize', requestMeasure);
      resizeObserver.disconnect();
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      if (measureFrame !== null) cancelAnimationFrame(measureFrame);
      lenis.destroy();
      cards.forEach((card, index) => {
        card.style.transform = '';
        card.style.filter = '';
        card.style.willChange = '';
        card.style.zIndex = '';
        wrappers[index].style.marginBottom = '';
      });
      cardsRef.current = [];
      cardTopsRef.current = [];
      transformsCache.clear();
      stackCompletedRef.current = false;
    };
  }, [
    getElementOffset,
    itemDistance,
    updateCardTransforms,
    useWindowScroll,
  ]);

  // Retained for API compatibility with the React Bits component.
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
