
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { RsvpFormValues } from '@/schemas/rsvpSchema';

type MessageFieldProps = {
  form: UseFormReturn<RsvpFormValues>;
};

const MessageField: React.FC<MessageFieldProps> = ({ form }) => {
  return (
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
  );
};

export default MessageField;
