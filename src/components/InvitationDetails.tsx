
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { formatDate, formatTime } from '../utils/dateUtils';

interface InvitationDetailsProps {
  childName: string;
  eventDate: Date;
  location: string;
  address: string;
}

const InvitationDetails: React.FC<InvitationDetailsProps> = ({ 
  childName, 
  eventDate, 
  location, 
  address 
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-2xl mx-auto my-8 text-center px-4"
    >
      <motion.h2 
        variants={item}
        className="invitation-text text-3xl md:text-4xl text-minnie-roseDark mb-2"
      >
        You're Invited!
      </motion.h2>
      
      <motion.div variants={item} className="my-1">
        <span className="text-sm uppercase tracking-widest text-minnie-black font-medium bg-minnie-roseLight py-1 px-3 rounded-full">
          Special Celebration
        </span>
      </motion.div>
      
      <motion.h3 
        variants={item} 
        className="font-playfair text-2xl md:text-3xl text-minnie-black font-bold mt-4"
      >
        {childName} is turning <span className="text-minnie-roseDark">ONE</span>!
      </motion.h3>
      
      <motion.p 
        variants={item}
        className="text-minnie-black my-6 leading-relaxed max-w-xl mx-auto"
      >
        Please join us for a magical day filled with joy, laughter, and Minnie Mouse fun as we celebrate 
        our little one's special milestone!
      </motion.p>
      
      <motion.div 
        variants={item} 
        className="glass-effect rounded-2xl p-6 mt-8 grid gap-4 md:grid-cols-3"
      >
        <DetailItem 
          icon={<Calendar className="w-5 h-5 text-minnie-roseDark" />}
          title="Date"
          content={formatDate(eventDate)}
        />
        
        <DetailItem 
          icon={<Clock className="w-5 h-5 text-minnie-roseDark" />}
          title="Time"
          content={formatTime(eventDate)}
        />
        
        <DetailItem 
          icon={<MapPin className="w-5 h-5 text-minnie-roseDark" />}
          title="Location"
          content={
            <>
              <div>{location}</div>
              <div className="text-xs mt-1 opacity-80">{address}</div>
            </>
          }
        />
      </motion.div>
    </motion.div>
  );
};

const DetailItem: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  content: React.ReactNode;
}> = ({ icon, title, content }) => {
  return (
    <div className="flex flex-col items-center text-center p-2">
      <div className="mb-2">{icon}</div>
      <h4 className="font-medium text-sm uppercase tracking-wider text-minnie-black mb-1">{title}</h4>
      <div className="text-minnie-black">{content}</div>
    </div>
  );
};

export default InvitationDetails;
