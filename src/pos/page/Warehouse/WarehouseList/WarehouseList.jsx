import React, { useState } from "react";
import { Link } from "react-router-dom";
import editIcon from "../../../assets/images/actions/edit.svg";
import eyeIcon from "../../../assets/images/actions/eye.svg";
import deleteIcon from "../../../assets/images/actions/trash.svg";
import MultipleDeleteItems from "../../../components/common/MultipleDeleteItems";
import MultipleSelectCheckBox from "../../../components/common/MultipleSelectCheckBox";
import StatusSwitch from "../../../components/common/StatusSwitch";
import TableTopPageFilter from "../../../components/common/TableTopPageFilter";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import DeleteModal from "../../../components/modal/DeleteModal";
import ProductWarehouseModal from "../../../components/modal/Warehouse/ProductWarehouseModal";
import TableNoData from "../../../components/ui/NoData/TableNoData";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import TableTopButtons from "../../../components/utils/TableTopButtons/TableTopButtons";
import useSingleDataDelete from "../../../hooks/useSingleDataDelete";
import useStatusChange from "../../../hooks/useStatusChange";

import { useSelector } from "react-redux";
import PaginationLocal from "../../../components/common/PaginationLocal";
import SerialNumber from "../../../components/common/SerialNumber";
import TableTopSearchLocal from "../../../components/common/TableTopSearchLocal";
import useFilterSearchQueryLocal from "../../../hooks/useFilterSearchQueryLocal";
import useMultipleDataDelete from "../../../hooks/useMultipleDataDelete";
import {
  useDeleteWarehouseMutation,
  useGetWarehouseQuery,
  useMultiDeleteWarehouseMutation,
  useUpdateWarehouseStatusMutation,
} from "../../../redux/features/warehouse/warehouseApi";
import WarehouseFilterTabs from "../WarehouseFilterTabs";
import WarehouseListViewModal from "./WarehouseListViewModal";

const WarehouseList = () => {
  document.title = "Warehouse List";
  const [deleteId, setDeleteId] = useState(0);
  const [error, setError] = useState("");
  const [updateData, setUpdateData] = useState({});
  const currencySymbol = useSelector(
    (state) => state?.settings?.globalCurrencies?.symbol
  );

  // -----------------------------------------------
  // All Data Show
  // -----------------------------------------------

  const {
    data: warehouseData,
    isLoading,
    isError,
    isFetching,
  } = useGetWarehouseQuery();

  // -----------------------------------------------
  // Local Modified Data
  // -----------------------------------------------

  const {
    searchText,
    filterPerPage,
    selectedPage,
    setSelectedPage,
    initialListData,
    updateDataList,
    handlePerPageFilter,
    handleSearchChange,
    dataFrom,
  } = useFilterSearchQueryLocal(warehouseData?.data?.warehouse);

  // -----------------------------------------------
  // Single Delete Data
  // -----------------------------------------------
  const [
    deleteWarehouse,
    {
      isSuccess: deleteIsSuccess,
      isLoading: deleteIsLoading,
      error: deleteError,
    },
  ] = useDeleteWarehouseMutation();

  const { handleDelete } = useSingleDataDelete(
    deleteWarehouse,
    deleteError,
    deleteIsSuccess,
    setError,
    "Warehouse"
  );

  // -----------------------------------------------
  // Multiple Delete Data
  // -----------------------------------------------
  const [
    multiDeleteWarehouse,
    {
      isSuccess: multiDeleteIsSuccess,
      isLoading: multiDeleteIsLoading,
      error: multiDeleteError,
    },
  ] = useMultiDeleteWarehouseMutation();

  const {
    selectItems,
    checkedItems,
    handleItemsSelect,
    handleMultipleSelect,
    handleMultipleDelete,
    handleResetMultipleSelect,
  } = useMultipleDataDelete(
    updateDataList,
    multiDeleteWarehouse,
    multiDeleteError,
    multiDeleteIsSuccess,
    setError,
    "Warehouse"
  );

  // -----------------------------------------------
  // Data status on or off
  // -----------------------------------------------
  const [
    updateWarehouseStatus,
    {
      data: responseStatusData,
      isSuccess: responseStatusSuccess,
      isLoading: responseStatusLoading,
      error: responseStatusError,
    },
  ] = useUpdateWarehouseStatusMutation();

  const { handleStatusChange } = useStatusChange(
    updateWarehouseStatus,
    responseStatusError,
    responseStatusSuccess,
    responseStatusData
  );
  // -----------------------------------------------
  // Make Excel, CSV and pdf data
  // -----------------------------------------------
  const tableData = updateDataList?.map((data, index) => ({
    SL: index < 9 ? `0${index + 1}` : index + 1,
    Name: data?.name,
    Phone: data?.phone,
    Address: [data?.address, data?.city, data?.zip_code]
      .filter(Boolean)
      .join(", "),
    Product: `${getNumberWithCommas(
      twoDigitFixed(data?.total_product)
    )} (Free ${getNumberWithCommas(twoDigitFixed(data?.total_free_product))})`,
    "Stock value": `${
      currencySymbol +
      getNumberWithCommas(twoDigitFixed(data?.purchase_product_value))
    }`,
  }));

  return (
    <div className="acnoo-dashboard-main-section">
      {(isLoading || isFetching) && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper">
          <div className="details-header print-d-none">
            <div className="title">
              <h4>Warehouse List</h4>
              <Link
                data-bs-toggle="modal"
                data-bs-target="#product-warehouse-modal"
                className="btn custom-btn"
              >
                <span>+</span> Add Warehouse
              </Link>
            </div>
          </div>

          {/* Filter Tab start */}
          <WarehouseFilterTabs />

          <div className="dashboard-details-table-wrapper">
            <div className="table-top-form daily-transaction-between-wrapper pt-0">
              <form>
                <div className="d-flex align-items-center gap-2">
                  <TableTopPageFilter
                    filterPerPage={filterPerPage}
                    handlePerPageFilter={handlePerPageFilter}
                  />
                  <TableTopSearchLocal
                    searchText={searchText}
                    handleSearchChange={handleSearchChange}
                  />
                </div>
              </form>
              <div className="table-top-btn-group">
                <TableTopButtons arrayData={tableData} title="Warehouse" />
              </div>
            </div>
            {selectItems?.length > 0 && (
              <MultipleDeleteItems selectItems={selectItems} />
            )}

            <div className="responsive-table">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <MultipleSelectCheckBox
                        checkedItems={checkedItems}
                        handleMultipleSelect={handleMultipleSelect}
                      />
                    </th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Product</th>
                    <th className="text-center">Stock value</th>
                    <th>Status</th>
                    <th className="print-d-none">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {updateDataList?.length === 0 ||
                  updateDataList === undefined ||
                  isLoading ||
                  isError ? (
                    <TableNoData />
                  ) : (
                    updateDataList?.map((data, index) => (
                      <tr key={index}>
                        <td>
                          <SerialNumber
                            index={index}
                            selectItems={selectItems}
                            id={data?.id}
                            dataFrom={dataFrom}
                            handleItemsSelect={handleItemsSelect}
                          />
                        </td>
                        <td>
                          <Link
                            to={`/warehouse/products/${data?.id}`}
                            className="text-sky"
                          >
                            {data?.name}
                          </Link>
                        </td>
                        <td>{data?.phone}</td>
                        <td>
                          {[data?.address, data?.city, data?.zip_code]
                            .filter(Boolean)
                            .join(", ")}
                        </td>
                        <td>
                          {getNumberWithCommas(
                            twoDigitFixed(data?.total_product)
                          )}{" "}
                          (Free{" "}
                          {getNumberWithCommas(
                            twoDigitFixed(data?.total_free_product)
                          )}
                          )
                        </td>
                        <td className="text-center">
                          {currencySymbol +
                            getNumberWithCommas(
                              twoDigitFixed(data?.purchase_product_value)
                            )}
                        </td>
                        <td>
                          <StatusSwitch
                            id={data.id}
                            status={data.status}
                            loading={responseStatusLoading}
                            handleChange={handleStatusChange}
                          />
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
                                  data-bs-target="#warehouse-view-modal"
                                  onClick={(e) => setUpdateData(data)}
                                >
                                  <img src={eyeIcon} alt="icon" />
                                  View
                                </Link>
                              </li>
                              <li>
                                <Link
                                  data-bs-toggle="modal"
                                  data-bs-target="#product-warehouse-modal"
                                  onClick={(e) => setUpdateData(data)}
                                >
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
            {initialListData?.length > 0 && (
              <PaginationLocal
                items={initialListData}
                filterPerPage={
                  filterPerPage === "all"
                    ? initialListData?.length
                    : filterPerPage
                }
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            )}
          </div>
        </div>
      </div>

      <WarehouseListViewModal
        updateData={updateData}
        currencySymbol={currencySymbol}
      />
      <ProductWarehouseModal
        updateData={updateData}
        setUpdateData={setUpdateData}
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

export default WarehouseList;
