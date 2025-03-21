
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
    // Koristi tvoj Google Apps Script URL
    const APPS_SCRIPT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxz-igjjX8Y14W2kXk7ci9Rl3hOaQbirwOS0YWFRHs5aV2ttsSVbT1uvdwDUpvc8GC78w/exec';
    
    const response = await fetch(APPS_SCRIPT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Podaci se šalju kao JSON
      body: JSON.stringify(data)
    });

    const result = await response.json();
    
    if (result.result !== "success") {
      console.error("Greška pri unosu:", result.error);
      throw new Error(result.error || 'Failed to submit RSVP');
    }
    
    return true;
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return false;
  }
};
