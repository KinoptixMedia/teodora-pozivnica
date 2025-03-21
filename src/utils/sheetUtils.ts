
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
    // URL do tvog Google Apps Script endpointa
    const APPS_SCRIPT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxfVfITYkZr4UiyD6th9GYGqz-VDYKPvGrGfX3IjkHKgt0tgU7oBUQrqu0VUcDf9a7ZuQ/exec';
    
    const response = await fetch(APPS_SCRIPT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Pošalji podatke kao JSON
      body: JSON.stringify(data)
    });

    const result = await response.json();
    
    // Provjeri rezultat i izbaci grešku ako nije "success"
    if (result.result !== "success") {
      throw new Error(result.error || 'Failed to submit RSVP');
    }
    
    return true;
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return false;
  }
};
