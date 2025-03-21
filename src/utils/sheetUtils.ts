
interface RsvpData {
  firstName: string;
  lastName: string;
  attending: string;
  guestCount: string;
  guestsInfo: string;
  message?: string;
}

export const submitRsvpToGoogleSheet = async (data: RsvpData): Promise<boolean> => {
  try {
    const SHEETY_API_ENDPOINT = 'https://api.sheety.co/590ecf813603ac69ab34ce3e0470bedc/spisakGostijuZaTeodorinoKrstenje/лист1';

    const response = await fetch(SHEETY_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // Ako je potrebna autentikacija, dodaj ovdje npr. 'Authorization': 'Bearer YOUR_API_KEY'
      },
      // Ključ treba odgovarati imenu resursa u Sheety-ju (u ovom slučaju "лист1")
      body: JSON.stringify({ лист1: data })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to submit RSVP: ${response.status} ${errorData}`);
    }

    return true;
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return false;
  }
};
