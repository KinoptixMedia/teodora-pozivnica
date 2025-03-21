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
    
    const formData = new URLSearchParams();
    formData.append('firstName', encodeURIComponent(data.firstName));
    formData.append('lastName', encodeURIComponent(data.lastName));
    formData.append('attending', data.attending);
    formData.append('guestCount', data.guestCount);
    formData.append('guestsInfo', encodeURIComponent(data.guestsInfo));
    formData.append('message', encodeURIComponent(data.message || ''));

    const response = await fetch(APPS_SCRIPT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.result !== "success") {
      throw new Error(result.error || 'Greška pri čuvanju podataka');
    }
    
    return true;
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    throw error;
  }
};
