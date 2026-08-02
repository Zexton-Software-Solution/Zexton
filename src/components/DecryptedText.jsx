import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export default function DecryptedText({
  text = '',
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  clickMode = 'once',
  ...props
}) {
  const availableChars = useMemo(() => {
    const source = useOriginalCharsOnly ? text : characters;
    return Array.from(new Set(source.split(''))).filter((char) => char !== ' ');
  }, [characters, text, useOriginalCharsOnly]);

  const randomize = useCallback((revealed = new Set()) => (
    text.split('').map((char, index) => {
      if (char === ' ' || revealed.has(index)) return char;
      return availableChars[Math.floor(Math.random() * availableChars.length)] || char;
    }).join('')
  ), [availableChars, text]);

  const [displayText, setDisplayText] = useState(text);
  const [revealed, setRevealed] = useState(new Set());
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== 'click');
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  const revealOrder = useMemo(() => {
    const indexes = Array.from({ length: text.length }, (_, index) => index);
    if (revealDirection === 'end') return indexes.reverse();
    if (revealDirection !== 'center') return indexes;
    const center = (text.length - 1) / 2;
    return indexes.sort((a, b) => Math.abs(a - center) - Math.abs(b - center));
  }, [revealDirection, text.length]);

  const stopAnimation = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsAnimating(false);
  }, []);

  const decrypt = useCallback(() => {
    if (isAnimating) return;
    stopAnimation();
    setRevealed(new Set());
    setDisplayText(randomize());
    setIsDecrypted(false);
    setIsAnimating(true);

    let iteration = 0;
    let revealedCount = 0;
    intervalRef.current = setInterval(() => {
      iteration += 1;
      if (sequential) {
        revealedCount = Math.min(revealedCount + 1, revealOrder.length);
        const nextRevealed = new Set(revealOrder.slice(0, revealedCount));
        setRevealed(nextRevealed);
        setDisplayText(randomize(nextRevealed));
        if (revealedCount >= revealOrder.length) {
          stopAnimation();
          setDisplayText(text);
          setIsDecrypted(true);
        }
      } else {
        setDisplayText(randomize());
        if (iteration >= maxIterations) {
          stopAnimation();
          setDisplayText(text);
          setRevealed(new Set(revealOrder));
          setIsDecrypted(true);
        }
      }
    }, speed);
  }, [isAnimating, maxIterations, randomize, revealOrder, sequential, speed, stopAnimation, text]);

  const encrypt = useCallback(() => {
    stopAnimation();
    setRevealed(new Set());
    setDisplayText(randomize());
    setIsDecrypted(false);
  }, [randomize, stopAnimation]);

  useEffect(() => {
    if (animateOn !== 'view' && animateOn !== 'inViewHover') return undefined;
    const element = containerRef.current;
    if (!element) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        decrypt();
        setHasAnimated(true);
      }
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [animateOn, decrypt, hasAnimated]);

  useEffect(() => {
    if (animateOn === 'click') encrypt();
    else {
      setDisplayText(text);
      setIsDecrypted(true);
    }
    return () => clearInterval(intervalRef.current);
  }, [animateOn, encrypt, text]);

  const interactionProps = {};
  if (animateOn === 'hover' || animateOn === 'inViewHover') {
    interactionProps.onMouseEnter = decrypt;
    interactionProps.onMouseLeave = () => {
      stopAnimation();
      setDisplayText(text);
      setIsDecrypted(true);
    };
  }
  if (animateOn === 'click') {
    interactionProps.onClick = () => {
      if (clickMode === 'toggle' && isDecrypted) encrypt();
      else if (!isDecrypted) decrypt();
    };
  }

  return (
    <motion.span
      ref={containerRef}
      className={parentClassName}
      style={{ display: 'inline-block', whiteSpace: 'pre-wrap' }}
      {...interactionProps}
      {...props}
    >
      <span style={visuallyHidden}>{text}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, index) => (
          <span key={`${index}-${char}`} className={revealed.has(index) || (!isAnimating && isDecrypted) ? className : encryptedClassName}>
            {char}
          </span>
        ))}
      </span>
    </motion.span>
  );
}
