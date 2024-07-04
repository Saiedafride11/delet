import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import editIcon from "../../../assets/images/actions/edit.svg";
import eyeIcon from "../../../assets/images/actions/eye.svg";
import deleteIcon from "../../../assets/images/actions/trash.svg";
import MultipleDeleteItems from "../../../components/common/MultipleDeleteItems";
import MultipleSelectCheckBox from "../../../components/common/MultipleSelectCheckBox";
import Pagination from "../../../components/common/Pagination";
import SerialNumber from "../../../components/common/SerialNumber";
import TableTopPageFilter from "../../../components/common/TableTopPageFilter";
import TableTopSearch from "../../../components/common/TableTopSearch";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import DeleteModal from "../../../components/modal/DeleteModal";
import TableNoData from "../../../components/ui/NoData/TableNoData";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import TableTopButtons from "../../../components/utils/TableTopButtons/TableTopButtons";
import useFilterSearchQuery from "../../../hooks/useFilterSearchQuery";
import useMultipleDataDelete from "../../../hooks/useMultipleDataDelete";
import useSingleDataDelete from "../../../hooks/useSingleDataDelete";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useMultiDeleteProductMutation,
} from "../../../redux/features/products/products/productsApi";
import ProductsFilterTabs from "../ProductsFilterTabs";
import ProductListViewModal from "../components/modal/ProductListViewModal";

const ProductList = () => {
  document.title = "Products List";
  const [deleteId, setDeleteId] = useState(0);
  const [error, setError] = useState("");
  const [updateData, setUpdateData] = useState({});
  // const [fetchLoading, setFetchLoading] = useState(false);
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
    isFetching,
  } = useGetProductsQuery(filterQuery);

  // useEffect(() => {
  //   setFetchLoading(isFetching);
  // }, [isFetching]);

  // -----------------------------------------------
  // Single Delete Data
  // -----------------------------------------------
  const [
    deleteProduct,
    {
      isSuccess: deleteIsSuccess,
      isLoading: deleteIsLoading,
      error: deleteError,
    },
  ] = useDeleteProductMutation();

  const { handleDelete } = useSingleDataDelete(
    deleteProduct,
    deleteError,
    deleteIsSuccess,
    setError,
    "Product"
  );

  // -----------------------------------------------
  // Multiple Delete Data
  // -----------------------------------------------
  const [
    multiDeleteProduct,
    {
      isSuccess: multiDeleteIsSuccess,
      isLoading: multiDeleteIsLoading,
      error: multiDeleteError,
    },
  ] = useMultiDeleteProductMutation();

  const {
    selectItems,
    checkedItems,
    handleItemsSelect,
    handleMultipleSelect,
    handleMultipleDelete,
    handleResetMultipleSelect,
  } = useMultipleDataDelete(
    productsData?.data?.products?.data,
    multiDeleteProduct,
    multiDeleteError,
    multiDeleteIsSuccess,
    setError,
    "Product"
  );

  // -----------------------------------------------
  // Make Excel, CSV and pdf data
  // -----------------------------------------------
  const tableData = productsData?.data?.products?.data?.map((data) => ({
    SKU: data?.sku_code,
    "Product name": data?.name,
    Category: data?.product_category?.name,
    Brand: data?.brand?.name,
    Model: data?.p_model?.name,
    Unit: data?.unit?.name,
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
    "Sale price": `${
      currencySymbol +
      getNumberWithCommas(
        twoDigitFixed(
          Math.max(...data?.product_stocks?.map((item) => item.sale_price))
        )
      )
    }`,
    "Wholesale price": `${
      currencySymbol +
      getNumberWithCommas(
        twoDigitFixed(
          Math.max(...data?.product_stocks?.map((item) => item.wholesale_price))
        )
      )
    }`,
    "Dealer price": `${
      currencySymbol +
      getNumberWithCommas(
        twoDigitFixed(
          Math.max(...data?.product_stocks?.map((item) => item.dealer_price))
        )
      )
    }`,
  }));

  return (
    <div className="acnoo-dashboard-main-section">
      {(isLoading || isFetching) && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper">
          <div className="details-header print-d-none">
            <div className="title">
              <h4>Product List</h4>
              <Link to="/products/create" className="btn custom-btn">
                <span>+</span> Add Product
              </Link>
            </div>
          </div>
          {/* Filter Tab start */}
          <ProductsFilterTabs />

          <div className="dashboard-details-table-wrapper">
            <div className="table-top-form daily-transaction-between-wrapper pt-0">
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
            {selectItems?.length > 0 && (
              <MultipleDeleteItems selectItems={selectItems} />
            )}

            <div className="responsive-table">
              <table className="table" id="erp-table">
                <thead>
                  <tr>
                    <th>
                      <MultipleSelectCheckBox
                        checkedItems={checkedItems}
                        handleMultipleSelect={handleMultipleSelect}
                      />
                    </th>
                    <th>Code</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Unit</th>
                    <th>Current Stock</th>
                    <th className="text-center">Purchase</th>
                    <th className="text-center">Retailer</th>
                    <th className="text-center">Wholesale</th>
                    <th className="text-center">Dealer</th>
                    <th className="print-d-none">Action</th>
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
                          <SerialNumber
                            index={index}
                            selectItems={selectItems}
                            id={data?.id}
                            dataFrom={productsData?.data?.products?.from}
                            handleItemsSelect={handleItemsSelect}
                          />
                        </td>
                        <td>{data?.sku_code}</td>
                        <td className="text-overflow-w-150">{data?.name}</td>
                        <td>{data?.product_category?.name}</td>
                        <td>{data?.brand?.name}</td>
                        <td>{data?.p_model?.name}</td>
                        <td>{data?.unit?.name}</td>
                        <td>
                          {getNumberWithCommas(twoDigitFixed(data?.quantity))}{" "}
                          (Free{" "}
                          {getNumberWithCommas(
                            twoDigitFixed(data?.free_quantity)
                          )}
                          )
                        </td>
                        <td className="text-center">
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
                        <td className="text-center">
                          {currencySymbol +
                            getNumberWithCommas(
                              twoDigitFixed(
                                Math.max(
                                  ...data?.product_stocks?.map(
                                    (item) => item.sale_price
                                  )
                                )
                              )
                            )}
                        </td>
                        <td className="text-center">
                          {currencySymbol +
                            getNumberWithCommas(
                              twoDigitFixed(
                                Math.max(
                                  ...data?.product_stocks?.map(
                                    (item) => item.wholesale_price
                                  )
                                )
                              )
                            )}
                        </td>
                        <td className="text-center">
                          {currencySymbol +
                            getNumberWithCommas(
                              twoDigitFixed(
                                Math.max(
                                  ...data?.product_stocks?.map(
                                    (item) => item.dealer_price
                                  )
                                )
                              )
                            )}
                        </td>
                        <td className="print-d-none">
                          <div className="dropdown shoplist-dropdown">
                            <Link
                              className="action-icon"
                              data-bs-toggle="dropdown"
                              onClick={handleResetMultipleSelect}
                            >
                              <i className="fas fa-ellipsis-v"></i>
                            </Link>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                <Link
                                  data-bs-toggle="modal"
                                  data-bs-target="#pos-view-modal"
                                  onClick={(e) => setUpdateData(data)}
                                >
                                  <img src={eyeIcon} alt="icon" />
                                  View
                                </Link>
                              </li>
                              <li>
                                <Link to={`/products/update/${data?.id}`}>
                                  <img src={editIcon} alt="icon" />
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <Link
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                  onClick={() => setDeleteId(data?.id)}
                                >
                                  <img src={deleteIcon} alt="icon" />
                                  Delete
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {productsData !== undefined &&
              productsData?.data?.products?.data?.length > 0 && (
                <Pagination
                  pagination={productsData?.data?.products}
                  setSelectedPage={setSelectedPage}
                />
              )}
          </div>
        </div>
      </div>

      <ProductListViewModal
        updateData={updateData}
        currencySymbol={currencySymbol}
      />

      <DeleteModal
        handleDelete={
          selectItems?.length > 0 ? handleMultipleDelete : handleDelete
        }
        id={deleteId}
        error={error}
        setError={setError}
        isLoading={multiDeleteIsLoading}
        page={selectItems?.length > 0 ? "multiple" : "single"}
      />
    </div>
  );
};

export default ProductList;
