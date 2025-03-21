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
    const APPS_SCRIPT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbw7_RMF1QjN35nNrLjtmFn5ZZovlUoPznvo_zC2kcdf/exec';

    // Šaljemo podatke kao JSON
    const response = await fetch(APPS_SCRIPT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      mode: 'no-cors', // Dodajemo no-cors mode
    });

    // Provera da li je response uopšte stigao
    if (!response.ok && response.type !== 'opaque') {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true; // Pretpostavka da je uspešno ako nije bacen error
    
  } catch (error) {
    console.error('Greška pri slanju:', error);
    throw new Error('Došlo je do greške pri povezivanju sa serverom');
  }
};
