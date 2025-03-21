
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UseFormReturn } from 'react-hook-form';
import { RsvpFormValues } from '@/schemas/rsvpSchema';

type PersonalFieldsProps = {
  form: UseFormReturn<RsvpFormValues>;
};

const PersonalFields: React.FC<PersonalFieldsProps> = ({ form }) => {
  return (
    <>
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
    </>
  );
};

export default PersonalFields;
