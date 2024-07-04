import React, { useState } from "react";
import { Link } from "react-router-dom";
import editIcon from "../../../assets/images/actions/edit.svg";
import printIcon from "../../../assets/images/actions/print.svg";
import deleteIcon from "../../../assets/images/actions/trash.svg";
import MultipleDeleteItems from "../../../components/common/MultipleDeleteItems";
import MultipleSelectCheckBox from "../../../components/common/MultipleSelectCheckBox";
import TableTopPageFilter from "../../../components/common/TableTopPageFilter";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import DeleteModal from "../../../components/modal/DeleteModal";
import TableNoData from "../../../components/ui/NoData/TableNoData";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import TableTopButtons from "../../../components/utils/TableTopButtons/TableTopButtons";
import useSingleDataDelete from "../../../hooks/useSingleDataDelete";

import Pagination from "../../../components/common/Pagination";
import SerialNumber from "../../../components/common/SerialNumber";
import TableTopSearch from "../../../components/common/TableTopSearch";
import useFilterSearchQuery from "../../../hooks/useFilterSearchQuery";
import useMultipleDataDelete from "../../../hooks/useMultipleDataDelete";
import {
  useDeleteWarehouseTransferMutation,
  useGetWarehouseTransfersQuery,
  useMultiDeleteWarehouseTransferMutation,
} from "../../../redux/features/warehouse/warehouseTransferApi";

import { useSelector } from "react-redux";
import WarehouseFilterTabs from "../WarehouseFilterTabs";

const StockTransferList = () => {
  document.title = "Warehouse Transfer List";
  const [deleteId, setDeleteId] = useState(0);
  const [error, setError] = useState("");
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
    data: warehouseTransferData,
    isError,
    isLoading,
    isFetching,
  } = useGetWarehouseTransfersQuery(filterQuery);

  // -----------------------------------------------
  // Single Delete Data
  // -----------------------------------------------
  const [
    deleteWarehouseTransfer,
    {
      isSuccess: deleteIsSuccess,
      isLoading: deleteIsLoading,
      error: deleteError,
    },
  ] = useDeleteWarehouseTransferMutation();

  const { handleDelete } = useSingleDataDelete(
    deleteWarehouseTransfer,
    deleteError,
    deleteIsSuccess,
    setError,
    "Warehouse Transfer"
  );

  // -----------------------------------------------
  // Multiple Delete Data
  // -----------------------------------------------
  const [
    multiDeleteWarehouseTransfer,
    {
      isSuccess: multiDeleteIsSuccess,
      isLoading: multiDeleteIsLoading,
      error: multiDeleteError,
    },
  ] = useMultiDeleteWarehouseTransferMutation();

  const {
    selectItems,
    checkedItems,
    handleItemsSelect,
    handleMultipleSelect,
    handleMultipleDelete,
    handleResetMultipleSelect,
  } = useMultipleDataDelete(
    warehouseTransferData?.data?.["stock-transfer"]?.data,
    multiDeleteWarehouseTransfer,
    multiDeleteError,
    multiDeleteIsSuccess,
    setError,
    "Warehouse Transfer"
  );

  // -----------------------------------------------
  // Make Excel, CSV and pdf data
  // -----------------------------------------------
  const tableData = warehouseTransferData?.data?.["stock-transfer"]?.data?.map(
    (data, index) => ({
      SL: index < 9 ? `0${index + 1}` : index + 1,
      Invoice: data?.prefix + data?.invoice,
      "From Warehouse": data?.from_warehouse?.name || "In-House",
      "To Warehouse": data?.to_warehouse?.name || "In-House",
      "Total Qty": `${getNumberWithCommas(
        twoDigitFixed(data?.quantity)
      )} (Free ${getNumberWithCommas(twoDigitFixed(data?.free_quantity))})`,
      "Stock value": `${
        currencySymbol + getNumberWithCommas(twoDigitFixed(data?.amount || 0))
      }`,
    })
  );

  return (
    <div className="acnoo-dashboard-main-section">
      {(isLoading || isFetching) && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper">
          <div className="details-header print-d-none">
            <div className="title">
              <h4>Warehouse Transfer</h4>
              <Link to="/warehouse/transfer/create" className="btn custom-btn">
                <span>+</span> Add Stock Transfer
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
                  <TableTopSearch
                    searchText={searchText}
                    setSearchText={setSearchText}
                  />
                </div>
              </form>
              <div className="table-top-btn-group">
                <TableTopButtons arrayData={tableData} title="Stock Transfer" />
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
                    <th>Invoice</th>
                    <th>From Warehouse</th>
                    <th>To Warehouse</th>
                    <th className="text-center">Total Qty</th>
                    <th className="text-center">Stock Value</th>
                    <th className="print-d-none">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {warehouseTransferData?.data?.["stock-transfer"]?.data
                    ?.length === 0 ||
                  warehouseTransferData?.data?.["stock-transfer"]?.data ===
                    undefined ||
                  isLoading ||
                  isError ? (
                    <TableNoData />
                  ) : (
                    warehouseTransferData?.data?.["stock-transfer"]?.data?.map(
                      (data, index) => (
                        <tr key={index}>
                          <td>
                            <SerialNumber
                              index={index}
                              selectItems={selectItems}
                              id={data?.id}
                              dataFrom={
                                warehouseTransferData?.data?.["stock-transfer"]
                                  ?.from
                              }
                              handleItemsSelect={handleItemsSelect}
                            />
                          </td>
                          <td>
                            <Link
                              className="text-sky"
                              to={`/warehouse/transfer/invoice/${data?.id}`}
                              target="_blank"
                            >
                              {data?.prefix + data?.invoice}
                            </Link>
                          </td>
                          <td>{data?.from_warehouse?.name || "In-House"}</td>
                          <td>{data?.to_warehouse?.name || "In-House"}</td>
                          <td className="text-center">
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
                                twoDigitFixed(data?.amount || 0)
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
                                    to={`/warehouse/transfer/invoice/${data?.id}`}
                                    target="_blank"
                                  >
                                    <img src={printIcon} alt="icon" />
                                    Print Invoice
                                  </Link>
                                </li>
                                <li>
                                  <Link to={`/warehouse/transfer/${data?.id}`}>
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
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
            {warehouseTransferData !== undefined &&
              warehouseTransferData?.data?.["stock-transfer"]?.data?.length >
                0 && (
                <Pagination
                  pagination={warehouseTransferData?.data?.["stock-transfer"]}
                  setSelectedPage={setSelectedPage}
                />
              )}
          </div>
        </div>
      </div>

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

export default StockTransferList;
