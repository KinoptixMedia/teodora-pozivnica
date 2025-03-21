
export const calculateTimeLeft = (eventDate: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} => {
  const difference = +eventDate - +new Date();
  
  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('sr-RS', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('sr-RS', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};
