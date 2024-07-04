import React from "react";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import { partyTypeMap } from "../../../components/types/partyTypeMap";
import TableNoData from "../../../components/ui/NoData/TableNoData";

const DueReportsTableUI = ({
  updateDueList,
  isLoading,
  isError,
  page,
  dataFrom,
  total_due,
}) => {
  return (
    <>
      <thead>
        <tr>
          <th>SL.</th>
          <th>Party Name</th>
          <th>Party Type</th>
          <th className="text-center">Total Due</th>
          <th>Due Date</th>
          <th className="text-start">Sales By</th>
        </tr>
      </thead>
      <tbody>
        {updateDueList?.length === 0 ||
        updateDueList === undefined ||
        isLoading ||
        isError ? (
          <TableNoData />
        ) : (
          updateDueList?.map((data, index) => (
            <tr key={index}>
              <td>
                {dataFrom < 9 && index < 9
                  ? `0${dataFrom + index}`
                  : dataFrom + index}
              </td>
              <td className="text-sky">{data?.name}</td>
              <td>{partyTypeMap[data?.party_type] || ""}</td>
              <td className="text-center">
                ${getNumberWithCommas(twoDigitFixed(data?.totalDue))}
              </td>
              <td>{data?.due_date}</td>
              <td className="text-start">
                {data?.invoiceList?.[0]?.user?.name}
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
            <td className="fw-bold text-center">Total Due:</td>
            <td className="fw-bold text-center">
              ${getNumberWithCommas(twoDigitFixed(total_due || 0))}
            </td>
          </tr>
        )}
      </tbody>
    </>
  );
};

export default DueReportsTableUI;
