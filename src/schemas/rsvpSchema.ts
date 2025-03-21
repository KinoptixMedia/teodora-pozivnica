import { z } from 'zod';

export const rsvpFormSchema = z.object({
  firstName: z.string()
    .min(2, { message: 'Ime mora imati najmanje 2 karaktera' })
    .max(50, { message: 'Ime ne može imati više od 50 karaktera' })
    .trim(),
  
  lastName: z.string()
    .min(2, { message: 'Prezime mora imati najmanje 2 karaktera' })
    .max(50, { message: 'Prezime ne može imati više od 50 karaktera' })
    .trim(),
  
  attending: z.enum(['yes', 'no'], {
    required_error: 'Molimo odaberite da li dolazite',
    invalid_type_error: 'Nevažeća opcija',
  }),
  
  guestCount: z.string()
    .refine(val => val === '0' || (Number(val) >= 1 && Number(val) <= 10), {
      message: 'Broj gostiju mora biti između 0 i 10',
    })
    .optional(),
  
  guestsInfo: z.string()
    .max(200, { message: 'Opis gostiju ne može imati više od 200 karaktera' })
    .optional(),
  
  message: z.string()
    .max(500, { message: 'Poruka ne može imati više od 500 karaktera' })
    .optional(),
}).refine(data => {
  if (data.attending === 'yes' && data.guestCount === '0') {
    return false;
  }
  return true;
}, {
  message: 'Morate navesti broj gostiju ako dolazite',
  path: ['guestCount'],
});

export type RsvpFormValues = z.infer<typeof rsvpFormSchema>;
