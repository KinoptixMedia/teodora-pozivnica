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
    const APPS_SCRIPT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyfB2O8n63sgOqBn92ty_la_-gEOzTpttowJmX6_MqhTmL1Pn1OJOxkz0zD4wRbzmU4/exec'; // Vaš URL

    const response = await fetch(APPS_SCRIPT_ENDPOINT, {
      method: 'POST', // OBAVEZNO navodnici!
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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
