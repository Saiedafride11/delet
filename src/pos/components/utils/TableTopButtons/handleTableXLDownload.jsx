import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { handleSuccessToast } from "../../ui/Toast/handleSuccessToast";
import { handleFormattedDate } from "./handleFormattedDate";
export const handleTableXLDownload = (arrayData) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  const ws = XLSX.utils.json_to_sheet(arrayData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });
  const excelData = new Blob([excelBuffer], { type: fileType });

  // handleFormattedDate function import another page
  const filename = `${handleFormattedDate()}-acnoo.xlsx`;
  FileSaver.saveAs(excelData, filename);

  //Toast
  handleSuccessToast("Downloaded Successfully");
};
