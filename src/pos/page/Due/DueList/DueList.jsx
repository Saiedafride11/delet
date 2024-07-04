import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import eyeIcon from "../../../assets/images/actions/eye.svg";
import moneyMillsReceiveIcon from "../../../assets/images/actions/money-bill-receive.svg";
import PaginationLocal from "../../../components/common/PaginationLocal";
import SerialNumberWithoutCheckbox from "../../../components/common/SerialNumberWithoutCheckbox";
import TableTopPageFilter from "../../../components/common/TableTopPageFilter";
import TableTopPartyFilter from "../../../components/common/TableTopPartyFilter";
import TableTopSearch from "../../../components/common/TableTopSearch";
import { getMonthDayYearFormat } from "../../../components/function/getMonthDayYearFormat";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import CollectPaymentModal from "../../../components/modal/CollectPayment/CollectPaymentModal";
import { partyTypeMap } from "../../../components/types/partyTypeMap";
import TableNoData from "../../../components/ui/NoData/TableNoData";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import TableTopButtons from "../../../components/utils/TableTopButtons/TableTopButtons";
import { useGetDueListQuery } from "../../../redux/features/due/dueApi";
import { setDueWithoutInvoice } from "../../../redux/features/due/dueSlice";

const DueList = () => {
  document.title = "Due List";
  const [selectedPage, setSelectedPage] = useState(1);
  const [filterPerPage, setFilterPerPage] = useState(20);
  const [searchText, setSearchText] = useState("");
  const [partyType, setPartyType] = useState("");
  const [partyInfo, setPartyInfo] = useState({});
  const dispatch = useDispatch();
  const currencySymbol = useSelector(
    (state) => state?.settings?.globalCurrencies?.symbol
  );

  // -----------------------------------------------
  // All Data Show
  // -----------------------------------------------
  // const { dateFilter, dateFilterParams, handleDateFilter } =
  //   useFilterFromToDate();

  let filterQuery;
  if (searchText !== "" && partyType === "") {
    filterQuery = `?search=${searchText}`;
  } else if (searchText === "" && partyType !== "") {
    filterQuery = `?filter=${partyType}`;
  } else {
    filterQuery = `?search=${searchText}&filter=${partyType}`;
  }

  // const newFilterQuery = filterQuery
  //   ? filterQuery + `&${dateFilterParams}`
  //   : `?${dateFilterParams}`;
  const { data: dueData, isLoading, isError } = useGetDueListQuery(filterQuery);

  // -----------------------------------------------
  // Local Modified Data
  // -----------------------------------------------

  const dueListData = dueData?.data["due-list"]?.map((data) => ({
    id: data?.id,
    name: data?.name,
    party_type: data?.party_type,
    balance: data?.balance,
    totalDue: data?.party_total_due,
    dueType:
      data?.purchase?.length > 0
        ? "Purchase"
        : data?.sales?.length > 0
        ? "Sales"
        : "Opening Due",
    invoiceList:
      data?.purchase?.length > 0
        ? data?.purchase
        : data?.purchase?.length > 0
        ? data?.sales
        : [],
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
  const tableData = dueData?.data["due-list"]?.map((data) => ({
    Name: data?.name,
    "Party Type": partyTypeMap[data?.party_type],
    "Total Due": `${
      currencySymbol +
      getNumberWithCommas(twoDigitFixed(data?.party_total_due || 0))
    }`,
    "Due Date":
      (data?.sales?.[0]?.due_date &&
        getMonthDayYearFormat(data.sales[0].due_date)) ||
      (data?.purchase?.[0]?.due_date &&
        getMonthDayYearFormat(data.purchase[0].due_date)),
    "Due Type":
      data?.purchase?.length > 0
        ? "Purchase"
        : data?.sales?.length > 0
        ? "Sales"
        : "Opening Due",
  }));

  // -----------------------------------------------
  // Due Collect Payment
  // -----------------------------------------------
  const handleDueCollect = (data) => {
    setPartyInfo(data);
    if (data?.dueType === "Opening Due") {
      dispatch(setDueWithoutInvoice(data));
    }
  };
  return (
    <div className="acnoo-dashboard-main-section">
      {isLoading && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper">
          <div className="details-header print-d-none">
            <div className="title">
              <h4>Due List</h4>
            </div>
          </div>

          <div className="dashboard-details-table-wrapper">
            <div className="total-count-area mt-2">
              <div className="count-item light-red">
                <h5>
                  {currencySymbol +
                    getNumberWithCommas(
                      twoDigitFixed(dueData?.data?.["retailer-due"] || 0)
                    )}
                </h5>
                <p>Retailer</p>
              </div>
              <div className="count-item light-blue-sm">
                <h5>
                  {currencySymbol +
                    getNumberWithCommas(
                      twoDigitFixed(dueData?.data?.["dealer-due"] || 0)
                    )}
                </h5>
                <p>Dealer</p>
              </div>
              <div className="count-item light-green">
                <h5>
                  {currencySymbol +
                    getNumberWithCommas(
                      twoDigitFixed(dueData?.data?.["wholesaler-due"] || 0)
                    )}
                </h5>
                <p>Wholesaler</p>
              </div>
              <div className="count-item light-blue">
                <h5>
                  {currencySymbol +
                    getNumberWithCommas(
                      twoDigitFixed(dueData?.data?.["supplier-due"] || 0)
                    )}
                </h5>
                <p>Supplier</p>
              </div>
            </div>

            <div className="table-top-form daily-transaction-between-wrapper top-filter-wrapper">
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
                  <TableTopPartyFilter
                    partyType={partyType}
                    setPartyType={setPartyType}
                  />
                  {/* <TableTopFromToDate
                    dateFilter={dateFilter}
                    handleDateFilter={handleDateFilter}
                  /> */}
                </div>
              </form>
              <div className="table-top-btn-group">
                <TableTopButtons arrayData={tableData} title="Due" />
              </div>
            </div>

            <div className="responsive-table">
              <table className="table">
                <thead>
                  <tr>
                    <th>SL.</th>
                    <th>Party Name</th>
                    <th>Party Type</th>
                    <th className="text-center">Total Due</th>
                    <th>Due Date</th>
                    <th>Sales By</th>
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
                          <SerialNumberWithoutCheckbox
                            dataFrom={dataFrom}
                            index={index}
                          />
                        </td>
                        <td>
                          {data?.dueType === "Opening Due" ? (
                            <Link className="text-sky cursor-not-allowed">
                              {data?.name}
                            </Link>
                          ) : (
                            <Link
                              to={`/due/invoice/${data?.id}`}
                              className="text-sky"
                            >
                              {data?.name}
                            </Link>
                          )}
                        </td>

                        <td>{partyTypeMap[data?.party_type] || ""}</td>
                        <td className="text-center text-orange">
                          {currencySymbol +
                            getNumberWithCommas(twoDigitFixed(data?.totalDue))}
                        </td>
                        <td>
                          {(data?.invoiceList?.length > 0 &&
                            data?.invoiceList?.[0]?.due_date !== null &&
                            getMonthDayYearFormat(
                              data?.invoiceList?.[0]?.due_date
                            )) ||
                            ""}
                        </td>
                        <td>{data?.invoiceList?.[0]?.user?.name}</td>
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
                                {data?.dueType === "Opening Due" ? (
                                  <Link className="cursor-not-allowed">
                                    <img src={eyeIcon} alt="icon" />
                                    View Details
                                  </Link>
                                ) : (
                                  <Link to={`/due/invoice/${data?.id}`}>
                                    <img src={eyeIcon} alt="icon" />
                                    View Details
                                  </Link>
                                )}
                              </li>
                              <li>
                                <Link
                                  data-bs-toggle="modal"
                                  data-bs-target="#collect-payment-modal"
                                  onClick={() => handleDueCollect(data)}
                                >
                                  <img src={moneyMillsReceiveIcon} alt="icon" />
                                  Collect Payment
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

      <CollectPaymentModal
        partyId={partyInfo?.id}
        dueType={partyInfo?.dueType}
      />
    </div>
  );
};

export default DueList;
