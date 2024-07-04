import React, { useState } from "react";
import { Link } from "react-router-dom";
import editIcon from "../../../assets/images/actions/edit.svg";
import eyeIcon from "../../../assets/images/actions/eye.svg";
import deleteIcon from "../../../assets/images/actions/trash.svg";
import MultipleDeleteItems from "../../../components/common/MultipleDeleteItems";
import MultipleSelectCheckBox from "../../../components/common/MultipleSelectCheckBox";
import Pagination from "../../../components/common/Pagination";
import SerialNumber from "../../../components/common/SerialNumber";
import TableTopFromToDate from "../../../components/common/TableTopFromToDate";
import TableTopPageFilter from "../../../components/common/TableTopPageFilter";
import TableTopSearch from "../../../components/common/TableTopSearch";
import { getMonthDayYearFormat } from "../../../components/function/getMonthDayYearFormat";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import DeleteModal from "../../../components/modal/DeleteModal";
import TableNoData from "../../../components/ui/NoData/TableNoData";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import TableTopButtons from "../../../components/utils/TableTopButtons/TableTopButtons";
import useFilterFromToDate from "../../../hooks/useFilterFromToDate";
import useFilterSearchQuery from "../../../hooks/useFilterSearchQuery";
import useMultipleDataDelete from "../../../hooks/useMultipleDataDelete";
import useSingleDataDelete from "../../../hooks/useSingleDataDelete";
import {
  useDeleteExpenseMutation,
  useGetAllExpenseQuery,
  useMultiDeleteExpenseMutation,
} from "../../../redux/features/income_expense/expense/expenseApi";
import ExpenseFilterTabs from "../ExpenseFilterTabs";
import ExpenseCreateUpdateModal from "./ExpenseCreateUpdateModal";
import ExpenseListViewModal from "./Fields/ExpenseListViewModal";

const ExpenseList = () => {
  document.title = "Expense List";
  const [deleteId, setDeleteId] = useState(0);
  const [error, setError] = useState("");
  const [updateData, setUpdateData] = useState({});
  // const [fetchLoading, setFetchLoading] = useState(false);

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
    data: expenseData,
    isError,
    isLoading,
    isFetching,
  } = useGetAllExpenseQuery(newFilterQuery);

  // -----------------------------------------------
  // Single Delete Data
  // -----------------------------------------------
  const [
    deleteExpense,
    {
      isSuccess: deleteIsSuccess,
      isLoading: deleteIsLoading,
      error: deleteError,
    },
  ] = useDeleteExpenseMutation();

  const { handleDelete } = useSingleDataDelete(
    deleteExpense,
    deleteError,
    deleteIsSuccess,
    setError,
    "Expense"
  );

  // -----------------------------------------------
  // Multiple Delete Data
  // -----------------------------------------------
  const [
    multiDeleteExpense,
    {
      isSuccess: multiDeleteIsSuccess,
      isLoading: multiDeleteIsLoading,
      error: multiDeleteError,
    },
  ] = useMultiDeleteExpenseMutation();

  const {
    selectItems,
    checkedItems,
    handleItemsSelect,
    handleMultipleSelect,
    handleMultipleDelete,
    handleResetMultipleSelect,
  } = useMultipleDataDelete(
    expenseData?.data?.expense?.data,
    multiDeleteExpense,
    multiDeleteError,
    multiDeleteIsSuccess,
    setError,
    "Expense"
  );

  // -----------------------------------------------
  // Make Excel, CSV and pdf data
  // -----------------------------------------------
  const tableData = expenseData?.data?.expense?.data?.map((data) => ({
    Date:
      data?.expense_date !== null
        ? getMonthDayYearFormat(data?.expense_date)
        : "",
    Name: data?.sector,
    Category: data?.income_expense_category?.name,
    Note: data?.note,
    Amount: `$${getNumberWithCommas(twoDigitFixed(data.amount || 0))}`,
    "Payment Type": data?.payment_type,
  }));

  return (
    <div className="acnoo-dashboard-main-section">
      {(isLoading || isFetching) && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper">
          <div className="details-header print-d-none">
            <div className="title">
              <h4>Expense List</h4>
              <Link
                data-bs-toggle="modal"
                data-bs-target="#expense-list-modal"
                className="btn custom-btn"
              >
                <span>+</span> Add Expense
              </Link>
            </div>
          </div>
          {/* Filter Tab start */}
          <ExpenseFilterTabs />

          <div className="dashboard-details-table-wrapper">
            <div className="total-count-area mt-0">
              <div className="count-item light-red">
                <h5>
                  $
                  {getNumberWithCommas(
                    twoDigitFixed(expenseData?.data?.["total-expense"] || 0)
                  )}
                </h5>
                <p>Total Expense</p>
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
                <TableTopButtons arrayData={tableData} title="Expense" />
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
                    <th>Date</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Note</th>
                    <th className="text-center">Amount</th>
                    <th>Payment Type</th>
                    <th className="print-d-none">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseData?.data?.expense?.data?.length === 0 ||
                  expenseData?.data?.expense?.data === undefined ||
                  isLoading ||
                  isError ? (
                    <TableNoData />
                  ) : (
                    expenseData?.data?.expense?.data.map((data, index) => (
                      <tr key={index}>
                        <td>
                          <SerialNumber
                            index={index}
                            selectItems={selectItems}
                            id={data?.id}
                            dataFrom={expenseData?.data?.expense?.from}
                            handleItemsSelect={handleItemsSelect}
                          />
                        </td>
                        <td>
                          {data?.expense_date !== null
                            ? getMonthDayYearFormat(data?.expense_date)
                            : ""}
                        </td>
                        <td>{data?.sector}</td>
                        <td>{data?.income_expense_category?.name}</td>
                        <td className="text-overflow-mw-300">{data?.note}</td>
                        <td className="text-center">${data?.amount}</td>
                        <td>{data?.payment_type}</td>
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
                                <Link
                                  data-bs-toggle="modal"
                                  data-bs-target="#expense-list-modal"
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
            {expenseData !== undefined &&
              expenseData?.data?.expense?.data?.length !== 0 && (
                <Pagination
                  pagination={expenseData?.data?.expense}
                  setSelectedPage={setSelectedPage}
                />
              )}
          </div>
        </div>
      </div>

      <ExpenseListViewModal
        updateData={updateData}
        setUpdateData={setUpdateData}
      />
      <ExpenseCreateUpdateModal
        updateData={updateData}
        setUpdateData={setUpdateData}
      />

      <DeleteModal
        handleDelete={handleDelete}
        id={deleteId}
        error={error}
        setError={setError}
        isLoading={deleteIsLoading}
      />
    </div>
  );
};

export default ExpenseList;
