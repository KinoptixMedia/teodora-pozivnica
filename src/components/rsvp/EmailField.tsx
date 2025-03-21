
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { RsvpFormValues } from '@/schemas/rsvpSchema';

type EmailFieldProps = {
  form: UseFormReturn<RsvpFormValues>;
};

const EmailField: React.FC<EmailFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-minnie-black">Email</FormLabel>
          <FormControl>
            <Input 
              type="email"
              placeholder="vasa.adresa@email.com" 
              {...field} 
              className="focus-visible:ring-minnie-roseDark" 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EmailField;
