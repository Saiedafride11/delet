import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import editIcon from "../../../assets/images/actions/edit.svg";
import printIcon from "../../../assets/images/actions/print.svg";
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
  useDeletePurchaseReturnMutation,
  useGetPurchasesReturnQuery,
  useMultiDeletePurchaseReturnMutation,
} from "../../../redux/features/purchase/return/purchaseReturnApi";
import PurchaseFilterTabs from "../PurchaseFilterTabs";

const PurchaseReturnList = () => {
  document.title = "Purchase Return List";
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

  const { dateFilter, dateFilterParams, handleDateFilter } =
    useFilterFromToDate();

  const newFilterQuery = filterQuery
    ? filterQuery + `&${dateFilterParams}`
    : `?${dateFilterParams}`;

  const {
    data: purchaseReturnData,
    isLoading,
    isError,
    isFetching,
  } = useGetPurchasesReturnQuery(newFilterQuery);

  // -----------------------------------------------
  // Single Delete Data
  // -----------------------------------------------
  const [
    deletePurchaseReturn,
    {
      isSuccess: deleteIsSuccess,
      isLoading: deleteIsLoading,
      error: deleteError,
    },
  ] = useDeletePurchaseReturnMutation();

  const { handleDelete } = useSingleDataDelete(
    deletePurchaseReturn,
    deleteError,
    deleteIsSuccess,
    setError,
    "Purchase Return"
  );

  // -----------------------------------------------
  // Multiple Delete Data
  // -----------------------------------------------
  const [
    multiDeletePurchaseReturn,
    {
      isSuccess: multiDeleteIsSuccess,
      isLoading: multiDeleteIsLoading,
      error: multiDeleteError,
    },
  ] = useMultiDeletePurchaseReturnMutation();

  const {
    selectItems,
    checkedItems,
    handleItemsSelect,
    handleMultipleSelect,
    handleMultipleDelete,
    handleResetMultipleSelect,
  } = useMultipleDataDelete(
    purchaseReturnData?.data?.["purchase-return"]?.data,
    multiDeletePurchaseReturn,
    multiDeleteError,
    multiDeleteIsSuccess,
    setError,
    "Purchase Return"
  );

  // -----------------------------------------------
  // Make Excel, CSV and pdf data
  // -----------------------------------------------
  const tableData = purchaseReturnData?.data?.["purchase-return"]?.data?.map(
    (data) => ({
      Invoice: data?.prefix + data?.invoice,
      "Party Name": data?.party?.name,
      "Grand Total": `${
        currencySymbol + getNumberWithCommas(twoDigitFixed(data.grand_total))
      }`,
      Paid: `${
        currencySymbol + getNumberWithCommas(twoDigitFixed(data.paid_amount))
      }`,
      "Payment Type": data?.payment_by,
      "Return Date":
        data?.return_date !== null && getMonthDayYearFormat(data?.return_date),
      "Return By": data?.user?.name,
    })
  );

  return (
    <div className="acnoo-dashboard-main-section">
      {(isLoading || isFetching) && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper">
          <div className="details-header print-d-none">
            <div className="title">
              <h4 className="padY-2">Purchase Return</h4>
            </div>
          </div>
          {/* Filter Tab start */}
          <PurchaseFilterTabs />

          <div className="dashboard-details-table-wrapper">
            <div className="table-top-form daily-transaction-between-wrapper pt-0">
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
                <TableTopButtons arrayData={tableData} />
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
                    <th>Party Name</th>
                    <th className="text-center">Grand Total</th>
                    <th className="text-center">Paid</th>
                    <th>Payment Type</th>
                    <th>Return Date</th>
                    <th>Return By</th>
                    <th className="print-d-none">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseReturnData?.data?.["purchase-return"]?.data
                    ?.length === 0 ||
                  purchaseReturnData?.data?.["purchase-return"]?.data ===
                    undefined ||
                  isLoading ||
                  isError ? (
                    <TableNoData />
                  ) : (
                    purchaseReturnData?.data?.["purchase-return"]?.data?.map(
                      (data, index) => (
                        <tr key={index}>
                          <td>
                            <SerialNumber
                              index={index}
                              selectItems={selectItems}
                              id={data?.id}
                              dataFrom={
                                purchaseReturnData?.data?.["purchase-return"]
                                  ?.from
                              }
                              handleItemsSelect={handleItemsSelect}
                            />
                          </td>
                          <td>
                            <Link
                              className="text-sky"
                              to={`/purchase/return/invoice/${data?.id}`}
                              target="_blank"
                            >
                              {data?.prefix + data?.invoice}
                            </Link>
                          </td>
                          <td>{data?.party?.name}</td>
                          <td className="text-center">
                            {currencySymbol +
                              getNumberWithCommas(
                                twoDigitFixed(data?.grand_total)
                              )}
                          </td>
                          <td className="text-center">
                            {currencySymbol +
                              getNumberWithCommas(
                                twoDigitFixed(data?.paid_amount)
                              )}
                          </td>
                          <td className="text-capitalize">
                            {data?.payment_by}
                          </td>
                          <td>
                            {data?.return_date !== null &&
                              getMonthDayYearFormat(data?.return_date)}
                          </td>
                          <td>{data?.user?.name}</td>
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
                                    to={`/purchase/return/update/${data?.id}`}
                                  >
                                    <img src={editIcon} alt="icon" />
                                    Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to={`/purchase/return/invoice/${data?.id}`}
                                    target="_blank"
                                  >
                                    <img src={printIcon} alt="icon" />
                                    Print Invoice
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
            {purchaseReturnData !== undefined &&
              purchaseReturnData?.data?.["purchase-return"]?.data?.length >
                0 && (
                <Pagination
                  pagination={purchaseReturnData?.data?.["purchase-return"]}
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

export default PurchaseReturnList;
