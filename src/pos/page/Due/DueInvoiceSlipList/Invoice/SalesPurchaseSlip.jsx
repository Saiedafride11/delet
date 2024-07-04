import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { convertNumberToWords } from "../../../../components/function/convertNumberToWords";
import { getDayMonthYearFormat } from "../../../../components/function/getMonthDayYearFormat";
import { getNumberWithCommas } from "../../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../../components/function/twoDigitFixed";
import DevelopedBy from "../../../../components/ui/Invoice/DevelopedBy";
import StoreInfo from "../../../../components/ui/Invoice/StoreInfo";
import { handleFormattedDate } from "../../../../components/utils/TableTopButtons/handleFormattedDate";

const SalesPurchaseSlip = ({ initialData, slipType }) => {
  const loginUser = useSelector((state) => state?.admin?.adminProfile);

  const handlePrint = () => {
    document.title = `${handleFormattedDate() + "-" + initialData?.invoice}`;
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

    if (timeDifferenceInSeconds <= 4) {
      handlePrint();
    }
  }, [initialData]);
  return (
    <div className="container print-max-w">
      <div className="text-end">
        <button className="print-btn my-5 print-d-none" onClick={handlePrint}>
          <i className="fa fa-print me-2"></i> Print
        </button>
      </div>
      <div className="invoice-content print-p-15">
        <div>
          <StoreInfo />
          <div className="title text-center my-3">
            <h3 className="static-ui-h3">Payment Slip</h3>
          </div>
          <div className="invoice-info due-invoice-info">
            <ul>
              <li>
                <strong>Customer Name</strong> <strong>:</strong>{" "}
                {initialData?.party?.name}
              </li>
              <li>
                <strong>Phone</strong>
                <strong>:</strong> {initialData?.party?.phone}
              </li>
              <li>
                <strong>Address</strong>
                <strong>:</strong> {initialData?.party?.address}
              </li>
              <li>
                <strong>Remarks</strong> <strong>:</strong>N/A
              </li>
            </ul>
            <ul>
              <li>
                <strong>Invoice No</strong>
                <strong>:</strong> {initialData?.prefix + initialData?.invoice}
              </li>
              <li>
                <strong>Date</strong> <strong>:</strong>
                {getDayMonthYearFormat(
                  initialData?.collect_date?.split(" ")[0]
                )}
              </li>
              <li>
                <strong>Received By</strong>
                <strong>:</strong> {loginUser?.name}
              </li>
              <li>
                <strong>Payment Type</strong>
                <strong>:</strong>
                {initialData?.payment_type?.name}
              </li>
            </ul>
          </div>
          <table className="table table-bordered border-0 mt-3 mb-1">
            <thead>
              <tr>
                <th className="text-start">Description</th>
                <th className="text-center w-90">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {initialData?.purchase_id || initialData?.sale_id ? (
                  <td className="text-start">
                    Received with Thanks, Invoice:{" "}
                    <strong>
                      {initialData?.[slipType]?.prefix +
                        initialData?.[slipType]?.invoice ||
                        initialData?.prefix + initialData?.invoice}
                    </strong>
                  </td>
                ) : (
                  <td className="text-start">
                    Received with Thanks
                    <strong> Opening Due</strong>
                  </td>
                )}
                <td className="text-center">
                  {getNumberWithCommas(twoDigitFixed(initialData?.amount))}
                </td>
              </tr>
              <tr className="border-0">
                <td className="text-start border-0 px-0">
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <span>
                      <strong>Amounts in words : </strong>{" "}
                      {convertNumberToWords(initialData?.amount)}
                    </span>
                    <strong>Remaining Balance</strong>
                  </div>
                </td>
                <td className="text-center border-0 px-0">
                  {getNumberWithCommas(
                    twoDigitFixed(
                      initialData?.[slipType]?.payable_due_amount ||
                        initialData?.remaining_due_amount
                    )
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-center">
          <h2 className="due-invoice-thank-you mb-0">Thank You!</h2>
          <p>
            <strong>Your payment has been received</strong>
          </p>
        </div>
        <div>
          <div className="invoice-signature d-flex justify-content-between mb-3 mt-5">
            <p>Customer Signature</p>
            <p>Authorized Signature</p>
          </div>
          <DevelopedBy />
        </div>
      </div>
    </div>
  );
};

export default SalesPurchaseSlip;
