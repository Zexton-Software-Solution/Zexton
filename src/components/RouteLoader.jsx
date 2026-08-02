import { motion } from 'framer-motion';
import './RouteLoader.css';

export default function RouteLoader() {
  return <motion.div className="route-loader" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:.1 }} role="status" aria-label="Opening page"><motion.div className="route-loader__bar" initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:.2, ease:'easeOut' }} /><div className="route-loader__pill"><img src="/ZextonLogo.png" alt="" /><span>Opening page</span><i /></div></motion.div>;
}
