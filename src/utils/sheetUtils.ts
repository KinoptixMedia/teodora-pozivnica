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
    const APPS_SCRIPT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbySTs2jHoIynwaBG9TPJ6DqmIdeY2Q9xpF0CnM62ThUgXuPbTGWwsRL1R45W4v-e_75/exec';

    const response = await fetch(APPS_SCRIPT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      mode: 'no-cors' // Dodajemo no-cors mode
    });

    // Provera da li postoji sadržaj pre parsiranja
    const textResponse = await response.text();
    if (!textResponse) {
      throw new Error('Prazan odgovor od servera');
    }

    const result = JSON.parse(textResponse);
    
    if (result.result !== "success") {
      throw new Error(result.error || 'Nepoznata greška');
    }
    
    return true;
  } catch (error) {
    console.error('Greška pri slanju:', {
      error,
      data: JSON.stringify(data)
    });
    throw error;
  }
};
