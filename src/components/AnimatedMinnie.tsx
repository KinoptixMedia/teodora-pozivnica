
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedMinnieProps {
  className?: string;
  childImage?: string;
  childName?: string;
}

const AnimatedMinnie: React.FC<AnimatedMinnieProps> = ({ 
  className = '',
  childImage = '/placeholder.svg',
  childName = 'Child'
}) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div 
        animate={{ 
          rotate: [0, 9, 0, -9, 0],
          y: [0, -9, 0, -5, 0]
        }}
        transition={{ 
          duration: 6, 
          ease: "easeInOut", 
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="relative"
      >
        {/* Minnie silhouette - even larger */}
        <div className="relative w-72 h-72 md:w-96 md:h-96">
          {/* Ears - made larger */}
          <div className="absolute left-1/4 -top-10 w-16 h-16 md:w-20 md:h-20 bg-minnie-black rounded-full"></div>
          <div className="absolute right-1/4 -top-10 w-16 h-16 md:w-20 md:h-20 bg-minnie-black rounded-full"></div>
          
          {/* Face - made larger */}
          <div className="absolute w-64 h-64 md:w-80 md:h-80 bg-minnie-black rounded-full top-0 left-1/2 transform -translate-x-1/2">
            {/* Image centered inside Minnie's face */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-52 h-52 md:w-64 md:h-64 overflow-hidden rounded-full border-4 border-white">
              <img 
                src={childImage}
                alt={childName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Bow - adjusted to be smaller and more proportional */}
          <motion.div 
            animate={{ rotate: [-6, 6, -5] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
            className="absolute -top-4 left-1/2 transform -translate-x-1/2"
          >
            <div className="relative">
              {/* Left bow part - smaller */}
              <div className="absolute w-16 h-16 md:w-18 md:h-18 bg-minnie-rose transform rotate-45 rounded-lg -left-12 -top-6"></div>
              {/* Right bow part - smaller */}
              <div className="absolute w-16 h-16 md:w-18 md:h-18 bg-minnie-rose transform rotate-45 rounded-lg left-4 -top-6"></div>
              {/* Center circle - smaller */}
              <div className="absolute w-10 h-10 md:w-12 md:h-12 bg-minnie-roseDark rounded-full left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedMinnie;
