
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedBackground = ({ isPlaying }) => {
  const numShapes = 20;
  const activeColor = '#69e201'; 
  const defaultColor = '#FFFFFF';

  const shapes = Array.from({ length: numShapes }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 20 + 10,
    opacity: Math.random() * 0.1 + (isPlaying ? 0.05 : 0.02),
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  const overlayVariants = {
    initial: { opacity: 0 },
    animate: (customColor) => ({
      opacity: 1,
      backgroundColor: customColor,
      transition: { duration: 0.7, ease: "easeInOut" },
    }),
    exit: {
      opacity: 0,
      transition: { duration: 0.7, ease: "easeInOut", delay: 0.1 },
    },
  };
  
  const lightOverlayVariants = {
    initial: { opacity: 0 },
    animate: (customColor) => ({
      opacity: 1,
      backgroundColor: customColor,
      transition: { duration: 0.7, ease: "easeInOut", delay: 0.1 },
    }),
    exit: {
      opacity: 0,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  };


  return (
    <>
      <div className={`fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none`} style={{backgroundColor: defaultColor}}>
        {!isPlaying && shapes.map((shape) => (
          <motion.div
            key={shape.id}
            className={`absolute rounded-full bg-gray-200`}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              opacity: shape.opacity,
            }}
            animate={{
              x: [`${shape.x}%`, `${shape.x + (Math.random() - 0.5) * 20}%`, `${shape.x}%`],
              y: [`${shape.y}%`, `${shape.y + (Math.random() - 0.5) * 20}%`, `${shape.y}%`],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <AnimatePresence initial={false} mode="wait">
        {isPlaying ? (
          <motion.div
            key="dark-overlay"
            custom={activeColor}
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" 
          />
        ) : (
           <motion.div
            key="light-overlay"
            custom={defaultColor}
            variants={lightOverlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AnimatedBackground;