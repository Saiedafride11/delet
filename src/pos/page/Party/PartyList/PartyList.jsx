import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import editIcon from "../../../assets/images/actions/edit.svg";
import eyeIcon from "../../../assets/images/actions/eye.svg";
import messageIcon from "../../../assets/images/actions/message-text-check.svg";
import moneyMillsReceiveIcon from "../../../assets/images/actions/money-bill-receive.svg";
import noteListIcon from "../../../assets/images/actions/note-list-square.svg";
import deleteIcon from "../../../assets/images/actions/trash.svg";
import MultipleDeleteItems from "../../../components/common/MultipleDeleteItems";
import MultipleSelectCheckBox from "../../../components/common/MultipleSelectCheckBox";
import Pagination from "../../../components/common/Pagination";
import SerialNumber from "../../../components/common/SerialNumber";
import TableTopPageFilter from "../../../components/common/TableTopPageFilter";
import TableTopSearch from "../../../components/common/TableTopSearch";
import { getMonthDayYearFormat } from "../../../components/function/getMonthDayYearFormat";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import CollectPaymentModal from "../../../components/modal/CollectPayment/CollectPaymentModal";
import DeleteModal from "../../../components/modal/DeleteModal";
import { partyTypeMap } from "../../../components/types/partyTypeMap";
import TableNoData from "../../../components/ui/NoData/TableNoData";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import TableTopButtons from "../../../components/utils/TableTopButtons/TableTopButtons";
import useFilterSearchQuery from "../../../hooks/useFilterSearchQuery";
import useMultipleDataDelete from "../../../hooks/useMultipleDataDelete";
import useSingleDataDelete from "../../../hooks/useSingleDataDelete";
import { setDueWithoutInvoice } from "../../../redux/features/due/dueSlice";
import {
  useDeletePartyMutation,
  useGetAllPartyQuery,
  useMultiDeletePartyMutation,
} from "../../../redux/features/party/party/partyApi";
import PartyListViewModal from "../../Products/components/modal/PartyListViewModal";
import PartyFilterTabs from "../PartyFilterTabs";

const PartyList = () => {
  document.title = "Party List";
  const [deleteId, setDeleteId] = useState(0);
  const [error, setError] = useState("");
  const [updateData, setUpdateData] = useState({});
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

  const {
    data: partyData,
    isLoading,
    isError,
    isFetching,
  } = useGetAllPartyQuery(filterQuery);
  // -----------------------------------------------
  // Single Delete Data
  // -----------------------------------------------
  const [
    deleteParty,
    {
      isSuccess: deleteIsSuccess,
      isLoading: deleteIsLoading,
      error: deleteError,
    },
  ] = useDeletePartyMutation();

  const { handleDelete } = useSingleDataDelete(
    deleteParty,
    deleteError,
    deleteIsSuccess,
    setError,
    "Party"
  );
  // -----------------------------------------------
  // Multiple Delete Data
  // -----------------------------------------------
  const [
    multiDeleteParty,
    {
      isSuccess: multiDeleteIsSuccess,
      isLoading: multiDeleteIsLoading,
      error: multiDeleteError,
    },
  ] = useMultiDeletePartyMutation();

  const {
    selectItems,
    checkedItems,
    handleItemsSelect,
    handleMultipleSelect,
    handleMultipleDelete,
    handleResetMultipleSelect,
  } = useMultipleDataDelete(
    partyData?.data?.parties?.data,
    multiDeleteParty,
    multiDeleteError,
    multiDeleteIsSuccess,
    setError,
    "Party"
  );
  // -----------------------------------------------
  // Make Excel, CSV and pdf data
  // -----------------------------------------------
  const tableData = partyData?.data?.parties?.data?.map((data) => ({
    Date: getMonthDayYearFormat(data?.date),
    "Party name": data?.name,
    "Party type": partyTypeMap[data?.party_type] || "",
    "Phone number": data?.phone,
    "Reward point": data?.reward,
    "Total bill": `${
      currencySymbol +
      (data?.party_type == 1
        ? getNumberWithCommas(
            twoDigitFixed(data?.party_purchases_grand_total || 0)
          )
        : getNumberWithCommas(twoDigitFixed(data?.party_sale_grand_total || 0)))
    }`,
    Paid: `${
      currencySymbol +
      (data?.party_type == 1
        ? getNumberWithCommas(
            twoDigitFixed(data?.party_purchases_paid_total || 0)
          )
        : getNumberWithCommas(twoDigitFixed(data?.party_sale_paid_total || 0)))
    }`,
    Due: `${
      currencySymbol +
      (data?.party_type == 1
        ? getNumberWithCommas(
            twoDigitFixed(data?.party_purchases_due_total || 0)
          )
        : getNumberWithCommas(twoDigitFixed(data?.party_sale_due_total || 0)))
    }`,
    Balance: `${
      currencySymbol + getNumberWithCommas(twoDigitFixed(data?.balance))
    }`,
    // Balance: `$${JSON?.parse(data?.balance_info)?.opening_balance}`,
  }));

  // -----------------------------------------------
  // Due Collect Payment
  // -----------------------------------------------
  const handleDueCollect = (data) => {
    const newData = {
      id: data.id,
      party_type: data?.party_type,
      balance: data?.balance,
      name: data?.name,
      dueType:
        data?.is_transaction == 0
          ? "Opening Due"
          : data?.party_type == 1
          ? "Purchase"
          : "Sales",
    };
    setUpdateData(newData);
    if (newData?.dueType === "Opening Due") {
      dispatch(setDueWithoutInvoice(newData));
    }
  };

  return (
    <div className="acnoo-dashboard-main-section">
      {(isLoading || isFetching) && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper">
          <div className="details-header print-d-none">
            <div className="title">
              <h4>Party List</h4>
              <Link to="/party/create" className="btn custom-btn">
                <span>+</span> Add Party
              </Link>
            </div>
          </div>
          {/* Filter Tab start */}
          <PartyFilterTabs />
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
                <TableTopButtons arrayData={tableData} title="Party" />
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
                    <th>Party Name</th>
                    <th>Party Type</th>
                    <th>Phone Number</th>
                    <th className="text-center">Reward Point</th>
                    <th className="text-center">Total Bill</th>
                    <th className="text-center">Paid</th>
                    <th className="text-center">Due</th>
                    <th className="text-center">Wallet</th>
                    <th className="text-center">Credit Limit</th>
                    <th className="print-d-none">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {partyData?.data?.parties?.data?.length === 0 ||
                  partyData?.data?.parties?.data === undefined ||
                  isLoading ||
                  isError ? (
                    <TableNoData />
                  ) : (
                    partyData?.data?.parties?.data?.map((data, index) => (
                      <tr key={index}>
                        <td>
                          <SerialNumber
                            index={index}
                            selectItems={selectItems}
                            id={data?.id}
                            dataFrom={partyData?.data?.parties?.from}
                            handleItemsSelect={handleItemsSelect}
                          />
                        </td>
                        <td>{getMonthDayYearFormat(data?.date)}</td>
                        <td>{data?.name}</td>
                        <td>{partyTypeMap[data?.party_type] || ""}</td>
                        <td>{data?.phone}</td>
                        <td className="text-center">{data?.reward}</td>
                        <td className="text-center">
                          {currencySymbol +
                            getNumberWithCommas(
                              twoDigitFixed(data?.party_grand_total || 0)
                            )}
                        </td>
                        <td className="text-center">
                          {currencySymbol +
                            getNumberWithCommas(
                              twoDigitFixed(data?.party_paid_amount || 0)
                            )}
                        </td>
                        <td className="text-center text-orange">
                          {currencySymbol +
                            getNumberWithCommas(
                              twoDigitFixed(data?.party_due_total || 0)
                            )}
                        </td>
                        <td
                          className={`text-center ${
                            data?.balance > 0 ? "text-green-lg" : "text-orange"
                          }`}
                        >
                          {currencySymbol}
                          {data?.balance > 0 ? "+" : ""}
                          {getNumberWithCommas(twoDigitFixed(data?.balance))}
                        </td>
                        <td className="text-center">
                          {currencySymbol +
                            getNumberWithCommas(
                              twoDigitFixed(data?.credit_limit)
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
                                  data-bs-toggle="modal"
                                  data-bs-target="#party-view-modal"
                                  onClick={(e) => setUpdateData(data)}
                                >
                                  <img src={eyeIcon} alt="icon" />
                                  View
                                </Link>
                              </li>
                              <li>
                                <Link to={`/party/update/${data?.id}`}>
                                  <img src={editIcon} alt="icon" />
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <Link to="">
                                  <img src={noteListIcon} alt="icon" /> Delivery
                                  challan
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
                              <li>
                                {data?.balance < 0 ||
                                data?.is_transaction != 0 ? (
                                  <Link
                                    data-bs-toggle="modal"
                                    data-bs-target="#collect-payment-modal"
                                    onClick={() => handleDueCollect(data)}
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
                              <li>
                                <Link to="">
                                  <img src={messageIcon} alt="icon" /> SMS
                                  Reminder{" "}
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
            {partyData !== undefined &&
              partyData?.data?.parties?.data?.length > 0 && (
                <Pagination
                  pagination={partyData?.data?.parties}
                  setSelectedPage={setSelectedPage}
                />
              )}
          </div>
        </div>
      </div>

      <PartyListViewModal
        updateData={updateData}
        currencySymbol={currencySymbol}
      />

      <CollectPaymentModal
        partyId={updateData?.id}
        dueType={updateData?.dueType}
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

export default PartyList;
