import React from "react";
import SerialNumberWithoutCheckbox from "../../../components/common/SerialNumberWithoutCheckbox";
import { getMonthDayYearFormat } from "../../../components/function/getMonthDayYearFormat";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import TableNoData from "../../../components/ui/NoData/TableNoData";

const PurchaseReportsTableUI = ({
  purchasesData,
  isLoading,
  isError,
  page,
}) => {
  return (
    <>
      <thead>
        <tr>
          <th>SL.</th>
          <th>Date</th>
          <th>Invoice</th>
          <th>Party Name</th>
          <th>Party Type</th>
          <th className="text-center">Bill amount</th>
          <th className="text-center">Paid</th>
          <th className="text-center">Due</th>
          <th className="text-center">Payment Type</th>
          <th className="text-start">Purchase By</th>
        </tr>
      </thead>
      <tbody>
        {purchasesData?.data?.purchase?.data?.length === 0 ||
        purchasesData?.data?.purchase?.data === undefined ||
        isLoading ||
        isError ? (
          <TableNoData />
        ) : (
          purchasesData?.data?.purchase?.data?.map((data, index) => (
            <tr key={index}>
              <td>
                <SerialNumberWithoutCheckbox
                  dataFrom={purchasesData?.data?.purchase?.from}
                  index={index}
                />
              </td>
              <td>{getMonthDayYearFormat(data?.purchase_date)}</td>
              <td className="text-sky">{data?.prefix + data?.invoice}</td>
              <td>{data?.party?.name}</td>
              <td>Supplier</td>
              <td className="text-center">
                ${getNumberWithCommas(twoDigitFixed(data?.grand_total))}
              </td>
              <td className="text-center">
                ${getNumberWithCommas(twoDigitFixed(data?.paid_all_amount))}
              </td>
              <td className="text-center">
                ${getNumberWithCommas(twoDigitFixed(data?.payable_due_amount))}
              </td>
              <td className="text-center">{data?.payment_type?.name}</td>
              <td className="text-start">{data?.user?.name}</td>
            </tr>
          ))
        )}
        {page === "pdf" && (
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="fw-bold text-center">Total Due:</td>
            <td className="fw-bold text-center">
              $
              {getNumberWithCommas(
                twoDigitFixed(
                  purchasesData?.data?.purchase_filter_total?.[0]
                    ?.purchase_due || 0
                )
              )}
            </td>
          </tr>
        )}
      </tbody>
    </>
  );
};

export default PurchaseReportsTableUI;
