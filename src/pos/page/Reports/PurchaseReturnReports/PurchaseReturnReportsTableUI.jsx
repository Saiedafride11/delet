import React from "react";
import SerialNumberWithoutCheckbox from "../../../components/common/SerialNumberWithoutCheckbox";
import { getMonthDayYearFormat } from "../../../components/function/getMonthDayYearFormat";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import TableNoData from "../../../components/ui/NoData/TableNoData";

const PurchaseReturnReportsTableUI = ({
  purchaseReturnData,
  isLoading,
  isError,
  page,
}) => {
  return (
    <>
      <thead>
        <tr>
          <th>SL.</th>
          <th>Invoice</th>
          <th>Party Name</th>
          <th className="text-center">Grand Total</th>
          <th className="text-center">Paid</th>
          <th className="text-center">Payment Type</th>
          <th>Return Date</th>
          <th className="text-start">Return By</th>
        </tr>
      </thead>
      <tbody>
        {purchaseReturnData?.data?.["purchase-return"]?.data?.length === 0 ||
        purchaseReturnData?.data?.["purchase-return"]?.data === undefined ||
        isLoading ||
        isError ? (
          <TableNoData />
        ) : (
          purchaseReturnData?.data?.["purchase-return"]?.data?.map(
            (data, index) => (
              <tr key={index}>
                <td>
                  <SerialNumberWithoutCheckbox
                    dataFrom={
                      purchaseReturnData?.data?.["purchase-return"]?.from
                    }
                    index={index}
                  />
                </td>
                <td className="text-sky">{data?.prefix + data?.invoice}</td>
                <td>{data?.party?.name}</td>
                <td className="text-center">
                  ${getNumberWithCommas(twoDigitFixed(data?.grand_total))}
                </td>
                <td className="text-center">
                  ${getNumberWithCommas(twoDigitFixed(data?.paid_amount))}
                </td>
                <td className="text-center text-capitalize">
                  {data?.payment_by}
                </td>
                <td>
                  {data?.return_date !== null &&
                    getMonthDayYearFormat(data?.return_date)}
                </td>
                <td className="text-start">{data?.user?.name}</td>
              </tr>
            )
          )
        )}
        {page === "pdf" && (
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="fw-bold text-center">Total Return Amount:</td>
            <td className="fw-bold text-center">
              $
              {getNumberWithCommas(
                twoDigitFixed(purchaseReturnData?.data?.total_grand_total || 0)
              )}
            </td>
          </tr>
        )}
      </tbody>
    </>
  );
};

export default PurchaseReturnReportsTableUI;
