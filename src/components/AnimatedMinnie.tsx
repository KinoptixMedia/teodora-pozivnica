
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
        {/* Minnie silhouette */}
        <div className="relative w-36 h-36 md:w-44 md:h-44">
          {/* Ears */}
          <div className="absolute left-1/4 -top-6 w-10 h-10 bg-minnie-black rounded-full"></div>
          <div className="absolute right-1/4 -top-6 w-10 h-10 bg-minnie-black rounded-full"></div>
          
          {/* Face */}
          <div className="absolute w-32 h-32 md:w-40 md:h-40 bg-minnie-black rounded-full top-0 left-1/2 transform -translate-x-1/2"></div>
          
          {/* Bow */}
          <motion.div 
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
            className="absolute -top-1 left-1/2 transform -translate-x-1/2"
          >
            <div className="relative">
              <div className="absolute w-10 h-10 bg-minnie-rose transform rotate-45 rounded-lg -left-8 -top-4"></div>
              <div className="absolute w-10 h-10 bg-minnie-rose transform rotate-45 rounded-lg left-2 -top-4"></div>
              <div className="absolute w-6 h-6 bg-minnie-roseDark rounded-full left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedMinnie;
