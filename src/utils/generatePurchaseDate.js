const generatePurchaseDate = (date) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return {
    number: date.getDate(),
    day: weekday[date.getDay()],
    month: month[date.getMonth()],
    year: date.getFullYear(),
  };
};

export default generatePurchaseDate;
