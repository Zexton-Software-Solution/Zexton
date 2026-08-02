import { useCallback } from 'react';
import { motion } from 'framer-motion';
import CountUp from './CountUp';
import DecryptedText from './DecryptedText';

export default function PageLoader({ onComplete }) {
  const handleComplete = useCallback(() => { window.setTimeout(onComplete, 70); }, [onComplete]);
  return (
    <motion.div className="page-loader" initial={{ opacity:1 }} exit={{ opacity:0, y:'-2%' }} transition={{ duration:.24, ease:[.76,0,.24,1] }} role="status" aria-label="Loading Zexton homepage">
      <div className="page-loader__top"><img src="/ZextonLogo.png" alt="Zexton" /></div>
      <div className="page-loader__center"><span className="page-loader__eyebrow">SOFTWARE FOR WHAT&apos;S NEXT</span><div className="page-loader__decrypt"><DecryptedText text="BUILDING DIGITAL ADVANTAGE" speed={18} sequential revealDirection="center" animateOn="view" className="page-loader__revealed" encryptedClassName="page-loader__encrypted" /></div></div>
      <div className="page-loader__progress"><div className="page-loader__line"><motion.span initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:.85, ease:'easeInOut' }} /></div><div className="page-loader__count"><CountUp from={0} to={100} duration={.85} onEnd={handleComplete} /><span>%</span></div></div>
    </motion.div>
  );
}
