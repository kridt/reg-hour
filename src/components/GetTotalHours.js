function parseTime(timeString) {
  const [hours, minutes, seconds] = timeString?.split(".").map(Number);
  return { hours, minutes, seconds };
}

function calculateWorkHours(startTime, endTime) {
  const start = parseTime(startTime);
  const end = parseTime(endTime);

  // Konverter start- og sluttid til minutter
  const startMinutes = start.hours * 60 + start.minutes + start.seconds / 60;
  const endMinutes = end.hours * 60 + end.minutes + end.seconds / 60;

  // Beregn arbejdstiden i minutter
  let workMinutes = endMinutes - startMinutes;

  // Beregn pausen baseret på arbejdstiden
  if (workMinutes > 240 && workMinutes <= 480) {
    workMinutes -= 30; // 30 minutters pause efter 4 timer arbejde
  } else if (workMinutes > 480) {
    workMinutes -= 45; // 45 minutters pause efter 8 timer arbejde
  }

  // Afrund til nærmeste kvarter (15 minutter)
  const roundedWorkMinutes = Math.round(workMinutes / 15) * 15;

  // Konverter til timer og minutter
  const hours = Math.floor(roundedWorkMinutes / 60);
  const minutes = roundedWorkMinutes % 60;

  return { hours, minutes };
}

// Eksempel på brug i en React-komponent
function WorkHoursCalculator(startTime, endTime) {
  const result = calculateWorkHours(startTime, endTime);

  return result.hours + "." + result.minutes;
}

export default WorkHoursCalculator;
