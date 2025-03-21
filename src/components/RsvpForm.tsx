
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { submitRsvpToGoogleSheet } from '../utils/sheetUtils';

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'Unesite vaše ime' }),
  lastName: z.string().min(2, { message: 'Unesite vaše prezime' }),
  email: z.string().email({ message: 'Unesite važeću email adresu' }),
  attending: z.enum(['yes', 'no'], {
    required_error: 'Molimo odaberite da li dolazite',
  }),
  bringingGuest: z.enum(['yes', 'no']).optional(),
  guestFirstName: z.string().optional(),
  guestLastName: z.string().optional(),
  message: z.string().optional(),
});

const RsvpForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      attending: 'yes',
      bringingGuest: 'no',
      guestFirstName: '',
      guestLastName: '',
      message: '',
    },
  });

  const attending = form.watch('attending');
  const bringingGuest = form.watch('bringingGuest');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Format the data for Google Sheets
      const rsvpData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        attending: values.attending === 'yes' ? 'Da' : 'Ne',
        guestFirstName: values.guestFirstName || '',
        guestLastName: values.guestLastName || '',
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-minnie-black">Ime</FormLabel>
                  <FormControl>
                    <Input placeholder="Vaše ime" {...field} className="focus-visible:ring-minnie-roseDark" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-minnie-black">Prezime</FormLabel>
                  <FormControl>
                    <Input placeholder="Vaše prezime" {...field} className="focus-visible:ring-minnie-roseDark" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-minnie-black">Email</FormLabel>
                <FormControl>
                  <Input placeholder="vasa.adresa@email.com" {...field} className="focus-visible:ring-minnie-roseDark" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="attending"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-minnie-black">Da li dolazite?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" className="text-minnie-roseDark focus:ring-minnie-roseDark" />
                      </FormControl>
                      <FormLabel className="text-minnie-black font-normal cursor-pointer">
                        Da, doći ću!
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" className="text-minnie-roseDark focus:ring-minnie-roseDark" />
                      </FormControl>
                      <FormLabel className="text-minnie-black font-normal cursor-pointer">
                        Nažalost, ne mogu
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {attending === 'yes' && (
            <FormField
              control={form.control}
              name="bringingGuest"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-minnie-black">Da li dolazite sa gostom?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" className="text-minnie-roseDark focus:ring-minnie-roseDark" />
                        </FormControl>
                        <FormLabel className="text-minnie-black font-normal cursor-pointer">
                          Da
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" className="text-minnie-roseDark focus:ring-minnie-roseDark" />
                        </FormControl>
                        <FormLabel className="text-minnie-black font-normal cursor-pointer">
                          Samo ja
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {attending === 'yes' && bringingGuest === 'yes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="guestFirstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-minnie-black">Ime gosta</FormLabel>
                    <FormControl>
                      <Input placeholder="Ime gosta" {...field} className="focus-visible:ring-minnie-roseDark" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="guestLastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-minnie-black">Prezime gosta</FormLabel>
                    <FormControl>
                      <Input placeholder="Prezime gosta" {...field} className="focus-visible:ring-minnie-roseDark" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-minnie-black">Poruka (opciono)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Ostavite specijalnu poruku ili posebne zahteve" 
                    {...field} 
                    className="focus-visible:ring-minnie-roseDark resize-none"
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
