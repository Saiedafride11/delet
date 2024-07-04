import React from "react";
import SerialNumberWithoutCheckbox from "../../../components/common/SerialNumberWithoutCheckbox";
import { getMonthDayYearFormat } from "../../../components/function/getMonthDayYearFormat";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import TableNoData from "../../../components/ui/NoData/TableNoData";

const ExpenseReportsTableUI = ({ expenseData, isLoading, isError, page }) => {
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
        {expenseData?.data?.expense?.data?.length === 0 ||
        expenseData?.data?.expense?.data === undefined ||
        isLoading ||
        isError ? (
          <TableNoData />
        ) : (
          expenseData?.data?.expense?.data?.map((data, index) => (
            <tr key={index}>
              <td>
                <SerialNumberWithoutCheckbox
                  dataFrom={expenseData?.data?.expense?.from}
                  index={index}
                />
              </td>
              <td>
                {data?.expense_date !== null &&
                  getMonthDayYearFormat(data?.expense_date)}
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
            <td className="fw-bold text-center">Total Expense:</td>
            <td className="fw-bold text-center">
              $
              {getNumberWithCommas(
                twoDigitFixed(expenseData?.data?.["total-expense"] || 0)
              )}
            </td>
          </tr>
        )}
      </tbody>
    </>
  );
};

export default ExpenseReportsTableUI;
