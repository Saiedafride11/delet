import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import editIcon from "../../../assets/images/actions/edit.svg";
import messageIcon from "../../../assets/images/actions/message-text-check.svg";
import moneyMillsReceiveIcon from "../../../assets/images/actions/money-bill-receive.svg";
// import moneyMillsIcon from "../../../assets/images/actions/money-bills.svg";
import noteListIcon from "../../../assets/images/actions/note-list-square.svg";
import printIcon from "../../../assets/images/actions/print.svg";
import returnIcon from "../../../assets/images/actions/return.svg";
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
import CollectPaymentModal from "../../../components/modal/CollectPayment/CollectPaymentModal";
import DeleteModal from "../../../components/modal/DeleteModal";
import TableNoData from "../../../components/ui/NoData/TableNoData";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import TableTopButtons from "../../../components/utils/TableTopButtons/TableTopButtons";
import useFilterFromToDate from "../../../hooks/useFilterFromToDate";
import useFilterSearchQuery from "../../../hooks/useFilterSearchQuery";
import useMultipleDataDelete from "../../../hooks/useMultipleDataDelete";
import useSingleDataDelete from "../../../hooks/useSingleDataDelete";
import { setDueSingleInvoice } from "../../../redux/features/due/dueSlice";
import {
  useDeleteSaleMutation,
  useGetSalesQuery,
  useMultiDeleteSalesMutation,
} from "../../../redux/features/sales/sales/salesApi";
import SalesFilterTabs from "../SalesFilterTabs";

const SalesList = () => {
  document.title = "Sales List";
  const [deleteId, setDeleteId] = useState(0);
  const [error, setError] = useState("");
  const [partyId, setPartyId] = useState("");
  const dispatch = useDispatch();
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
    data: salesData,
    isLoading,
    isError,
    isFetching,
  } = useGetSalesQuery(newFilterQuery);

  // -----------------------------------------------
  // Single Delete Data
  // -----------------------------------------------
  const [
    deleteSale,
    {
      isSuccess: deleteIsSuccess,
      isLoading: deleteIsLoading,
      error: deleteError,
    },
  ] = useDeleteSaleMutation();

  const { handleDelete } = useSingleDataDelete(
    deleteSale,
    deleteError,
    deleteIsSuccess,
    setError,
    "Sale"
  );

  // -----------------------------------------------
  // Multiple Delete Data
  // -----------------------------------------------
  const [
    multiDeleteSales,
    {
      isSuccess: multiDeleteIsSuccess,
      isLoading: multiDeleteIsLoading,
      error: multiDeleteError,
    },
  ] = useMultiDeleteSalesMutation();

  const {
    selectItems,
    checkedItems,
    handleItemsSelect,
    handleMultipleSelect,
    handleMultipleDelete,
    handleResetMultipleSelect,
  } = useMultipleDataDelete(
    salesData?.data?.sale?.data,
    multiDeleteSales,
    multiDeleteError,
    multiDeleteIsSuccess,
    setError,
    "Sale"
  );

  // -----------------------------------------------
  // Make Excel, CSV and pdf data
  // -----------------------------------------------
  const tableData = salesData?.data?.sale?.data?.map((data) => ({
    Date: getMonthDayYearFormat(data?.sale_date),
    Invoice: data?.prefix + data?.invoice,
    "Party Name": data?.party === null ? "Cash" : data?.party?.name,
    "Bill Amount": `${
      currencySymbol + getNumberWithCommas(twoDigitFixed(data.grand_total))
    }`,
    Paid: `${
      currencySymbol + getNumberWithCommas(twoDigitFixed(data.paid_all_amount))
    }`,
    Due: `${
      currencySymbol +
      getNumberWithCommas(twoDigitFixed(data.payable_due_amount))
    }`,
    "Payment Type": data?.payment_type?.name,
    "Due Date":
      data?.due_installment_date !== null
        ? getMonthDayYearFormat(data?.due_installment_date)
        : "",
    "Sales By": data?.user?.name,
  }));

  // -----------------------------------------------
  // Due Collect Payment
  // -----------------------------------------------

  const handleCollectPayment = (partyId, data) => {
    setPartyId(partyId);
    const newData = {
      id: data.id,
      invoice: data.prefix + data.invoice,
      payable_due_amount: data?.payable_due_amount,
    };
    dispatch(setDueSingleInvoice(newData));
  };

  // console.log("salesData", salesData?.data?.sale?.data);
  return (
    <div className="acnoo-dashboard-main-section">
      {(isLoading || isFetching) && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper">
          <div className="details-header print-d-none">
            <div className="title">
              <h4>Sales List</h4>
              <Link to="/sales/create" className="btn custom-btn">
                <span>+</span> Create Sale
              </Link>
            </div>
          </div>
          {/* Filter Tab start */}
          <SalesFilterTabs />

          <div className="dashboard-details-table-wrapper">
            <div className="total-count-area mt-2">
              <div className="count-item light-green">
                <h5>
                  {currencySymbol +
                    getNumberWithCommas(
                      twoDigitFixed(
                        salesData?.data?.sale_filter_total?.[0]?.sale_total || 0
                      )
                    )}
                </h5>
                <p>Total Sales</p>
              </div>
              <div className="count-item light-red">
                <h5>
                  {currencySymbol +
                    getNumberWithCommas(
                      twoDigitFixed(salesData?.data?.sale_return_total || 0)
                    )}
                </h5>
                <p>Total Return</p>
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
                <TableTopButtons arrayData={tableData} title="Sales" />
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
                    <th>Invoice</th>
                    <th>Party Name</th>
                    <th className="text-center">Bill amount</th>
                    <th className="text-center">Paid</th>
                    <th className="text-center">Due</th>
                    <th>Payment Type</th>
                    <th>Due Date</th>
                    <th>Sales By</th>
                    <th className="print-d-none">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData?.data?.sale?.data?.length === 0 ||
                  salesData?.data?.sale?.data === undefined ||
                  isLoading ||
                  isError ? (
                    <TableNoData />
                  ) : (
                    salesData?.data?.sale?.data?.map((data, index) => (
                      <tr key={index}>
                        <td>
                          <SerialNumber
                            index={index}
                            selectItems={selectItems}
                            id={data?.id}
                            dataFrom={salesData?.data?.sale?.from}
                            handleItemsSelect={handleItemsSelect}
                          />
                        </td>
                        <td>{getMonthDayYearFormat(data?.sale_date)}</td>
                        <td>
                          <Link
                            className="text-sky"
                            to={`/sales/invoice/${data?.id}`}
                            target="_blank"
                          >
                            {data?.prefix + data?.invoice}
                          </Link>
                        </td>
                        <td>
                          {data?.party === null ? "Cash" : data?.party?.name}
                        </td>
                        <td className="text-center">
                          {currencySymbol +
                            getNumberWithCommas(
                              twoDigitFixed(data?.grand_total)
                            )}
                        </td>
                        <td className="text-center">
                          {currencySymbol +
                            getNumberWithCommas(
                              twoDigitFixed(data?.paid_all_amount)
                            )}
                        </td>
                        <td className="text-center text-orange">
                          {currencySymbol +
                            getNumberWithCommas(
                              twoDigitFixed(data?.payable_due_amount)
                            )}
                        </td>
                        <td>{data?.payment_type?.name}</td>
                        <td>
                          {data?.due_installment_date !== null
                            ? getMonthDayYearFormat(data?.due_installment_date)
                            : ""}
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
                                {data?.return_status === "FullReturn" ||
                                data?.return_status === "Return" ? (
                                  <Link className="cursor-not-allowed">
                                    <img src={editIcon} alt="icon" />
                                    Edit
                                  </Link>
                                ) : (
                                  <Link to={`/sales/update/${data?.id}`}>
                                    <img src={editIcon} alt="icon" />
                                    Edit
                                  </Link>
                                )}
                              </li>
                              <li>
                                {data?.discount > 0 ||
                                data?.return_status === "FullReturn" ? (
                                  <Link className="cursor-not-allowed">
                                    <img src={returnIcon} alt="icon" />
                                    Return Sale
                                  </Link>
                                ) : (
                                  <Link to={`/sales/return/create/${data?.id}`}>
                                    <img src={returnIcon} alt="icon" />
                                    Return Sale
                                  </Link>
                                )}
                              </li>
                              <li>
                                {data?.payable_due_amount > 0 ? (
                                  <Link
                                    data-bs-toggle="modal"
                                    data-bs-target="#collect-payment-modal"
                                    onClick={() =>
                                      handleCollectPayment(
                                        data?.party?.id,
                                        data
                                      )
                                    }
                                  >
                                    <img
                                      src={moneyMillsReceiveIcon}
                                      alt="icon"
                                    />
                                    Create Payment
                                  </Link>
                                ) : (
                                  <Link className="cursor-not-allowed">
                                    <img
                                      src={moneyMillsReceiveIcon}
                                      alt="icon"
                                    />
                                    Create Payment
                                  </Link>
                                )}
                              </li>
                              {/* <li>
                                <Link>
                                  <img src={moneyMillsIcon} alt="icon" />
                                  Create History
                                </Link>
                              </li> */}
                              <li>
                                <Link>
                                  <img src={messageIcon} alt="icon" />
                                  SMS Reminder
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to={`/sales/invoice/${data?.id}`}
                                  target="_blank"
                                >
                                  <img src={printIcon} alt="icon" />
                                  Print Invoice
                                </Link>
                              </li>
                              <li>
                                <Link>
                                  <img src={noteListIcon} alt="icon" />
                                  Delivery challan
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
            {salesData !== undefined &&
              salesData?.data?.sale?.data?.length > 0 && (
                <Pagination
                  pagination={salesData?.data?.sale}
                  setSelectedPage={setSelectedPage}
                />
              )}
          </div>
        </div>
      </div>

      <CollectPaymentModal partyId={partyId} />

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

export default SalesList;
