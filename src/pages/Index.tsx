
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Countdown from '@/components/Countdown';
import InvitationDetails from '@/components/InvitationDetails';
import RsvpForm from '@/components/RsvpForm';
import AnimatedMinnie from '@/components/AnimatedMinnie';

// Set this to your actual event date
const eventDate = new Date('2024-12-15T14:00:00');
const childName = "Teodora";
const location = "Magical Garden Party Venue";
const address = "123 Celebration Lane, Wonderland";

const Index = () => {
  return (
    <div className="min-h-screen w-full pb-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-minnie-roseLight to-background opacity-40 pointer-events-none"
      />
      
      <div className="container px-4 sm:px-6 mx-auto relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute -top-20 right-0 -z-10 w-72 h-72 bg-minnie-rose opacity-10 rounded-full blur-3xl pointer-events-none"
        />
        
        <Header />
        
        <div className="flex justify-center my-6">
          <AnimatedMinnie />
        </div>
        
        <InvitationDetails 
          childName={childName}
          eventDate={eventDate}
          location={location}
          address={address}
        />
        
        <Countdown eventDate={eventDate} />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-[60%] -left-20 -z-10 w-72 h-72 bg-minnie-roseDark opacity-10 rounded-full blur-3xl pointer-events-none"
        />
        
        <RsvpForm />
        
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center mt-16 text-minnie-black text-sm opacity-80"
        >
          <p className="mb-1">We can't wait to celebrate with you!</p>
          <p className="font-dancing text-minnie-roseDark text-lg">With love, The {childName} Family</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
