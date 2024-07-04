import React, { useEffect, useState } from "react";
import { handleSuccessToast } from "../../../../components/ui/Toast/handleSuccessToast";
import { getNumberWithCommas } from "../../../function/getNumberWithCommas";
import { twoDigitFixed } from "../../../function/twoDigitFixed";

const MultipleInvoiceModal = ({
  partyData,
  dueModalOpen,
  setDueModalOpen,
  formValue,
  setFormValue,
  setError,
}) => {
  const [searchText, setSearchText] = useState("");
  const [matchedData, setMatchedData] = useState([]);
  const [selectItems, setSelectItems] = useState([]);
  const [checkedItems, setCheckedItem] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const initialData =
    partyData?.sales?.length > 0 ? partyData?.sales : partyData?.purchase;

  const items = searchText === "" ? initialData : matchedData;

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  // Checkbox check or uncheck toggle
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const filterData = initialData?.filter((item) =>
      item?.invoice?.toLowerCase().includes(value?.toLowerCase())
    );
    setMatchedData(filterData);
  };
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  // Single Invoice Selection
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  const handleItemsSelect = (item) => {
    const itemId = item?.id;
    const dueAmount = item?.payable_due_amount;
    const isSelected = selectItems.includes(itemId);

    const newItems = isSelected
      ? selectItems?.filter((id) => id !== itemId)
      : [...selectItems, itemId];
    setSelectItems(newItems);

    const newTotalAmount = isSelected
      ? totalAmount - dueAmount
      : totalAmount + dueAmount;
    setTotalAmount(newTotalAmount);

    setCheckedItem(false);
  };

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  //All Invoice selection
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  const totalAmountFunc = () => {
    const totalAmount = items?.reduce(
      (total, item) => total + item?.payable_due_amount,
      0
    );
    const partyOpeningDue =
      partyData?.balance < 0 ? Math.abs(partyData?.balance) : 0;
    return totalAmount + partyOpeningDue;
  };

  const handleMultipleSelect = () => {
    // const newSelectItems = checkedItems ? [] : items?.map((data) => data.id);
    const newSelectItems = checkedItems
      ? []
      : partyData?.balance < 0
      ? [...(items?.map((data) => data.id) || []), null]
      : items?.map((data) => data.id);

    setSelectItems(newSelectItems);
    setCheckedItem(!checkedItems);

    setTotalAmount(newSelectItems?.length > 0 ? totalAmountFunc() : 0);
  };
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  // Final Submit selected invoice
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  const handleInvoiceSubmit = (e) => {
    e.preventDefault();

    setFormValue((prev) => ({
      ...prev,
      amount: totalAmount,
      payable_due_amount: totalAmount,
      ids: selectItems,
    }));

    if (selectItems?.length > 0) {
      handleSuccessToast("Invoice added successfully");
    }
    handleClearState();
  };

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  // Update the state, when modal is open
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  useEffect(() => {
    if (dueModalOpen?.isInvoiceOpen) {
      setSelectItems(formValue?.ids);
      setTotalAmount(formValue?.amount);

      if (totalAmountFunc() == formValue?.amount) {
        setCheckedItem(true);
      } else {
        setCheckedItem(false);
      }
    }
  }, [dueModalOpen]);

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  // Clear State
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  const handleClearState = () => {
    setDueModalOpen({
      mainPageOpen: true,
      isInvoiceOpen: false,
      isBankOpen: false,
    });
    setError("");
    setSearchText("");
    setTotalAmount(0);
    setMatchedData([]);
    setSelectItems([]);
    setCheckedItem(false);
  };

  return (
    <div
      className={`modal-content ${!dueModalOpen?.isInvoiceOpen && "d-none"}`}
    >
      <div className="modal-header">
        <div>
          <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
            Due Invoice
          </h1>
        </div>
        <button
          type="button"
          className="btn-close"
          onClick={handleClearState}
        ></button>
      </div>
      <div className="modal-body">
        <div className="mb-3">
          <div className="d-flex align-items-center justify-content-between">
            <label className="col-form-label fw-medium">Search Invoice</label>
            <label className="col-form-label">
              {initialData?.length + (partyData?.balance < 0 ? 1 : 0) || 0}/
              {selectItems?.length || 0} Entered
            </label>
          </div>
          <div className="add-scan">
            <input
              type="search"
              required
              className="form-control"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between mb-3">
          <p>
            Showing {items?.length + (partyData?.balance < 0 ? 1 : 0)} Results
          </p>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              checked={checkedItems}
              onChange={handleMultipleSelect}
              id="select-all-invoice"
              name="select-all-invoice"
            />
            <label className="settings-label" htmlFor="select-all-invoice">
              Select all invoice
            </label>
          </div>
        </div>

        <div className="multiple-due-invoice">
          {items?.length === 0 ? (
            <label className="col-form-label fw-medium">
              No Invoice Found!
            </label>
          ) : (
            <>
              {partyData?.balance < 0 && (
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <p>Opening Due</p>
                  <div className="d-flex align-items-center">
                    <label
                      className="settings-label me-1 fw-bold text-orange"
                      htmlFor="party_due"
                    >
                      $
                      {getNumberWithCommas(
                        twoDigitFixed(Math.abs(partyData?.balance))
                      )}
                    </label>
                    <input
                      type="checkbox"
                      checked={selectItems?.includes(null)}
                      onChange={() =>
                        handleItemsSelect({
                          id: null,
                          payable_due_amount: Math.abs(partyData?.balance),
                        })
                      }
                      id="party_due"
                    />
                  </div>
                </div>
              )}
              {items?.map((item, index) => (
                <div
                  key={index}
                  className={`d-flex align-items-center justify-content-between ${
                    index === 0 ? "" : "mt-3"
                  }`}
                >
                  <p>{item?.prefix + item?.invoice}</p>
                  <div className="d-flex align-items-center">
                    <label
                      className="settings-label me-1 fw-bold"
                      htmlFor={item?.prefix + item?.invoice}
                    >
                      $
                      {getNumberWithCommas(
                        twoDigitFixed(item?.payable_due_amount)
                      )}
                    </label>
                    <input
                      type="checkbox"
                      checked={selectItems?.includes(item?.id)}
                      onChange={() => handleItemsSelect(item)}
                      id={item?.prefix + item?.invoice}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="mb-3 d-flex align-items-center justify-content-center">
        <div className="button-group">
          <button onClick={handleClearState} className="btn cancel-btn">
            Cancel
          </button>
          <button
            type="submit"
            className="btn save-btn"
            // disabled={serialItems?.length === 0}
            onClick={handleInvoiceSubmit}
          >
            Save
          </button>
        </div>
      </div>
      <div className="px-3 pb-2">
        {/* {error !== "" && <Error message={error} />} */}
      </div>
    </div>
  );
};

export default React.memo(MultipleInvoiceModal);
