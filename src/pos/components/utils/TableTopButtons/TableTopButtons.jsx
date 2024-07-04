import React from "react";
import { Link } from "react-router-dom";
import csvIcon from "../../../assets/images/icons/csv.svg";
import excelIcon from "../../../assets/images/icons/excel.svg";
import pdfIcon from "../../../assets/images/icons/pdf.svg";
import printIcon from "../../../assets/images/icons/print.svg";
import { handleTableCSVDownload } from "./handleTableCSVDownload";
import { handleTablePdfDownload } from "./handleTablePdfDownload";
import { handleTableXLDownload } from "./handleTableXLDownload";

const TableTopButtons = ({ arrayData, title }) => {
  const dynamicData = [
    {
      onclick: () => handleTableCSVDownload(arrayData),
      icon: csvIcon,
    },
    {
      onclick: () => handleTableXLDownload(arrayData),
      icon: excelIcon,
    },
    {
      onclick: () => handleTablePdfDownload(arrayData, title),
      icon: pdfIcon,
    },
    {
      onclick: () => window.print(),
      icon: printIcon,
    },
  ];
  return (
    <ul>
      {dynamicData?.map((data, index) => (
        <li key={index}>
          <Link
            onClick={arrayData?.length > 0 ? data?.onclick : undefined}
            className={arrayData?.length === 0 ? "cursor-not-allowed" : ""}
          >
            <img src={data?.icon} alt="icon" />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TableTopButtons;
