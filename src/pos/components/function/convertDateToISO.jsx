export const convertDateToISO = (dateString) => {
  if (!dateString) return null;
  return dateString.split("/").reverse().join("-");
};
