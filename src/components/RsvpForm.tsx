
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

const formSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your name' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  attending: z.enum(['yes', 'no'], {
    required_error: 'Please select if you are attending',
  }),
  guestCount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Please enter a valid number of guests',
  }).optional(),
  message: z.string().optional(),
});

const RsvpForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      attending: 'yes',
      guestCount: '0',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('RSVP submitted:', values);
    
    toast.success('Thank you for your RSVP!', {
      description: `We've received your response and can't wait to celebrate with you!`,
    });
    
    setIsSubmitting(false);
    form.reset();
  }

  const attending = form.watch('attending');

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
          Please let us know if you'll be joining the celebration!
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-minnie-black">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} className="focus-visible:ring-minnie-roseDark" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-minnie-black">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} className="focus-visible:ring-minnie-roseDark" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="attending"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-minnie-black">Will you attend?</FormLabel>
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
                        Yes, I'll be there!
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" className="text-minnie-roseDark focus:ring-minnie-roseDark" />
                      </FormControl>
                      <FormLabel className="text-minnie-black font-normal cursor-pointer">
                        Sorry, can't make it
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
              name="guestCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-minnie-black">Number of additional guests</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} className="focus-visible:ring-minnie-roseDark" />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Not including yourself
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-minnie-black">Message (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Leave a special message or any dietary requirements" 
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
              {isSubmitting ? 'Sending...' : 'Send RSVP'}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default RsvpForm;
