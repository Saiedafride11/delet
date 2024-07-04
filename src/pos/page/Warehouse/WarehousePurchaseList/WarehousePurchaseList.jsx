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

const WarehousePurchaseList = () => {
  document.title = "Warehouse Purchase List";
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
    filterQuery === "" ? "?filter=purchase" : filterQuery + "&filter=purchase";

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
    Date: getMonthDayYearFormat(data?.purchase?.purchase_date),
    Invoice: data?.purchase?.prefix + data?.purchase?.invoice,
    "Party Name": data?.purchase?.party?.name,
    "Bill amount": `${
      currencySymbol +
      getNumberWithCommas(twoDigitFixed(data?.purchase?.grand_total))
    }`,
    Paid: `${
      currencySymbol +
      getNumberWithCommas(twoDigitFixed(data?.purchase?.paid_amount))
    }`,
    Due: `${
      currencySymbol +
      getNumberWithCommas(twoDigitFixed(data?.purchase?.payable_due_amount))
    }`,
    "Payment Type": data?.purchase?.payment_type?.name,
    "Purchase by": data?.purchase?.user?.name,
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
                    twoDigitFixed(warehouseData?.data?.["total-purchase"] || 0)
                  )}
                </h5>
                <p>Total Purchase</p>
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
                    <th className="text-center">Purchase by</th>
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
                        <td>
                          {getMonthDayYearFormat(data?.purchase?.purchase_date)}
                        </td>
                        <td className="text-sky">
                          {data?.purchase?.prefix + data?.purchase?.invoice}
                        </td>
                        <td>{data?.purchase?.party?.name}</td>
                        <td className="text-center">
                          {currencySymbol +
                            getNumberWithCommas(
                              twoDigitFixed(data?.purchase?.grand_total)
                            )}
                        </td>
                        <td className="text-center">
                          {currencySymbol +
                            getNumberWithCommas(
                              twoDigitFixed(data?.purchase?.paid_amount)
                            )}
                        </td>
                        <td className="text-center text-orange">
                          {currencySymbol +
                            getNumberWithCommas(
                              twoDigitFixed(data?.purchase?.payable_due_amount)
                            )}
                        </td>
                        <td className="text-center">
                          {data?.purchase?.payment_type?.name}
                        </td>
                        <td className="text-center">
                          {data?.purchase?.user?.name}
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

export default WarehousePurchaseList;
