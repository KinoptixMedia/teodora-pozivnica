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
    
    // Kreiraj proxy URL za zaobilaženje CORS-a
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    
    const response = await fetch(proxyUrl + APPS_SCRIPT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    return true;
  } catch (error) {
    console.error('Greška:', error);
    throw error;
  }
};
