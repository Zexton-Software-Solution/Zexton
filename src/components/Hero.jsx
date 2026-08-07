import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ParticleText from './ParticleText';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="hero">
      <div className="container">
        <motion.span className="hero__eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .45 }}>
          PRODUCT STRATEGY · DESIGN · ENGINEERING
        </motion.span>
        <motion.h1
          className="hero__headline hero__headline--particle"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : .62 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}
        >
          <div style={{ position: 'relative', width: '100%', height: 'clamp(65px, 8.5vw, 115px)' }}>
            <ParticleText
              text="Custom Software, SaaS &"
              particleSize={2.4}
              density={3}
              color="#111827"
              highlightColor="#225cff"
              scatter={90}
              gatherDuration={600}
              stagger={100}
              pointerRepel={30}
              repelRadius={90}
              idleDrift={0.5}
              trigger="hover"
              fontSize="clamp(2.8rem, 7.2vw, 6.2rem)"
              fontWeight={800}
              fontFamily="'Manrope', sans-serif"
              glow
            />
          </div>
          <div style={{ position: 'relative', width: '100%', height: 'clamp(65px, 8.5vw, 115px)' }}>
            <ParticleText
              text="AI Development"
              particleSize={2.4}
              density={3}
              color="#111827"
              highlightColor="#225cff"
              scatter={90}
              gatherDuration={600}
              stagger={100}
              pointerRepel={30}
              repelRadius={90}
              idleDrift={0.5}
              trigger="hover"
              fontSize="clamp(2.8rem, 7.2vw, 6.2rem)"
              fontWeight={800}
              fontFamily="'Manrope', sans-serif"
              glow
            />
          </div>
        </motion.h1>

        <div className="hero__columns">
          <motion.div className="hero__col" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .12 }}>
            <p className="hero__text">Zexton is a custom software development company in India helping startups, growing businesses, and product teams turn complex requirements into clear, reliable digital products.</p>
            <p className="hero__text hero__text--secondary">We design and build business websites, SaaS platforms, customer portals, e-commerce systems, internal tools, and custom web applications with responsive UX, secure architecture, and maintainable code.</p>
            <a className="btn-primary" href="/work"><span>Explore Our Work</span><ArrowRight size={18} /></a>
          </motion.div>

          <motion.div className="hero__col" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .22 }}>
            <p className="hero__text">Our engineers work across React, React Native, Node.js, .NET, Python, PostgreSQL, AWS, and AI automation. From MVP planning to cloud deployment, one team owns the useful details from discovery through release.</p>
            <div className="hero__service-list" aria-label="Core software development capabilities">
              <span><strong>01</strong> SaaS &amp; custom web applications</span>
              <span><strong>02</strong> React Native mobile products</span>
              <span><strong>03</strong> Cloud, APIs &amp; AI automation</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
