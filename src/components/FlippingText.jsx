
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FlippingText = ({ phrases, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, interval);
    return () => clearInterval(timer);
  }, [phrases, interval]);

  return (
    <span className="inline-block relative overflow-hidden h-auto align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={phrases[currentIndex]}
          initial={{ y: '100%', opacity: 0, rotateX: -90 }}
          animate={{ y: '0%', opacity: 1, rotateX: 0 }}
          exit={{ y: '-100%', opacity: 0, rotateX: 90 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="inline-block"
          style={{ transformOrigin: 'bottom center', verticalAlign: 'bottom' }}
        >
          {phrases[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default FlippingText;