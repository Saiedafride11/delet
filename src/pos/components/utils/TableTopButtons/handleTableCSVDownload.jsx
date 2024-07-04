import { handleSuccessToast } from "../../ui/Toast/handleSuccessToast";
import { handleFormattedDate } from "./handleFormattedDate";

export const handleTableCSVDownload = (arrayData) => {
  const dataWithoutCommas = arrayData?.map((obj) =>
    Object.fromEntries(
      Object.entries(obj)?.map(([key, value]) => [
        key,
        typeof value === "string" ? value.replace(/,/g, "") : value,
      ])
    )
  );

  const keys = Object.keys(dataWithoutCommas[0]);
  const titleRow = keys.join(",") + "\n";

  const csvContent =
    "data:text/csv;charset=utf-8," +
    titleRow +
    dataWithoutCommas?.map((row) => Object.values(row).join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.href = encodedUri;
  // handleFormattedDate function import another page
  const filename = `${handleFormattedDate()}-acnoo.csv`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  //Toast
  handleSuccessToast("Downloaded Successfully");
};

// const dataWithoutCommas = data.map((obj) =>
//   Object.fromEntries(
//     Object.entries(obj).map(([key, value]) => [
//       key,
//       typeof value === "string" ? value.replace(/,/g, "") : value,
//     ])
//   )
// );

// console.log(dataWithoutCommas);

// function removeCommas(obj) {
//   for (let key in obj) {
//     if (typeof obj[key] === "string") {
//       obj[key] = obj[key].replace(/,/g, "");
//     }
//   }
// }
// data.forEach((obj) => {
//   removeCommas(obj);
// });
