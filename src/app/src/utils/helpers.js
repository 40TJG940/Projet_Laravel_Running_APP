
export const formatDistance = (meters) => {
    const km = meters / 1000;
    return `${km.toFixed(2)} km`;
  };
  
  export const formatPace = (seconds, distanceInMeters) => {
    const minutes = seconds / 60;
    const kilometers = distanceInMeters / 1000;
    const pace = minutes / kilometers;
    const paceMinutes = Math.floor(pace);
    const paceSeconds = Math.floor((pace - paceMinutes) * 60);
    return `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')} /km`;
  };
  
  export const calculateCalories = (weightKg, distanceKm, speedKmh) => {
    const met = 8; // Assuming average running MET
    const hours = distanceKm / speedKmh;
    return Math.round(met * weightKg * hours);
  };

export default helper;