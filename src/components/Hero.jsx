import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import DecryptedText from './DecryptedText';

const heroHeadline = 'Custom Software, SaaS & AI Development';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="hero">
      <div className="container">
        <motion.span className="hero__eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .45 }}>
          PRODUCT STRATEGY · DESIGN · ENGINEERING
        </motion.span>
        <motion.h1
          className="hero__headline"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : .62 }}
        >
          {shouldReduceMotion ? heroHeadline : (
            <DecryptedText
              text={heroHeadline}
              animateOn="view"
              sequential
              revealDirection="start"
              speed={26}
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*"
              className="hero__headline-char"
              encryptedClassName="hero__headline-char hero__headline-char--encrypted"
              parentClassName="hero__headline-decrypt"
            />
          )}
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
