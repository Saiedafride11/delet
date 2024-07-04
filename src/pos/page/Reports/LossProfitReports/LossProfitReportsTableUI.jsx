import React from "react";
import { getMonthDayYearFormat } from "../../../components/function/getMonthDayYearFormat";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import TableNoData from "../../../components/ui/NoData/TableNoData";

const LossProfitReportsTableUI = ({
  lossProfitData,
  isLoading,
  isError,
  page,
  totalSale,
}) => {
  const dataFrom = lossProfitData?.data?.pagination?.from;
  return (
    <>
      <thead>
        <tr>
          <th>SL.</th>
          <th>Date</th>
          <th>Invoice</th>
          <th>Party Name</th>
          <th className="text-center">Sale Amount</th>
          <th className="text-center">Paid Amount</th>
          <th className="text-center">Due Amount</th>
          <th className="text-center">Profit (+)</th>
          <th className="text-center">Loss (-)</th>
        </tr>
      </thead>
      <tbody>
        {lossProfitData?.data?.data?.loss_profit?.length === 0 ||
        lossProfitData?.data?.data?.loss_profit === undefined ||
        isLoading ||
        isError ? (
          <TableNoData />
        ) : (
          lossProfitData?.data?.data?.loss_profit?.map((data, index) => (
            <tr key={index}>
              <td>
                {dataFrom < 9 && index < 9
                  ? `0${dataFrom + index}`
                  : dataFrom + index}
              </td>
              <td>
                {data?.sale_date !== null
                  ? getMonthDayYearFormat(data?.sale_date)
                  : ""}
              </td>
              <td className="text-sky">{data?.prefix + data?.invoice}</td>
              <td>{data?.party?.name}</td>
              <td className="text-center">
                ${getNumberWithCommas(twoDigitFixed(data?.grand_total))}
              </td>
              <td className="text-center">
                ${getNumberWithCommas(twoDigitFixed(data?.paid_amount))}
              </td>
              <td className="text-center">
                ${getNumberWithCommas(twoDigitFixed(data?.due_amount))}
              </td>
              <td className="text-center text-green">
                ${data?.sale_details_sum_profit > 0 ? "+" : ""}
                {getNumberWithCommas(
                  twoDigitFixed(data?.sale_details_sum_profit)
                )}
              </td>
              <td className="text-center text-red">
                $
                {getNumberWithCommas(
                  twoDigitFixed(data?.sale_details_sum_loss)
                )}
              </td>
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
            <td className="fw-bold text-center">Total:</td>
            <td className="fw-bold text-center">
              ${getNumberWithCommas(twoDigitFixed(totalSale))}
            </td>
          </tr>
        )}
      </tbody>
    </>
  );
};

export default LossProfitReportsTableUI;
