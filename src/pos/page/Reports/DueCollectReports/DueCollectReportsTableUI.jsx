import React from "react";
import SerialNumberWithoutCheckbox from "../../../components/common/SerialNumberWithoutCheckbox";
import { getMonthDayYearFormat } from "../../../components/function/getMonthDayYearFormat";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import { partyTypeMap } from "../../../components/types/partyTypeMap";
import TableNoData from "../../../components/ui/NoData/TableNoData";

const DueCollectReportsTableUI = ({
  dueCollectData,
  isLoading,
  isError,
  page,
}) => {
  const updateDueData = Object?.values(dueCollectData?.data?.data?.data || {});

  return (
    <>
      <thead>
        <tr>
          <th>SL.</th>
          <th>Date</th>
          <th>Voucher</th>
          <th>Party Name</th>
          <th>Party Type</th>
          <th className="text-center">Paid</th>
          <th className="text-start">Collect By</th>
        </tr>
      </thead>
      <tbody>
        {updateDueData?.length === 0 ||
        updateDueData === undefined ||
        updateDueData === null ||
        isLoading ||
        isError ? (
          <TableNoData />
        ) : (
          updateDueData?.map((data, index) => (
            <tr key={index}>
              <td>
                <SerialNumberWithoutCheckbox
                  dataFrom={dueCollectData?.data?.data?.from}
                  index={index}
                />
              </td>
              <td>{getMonthDayYearFormat(data?.collect_date)}</td>
              <td className="text-sky">{data?.prefix + data?.invoice}</td>
              <td>{data?.party?.name}</td>
              <td>{partyTypeMap[data?.party?.party_type]}</td>
              <td className="text-center">
                ${getNumberWithCommas(twoDigitFixed(data?.amount || 0))}
              </td>
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
            <td className="fw-bold text-center">Due Collection:</td>
            <td className="fw-bold text-center">
              $
              {getNumberWithCommas(
                twoDigitFixed(dueCollectData?.data?.total_due_collect || 0)
              )}
            </td>
          </tr>
        )}
        {page === "pdf" && (
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="fw-bold text-center">Supplier Payment:</td>
            <td className="fw-bold text-center">
              $
              {getNumberWithCommas(
                twoDigitFixed(dueCollectData?.data?.total_due_payment || 0)
              )}
            </td>
          </tr>
        )}
      </tbody>
    </>
  );
};

export default DueCollectReportsTableUI;
