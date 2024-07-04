import React from "react";
import SerialNumberWithoutCheckbox from "../../../components/common/SerialNumberWithoutCheckbox";
import { getMonthDayYearFormat } from "../../../components/function/getMonthDayYearFormat";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import TableNoData from "../../../components/ui/NoData/TableNoData";

const IncomeReportsTableUI = ({ incomeData, isLoading, isError, page }) => {
  return (
    <>
      <thead>
        <tr>
          <th>SL.</th>
          <th>Date</th>
          <th>Name</th>
          <th>Category</th>
          <th>Note</th>
          <th className="text-center">Amount</th>
          <th className="text-center">Payment Type</th>
        </tr>
      </thead>
      <tbody>
        {incomeData?.data?.income?.data?.length === 0 ||
        incomeData?.data?.income?.data === undefined ||
        isLoading ||
        isError ? (
          <TableNoData />
        ) : (
          incomeData?.data?.income?.data?.map((data, index) => (
            <tr key={index}>
              <td>
                <SerialNumberWithoutCheckbox
                  dataFrom={incomeData?.data?.income?.from}
                  index={index}
                />
              </td>
              <td>
                {data?.income_date !== null &&
                  getMonthDayYearFormat(data?.income_date)}
              </td>
              <td>{data?.sector}</td>
              <td>{data?.income_expense_category?.name}</td>
              <td className="text-overflow-mw-300">{data?.note}</td>
              <td className="text-center">${data?.amount}</td>
              <td className="text-center">{data?.payment_type}</td>
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
            <td className="fw-bold text-center">Total Income:</td>
            <td className="fw-bold text-center">
              $
              {getNumberWithCommas(
                twoDigitFixed(incomeData?.data?.["total-income"] || 0)
              )}
            </td>
          </tr>
        )}
      </tbody>
    </>
  );
};

export default IncomeReportsTableUI;
