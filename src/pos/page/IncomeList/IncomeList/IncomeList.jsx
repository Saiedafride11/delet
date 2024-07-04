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
  useDeleteIncomeMutation,
  useGetAllIncomeQuery,
  useMultiDeleteIncomeMutation,
} from "../../../redux/features/income_expense/income/incomeApi";
import IncomeFilterTabs from "../IncomeFilterTabs";
import IncomeListViewModal from "./Fields/IncomeListViewModal";
import IncomeCreateUpdateModal from "./IncomeCreateUpdateModal";

const IncomeList = () => {
  document.title = "Income List";
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
    data: incomeData,
    isError,
    isLoading,
    isFetching,
  } = useGetAllIncomeQuery(newFilterQuery);

  // -----------------------------------------------
  // Single Delete Data
  // -----------------------------------------------
  const [
    deleteIncome,
    {
      isSuccess: deleteIsSuccess,
      isLoading: deleteIsLoading,
      error: deleteError,
    },
  ] = useDeleteIncomeMutation();

  const { handleDelete } = useSingleDataDelete(
    deleteIncome,
    deleteError,
    deleteIsSuccess,
    setError,
    "Income"
  );

  // -----------------------------------------------
  // Multiple Delete Data
  // -----------------------------------------------
  const [
    multiDeleteIncome,
    {
      isSuccess: multiDeleteIsSuccess,
      isLoading: multiDeleteIsLoading,
      error: multiDeleteError,
    },
  ] = useMultiDeleteIncomeMutation();

  const {
    selectItems,
    checkedItems,
    handleItemsSelect,
    handleMultipleSelect,
    handleMultipleDelete,
    handleResetMultipleSelect,
  } = useMultipleDataDelete(
    incomeData?.data?.income?.data,
    multiDeleteIncome,
    multiDeleteError,
    multiDeleteIsSuccess,
    setError,
    "Income"
  );

  // -----------------------------------------------
  // Make Excel, CSV and pdf data
  // -----------------------------------------------

  const tableData = incomeData?.data?.income?.data?.map((data) => ({
    Date:
      data?.income_date !== null
        ? getMonthDayYearFormat(data?.income_date)
        : "",
    Name: data?.sector,
    Category: data?.income_expense_category?.name,
    Note: data?.note,
    Amount: `$${getNumberWithCommas(twoDigitFixed(data.amount))}`,
    "Payment Type": data?.payment_type,
  }));

  return (
    <div className="acnoo-dashboard-main-section">
      {(isLoading || isFetching) && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper">
          <div className="details-header print-d-none">
            <div className="title">
              <h4>Income List</h4>
              <Link
                data-bs-toggle="modal"
                data-bs-target="#income-list-modal"
                className="btn custom-btn"
              >
                <span>+</span> Add Income
              </Link>
            </div>
          </div>
          {/* Filter Tab start */}
          <IncomeFilterTabs />

          <div className="dashboard-details-table-wrapper">
            <div className="total-count-area mt-0">
              <div className="count-item light-green">
                <h5>
                  $
                  {getNumberWithCommas(
                    twoDigitFixed(incomeData?.data?.["total-income"] || 0)
                  )}
                </h5>
                <p>Total Income</p>
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
                <TableTopButtons arrayData={tableData} title="Income" />
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
                  {incomeData?.data?.income?.data?.length === 0 ||
                  incomeData?.data?.income?.data === undefined ||
                  isLoading ||
                  isError ? (
                    <TableNoData />
                  ) : (
                    incomeData?.data?.income?.data?.map((data, index) => (
                      <tr key={index}>
                        <td>
                          <SerialNumber
                            index={index}
                            selectItems={selectItems}
                            id={data?.id}
                            dataFrom={incomeData?.data?.income?.from}
                            handleItemsSelect={handleItemsSelect}
                          />
                        </td>
                        <td>
                          {data?.income_date !== null
                            ? getMonthDayYearFormat(data?.income_date)
                            : ""}
                        </td>
                        <td>{data?.sector}</td>
                        <td>{data?.income_expense_category?.name}</td>
                        <td className="text-overflow-mw-300">{data?.note}</td>
                        <td className="text-center">
                          $
                          {getNumberWithCommas(
                            twoDigitFixed(data?.amount || 0)
                          )}
                        </td>
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
                                  data-bs-target="#income-list-modal"
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
            {incomeData !== undefined &&
              incomeData?.data?.income?.data?.length !== 0 && (
                <Pagination
                  pagination={incomeData?.data?.income}
                  setSelectedPage={setSelectedPage}
                />
              )}
          </div>
        </div>
      </div>

      <IncomeListViewModal
        updateData={updateData}
        setUpdateData={setUpdateData}
      />
      <IncomeCreateUpdateModal
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

export default IncomeList;
