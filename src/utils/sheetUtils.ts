interface RsvpData {
  firstName: string;
  lastName: string;
  attending: string;
  guestCount: string;
  guestsInfo: string;
  message?: string;
}

interface AppsScriptResponse {
  result: 'success' | 'error';
  error?: string;
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
      mode: 'no-cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const textResponse = await response.text();
    if (!textResponse) {
      throw new Error('Prazan odgovor od servera');
    }

    let result: AppsScriptResponse;
    try {
      result = JSON.parse(textResponse);
    } catch (parseError) {
      console.error("Greška pri parsiranju JSON odgovora:", parseError);
      throw new Error("Greška pri parsiranju JSON odgovora.");
    }

    if (result.result !== 'success') {
      throw new Error(result.error || result.message || 'Nepoznata greška');
    }

    return true;
  } catch (error) {
    console.error('Greška pri slanju:', {
      error,
      data: JSON.stringify(data),
    });
    throw error;
  }
};
