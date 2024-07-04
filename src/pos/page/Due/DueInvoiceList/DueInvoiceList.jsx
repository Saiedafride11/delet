import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import eyeIcon from "../../../assets/images/actions/eye.svg";
import moneyMillsReceiveIcon from "../../../assets/images/actions/money-bill-receive.svg";
import PaginationLocal from "../../../components/common/PaginationLocal";
import TableTopPageFilter from "../../../components/common/TableTopPageFilter";
import TableTopSearch from "../../../components/common/TableTopSearch";
import { getMonthDayYearFormat } from "../../../components/function/getMonthDayYearFormat";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import CollectPaymentModal from "../../../components/modal/CollectPayment/CollectPaymentModal";
import TableNoData from "../../../components/ui/NoData/TableNoData";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import TableTopButtons from "../../../components/utils/TableTopButtons/TableTopButtons";
import { useGetInvoiceListQuery } from "../../../redux/features/due/dueApi";
import { setDueSingleInvoice } from "../../../redux/features/due/dueSlice";
import DueSlipListModal from "../DueInvoiceSlipList/DueSlipListModal";

const DueInvoiceList = () => {
  document.title = "Due Invoice List";
  const [selectedPage, setSelectedPage] = useState(1);
  const [filterPerPage, setFilterPerPage] = useState(20);
  const [searchText, setSearchText] = useState("");
  const [slipInfo, setSlipInfo] = useState({});
  const dispatch = useDispatch();

  // -----------------------------------------------
  // All Data Show
  // -----------------------------------------------

  const { partyId } = useParams();
  const {
    data: dueInvoiceData,
    isLoading,
    isError,
  } = useGetInvoiceListQuery({ partyId });

  // -----------------------------------------------
  // Local Modified Data
  // -----------------------------------------------

  const newDueInvoiceData =
    dueInvoiceData?.data["due-list"]?.sales?.length > 0
      ? dueInvoiceData?.data["due-list"]?.sales
      : dueInvoiceData?.data["due-list"]?.purchase;

  const dueListData = newDueInvoiceData?.map((data) => ({
    partyId: dueInvoiceData?.data["due-list"]?.id,
    id: data?.id,
    date: data?.sale_date || data?.purchase_date,
    prefix: data.prefix,
    invoice: data.invoice,
    grand_total: data?.grand_total,
    paid_amount: data?.paid_amount,
    payable_due_amount: data?.payable_due_amount,
    payment_type: data?.payment_type,
    user: data?.user,
    due_date: data?.due_date,
    dueType: data?.purchase_date ? "purchase" : "sale",
  }));

  const updateDueList = dueListData?.slice(
    (selectedPage - 1) * filterPerPage,
    filterPerPage === "all" ? dueListData?.length : selectedPage * filterPerPage
  );
  const updatePerPage =
    filterPerPage === "all" ? dueListData?.length : filterPerPage;

  const dataFrom = (selectedPage - 1) * updatePerPage + 1;

  const handlePerPageFilter = (e) => {
    setFilterPerPage(e.target.value);
    setSelectedPage(1);
  };

  // -----------------------------------------------
  // Make Excel, CSV and pdf data
  // -----------------------------------------------
  const tableData = newDueInvoiceData?.map((data) => ({
    Date: getMonthDayYearFormat(data?.sale_date || data?.purchase_date),
    Invoice: data?.prefix + data?.invoice,
    Total: `$${getNumberWithCommas(twoDigitFixed(data?.grand_total))}`,
    Paid: `$${getNumberWithCommas(
      twoDigitFixed(data?.grand_total - data?.payable_due_amount)
    )}`,
    Due: `$${getNumberWithCommas(twoDigitFixed(data?.payable_due_amount))}`,
    "Payment Method": data?.payment_type?.name,
    "Due Date":
      data?.due_date === null ? "" : getMonthDayYearFormat(data?.due_date),
  }));

  // -----------------------------------------------
  // Due Collect Payment
  // -----------------------------------------------
  const handleCollectPayment = (data) => {
    const newData = {
      id: data.id,
      invoice: data.prefix + data.invoice,
      payable_due_amount: data?.payable_due_amount,
    };
    dispatch(setDueSingleInvoice(newData));
  };

  return (
    <div className="acnoo-dashboard-main-section">
      {isLoading && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper">
          <div className="details-header print-d-none">
            <div className="title">
              <h4>{dueInvoiceData?.data["due-list"]?.name || "Name"}</h4>
            </div>
          </div>

          <div className="dashboard-details-table-wrapper">
            <div className="total-count-area mt-2">
              <div className="count-item light-red">
                <h5>
                  $
                  {dueInvoiceData?.data["due-list"]?.sales?.length > 0
                    ? getNumberWithCommas(
                        twoDigitFixed(dueInvoiceData?.data?.["sale-due"] || 0)
                      )
                    : getNumberWithCommas(
                        twoDigitFixed(
                          dueInvoiceData?.data?.["purchase-due"] || 0
                        )
                      )}
                </h5>
                <p>Total Due</p>
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
                <TableTopButtons arrayData={tableData} title="Due Invoice" />
              </div>
            </div>

            <div className="responsive-table">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <div className="d-flex align-items-center">
                        <input
                          type="checkbox"
                          className="print-d-none"
                          name="multiple-select-item"
                        />
                        <span>SL.</span>
                      </div>
                    </th>
                    <th>Date</th>
                    <th>Invoice No.</th>
                    <th className="text-center">Total</th>
                    <th className="text-center">Paid</th>
                    <th className="text-center">Due</th>
                    <th className="text-center">Payment Method</th>
                    <th>Due Date</th>
                    <th className="print-d-none">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {updateDueList?.length === 0 ||
                  updateDueList === undefined ||
                  isLoading ||
                  isError ? (
                    <TableNoData />
                  ) : (
                    updateDueList?.map((data, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="print-d-none"
                              name="index"
                            />
                            <span>
                              {dataFrom < 9 && index < 9
                                ? `0${dataFrom + index}`
                                : dataFrom + index}
                            </span>
                          </div>
                        </td>
                        <td>
                          {data?.date !== null &&
                            getMonthDayYearFormat(data?.date)}
                        </td>
                        <td
                          data-bs-toggle="modal"
                          data-bs-target="#pos-view-modal"
                          onClick={(e) =>
                            setSlipInfo({
                              invoiceId: data?.id,
                              invoiceType: data?.dueType,
                            })
                          }
                          className="text-sky cursor-pointer"
                        >
                          {data?.prefix + data?.invoice}
                        </td>
                        <td className="text-center">
                          $
                          {getNumberWithCommas(
                            twoDigitFixed(data?.grand_total)
                          )}
                        </td>
                        {/* <td>${data?.paid_amount}</td> */}
                        <td className="text-center">
                          $
                          {getNumberWithCommas(
                            twoDigitFixed(
                              data?.grand_total - data?.payable_due_amount
                            )
                          )}
                        </td>
                        <td className="text-center text-orange">
                          $
                          {getNumberWithCommas(
                            twoDigitFixed(data?.payable_due_amount)
                          )}
                        </td>
                        <td className="text-center">
                          {data?.payment_type?.name}
                        </td>
                        <td>
                          {data?.due_date !== null &&
                            getMonthDayYearFormat(data?.due_date)}
                        </td>
                        <td className="print-d-none">
                          <div className="dropdown shoplist-dropdown">
                            <Link
                              className="action-icon"
                              data-bs-toggle="dropdown"
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
                                  data-bs-target="#collect-payment-modal"
                                  onClick={(e) => handleCollectPayment(data)}
                                >
                                  <img src={moneyMillsReceiveIcon} alt="icon" />
                                  Collect Payment
                                </Link>
                              </li>
                              <li>
                                <Link
                                  data-bs-toggle="modal"
                                  data-bs-target="#pos-view-modal"
                                  onClick={(e) =>
                                    setSlipInfo({
                                      invoiceId: data?.id,
                                      invoiceType: data?.dueType,
                                    })
                                  }
                                >
                                  <img src={eyeIcon} alt="icon" />
                                  View History
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
            {dueListData?.length > 0 && (
              <PaginationLocal
                items={dueListData}
                filterPerPage={
                  filterPerPage === "all" ? dueListData?.length : filterPerPage
                }
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            )}
          </div>
        </div>
      </div>

      <CollectPaymentModal partyId={partyId} />
      <DueSlipListModal slipInfo={slipInfo} setSlipInfo={setSlipInfo} />
    </div>
  );
};

export default DueInvoiceList;
