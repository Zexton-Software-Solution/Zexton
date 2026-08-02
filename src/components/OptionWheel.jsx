import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import './OptionWheel.css';

const VISIBLE_RANGE = 5;
const WHEEL_THRESHOLD = 28;
const WHEEL_COOLDOWN = 90;
const DRAG_THRESHOLD = 6;
const SNAP_THRESHOLD = 0.02;

function wrapDistance(index, position, length) {
  let distance = index - position;
  distance = ((distance % length) + length) % length;
  if (distance > length / 2) distance -= length;
  return distance;
}

export default function OptionWheel({
  items,
  defaultSelected = 0,
  onChange,
  side = 'center',
  fontSize = 2.2,
  spacing = 1.35,
  curve = 0.4,
  tilt = 4,
  fade = 0.2,
  smoothing = 125,
  loop = false,
  draggable = true
}) {
  const rootRef = useRef(null);
  const itemRefs = useRef(new Map());
  const geometryRef = useRef({
    rowHeight: fontSize * spacing * 16,
    angle: (tilt * Math.PI) / 180,
    radius: 0
  });
  const positionRef = useRef(defaultSelected);
  const targetRef = useRef(defaultSelected);
  const selectedRef = useRef(defaultSelected);
  const onChangeRef = useRef(onChange);
  const frameRef = useRef(null);
  const lastFrameRef = useRef(0);
  const dragRef = useRef(null);
  const reducedMotionRef = useRef(false);
  const wheelRef = useRef({ delta: 0, changedAt: 0, eventAt: 0 });
  const hoverTimerRef = useRef(null);
  const lastDragRef = useRef(0);
  const generatedId = useId().replace(/:/g, '');
  const [selected, setSelected] = useState(defaultSelected);
  const [dragging, setDragging] = useState(false);
  onChangeRef.current = onChange;

  const optionId = useCallback(
    (index) => `${generatedId}-technology-option-${index}`,
    [generatedId]
  );

  const visibleIndexes = useMemo(() => {
    if (items.length <= VISIBLE_RANGE * 2 + 1) {
      return items.map((_, index) => index);
    }

    return items.reduce((indexes, _, index) => {
      const distance = loop
        ? wrapDistance(index, selected, items.length)
        : index - selected;
      if (Math.abs(distance) <= VISIBLE_RANGE) indexes.push(index);
      return indexes;
    }, []);
  }, [items, loop, selected]);

  const layout = useCallback((position) => {
    const { rowHeight, angle, radius } = geometryRef.current;
    const mirror = side === 'right' ? -1 : side === 'left' ? 1 : 0;

    itemRefs.current.forEach((element, index) => {
      const distance = loop && items.length > 1
        ? wrapDistance(index, position, items.length)
        : index - position;
      const absolute = Math.abs(distance);
      const boundedAngle = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, distance * angle)
      );
      const y = radius ? radius * Math.sin(boundedAngle) : distance * rowHeight;
      const x = radius
        ? -mirror * radius * (1 - Math.cos(boundedAngle)) * curve
        : 0;

      element.style.transform = side === 'center'
        ? `translate(calc(-50% + ${x}px), calc(${y}px - 50%))`
        : `translate(${x}px, calc(${y}px - 50%)) rotate(${mirror * boundedAngle * 180 / Math.PI}deg)`;
      element.style.opacity = String(Math.max(0, 1 - absolute * fade));
    });
  }, [curve, fade, items.length, loop, side]);

  const measure = useCallback(() => {
    if (!rootRef.current) return;
    const rem = Number.parseFloat(
      getComputedStyle(document.documentElement).fontSize
    ) || 16;
    const rowHeight = Math.max(fontSize * spacing * rem, 1);
    const angle = (tilt * Math.PI) / 180;
    geometryRef.current = {
      rowHeight,
      angle,
      radius: Math.abs(angle) > 0.0005 ? rowHeight / angle : 0
    };
    layout(positionRef.current);
  }, [fontSize, layout, spacing, tilt]);

  const animate = useCallback((time) => {
    const delta = Math.min((time - lastFrameRef.current) / 1000, 0.05);
    lastFrameRef.current = time;
    const factor = 1 - Math.exp(-delta / Math.max(smoothing / 1000, 0.001));
    let next = positionRef.current
      + (targetRef.current - positionRef.current) * factor;

    if (Math.abs(targetRef.current - next) < SNAP_THRESHOLD) {
      next = targetRef.current;
    }

    positionRef.current = next;
    layout(next);
    frameRef.current = next === targetRef.current
      ? null
      : requestAnimationFrame(animate);
  }, [layout, smoothing]);

  const start = useCallback(() => {
    if (frameRef.current !== null) return;
    if (reducedMotionRef.current) {
      positionRef.current = targetRef.current;
      layout(targetRef.current);
      return;
    }
    lastFrameRef.current = performance.now();
    frameRef.current = requestAnimationFrame(animate);
  }, [animate, layout]);

  const select = useCallback((value, snap = true, immediate = false) => {
    if (!items.length) return;

    let next = value;
    if (!loop) next = Math.max(0, Math.min(items.length - 1, next));
    if (snap) next = Math.round(next);
    targetRef.current = next;

    const index = loop
      ? ((Math.round(next) % items.length) + items.length) % items.length
      : Math.round(next);
    if (index !== selectedRef.current) {
      selectedRef.current = index;
      setSelected(index);
      onChangeRef.current?.(index, items[index]);
    }

    if (immediate || reducedMotionRef.current) {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      positionRef.current = next;
      layout(next);
      return;
    }
    start();
  }, [items, layout, loop, start]);

  useLayoutEffect(() => {
    const initial = items.length
      ? Math.max(0, Math.min(items.length - 1, Math.round(defaultSelected)))
      : 0;
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    positionRef.current = initial;
    targetRef.current = initial;
    selectedRef.current = initial;
    setSelected(initial);
    wheelRef.current = { delta: 0, changedAt: 0, eventAt: 0 };
    measure();
  }, [defaultSelected, items, measure]);

  useLayoutEffect(() => {
    layout(positionRef.current);
  }, [layout, visibleIndexes]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(root);
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => {
      reducedMotionRef.current = mediaQuery.matches;
      if (mediaQuery.matches) {
        if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
        positionRef.current = targetRef.current;
        layout(targetRef.current);
      }
    };

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, [layout]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const handleWheel = (event) => {
      if (event.ctrlKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      const now = performance.now();
      const unit = event.deltaMode === 1
        ? 16
        : event.deltaMode === 2
          ? root.clientHeight
          : 1;
      const wheelState = wheelRef.current;
      if (now - wheelState.eventAt > 180) wheelState.delta = 0;
      wheelState.eventAt = now;
      wheelState.delta += event.deltaY * unit;

      if (
        Math.abs(wheelState.delta) < WHEEL_THRESHOLD
        || now - wheelState.changedAt < WHEEL_COOLDOWN
      ) return;

      const direction = Math.sign(wheelState.delta);
      const current = Math.round(targetRef.current);
      const atBoundary = !loop && (
        (direction < 0 && current <= 0)
        || (direction > 0 && current >= items.length - 1)
      );
      wheelState.delta = 0;
      if (atBoundary) return;

      event.preventDefault();
      wheelState.changedAt = now;
      select(current + direction);
    };

    root.addEventListener('wheel', handleWheel, { passive: false });
    return () => root.removeEventListener('wheel', handleWheel);
  }, [items.length, loop, select]);

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    window.clearTimeout(hoverTimerRef.current);
  }, []);

  const pointerDown = (event) => {
    if (!draggable || event.button !== 0) return;
    window.clearTimeout(hoverTimerRef.current);
    const horizontalTouch = event.pointerType === 'touch';
    dragRef.current = {
      id: event.pointerId,
      coordinate: horizontalTouch ? event.clientX : event.clientY,
      start: positionRef.current,
      horizontalTouch,
      active: false
    };
  };

  const pointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const coordinate = drag.horizontalTouch ? event.clientX : event.clientY;
    const delta = coordinate - drag.coordinate;
    if (!drag.active && Math.abs(delta) >= DRAG_THRESHOLD) {
      drag.active = true;
      rootRef.current?.setPointerCapture(drag.id);
      setDragging(true);
    }
    if (!drag.active) return;

    event.preventDefault();
    select(
      drag.start - delta / Math.max(geometryRef.current.rowHeight, 1),
      false,
      true
    );
  };

  const pointerEnd = (event) => {
    const drag = dragRef.current;
    if (!drag || (event?.pointerId !== undefined && drag.id !== event.pointerId)) return;
    dragRef.current = null;
    if (!drag.active) return;

    lastDragRef.current = performance.now();
    setDragging(false);
    select(positionRef.current, true);
  };

  const pointerLeave = () => {
    window.clearTimeout(hoverTimerRef.current);
    if (dragRef.current && !dragRef.current.active) dragRef.current = null;
  };

  const keyDown = (event) => {
    const direction = ['ArrowUp', 'ArrowLeft'].includes(event.key)
      ? -1
      : ['ArrowDown', 'ArrowRight'].includes(event.key)
        ? 1
        : 0;
    if (!direction) return;

    const current = Math.round(targetRef.current);
    const atBoundary = !loop && (
      (direction < 0 && current <= 0)
      || (direction > 0 && current >= items.length - 1)
    );
    if (atBoundary) return;

    event.preventDefault();
    select(current + direction);
  };

  const hoverSelect = (index) => {
    if (dragging || index === selectedRef.current) return;
    window.clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = window.setTimeout(() => select(index), 80);
  };

  const clickSelect = (index) => {
    if (performance.now() - lastDragRef.current < 160) return;
    select(index);
  };

  const progress = items.length > 1 ? selected / (items.length - 1) : 0;

  return (
    <div
      ref={rootRef}
      className={`option-wheel option-wheel--${side} ${dragging ? 'is-dragging' : ''}`}
      role="listbox"
      aria-activedescendant={items.length ? optionId(selected) : undefined}
      aria-label="Technology options. Scroll, drag, click, hover, or use arrow keys."
      aria-orientation="vertical"
      tabIndex={0}
      onPointerDown={pointerDown}
      onPointerMove={pointerMove}
      onPointerUp={pointerEnd}
      onPointerCancel={pointerEnd}
      onPointerLeave={pointerLeave}
      onKeyDown={keyDown}
      style={{ '--wheel-size': `${fontSize}rem`, '--wheel-progress': progress }}
    >
      {visibleIndexes.map((index) => {
        const item = items[index];
        const itemObject = typeof item === 'object' ? item : { name: item };
        const keyName = `${itemObject.name || index}-${itemObject.category || 'option'}`;
        return (
          <button
            id={optionId(index)}
            type="button"
            role="option"
            aria-selected={selected === index}
            className={`option-wheel__item ${selected === index ? 'is-selected' : ''}`}
            key={keyName}
            ref={(element) => {
              if (element) itemRefs.current.set(index, element);
              else itemRefs.current.delete(index);
            }}
            onMouseEnter={() => hoverSelect(index)}
            onClick={() => clickSelect(index)}
          >
            <span className="option-wheel__item-content">
              {itemObject.icon && (
                <span
                  className="option-wheel__item-icon"
                  style={{ color: itemObject.color || '#225cff' }}
                  aria-hidden="true"
                >
                  {itemObject.icon}
                </span>
              )}
              <span className="option-wheel__item-text">{itemObject.name}</span>
              {itemObject.category && (
                <span className="option-wheel__item-tag">{itemObject.category}</span>
              )}
            </span>
          </button>
        );
      })}
      <div className="option-wheel__guide" aria-hidden="true">
        <span>SCROLL / DRAG</span>
        <div><i /></div>
        <strong>
          {String(selected + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </strong>
      </div>
    </div>
  );
}
