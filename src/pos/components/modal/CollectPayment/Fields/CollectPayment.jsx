import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import uploaderImage from "../../../../assets/images/icons/upload-icon.svg";

import {
  useAddDueCollectMutation,
  useAddDuePurchaseMutation,
  useGetInvoiceListQuery,
} from "../../../../redux/features/due/dueApi";
import {
  setDueSingleInvoice,
  setDueWithoutInvoice,
} from "../../../../redux/features/due/dueSlice";
import PaymentMethodDropdown from "../../../dropdown/PaymentMethodDropdown";
import { createAnchorTagWithNewWindow } from "../../../function/CreateAnchorTagWithNewWindow";
import { customISODate } from "../../../function/customISODate";
import { getCurrentTime } from "../../../function/getCurrentDateAndTime";
import { getNumberWithCommas } from "../../../function/getNumberWithCommas";
import { handlePopupModalClose } from "../../../function/handlePopupModalClose";
import { handleResponseErrorMessage } from "../../../function/handleResponseErrorMessage";
import { twoDigitFixed } from "../../../function/twoDigitFixed";
import Error from "../../../ui/Error/Error";
import SpinnerBorderSm from "../../../ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../ui/Toast/handleSuccessToast";
import BankList from "./BankList";
import CreateBankModal from "./CreateBankModal";
import MultipleInvoiceModal from "./MultipleInvoiceModal";
import SingleInvoiceField from "./SingleInvoiceField";

const CollectPayment = ({
  partyId,
  dueType,
  dueModalOpen,
  setDueModalOpen,
}) => {
  const [formValue, setFormValue] = useState({
    ids: [],
    collect_date: customISODate(),
    payable_due_amount: 0,
    amount: 0,
    payment_type_id: "1",
    bank_id: "",
    transactionid: "",
    note: "",
    image: null,
  });

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  //login user
  const loginUser = useSelector((state) => state?.admin?.adminProfile);
  // Single invoice
  const getSingleInvoice = useSelector(
    (state) => state?.dueList?.dueSingleInvoice
  );
  // without invoice, party opening due
  const getSinglePartyData = useSelector(
    (state) => state?.dueList?.dueWithoutInvoice
  );

  // Get due data with invoice
  const { data: dueInvoiceData } = useGetInvoiceListQuery(
    { partyId },
    {
      skip: !partyId || dueType === "Opening Due" ? true : false,
    }
  );

  // Get due data without invoice, just party opening due
  const getPartyOpeningDue = {
    party_id: getSinglePartyData?.id || "",
    party_type: getSinglePartyData?.party_type || "",
    balance: getSinglePartyData?.balance || "",
    name: getSinglePartyData?.name || "",
  };

  const partyData =
    Object.keys(getSinglePartyData).length !== 0
      ? getPartyOpeningDue
      : dueInvoiceData?.data["due-list"];
  // Add Purchase due
  const [
    addDuePurchase,
    {
      data: responsePurchaseData,
      isSuccess: purchaseIsSuccess,
      isLoading: purchaseIsLoading,
      error: responsePurchaseError,
    },
  ] = useAddDuePurchaseMutation();

  // Add Sales due
  const [
    addDueCollect,
    {
      data: responseSalesData,
      isSuccess: salesIsSuccess,
      isLoading: salesIsLoading,
      error: responseSalesError,
    },
  ] = useAddDueCollectMutation();

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  // Field Received value
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  const handleOnChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const newFormValue = { ...formValue };
    newFormValue[fieldName] = fieldValue;

    if (fieldName === "payment_type_id") {
      setFormValue((prev) => ({
        ...prev,
        payment_type_id: fieldValue,
        image: null,
        cheque_image: "",
      }));
    } else if (fieldName === "amount") {
      if (parseFloat(fieldValue) > parseFloat(formValue?.payable_due_amount)) {
        setError("Received less than or equal to due balance");
        setFormValue((prev) => ({
          ...prev,
          amount: 0,
        }));
      } else if (parseFloat(fieldValue) < 1 || fieldValue === "") {
        setFormValue((prev) => ({
          ...prev,
          amount: 0,
        }));
      } else {
        setFormValue((prev) => ({
          ...prev,
          amount: parseFloat(fieldValue),
        }));
        setError("");
      }
    } else if (fieldName === "image") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageDataUrl = reader.result;
          setFormValue((prev) => ({
            ...prev,
            cheque_image: imageDataUrl,
            image: file,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormValue(newFormValue);
    }
  };

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  // Sales Due Amount
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  useEffect(() => {
    if (responseSalesError !== undefined) {
      handleResponseErrorMessage(responseSalesError, setError);
    } else if (salesIsSuccess) {
      setError("");
      handlePopupModalClose();
      setDueModalOpen({
        mainPageOpen: true,
        isInvoiceOpen: false,
        isBankOpen: false,
      });
      dispatch(setDueSingleInvoice({}));
      createAnchorTagWithNewWindow(
        `/due/sale/slip/${responseSalesData?.data?.[0]?.id}`
      );
      handleSuccessToast(responseSalesData?.message?.message);
    }
  }, [responseSalesError, salesIsSuccess, responseSalesData]);

  const handleSalesSubmit = async () => {
    SalesAndPurchaseFunc("sale_id", addDueCollect);
  };
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  // Purchase Due Amount
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  useEffect(() => {
    if (responsePurchaseError !== undefined) {
      handleResponseErrorMessage(responsePurchaseError, setError);
    } else if (purchaseIsSuccess) {
      setError("");
      handlePopupModalClose();
      setDueModalOpen({
        mainPageOpen: true,
        isInvoiceOpen: false,
        isBankOpen: false,
      });
      dispatch(setDueSingleInvoice({}));
      createAnchorTagWithNewWindow(
        `/due/purchase/slip/${responsePurchaseData?.data?.[0]?.id}`
      );
      handleSuccessToast(responsePurchaseData?.message?.message);
    }
  }, [responsePurchaseError, purchaseIsSuccess, responsePurchaseData]);

  const handlePurchaseSubmit = () => {
    SalesAndPurchaseFunc("purchase_id", addDuePurchase);
  };

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  // Sales and Purchase Common Function
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  const SalesAndPurchaseFunc = async (dynamic_id, dynamic_function) => {
    if (formValue?.loginUser?.id === "") {
      setError("Please user id required!");
    } else if (formValue?.ids?.length === 0) {
      setError("Please select any invoice");
    } else if (formValue?.amount === 0) {
      setError("Received amount is required");
    } else {
      const collectDate =
        new Date(formValue?.collect_date).toLocaleDateString("en-GB") +
        " " +
        getCurrentTime();

      let { ids, cheque_image, ...restFormValue } = formValue;

      let newFormValue = {
        ...restFormValue,
        party_id: partyId || getPartyOpeningDue?.party_id,
        collect_date: collectDate,
        user_id: loginUser?.id,
      };

      const formattedData = {};
      formValue?.ids.forEach((item, index) => {
        formattedData[`${dynamic_id}[${index}]`] = item === null ? "" : item;
      });

      const updateDataFormat = {
        ...newFormValue,
        ...formattedData,
      };

      const formData = new FormData();
      Object.entries(updateDataFormat).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value);
        }
      });

      try {
        const response = await dynamic_function(formData);
      } catch (error) {
        console.error("Error due collect:", error);
      }
    }
  };

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  // Clear State
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  const handleClearState = () => {
    setFormValue({
      ids: [],
      collect_date: customISODate(),
      payable_due_amount: 0,
      amount: 0,
      payment_type_id: "1",
      bank_id: "",
      transactionid: "",
      note: "",
      image: null,
    });
    setError("");
    dispatch(setDueSingleInvoice({}));
    dispatch(setDueWithoutInvoice({}));
  };

  // console.log("formValue****", formValue);

  return (
    <>
      <div
        className={`modal-content ${!dueModalOpen?.mainPageOpen && "d-none"}`}
      >
        <div className="modal-header">
          <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
            {partyData?.party_type == 1 ? "Create Payment" : "Collect Payment"}
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleClearState}
          ></button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-3">
              <div className="custom-focus-label">
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  placeholder="Party name"
                  value={partyData?.name || ""}
                />
                <label>
                  Party
                  <small
                    className={
                      partyData?.balance > 0 ? "text-green-lg" : "text-orange"
                    }
                  >
                    (Balance: $
                    {getNumberWithCommas(
                      twoDigitFixed(Math.abs(partyData?.balance))
                    )}
                    )
                  </small>
                </label>
              </div>
            </div>

            {Object.keys(getSingleInvoice).length === 0 &&
            getPartyOpeningDue?.party_id === "" ? (
              <div className="col-lg-4 col-md-6 mb-3">
                <div
                  className="custom-focus-label"
                  onClick={() =>
                    setDueModalOpen({
                      mainPageOpen: false,
                      isInvoiceOpen: true,
                      isBankOpen: false,
                    })
                  }
                >
                  <label>Select Invoice</label>
                  <div className="input-wrapper pos-up-down-arrow">
                    <div className="w-100">
                      <input
                        readOnly
                        type="text"
                        placeholder="Select Invoice"
                        value={
                          formValue?.ids?.length === 0
                            ? ""
                            : formValue?.ids?.length
                        }
                        className="form-control m-0 search-select-option-input"
                      />
                    </div>
                    <span></span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-lg-4 col-md-6 mb-3">
                <SingleInvoiceField
                  setFormValue={setFormValue}
                  getSingleInvoice={getSingleInvoice}
                  getPartyOpeningDue={getPartyOpeningDue}
                />
              </div>
            )}

            <div className="col-lg-4 col-md-6 mb-3">
              <div className="custom-focus-label">
                <input
                  type="date"
                  required
                  name="collect_date"
                  className="form-control"
                  value={formValue?.collect_date}
                  onChange={handleOnChange}
                />
                <label>Date</label>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-3">
              <div className="custom-focus-label">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Balance Due"
                  readOnly
                  value={getNumberWithCommas(
                    twoDigitFixed(formValue?.payable_due_amount)
                  )}
                />
                <label>Invoice Due</label>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-3">
              <div className="custom-focus-label">
                <input
                  readOnly={formValue?.ids?.length > 1}
                  type={formValue?.ids?.length > 1 ? "text" : "number"}
                  name="amount"
                  className="form-control"
                  placeholder="Enter received"
                  value={
                    formValue?.amount <= 0
                      ? ""
                      : formValue?.ids?.length > 1
                      ? getNumberWithCommas(twoDigitFixed(formValue.amount))
                      : formValue.amount
                  }
                  onChange={handleOnChange}
                />
                <label>Received</label>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-3">
              <div className="custom-focus-label">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter remaining balance"
                  readOnly
                  value={getNumberWithCommas(
                    twoDigitFixed(
                      formValue?.payable_due_amount - formValue.amount
                    )
                  )}
                />
                <label>Remaining Balance</label>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-3">
              <div className="custom-focus-label">
                <PaymentMethodDropdown
                  value={formValue?.payment_type_id}
                  handleOnChange={handleOnChange}
                />
                <label>Payment Type</label>
              </div>
            </div>

            {formValue?.payment_type_id === "2" ||
            formValue?.payment_type_id == "4" ? (
              <div className="col-lg-4 col-md-6 mb-3">
                <BankList
                  initialKey="bank_id"
                  initialValue={formValue?.bank_id}
                  setFormValue={setFormValue}
                  setDueModalOpen={setDueModalOpen}
                />
              </div>
            ) : (
              ""
            )}
            {formValue?.payment_type_id === "2" ||
            formValue?.payment_type_id === "3" ||
            formValue?.payment_type_id == "4" ? (
              <div className="col-lg-4 col-md-6 mb-3">
                <div className="custom-focus-label">
                  <input
                    type="text"
                    name="transactionid"
                    className="form-control"
                    placeholder={
                      formValue?.payment_type_id === "3"
                        ? "Enter cheque no"
                        : "Enter transaction id"
                    }
                    value={formValue?.transactionid}
                    onChange={handleOnChange}
                  />
                  <label>
                    {formValue?.payment_type_id === "3"
                      ? "Cheque no"
                      : "Transaction"}
                  </label>
                </div>
              </div>
            ) : (
              ""
            )}

            {formValue?.payment_type_id === "3" && (
              <div className="col-lg-4 col-md-6 mb-3">
                <div className="position-relative overflow-hidden">
                  <div className="upload-img-v2 due-cheque-image">
                    <label className="upload-v4">
                      <div className="img-wrp">
                        <div className="position-relative">
                          <img
                            src={formValue?.cheque_image || uploaderImage}
                            alt="user"
                          />
                        </div>
                      </div>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="d-none"
                        onChange={handleOnChange}
                      />
                      <span className="choose-file">Upload Image</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-3">
              <div className="custom-focus-label">
                <textarea
                  type="text"
                  name="note"
                  className="form-control"
                  placeholder="Enter note"
                  value={formValue?.note}
                  onChange={handleOnChange}
                  rows="5"
                ></textarea>
                <label>Note</label>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <div className="button-group d-flex justify-content-end mt-3">
              <button
                className="btn cancel-btn"
                type="button"
                data-bs-dismiss="modal"
                onClick={handleClearState}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn save-btn"
                disabled={purchaseIsLoading || salesIsLoading}
                onClick={
                  partyData?.party_type == "1"
                    ? handlePurchaseSubmit
                    : handleSalesSubmit
                }
              >
                {purchaseIsLoading || salesIsLoading ? (
                  <SpinnerBorderSm />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="px-3 pb-2">
          {error !== "" && <Error message={error} />}
        </div>
      </div>

      <MultipleInvoiceModal
        partyData={partyData}
        dueModalOpen={dueModalOpen}
        setDueModalOpen={setDueModalOpen}
        formValue={formValue}
        setFormValue={setFormValue}
        setError={setError}
      />
      <CreateBankModal
        dueModalOpen={dueModalOpen}
        setDueModalOpen={setDueModalOpen}
      />
    </>
  );
};

export default React.memo(CollectPayment);
