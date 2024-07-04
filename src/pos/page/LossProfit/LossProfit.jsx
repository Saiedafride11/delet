import React, { useState } from "react";
import Pagination from "../../components/common/Pagination";
import TableTopFromToDate from "../../components/common/TableTopFromToDate";
import TableTopPageFilter from "../../components/common/TableTopPageFilter";
import TableTopSearch from "../../components/common/TableTopSearch";
import { getMonthDayYearFormat } from "../../components/function/getMonthDayYearFormat";
import { getNumberWithCommas } from "../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../components/function/twoDigitFixed";
import TableNoData from "../../components/ui/NoData/TableNoData";
import LineLoader from "../../components/ui/Spinner/LineLoader";
import TableTopButtons from "../../components/utils/TableTopButtons/TableTopButtons";
import useFilterFromToDate from "../../hooks/useFilterFromToDate";
import useFilterSearchQuery from "../../hooks/useFilterSearchQuery";
import { useGetLossProfitQuery } from "../../redux/features/lossProfit/lossProfitApi";
import LossProfitViewModal from "./components/LossProfitViewModal";

const LossProfit = () => {
  document.title = "Loss/Profit";
  const [updateData, setUpdateData] = useState({});

  // -----------------------------------------------
  // All Data Show
  // -----------------------------------------------
  const {
    filterPerPage,
    handlePerPageFilter,
    searchText,
    setSearchText,
    setSelectedPage,
    filterQuery,
  } = useFilterSearchQuery();

  const { dateFilter, dateFilterParams, handleDateFilter } =
    useFilterFromToDate();

  const newFilterQuery = filterQuery
    ? filterQuery + `&${dateFilterParams}`
    : `?${dateFilterParams}`;

  const {
    data: lossProfitData,
    isLoading,
    isError,
    isFetching,
  } = useGetLossProfitQuery(newFilterQuery);

  // -----------------------------------------------
  // Make Excel, CSV and pdf data
  // -----------------------------------------------
  const tableData = lossProfitData?.data?.data?.loss_profit?.map((data) => ({
    Date:
      data?.sale_date !== null ? getMonthDayYearFormat(data?.sale_date) : "",
    Invoice: data?.prefix + data?.invoice,
    "Party Name": data?.party?.name,
    "Sale Amount": `$${getNumberWithCommas(twoDigitFixed(data?.grand_total))}`,
    Paid: `$${getNumberWithCommas(twoDigitFixed(data?.paid_amount))}`,
    Due: `$${getNumberWithCommas(twoDigitFixed(data?.due_amount))}`,
    "Profit (+)": `$${
      data?.sale_details_sum_profit > 0 ? "+" : ""
    }${getNumberWithCommas(twoDigitFixed(data?.sale_details_sum_profit))}`,
    "Loss (-)": `$${getNumberWithCommas(
      twoDigitFixed(data?.sale_details_sum_loss)
    )}`,
  }));

  const lossProfitCalculation = lossProfitData?.data?.data;
  const dataFrom = lossProfitData?.data?.pagination?.from;
  return (
    <div className="acnoo-dashboard-main-section">
      {(isLoading || isFetching) && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper">
          <div className="details-header print-d-none">
            <div className="title">
              <h4>Loss/Profit</h4>
            </div>
          </div>

          <div className="dashboard-details-table-wrapper">
            <div className="total-count-area mt-2">
              <div className="count-item light-blue">
                <h5>
                  $
                  {getNumberWithCommas(
                    twoDigitFixed(
                      lossProfitCalculation?.overall_total_sale || 0
                    )
                  )}
                </h5>
                <p>Sale Profit</p>
              </div>
              <div className="count-item light-green">
                <h5>
                  $
                  {getNumberWithCommas(
                    twoDigitFixed(
                      lossProfitCalculation?.overall_total_loss || 0
                    )
                  )}
                </h5>
                <p>Sale Loss</p>
              </div>
              <div className="count-item light-orange">
                <h5>
                  $
                  {getNumberWithCommas(
                    twoDigitFixed(lossProfitCalculation?.overall_income || 0)
                  )}
                </h5>
                <p>Income</p>
              </div>
              <div className="count-item light-blue-sm">
                <h5>
                  $
                  {getNumberWithCommas(
                    twoDigitFixed(lossProfitCalculation?.overall_expense || 0)
                  )}
                </h5>
                <p>Expense</p>
              </div>
              <div className="count-item light-red">
                <h5>
                  $
                  {getNumberWithCommas(
                    twoDigitFixed(lossProfitCalculation?.gross_profit || 0)
                  )}
                </h5>
                <p>Gross Profit</p>
              </div>
            </div>
            <div className="table-top-form daily-transaction-between-wrapper">
              <form>
                <div className="d-flex align-items-center gap-2 custom-flex-wrap">
                  <div className="d-flex align-items-center gap-2 section-one">
                    <TableTopPageFilter
                      filterPerPage={filterPerPage}
                      handlePerPageFilter={handlePerPageFilter}
                    />
                    <TableTopSearch
                      searchText={searchText}
                      setSearchText={setSearchText}
                    />
                  </div>
                  <TableTopFromToDate
                    dateFilter={dateFilter}
                    handleDateFilter={handleDateFilter}
                  />
                </div>
              </form>
              <div className="table-top-btn-group">
                <TableTopButtons arrayData={tableData} title="Loss/Profit" />
              </div>
            </div>

            <div className="responsive-table">
              <table className="table">
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
                    <th className="print-d-none">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {lossProfitData?.data?.data?.loss_profit?.length === 0 ||
                  lossProfitData?.data?.data?.loss_profit === undefined ||
                  isLoading ||
                  isError ? (
                    <TableNoData />
                  ) : (
                    lossProfitData?.data?.data?.loss_profit?.map(
                      (data, index) => (
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
                          <td
                            className="text-sky cursor-pointer"
                            data-bs-toggle="modal"
                            data-bs-target="#show-loss-profit-modal"
                            onClick={(e) => setUpdateData(data)}
                          >
                            {data?.prefix + data?.invoice}
                          </td>
                          <td>{data?.party?.name}</td>
                          <td className="text-center">
                            $
                            {getNumberWithCommas(
                              twoDigitFixed(data?.grand_total)
                            )}
                          </td>
                          <td className="text-center">
                            $
                            {getNumberWithCommas(
                              twoDigitFixed(data?.paid_amount)
                            )}
                          </td>
                          <td className="text-center">
                            $
                            {getNumberWithCommas(
                              twoDigitFixed(data?.due_amount)
                            )}
                          </td>
                          <td className="text-center text-green">
                            ${data?.sale_details_sum_profit > 0 ? "+" : ""}
                            {getNumberWithCommas(
                              twoDigitFixed(data?.sale_details_sum_profit)
                            )}
                          </td>
                          <td className="text-center text-orange">
                            $
                            {getNumberWithCommas(
                              twoDigitFixed(data?.sale_details_sum_loss)
                            )}
                          </td>
                          <td
                            className="print-d-none text-sky cursor-pointer"
                            data-bs-toggle="modal"
                            data-bs-target="#show-loss-profit-modal"
                            onClick={(e) => setUpdateData(data)}
                          >
                            Show {" >"}
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
            {lossProfitData !== undefined &&
              lossProfitData?.data?.data?.loss_profit?.length > 0 && (
                <Pagination
                  pagination={lossProfitData?.data?.pagination}
                  setSelectedPage={setSelectedPage}
                />
              )}
          </div>
        </div>
      </div>
      <LossProfitViewModal updateData={updateData} />
    </div>
  );
};

export default LossProfit;
