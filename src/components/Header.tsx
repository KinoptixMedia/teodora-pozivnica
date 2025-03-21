
import React from 'react';
import { motion } from 'framer-motion';
import { Cake } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full mx-auto text-center py-6 mb-6"
    >
      <div className="relative inline-block">
        <Cake className="text-minnie-roseDark w-8 h-8 absolute -top-2 -left-6 animate-pulse-light" />
        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-minnie-black tracking-tight">
          <span className="text-minnie-roseDark">Prvi</span> Rođendan i <br><span className="text-minnie-roseDark">Krštenje</span></br>
        </h1>
        <div className="h-0.5 w-14 bg-minnie-roseDark mx-auto mt-3 mb-3 rounded-full" />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="invitation-text text-3xl md:text-4xl text-minnie-roseDark my-2"
      >
        Invitation
      </motion.div>
    </motion.header>
  );
};

export default Header;
