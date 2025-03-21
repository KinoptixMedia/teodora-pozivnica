
import * as z from 'zod';

export const rsvpFormSchema = z.object({
  firstName: z.string().min(2, { message: 'Unesite vaše ime' }),
  lastName: z.string().min(2, { message: 'Unesite vaše prezime' }),
  email: z.string().email({ message: 'Unesite važeću email adresu' }),
  attending: z.enum(['yes', 'no'], {
    required_error: 'Molimo odaberite da li dolazite',
  }),
  guestCount: z.string().optional(),
  guestsInfo: z.string().optional(),
  message: z.string().optional(),
});

export type RsvpFormValues = z.infer<typeof rsvpFormSchema>;
