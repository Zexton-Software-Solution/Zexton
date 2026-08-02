import { useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from './CountUp';
import DecryptedText from './DecryptedText';
import './PageLoader.css';

const MINIMUM_VISIBLE_MS = 2100;
const PROGRESS_DURATION_SECONDS = 1.85;

export default function PageLoader({ onComplete }) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, MINIMUM_VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="page-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-2%', scale: 1.012 }}
      transition={{ duration: 0.48, ease: [0.76, 0, 0.24, 1] }}
      role="status"
      aria-live="polite"
      aria-label="Zexton website is loading"
      aria-busy="true"
    >
      <div className="page-loader__top">
        <img src="/ZextonLogo.png" alt="Zexton" width="104" height="58" />
      </div>
      <div className="page-loader__center">
        <span className="page-loader__eyebrow">SOFTWARE FOR WHAT&apos;S NEXT</span>
        <div className="page-loader__decrypt">
          <DecryptedText
            text="BUILDING DIGITAL ADVANTAGE"
            speed={18}
            sequential
            revealDirection="center"
            animateOn="view"
            className="page-loader__revealed"
            encryptedClassName="page-loader__encrypted"
          />
        </div>
      </div>
      <div className="page-loader__progress" aria-hidden="true">
        <div className="page-loader__line">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: PROGRESS_DURATION_SECONDS, delay: 0.1, ease: [0.65, 0, 0.35, 1] }}
          />
        </div>
        <div className="page-loader__count">
          <CountUp from={0} to={100} delay={0.1} duration={PROGRESS_DURATION_SECONDS} />
          <span>%</span>
        </div>
      </div>
    </motion.div>
  );
}
