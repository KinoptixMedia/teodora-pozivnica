
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Church } from 'lucide-react';
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
        Pozivam te na svoje krštenje i prvi rođendan!
      </motion.h2>
      
      <motion.div variants={item} className="my-1">
        <span className="text-sm uppercase tracking-widest text-minnie-black font-medium bg-minnie-roseLight py-1 px-3 rounded-full">
          10. maja biće divan dan
        </span>
      </motion.div>
      
      <motion.h3 
        variants={item} 
        className="font-playfair text-2xl md:text-3xl text-minnie-black font-bold mt-4"
      >
        {childName} slavi <span className="text-minnie-roseDark">PRVI</span> rođendan!
      </motion.h3>
      
      <motion.p 
        variants={item}
        className="text-minnie-black my-6 leading-relaxed max-w-xl mx-auto"
      >
        Igraćemo se i pevaćemo dok se mrak ne spusti, kući ćete ići kad vas Teodora pusti!
      </motion.p>
      
      <motion.div 
        variants={item} 
        className="glass-effect rounded-2xl p-6 mt-8 grid gap-4"
      >
        <DetailItem 
          icon={<Calendar className="w-5 h-5 text-minnie-roseDark" />}
          title="Datum"
          content={formatDate(eventDate)}
        />
        
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <DetailItem 
            icon={<Church className="w-5 h-5 text-minnie-roseDark" />}
            title="Krštenje"
            content={
              <>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-minnie-roseDark" />
                  <span>{formatTime(new Date(eventDate.getTime() - 1 * 60 * 60 * 1000))}</span>
                </div>
                <div>Crkva Svetog Nikole</div>
                <div className="text-xs mt-1 opacity-80">Ugrinovačka 2, Dobanovci</div>
              </>
            }
          />
          
          <DetailItem 
            icon={<MapPin className="w-5 h-5 text-minnie-roseDark" />}
            title="Restoran"
            content={
              <>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-minnie-roseDark" />
                  <span>{formatTime(eventDate)}</span>
                </div>
                <div>{location}</div>
                <div className="text-xs mt-1 opacity-80">{address}</div>
              </>
            }
          />
        </div>
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
