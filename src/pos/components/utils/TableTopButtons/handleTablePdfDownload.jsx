import jsPDF from "jspdf";
import "jspdf-autotable";
import { handleSuccessToast } from "../../ui/Toast/handleSuccessToast";
import { handleFormattedDate } from "./handleFormattedDate";

export const handleTablePdfDownload = (arrayData, title) => {
  const pdf = new jsPDF();

  const docWidth = pdf.internal.pageSize.width;
  const docHeight = pdf.internal.pageSize.height;

  const addCenteredText = (text, Position, yPosition, fontSize) => {
    const textWidth =
      (pdf.getStringUnitWidth(text) * Position) / pdf.internal.scaleFactor;
    const xPosition = (docWidth - textWidth) / 2;
    pdf.setFontSize(fontSize);
    pdf.text(text, xPosition, yPosition);
  };
  addCenteredText("Acnoo POS", 16, 12, 16);
  addCenteredText(`${title || ""} List`, 12, 18, 12);

  //Table
  pdf.autoTable({
    head: [Object.keys(arrayData[0])],
    body: arrayData.map((row) => Object.values(row)),
    startY: 22,
    styles: {
      fontSize: 8,
    },
  });

  // handleFormattedDate function import another page
  pdf.save(`${handleFormattedDate()}-acnoo.pdf`);
  //Toast
  handleSuccessToast("Downloaded Successfully");
};
