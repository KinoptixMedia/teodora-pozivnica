
export const rsvpFormSchema = z.object({
  // ...ostala polja ostaju ista
  
  guestCount: z.string()
    .refine(val => {
      const num = parseInt(val || '0');
      return num >= 0 && num <= 10;
    }, {
      message: 'Broj gostiju mora biti između 0 i 10',
    })
    .optional(),
  
}).refine(data => {
  // Ako dolazi (yes), proveri da li je broj gostiju >= 0
  if (data.attending === 'yes') {
    return data.guestCount !== undefined && parseInt(data.guestCount) >= 0;
  }
  return true;
}, {
  message: 'Morate navesti broj gostiju',
  path: ['guestCount'],
});
