import React from "react";
import { useParams } from "react-router-dom";
import TableTopPageFilter from "../../../components/common/TableTopPageFilter";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import TableNoData from "../../../components/ui/NoData/TableNoData";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import TableTopButtons from "../../../components/utils/TableTopButtons/TableTopButtons";

import { useSelector } from "react-redux";
import Pagination from "../../../components/common/Pagination";
import SerialNumberWithoutCheckbox from "../../../components/common/SerialNumberWithoutCheckbox";
import TableTopSearch from "../../../components/common/TableTopSearch";
import { getMonthDayYearFormat } from "../../../components/function/getMonthDayYearFormat";
import useFilterSearchQuery from "../../../hooks/useFilterSearchQuery";
import { useGetWarehouseQuery } from "../../../redux/features/warehouse/warehouseApi";
import WarehouseHistoryFilterTabs from "../WarehouseHistotyFilterTabs";

const WarehouseSalesList = () => {
  document.title = "Warehouse Sales List";
  const { warehouseId } = useParams();
  const currencySymbol = useSelector(
    (state) => state?.settings?.globalCurrencies?.symbol
  );

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

  const addFilterQuery =
    filterQuery === "" ? "?filter=sale" : filterQuery + "&filter=sale";

  const {
    data: warehouseData,
    isLoading,
    isError,
    isFetching,
  } = useGetWarehouseQuery(warehouseId + addFilterQuery);

  // -----------------------------------------------
  // Make Excel, CSV and pdf data
  // -----------------------------------------------
  const tableData = warehouseData?.data?.items?.data?.map((data, index) => ({
    Date: getMonthDayYearFormat(data?.sale?.sale_date),
    Invoice: data?.sale?.prefix + data?.sale?.invoice,
    "Party Name": data?.sale?.party?.name,
    "Bill amount": `${
      currencySymbol +
      getNumberWithCommas(twoDigitFixed(data?.sale?.grand_total))
    }`,
    Paid: `${
      currencySymbol +
      getNumberWithCommas(twoDigitFixed(data?.sale?.paid_amount))
    }`,
    Due: `${
      currencySymbol +
      getNumberWithCommas(twoDigitFixed(data?.sale?.payable_due_amount))
    }`,
    "Payment Type": data?.sale?.payment_type?.name,
    "Sales by": data?.sale?.user?.name,
  }));

  return (
    <div className="acnoo-dashboard-main-section">
      {(isLoading || isFetching) && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper">
          <div className="details-header print-d-none">
            <div className="title">
              <h4 className="padY-2 text-capitalize">
                {warehouseData?.data?.warehouse?.name || "Warehouse"}
              </h4>
            </div>
          </div>

          {/* Filter Tab start */}
          <WarehouseHistoryFilterTabs warehouseId={warehouseId} />

          <div className="dashboard-details-table-wrapper">
            <div className="total-count-area mt-2">
              <div className="count-item light-blue">
                <h5>
                  $
                  {getNumberWithCommas(
                    twoDigitFixed(warehouseData?.data?.["total-sale"] || 0)
                  )}
                </h5>
                <p>Total Sale</p>
              </div>
            </div>
            <div className="table-top-form daily-transaction-between-wrapper">
              <form>
                <div className="d-flex align-items-center gap-2">
                  <TableTopPageFilter
                    filterPerPage={filterPerPage}
                    handlePerPageFilter={handlePerPageFilter}
                  />
                  <TableTopSearch
                    searchText={searchText}
                    setSearchText={setSearchText}
                  />
                </div>
              </form>
              <div className="table-top-btn-group">
                <TableTopButtons arrayData={tableData} title="Products" />
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
                    <th className="text-center">Bill amount</th>
                    <th className="text-center">Paid</th>
                    <th className="text-center">Due</th>
                    <th className="text-center">Payment Type</th>
                    <th className="text-center">Sales by</th>
                  </tr>
                </thead>
                <tbody>
                  {warehouseData?.data?.items?.data?.length === 0 ||
                  warehouseData?.data?.items?.data === undefined ||
                  isLoading ||
                  isError ? (
                    <TableNoData />
                  ) : (
                    warehouseData?.data?.items?.data?.map((data, index) => (
                      <tr key={index}>
                        <td>
                          <SerialNumberWithoutCheckbox
                            dataFrom={warehouseData?.data?.items?.from}
                            index={index}
                          />
                        </td>
                        <td>{getMonthDayYearFormat(data?.sale?.sale_date)}</td>
                        <td className="text-sky">
                          {data?.sale?.prefix + data?.sale?.invoice}
                        </td>
                        <td>{data?.sale?.party?.name}</td>
                        <td className="text-center">
                          {currencySymbol +
                            getNumberWithCommas(
                              twoDigitFixed(data?.sale?.grand_total)
                            )}
                        </td>
                        <td className="text-center">
                          {currencySymbol +
                            getNumberWithCommas(
                              twoDigitFixed(data?.sale?.paid_amount)
                            )}
                        </td>
                        <td className="text-center text-orange">
                          {currencySymbol +
                            getNumberWithCommas(
                              twoDigitFixed(data?.sale?.payable_due_amount)
                            )}
                        </td>
                        <td className="text-center">
                          {data?.sale?.payment_type?.name}
                        </td>
                        <td className="text-center">
                          {data?.sale?.user?.name}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {warehouseData !== undefined &&
              warehouseData?.data?.items?.data?.length > 0 && (
                <Pagination
                  pagination={warehouseData?.data?.items}
                  setSelectedPage={setSelectedPage}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseSalesList;
