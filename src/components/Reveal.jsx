import { motion } from 'framer-motion';

const ease = [0.21, 0.6, 0.35, 1];

// Fade-and-rise on scroll. Honors prefers-reduced-motion via <MotionConfig reducedMotion="user"> in App.
export default function Reveal({ as = 'div', delay = 0, y = 24, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
