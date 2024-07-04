import React from "react";
import { Link } from "react-router-dom";
import SerialNumberWithoutCheckbox from "../../../components/common/SerialNumberWithoutCheckbox";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import { partyTypeMap } from "../../../components/types/partyTypeMap";
import TableNoData from "../../../components/ui/NoData/TableNoData";

const LedgerReportsTableUI = ({ ledgerData, isLoading, isError, page }) => {
  // const dataFrom = lossProfitData?.data?.pagination?.from;
  return (
    <>
      <thead>
        <tr>
          <th>SL.</th>
          <th>Party Name</th>
          <th>Phone Number</th>
          <th className="text-center">Party Type</th>
          {page !== "pdf" && <th className="text-center">Total Amount</th>}
          {page !== "pdf" && <th className="text-center">Paid</th>}
          <th className="text-center">Due</th>
          <th className="text-center">Remarks</th>
        </tr>
      </thead>
      <tbody>
        {ledgerData?.data?.data?.length === 0 ||
        ledgerData?.data?.data === undefined ||
        isLoading ||
        isError ? (
          <TableNoData />
        ) : (
          ledgerData?.data?.data?.map((data, index) => (
            <tr key={index}>
              <td>
                <SerialNumberWithoutCheckbox
                  dataFrom={ledgerData?.data?.from}
                  index={index}
                />
              </td>
              <td>
                <Link to={`/reports/ledger/${data?.id}`} className="text-sky">
                  {data?.name}
                </Link>
              </td>
              <td>{data?.phone}</td>
              <td className="text-center">
                {partyTypeMap[data?.party_type] || ""}
              </td>
              {page !== "pdf" && (
                <td className="text-center">
                  $
                  {getNumberWithCommas(
                    twoDigitFixed(data?.party_total_transaction)
                  )}
                </td>
              )}
              {page !== "pdf" && (
                <td className="text-center">
                  ${getNumberWithCommas(twoDigitFixed(data?.party_total_paid))}
                </td>
              )}
              <td className="text-center">
                ${getNumberWithCommas(twoDigitFixed(data?.party_total_due))}
              </td>
              <td className="text-center">N/A</td>
            </tr>
          ))
        )}
        {page === "pdf" && (
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td className="fw-bold text-center">Total Balance:</td>
            <td className="fw-bold text-center">0</td>
            <td></td>
          </tr>
        )}
      </tbody>
    </>
  );
};

export default LedgerReportsTableUI;
