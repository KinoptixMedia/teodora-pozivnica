
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { calculateTimeLeft } from '../utils/dateUtils';

interface CountdownProps {
  eventDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ eventDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(eventDate));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(eventDate));
    }, 1000);

    return () => clearTimeout(timer);
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-3xl mx-auto my-8"
    >
      <motion.h2 
        variants={item}
        className="text-center font-playfair text-2xl md:text-3xl text-minnie-black mb-6"
      >
        <span className="text-minnie-roseDark">Countdown</span> to the Party
      </motion.h2>
      
      <motion.div 
        variants={item}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
      >
        <CountdownUnit value={timeLeft.days} label="Days" />
        <CountdownUnit value={timeLeft.hours} label="Hours" />
        <CountdownUnit value={timeLeft.minutes} label="Minutes" />
        <CountdownUnit value={timeLeft.seconds} label="Seconds" />
      </motion.div>
    </motion.div>
  );
};

const CountdownUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  return (
    <div className="glass-effect rounded-xl p-4 flex flex-col items-center justify-center h-24">
      <span className="font-playfair text-2xl md:text-3xl font-bold text-minnie-roseDark">{value}</span>
      <span className="text-sm text-minnie-black font-medium mt-1">{label}</span>
    </div>
  );
};

export default Countdown;
