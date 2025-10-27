
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollSection = ({ children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1.05]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        opacity,
        scale,
        rotateX,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        willChange: 'transform, opacity'
      }}
      className="relative w-full"
    >
      {children}
    </motion.div>
  );
};

export default ScrollSection;