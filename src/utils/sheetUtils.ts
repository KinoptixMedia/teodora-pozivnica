
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

    // Using no-cors mode means we won't get a proper response back
    // that we can parse, but the request will still be sent
    await fetch(APPS_SCRIPT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      mode: 'no-cors',
    });

    // Since we're using no-cors, we can't actually check the response
    // But the request will still be sent, so we return true
    return true;
  } catch (error) {
    console.error('Greška pri slanju:', {
      error,
      data: JSON.stringify(data),
    });
    return false;
  }
};
