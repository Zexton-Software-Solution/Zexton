import { useCallback, useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd,
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);
  const springValue = useSpring(motionValue, {
    damping: 20 + 40 * (1 / duration),
    stiffness: 100 * (1 / duration),
  });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  const decimalPlaces = Math.max(
    (String(from).split('.')[1] || '').length,
    (String(to).split('.')[1] || '').length,
  );

  const formatValue = useCallback((value) => {
    const formatted = Intl.NumberFormat('en-US', {
      useGrouping: Boolean(separator),
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(value);
    return separator ? formatted.replace(/,/g, separator) : formatted;
  }, [decimalPlaces, separator]);

  useEffect(() => {
    if (ref.current) ref.current.textContent = formatValue(direction === 'down' ? to : from);
  }, [direction, formatValue, from, to]);

  useEffect(() => {
    if (!isInView || !startWhen) return undefined;
    onStart?.();
    const startTimer = window.setTimeout(() => {
      motionValue.set(direction === 'down' ? from : to);
    }, delay * 1000);
    const endTimer = window.setTimeout(() => onEnd?.(), (delay + duration) * 1000);
    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(endTimer);
    };
  }, [delay, direction, duration, from, isInView, motionValue, onEnd, onStart, startWhen, to]);

  useEffect(() => springValue.on('change', (latest) => {
    if (ref.current) ref.current.textContent = formatValue(latest);
  }), [formatValue, springValue]);

  return <span className={className} ref={ref} />;
}
