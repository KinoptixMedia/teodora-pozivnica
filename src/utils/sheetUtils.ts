
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
        // Ako Sheety zahtjeva autentikaciju, dodaj ovdje npr. 'Authorization': 'Bearer YOUR_API_KEY'
      },
      // U ovoj strukturi, 'rsvp' je ključ u kojem se nalaze podaci.
      body: JSON.stringify({ rsvp: data })
    });

    if (!response.ok) {
      throw new Error('Failed to submit RSVP');
    }

    return true;
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return false;
  }
};
