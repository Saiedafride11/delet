// export const getMonthDayYearFormat = (date) => {
//   return new Date(date).toLocaleDateString("en-US", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   }); //February 15, 2024
// };
export const getMonthDayYearFormat = (dated) => {
  const date = new Date(dated);
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const formattedDate = `${day} ${month}, ${year}`;
  return formattedDate; //15 Feb, 2024
};

export const getDayMonthYearFormat = (date) => {
  const dateObject = new Date(date);
  const formattedDate = `${dateObject.getDate()}/${
    dateObject.getMonth() + 1
  }/${dateObject.getFullYear()}`;
  return formattedDate;
};

export const getPrefixDayMonthYearFormat = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear() % 100;
  const formattedDate =
    ("0" + day).slice(-2) + ("0" + month).slice(-2) + ("0" + year).slice(-2);
  return formattedDate;
};
