import React, { useState } from "react";
import { Link } from "react-router-dom";
import editIcon from "../../../assets/images/actions/edit.svg";
import deleteIcon from "../../../assets/images/actions/trash.svg";
import MultipleDeleteItems from "../../../components/common/MultipleDeleteItems";
import MultipleSelectCheckBox from "../../../components/common/MultipleSelectCheckBox";
import PaginationLocal from "../../../components/common/PaginationLocal";
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
  useDeleteIncomeExpenseCategoryMutation,
  useGetAllIncomeExpenseCategoryQuery,
  useMultiDeleteIncomeExpenseCategoryMutation,
  useUpdateIncomeExpenseCategoryStatusMutation,
} from "../../../redux/features/income_expense/income_expense_category/incomeExpenseCategoryApi";
import ExpenseFilterTabs from "../ExpenseFilterTabs";
import IncomeCategoryCreateUpdateModal from "./IncomeCategoryCreateUpdateModal";

const ExpenseCategoryList = () => {
  document.title = "Expense Category";
  const [deleteId, setDeleteId] = useState(0);
  const [error, setError] = useState("");
  const [updateData, setUpdateData] = useState({});
  // const [fetchLoading, setFetchLoading] = useState(false);

  // -----------------------------------------------
  // All Data Show
  // -----------------------------------------------

  const {
    data: categoryData,
    isError,
    isLoading,
    isFetching,
  } = useGetAllIncomeExpenseCategoryQuery("?filter=Expense");

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
  } = useFilterSearchQueryLocal(
    categoryData?.data?.["income-expense-category"]
  );

  // -----------------------------------------------
  // Single Delete Data
  // -----------------------------------------------
  const [
    deleteIncomeExpenseCategory,
    {
      isSuccess: deleteIsSuccess,
      isLoading: deleteIsLoading,
      error: deleteError,
    },
  ] = useDeleteIncomeExpenseCategoryMutation();

  const { handleDelete } = useSingleDataDelete(
    deleteIncomeExpenseCategory,
    deleteError,
    deleteIsSuccess,
    setError,
    "Category"
  );

  // -----------------------------------------------
  // Multiple Delete Data
  // -----------------------------------------------
  const [
    multiDeleteIncomeExpenseCategory,
    {
      isSuccess: multiDeleteIsSuccess,
      isLoading: multiDeleteIsLoading,
      error: multiDeleteError,
    },
  ] = useMultiDeleteIncomeExpenseCategoryMutation();

  const {
    selectItems,
    checkedItems,
    handleItemsSelect,
    handleMultipleSelect,
    handleMultipleDelete,
    handleResetMultipleSelect,
  } = useMultipleDataDelete(
    categoryData?.data?.["income-expense-category"],
    multiDeleteIncomeExpenseCategory,
    multiDeleteError,
    multiDeleteIsSuccess,
    setError,
    "Category"
  );
  // -----------------------------------------------
  // Data status on or off
  // -----------------------------------------------
  const [
    updateIncomeExpenseCategoryStatus,
    {
      data: responseStatusData,
      isSuccess: responseStatusSuccess,
      isLoading: responseStatusLoading,
      error: responseStatusError,
    },
  ] = useUpdateIncomeExpenseCategoryStatusMutation();

  const { handleStatusChange } = useStatusChange(
    updateIncomeExpenseCategoryStatus,
    responseStatusError,
    responseStatusSuccess,
    responseStatusData
  );

  // -----------------------------------------------
  // Make Excel, CSV and pdf data
  // -----------------------------------------------
  const tableData = categoryData?.data?.["income-expense-category"]?.map(
    (data, index) => ({
      SL: index < 9 ? `0${index + 1}` : index + 1,
      Name: data?.name,
      Description: data?.description,
    })
  );

  return (
    <div className="acnoo-dashboard-main-section">
      {isLoading && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper">
          <div className="details-header print-d-none">
            <div className="title">
              <h4>Expense Category</h4>
              <Link
                data-bs-toggle="modal"
                data-bs-target="#expense-category-modal"
                className="btn custom-btn"
              >
                <span>+</span> Add Category
              </Link>
            </div>
          </div>
          {/* Filter Tab start */}
          <ExpenseFilterTabs />

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
                <TableTopButtons arrayData={tableData} title="Category" />
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
                    <th>Category Name</th>
                    <th>Description</th>
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
                        <td className="">
                          <div className="d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="print-d-none"
                              checked={selectItems?.includes(data.id)}
                              onChange={() => handleItemsSelect(data.id)}
                            />
                            <span>
                              {index < 9 ? `0${index + 1}` : index + 1}
                            </span>
                          </div>
                        </td>
                        <td>{data?.name}</td>
                        <td className="text-overflow-mw-300">
                          {data?.description}
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
                                  data-bs-target="#expense-category-modal"
                                  onClick={() => setUpdateData(data)}
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

      <IncomeCategoryCreateUpdateModal
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

export default ExpenseCategoryList;
