import React from "react";
import { useParams } from "react-router-dom";
import TableTopPageFilter from "../../../components/common/TableTopPageFilter";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import TableNoData from "../../../components/ui/NoData/TableNoData";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import TableTopButtons from "../../../components/utils/TableTopButtons/TableTopButtons";

import Pagination from "../../../components/common/Pagination";
import SerialNumberWithoutCheckbox from "../../../components/common/SerialNumberWithoutCheckbox";
import TableTopSearch from "../../../components/common/TableTopSearch";
import useFilterSearchQuery from "../../../hooks/useFilterSearchQuery";
import { useGetWarehouseQuery } from "../../../redux/features/warehouse/warehouseApi";
import WarehouseHistoryFilterTabs from "../WarehouseHistotyFilterTabs";

const WarehouseProductsList = () => {
  document.title = "Warehouse Products";
  const { warehouseId } = useParams();

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
    filterQuery === "" ? "?filter=product" : filterQuery + "&filter=product";

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
    Name: data?.product?.name,
    Category: data?.product?.product_category?.name,
    "Current Stock": `${data?.quantity} Pcs`,
    "Free Qty": `${data?.free_quantity} Pcs`,
    "Sale Price": `$${getNumberWithCommas(twoDigitFixed(data?.sale_price))}`,
    "Purchase Price": `$${getNumberWithCommas(
      twoDigitFixed(data?.purchase_price)
    )}`,
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
                    twoDigitFixed(warehouseData?.data?.["total-value"] || 0)
                  )}
                </h5>
                <p>Stock Value</p>
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
                    <th>Name</th>
                    <th>Category</th>
                    <th>Current Stock</th>
                    <th>Free Qty</th>
                    <th className="text-center">Sale Price</th>
                    <th className="text-center">Purchase Price</th>
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
                        <td>{data?.product?.name}</td>
                        <td>{data?.product?.product_category?.name}</td>
                        <td>{data?.quantity} Pcs</td>
                        <td>{data?.free_quantity} Pcs</td>
                        <td className="text-center">
                          $
                          {getNumberWithCommas(twoDigitFixed(data?.sale_price))}
                        </td>
                        <td className="text-center">
                          $
                          {getNumberWithCommas(
                            twoDigitFixed(data?.purchase_price)
                          )}
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

export default WarehouseProductsList;
