import React from "react";
import SerialNumberWithoutCheckbox from "../../../components/common/SerialNumberWithoutCheckbox";
import { getMonthDayYearFormat } from "../../../components/function/getMonthDayYearFormat";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import { partyTypeMap } from "../../../components/types/partyTypeMap";
import TableNoData from "../../../components/ui/NoData/TableNoData";

const SalesReportsTableUI = ({ salesData, isLoading, isError, page }) => {
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
          <th className="text-start">Sales By</th>
        </tr>
      </thead>
      <tbody>
        {salesData?.data?.sale?.data?.length === 0 ||
        salesData?.data?.sale?.data === undefined ||
        isLoading ||
        isError ? (
          <TableNoData />
        ) : (
          salesData?.data?.sale?.data?.map((data, index) => (
            <tr key={index}>
              <td>
                <SerialNumberWithoutCheckbox
                  dataFrom={salesData?.data?.sale?.from}
                  index={index}
                />
              </td>
              <td>{getMonthDayYearFormat(data?.sale_date)}</td>
              <td className="text-sky">{data?.prefix + data?.invoice}</td>
              <td>{data?.party?.name}</td>
              <td>{partyTypeMap[data?.party?.party_type]}</td>
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
                  salesData?.data?.sale_filter_total?.[0]?.sale_due || 0
                )
              )}
            </td>
          </tr>
        )}
      </tbody>
    </>
  );
};

export default SalesReportsTableUI;
