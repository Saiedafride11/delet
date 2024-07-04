import React, { useEffect } from "react";
import { handleFormattedDate } from "../../utils/TableTopButtons/handleFormattedDate";

const PrintButton = ({ initialData }) => {
  // const handlePrint = () => {
  //   window.print();
  // };

  const handlePrint = (paperSize) => {
    document.title = `${
      handleFormattedDate() + "-" + initialData?.prefix + initialData?.invoice
    }`;

    // const style = document.createElement("style");
    // style.innerHTML = `@page { size: ${paperSize}; margin: 0;}`;
    // style.innerHTML = `@page { size: ${paperSize}}`;
    // document.head.appendChild(style);
    window.print();

    document.title = "Acnoo POS";
  };

  useEffect(() => {
    const currentTime = new Date();
    const createdAtTime = new Date(initialData?.created_at);
    // const createdAtTime = new Date(initialData.updated_at);
    const timeDifferenceInSeconds = Math.abs(
      (currentTime - createdAtTime) / 1000
    );

    if (timeDifferenceInSeconds <= 5) {
      handlePrint();
    }
  }, [initialData]);

  // console.log("initialData", initialData);

  return (
    <div className="text-end">
      <button
        disabled={initialData?.invoice === undefined}
        className="print-btn my-5 print-d-none"
        // onClick={() => window.print()}
        onClick={() => handlePrint("A4")}
      >
        <i className="fa fa-print me-2"></i> Print
      </button>
    </div>
  );
};

export default PrintButton;
