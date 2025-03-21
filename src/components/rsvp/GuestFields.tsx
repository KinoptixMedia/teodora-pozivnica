
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { RsvpFormValues } from '@/schemas/rsvpSchema';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type GuestFieldsProps = {
  form: UseFormReturn<RsvpFormValues>;
  attending: string;
  guestCount: string;
};

const GuestFields: React.FC<GuestFieldsProps> = ({ form, attending, guestCount }) => {
  if (attending !== 'yes') {
    return null;
  }
  
  return (
    <>
      <FormField
        control={form.control}
        name="guestCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-minnie-black">Broj osoba koje dolaze sa vama</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="focus-visible:ring-minnie-roseDark">
                  <SelectValue placeholder="Izaberite broj gostiju" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white">
                <SelectItem value="0">Samo ja</SelectItem>
                <SelectItem value="1">+1 osoba</SelectItem>
                <SelectItem value="2">+2 osobe</SelectItem>
                <SelectItem value="3">+3 osobe</SelectItem>
                <SelectItem value="4">+4 osobe</SelectItem>
                <SelectItem value="5">+5 osoba</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {guestCount && guestCount !== "0" && (
        <FormField
          control={form.control}
          name="guestsInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-minnie-black">Imena i prezimena osoba koje dolaze sa vama</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Npr: Ana Marković, Milan Jovanović" 
                  {...field} 
                  className="focus-visible:ring-minnie-roseDark resize-none"
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default GuestFields;
