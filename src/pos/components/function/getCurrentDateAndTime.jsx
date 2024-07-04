const padZero = (value) => (value < 10 ? "0" + value : value);

export const getCurrentDateAndTime = () => {
  const today = new Date();
  // const formattedDate = `${today.getFullYear()}/${padZero(
  //   today.getMonth() + 1
  // )}/${padZero(today.getDate())}`;
  const formattedDate = `${padZero(today.getDate())}/${padZero(
    today.getMonth() + 1
  )}/${today.getFullYear()}`;
  const formattedTime = `${padZero(today.getHours())}:${padZero(
    today.getMinutes()
  )}:${padZero(today.getSeconds())}`;

  const formattedDateAndTime = `${formattedDate} ${formattedTime}`;
  return formattedDateAndTime;
};

// 2024-07-31
export const getCurrentDate = () => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${padZero(
    today.getMonth() + 1
  )}-${padZero(today.getDate())}`;
  return formattedDate;
};

//25-07-2024
export const getCurrentDateWithLastYear = () => {
  const today = new Date();
  const formattedDate = `${padZero(today.getDate())}-${padZero(
    today.getMonth() + 1
  )}-${today.getFullYear()}`;
  return formattedDate;
};

export const getCurrentTime = () => {
  const today = new Date();
  const formattedTime = `${padZero(today.getHours())}:${padZero(
    today.getMinutes()
  )}:${padZero(today.getSeconds())}`;
  return formattedTime;
};

// purchase_date: new Date()?.toISOString()?.split("T")[0], //date: new Date(formValue?.date).toLocaleDateString("en-GB"),
