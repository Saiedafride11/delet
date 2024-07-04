import React from "react";
import { useSelector } from "react-redux";
import Pagination from "../../components/common/Pagination";
import SerialNumberWithoutCheckbox from "../../components/common/SerialNumberWithoutCheckbox";
import TableTopPageFilter from "../../components/common/TableTopPageFilter";
import TableTopSearch from "../../components/common/TableTopSearch";
import { getNumberWithCommas } from "../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../components/function/twoDigitFixed";
import TableNoData from "../../components/ui/NoData/TableNoData";
import LineLoader from "../../components/ui/Spinner/LineLoader";
import TableTopButtons from "../../components/utils/TableTopButtons/TableTopButtons";
import useFilterSearchQuery from "../../hooks/useFilterSearchQuery";
import { useGetProductsQuery } from "../../redux/features/products/products/productsApi";

const StockList = () => {
  document.title = "Stock List";
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

  const {
    data: productsData,
    isError,
    isLoading,
  } = useGetProductsQuery(filterQuery);

  // -----------------------------------------------
  // Make Excel, CSV and pdf data
  // -----------------------------------------------
  const tableData = productsData?.data?.products?.data?.map((data) => ({
    "Product name": data?.name,
    Category: data?.product_category?.name,
    Brand: data?.brand?.name,
    Model: data?.p_model?.name,
    Stock: `${getNumberWithCommas(
      twoDigitFixed(data.quantity)
    )} (Free ${getNumberWithCommas(twoDigitFixed(data?.free_quantity))})`,
    "Purchase price": `${
      currencySymbol +
      getNumberWithCommas(
        twoDigitFixed(
          Math.max(...data?.product_stocks?.map((item) => item.purchase_price))
        )
      )
    }`,
    Total: `${
      currencySymbol +
      getNumberWithCommas(
        twoDigitFixed(
          Math.max(
            ...data?.product_stocks?.map(
              (item) => item.purchase_price * data?.quantity
            )
          )
        )
      )
    }`,
    Status:
      data?.quantity <=
      data?.product_stocks?.reduce((acc, curr) =>
        curr.purchase_price > acc.purchase_price ? curr : acc
      )?.low_quantity
        ? "Low"
        : "",
  }));

  return (
    <div className="acnoo-dashboard-main-section">
      {isLoading && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper">
          <div className="details-header print-d-none">
            <div className="title">
              <h4>Stock List</h4>
            </div>
          </div>

          <div className="dashboard-details-table-wrapper">
            <div className="total-count-area mt-2">
              <div className="count-item light-blue">
                <h5>
                  {currencySymbol +
                    getNumberWithCommas(
                      twoDigitFixed(
                        productsData?.data?.["product-info"]
                          ?.total_purchase_price || 0
                      )
                    )}
                </h5>
                <p>Stock Value</p>
              </div>
              <div className="count-item light-red">
                <h5>
                  {getNumberWithCommas(
                    productsData?.data?.["low-stock-item"] || 0
                  )}
                </h5>
                <p>Low stock</p>
              </div>
              <div className="count-item light-blue-sm">
                <h5>
                  {getNumberWithCommas(
                    productsData?.data?.["product-info"]?.total_quantity || 0
                  )}
                </h5>
                <p>Quantity</p>
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
                <TableTopButtons arrayData={tableData} />
              </div>
            </div>

            <div className="responsive-table">
              <table className="table">
                <thead>
                  <tr>
                    <th>SL.</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Current Stock</th>
                    <th>Purchase Price</th>
                    <th>Total Value</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {productsData?.data?.products?.data?.length === 0 ||
                  productsData?.data?.products?.data === undefined ||
                  isLoading ||
                  isError ? (
                    <TableNoData />
                  ) : (
                    productsData?.data?.products?.data.map((data, index) => (
                      <tr key={index}>
                        <td>
                          <SerialNumberWithoutCheckbox
                            dataFrom={productsData?.data?.products?.from}
                            index={index}
                          />
                        </td>
                        <td>{data?.name}</td>
                        <td>{data?.product_category?.name}</td>
                        <td>{data?.brand?.name}</td>
                        <td>{data?.p_model?.name}</td>
                        <td>
                          {getNumberWithCommas(twoDigitFixed(data?.quantity))}{" "}
                          (Free{" "}
                          {getNumberWithCommas(
                            twoDigitFixed(data?.free_quantity)
                          )}
                          )
                        </td>
                        <td>
                          {currencySymbol +
                            getNumberWithCommas(
                              twoDigitFixed(
                                Math.max(
                                  ...data?.product_stocks?.map(
                                    (item) => item.purchase_price
                                  )
                                )
                              )
                            )}
                        </td>
                        <td>
                          {currencySymbol +
                            getNumberWithCommas(
                              twoDigitFixed(
                                Math.max(
                                  ...data?.product_stocks?.map(
                                    (item) =>
                                      item.purchase_price * data?.quantity
                                  )
                                )
                              )
                            )}
                        </td>
                        <td className="text-red">
                          {data?.quantity <=
                          data?.product_stocks?.reduce((acc, curr) =>
                            curr.purchase_price > acc.purchase_price
                              ? curr
                              : acc
                          )?.low_quantity
                            ? "Low"
                            : ""}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {productsData !== undefined &&
              productsData?.data?.products?.data?.length !== 0 && (
                <Pagination
                  pagination={productsData?.data?.products}
                  setSelectedPage={setSelectedPage}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockList;
