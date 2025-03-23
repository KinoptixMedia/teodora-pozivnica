
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedMinnieProps {
  className?: string;
}

const AnimatedMinnie: React.FC<AnimatedMinnieProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div 
        animate={{ 
          rotate: [0, 5, 0, -5, 0],
          y: [0, -5, 0, -3, 0]
        }}
        transition={{ 
          duration: 6, 
          ease: "easeInOut", 
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="relative"
      >
        {/* Minnie silhouette - made larger */}
        <div className="relative w-48 h-48 md:w-56 md:h-56">
          {/* Ears - made larger */}
          <div className="absolute left-1/4 -top-8 w-12 h-12 bg-minnie-black rounded-full"></div>
          <div className="absolute right-1/4 -top-8 w-12 h-12 bg-minnie-black rounded-full"></div>
          
          {/* Face - made larger */}
          <div className="absolute w-44 h-44 md:w-52 md:h-52 bg-minnie-black rounded-full top-0 left-1/2 transform -translate-x-1/2"></div>
          
          {/* Bow - made larger */}
          <motion.div 
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
            className="absolute -top-2 left-1/2 transform -translate-x-1/2"
          >
            <div className="relative">
              <div className="absolute w-14 h-14 bg-minnie-rose transform rotate-45 rounded-lg -left-10 -top-5"></div>
              <div className="absolute w-14 h-14 bg-minnie-rose transform rotate-45 rounded-lg left-3 -top-5"></div>
              <div className="absolute w-8 h-8 bg-minnie-roseDark rounded-full left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedMinnie;
