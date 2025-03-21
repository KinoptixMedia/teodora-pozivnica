import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from 'sonner';
import { submitRsvpToGoogleSheet } from '../utils/sheetUtils';
import { rsvpFormSchema, type RsvpFormValues } from '@/schemas/rsvpSchema';
import PersonalFields from './rsvp/PersonalFields';
import GuestFields from './rsvp/GuestFields';
import MessageField from './rsvp/MessageField';

const RsvpForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      attending: 'yes',
      guestCount: '0',
      guestsInfo: '',
      message: '',
    },
  });

  const attending = form.watch('attending');
  const guestCount = form.watch('guestCount');

  async function onSubmit(values: RsvpFormValues) {
    setIsSubmitting(true);
    
    try {
      // Format the data for Google Sheets
      const rsvpData = {
        firstName: values.firstName,
        lastName: values.lastName,
        attending: values.attending === 'yes' ? 'Da' : 'Ne',
        guestCount: values.guestCount || '0',
        guestsInfo: values.guestsInfo || '',
        message: values.message || ''
      };
      
      // Submit to Google Sheets
      const success = await submitRsvpToGoogleSheet(rsvpData);
      
      if (success) {
        toast.success('Hvala na odgovoru!', {
          description: `Vaša potvrda je primljena i jedva čekamo da proslavimo sa vama!`,
        });
        form.reset();
      } else {
        toast.error('Greška', {
          description: 'Došlo je do greške pri slanju. Molimo pokušajte ponovo.',
        });
      }
    } catch (error) {
      toast.error('Greška', {
        description: 'Došlo je do greške pri slanju. Molimo pokušajte ponovo.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full max-w-xl mx-auto my-12 glass-effect rounded-2xl p-6 md:p-8"
    >
      <div className="text-center mb-6">
        <h2 className="font-playfair text-2xl md:text-3xl text-minnie-black mb-1">
          RSVP
        </h2>
        <div className="h-0.5 w-14 bg-minnie-roseDark mx-auto my-3 rounded-full" />
        <p className="text-minnie-black text-sm md:text-base">
          Molimo vas da nas obavestite da li ćete prisustvovati proslavi!
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <PersonalFields form={form} />
          
          <GuestFields form={form} attending={attending} guestCount={guestCount} />
          
          <MessageField form={form} />

          <div className="text-center">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-minnie-roseDark hover:bg-minnie-rose text-white font-medium px-8 py-2.5 rounded-full transition-all duration-300 hover:shadow-md"
            >
              {isSubmitting ? 'Slanje...' : 'Pošalji RSVP'}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default RsvpForm;
