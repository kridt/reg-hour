let currentDate = new Date();

let currentMonth = currentDate.getMonth();

let startMonth;
let startYear;
let endMonth;
let endYear;

if (currentDate.getDate() >= 16) {
  // If the current date is 16th or later, the salary period starts from the next month.
  startMonth = currentMonth + 1;
  startYear = currentDate.getFullYear();
  endMonth = currentMonth + 2;
  endYear = currentDate.getFullYear();
} else {
  // If the current date is before the 16th, the salary period starts from the current month.
  startMonth = currentMonth;
  startYear = currentDate.getFullYear();
  endMonth = currentMonth + 1;
  endYear = currentDate.getFullYear();
}

// If the month is December, the next month is January of the next year.
if (startMonth === 12) {
  startMonth = 0;
  startYear = currentDate.getFullYear() + 1;
}

const startDate = new Date(startYear, startMonth - 1, 16);
const endDate = new Date(endYear, endMonth - 1, 15);

export const listOfDates = getDatesBetween(startDate, endDate);

function getDatesBetween(startDate, endDate) {
  const datesArray = [];
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    datesArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return datesArray;
}
