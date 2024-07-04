import React, { useState } from "react";
import { Link } from "react-router-dom";
import editIcon from "../../../assets/images/actions/edit.svg";
import deleteIcon from "../../../assets/images/actions/trash.svg";
import MultipleDeleteItems from "../../../components/common/MultipleDeleteItems";
import MultipleSelectCheckBox from "../../../components/common/MultipleSelectCheckBox";
import PaginationLocal from "../../../components/common/PaginationLocal";
import SerialNumber from "../../../components/common/SerialNumber";
import StatusSwitch from "../../../components/common/StatusSwitch";
import TableTopPageFilter from "../../../components/common/TableTopPageFilter";
import TableTopSearchLocal from "../../../components/common/TableTopSearchLocal";
import DeleteModal from "../../../components/modal/DeleteModal";
import TableNoData from "../../../components/ui/NoData/TableNoData";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import TableTopButtons from "../../../components/utils/TableTopButtons/TableTopButtons";
import useFilterSearchQueryLocal from "../../../hooks/useFilterSearchQueryLocal";
import useMultipleDataDelete from "../../../hooks/useMultipleDataDelete";
import useSingleDataDelete from "../../../hooks/useSingleDataDelete";
import useStatusChange from "../../../hooks/useStatusChange";
import {
  useDeleteProductWeightMutation,
  useGetProductWeightQuery,
  useMultiDeleteProductWeightMutation,
  useUpdatePdWeightStatusMutation,
} from "../../../redux/features/products/variation/weight/productWeightApi";
import ProductsFilterTabs from "../ProductsFilterTabs";
import ProductWeightModal from "../components/modal/variation/ProductWeightModal";

const ProductWeight = () => {
  document.title = "Weight";

  const [deleteId, setDeleteId] = useState(0);
  const [updateData, setUpdateData] = useState({});
  const [error, setError] = useState("");

  // -----------------------------------------------
  // All Data Show
  // -----------------------------------------------

  const {
    data: productWeight,
    isLoading,
    isError,
  } = useGetProductWeightQuery();

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
  } = useFilterSearchQueryLocal(productWeight?.data?.weight);

  // -----------------------------------------------
  // Single Delete Data
  // -----------------------------------------------
  const [
    deleteProductWeight,
    {
      isSuccess: deleteIsSuccess,
      isLoading: deleteIsLoading,
      error: deleteError,
    },
  ] = useDeleteProductWeightMutation();

  const { handleDelete } = useSingleDataDelete(
    deleteProductWeight,
    deleteError,
    deleteIsSuccess,
    setError,
    "Weight"
  );

  // -----------------------------------------------
  // Multiple Delete Data
  // -----------------------------------------------
  const [
    multiDeleteProductWeight,
    {
      isSuccess: multiDeleteIsSuccess,
      isLoading: multiDeleteIsLoading,
      error: multiDeleteError,
    },
  ] = useMultiDeleteProductWeightMutation();

  const {
    selectItems,
    checkedItems,
    handleItemsSelect,
    handleMultipleSelect,
    handleMultipleDelete,
    handleResetMultipleSelect,
  } = useMultipleDataDelete(
    updateDataList,
    multiDeleteProductWeight,
    multiDeleteError,
    multiDeleteIsSuccess,
    setError,
    "Weight"
  );

  // -----------------------------------------------
  // Data status on or off
  // -----------------------------------------------
  const [
    updatePdWeightStatus,
    {
      data: responseStatusData,
      isSuccess: responseStatusSuccess,
      isLoading: responseStatusLoading,
      error: responseStatusError,
    },
  ] = useUpdatePdWeightStatusMutation();

  const { handleStatusChange } = useStatusChange(
    updatePdWeightStatus,
    responseStatusError,
    responseStatusSuccess,
    responseStatusData
  );

  // -----------------------------------------------
  // Make Excel, CSV and pdf data
  // -----------------------------------------------
  const tableData = updateDataList?.map((data, index) => ({
    SL: index < 9 ? `0${index + 1}` : index + 1,
    Weight: data?.name,
  }));

  return (
    <div className="acnoo-dashboard-main-section">
      {isLoading && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper">
          <div className="details-header print-d-none">
            <div className="title">
              <h4>Weight</h4>
              <Link
                data-bs-toggle="modal"
                data-bs-target="#product-weight-modal"
                className="btn custom-btn"
              >
                <span>+</span> Add Weight
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
                  <TableTopSearchLocal
                    searchText={searchText}
                    handleSearchChange={handleSearchChange}
                  />
                </div>
              </form>
              <div className="table-top-btn-group">
                <TableTopButtons arrayData={tableData} title="weight" />
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
                        <td>{data?.name}</td>
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
                                  data-bs-target="#product-weight-modal"
                                  onClick={(e) =>
                                    setUpdateData({
                                      id: data.id,
                                      name: data.name,
                                    })
                                  }
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

      <ProductWeightModal
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

export default ProductWeight;
