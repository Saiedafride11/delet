import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PaymentMethodDropdown from "../../../components/dropdown/PaymentMethodDropdown";
import { createAnchorTagWithNewWindow } from "../../../components/function/CreateAnchorTagWithNewWindow";
import { customISODate } from "../../../components/function/customISODate";
import { getCurrentTime } from "../../../components/function/getCurrentDateAndTime";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { handleResponseErrorMessage } from "../../../components/function/handleResponseErrorMessage";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import Error from "../../../components/ui/Error/Error";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import SpinnerBorderSm from "../../../components/ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../components/ui/Toast/handleSuccessToast";
import useSalePurchaseOnChange from "../../../hooks/useSalePurchaseOnChange";
import { useGetPrefixInvoiceQuery } from "../../../redux/features/global/invoice_prefix/invoicePrefixApi";
import { useAddPurchaseMutation } from "../../../redux/features/purchase/purchase/purchaseApi";
import InventoryProductsList from "./Fields/InventoryProductsList";
import PartyWithSupplier from "./Fields/PartyWithSupplier";
import SearchingProducts from "./Fields/SearchingProducts";
import TotalAmount from "./Fields/TotalAmount";
import WarehouseField from "./Fields/WarehouseField";

const PurchaseCreate = () => {
  document.title = "Add Purchase";
  const loginUser = useSelector((state) => state?.admin?.adminProfile);
  const [formValue, setFormValue] = useState({
    party_id: "",
    party_amount: 0,
    purchase_date: customISODate(),
    invoicePrefix: "",
    warehouse: {
      id: "",
      name: "",
    },
    paid_amount: 0,
    due_amount: 0,
    due_date: "",
    payment_type_id: "",
    note: "",
    total_amount: 0,
    grand_total: 0,
    service_charge: 0,
    vat_percent: 0,
    vat: 0,
    discount_percent: 0,
    discount: 0,
    items: [],
  });
  const [error, setError] = useState("");

  // sale invoice prefix
  const { data: invoicePrefixData, isLoading: invoicePrefixLoading } =
    useGetPrefixInvoiceQuery();

  const initialInvoicePrefix =
    invoicePrefixData?.data?.["purchase-prefix"] +
    invoicePrefixData?.data?.["purchase-invoice"];

  const [
    addPurchase,
    { data: responseData, isSuccess, isLoading, error: responseError },
  ] = useAddPurchaseMutation();

  const navigate = useNavigate();

  // const handleOnChange = (e) => {
  //   const fieldName = e.target.name;
  //   const fieldValue = e.target.value;
  //   const newFormValue = { ...formValue };
  //   newFormValue[fieldName] = fieldValue;
  //   if (fieldName === "paid_amount") {
  //     if (parseInt(fieldValue) > parseInt(formValue?.grand_total)) {
  //       handleErrorModalWithCross(
  //         "Paying amount less than or equal to main price"
  //       );
  //       setFormValue((prev) => ({
  //         ...prev,
  //         paid_amount: 0,
  //         due_amount: formValue?.grand_total,
  //       }));
  //     } else {
  //       setFormValue((prev) => ({
  //         ...prev,
  //         paid_amount: fieldValue === "" ? 0 : parseInt(fieldValue),
  //         due_amount:
  //           fieldValue === ""
  //             ? formValue?.grand_total
  //             : formValue?.grand_total - parseInt(fieldValue),
  //       }));
  //     }
  //   } else if (fieldName === "service_charge") {
  //     if (fieldValue < 1) {
  //       const grandTotal =
  //         formValue?.total_amount + formValue?.vat - formValue?.discount;
  //       setFormValue((prev) => ({
  //         ...prev,
  //         service_charge: 0,
  //         grand_total: grandTotal,
  //         due_amount: grandTotal - formValue?.paid_amount,
  //       }));
  //     } else {
  //       const grandTotal =
  //         formValue?.total_amount +
  //         formValue?.vat +
  //         parseInt(fieldValue) -
  //         formValue?.discount;
  //       setFormValue((prev) => ({
  //         ...prev,
  //         service_charge: parseInt(fieldValue),
  //         grand_total: grandTotal,
  //         due_amount: grandTotal - formValue?.paid_amount,
  //       }));
  //     }
  //   } else if (fieldName === "vat_percent") {
  //     if (fieldValue > 100) {
  //       handleErrorModalWithCross("Percent less than or equal 100");
  //       const grandTotal =
  //         formValue?.total_amount +
  //         formValue?.service_charge -
  //         formValue?.discount;
  //       setFormValue((prev) => ({
  //         ...prev,
  //         vat: 0,
  //         vat_percent: 0,
  //         grand_total: grandTotal,
  //         due_amount: grandTotal - formValue?.paid_amount,
  //       }));
  //     } else if (fieldValue < 1) {
  //       // handleErrorModalWithCross("Percent gether than or equal 1");
  //       const grandTotal =
  //         formValue?.total_amount +
  //         formValue?.service_charge -
  //         formValue?.discount;
  //       setFormValue((prev) => ({
  //         ...prev,
  //         vat: 0,
  //         vat_percent: 0,
  //         grand_total: grandTotal,
  //         due_amount: grandTotal - formValue?.paid_amount,
  //       }));
  //     } else {
  //       const mainPrice = parseInt(formValue?.total_amount);
  //       const discountPercentage = parseInt(fieldValue);
  //       const vatAmount = Math.ceil((mainPrice * discountPercentage) / 100);

  //       const grandTotal =
  //         formValue?.total_amount +
  //         formValue?.service_charge +
  //         vatAmount -
  //         formValue?.discount;
  //       setFormValue((prev) => ({
  //         ...prev,
  //         vat: vatAmount,
  //         vat_percent: parseInt(fieldValue),
  //         grand_total: grandTotal,
  //         due_amount: grandTotal - formValue?.paid_amount,
  //       }));
  //     }
  //   } else if (fieldName === "vat") {
  //     if (fieldValue < 1) {
  //       const grandTotal =
  //         formValue?.total_amount +
  //         formValue?.service_charge -
  //         formValue?.discount;
  //       setFormValue((prev) => ({
  //         ...prev,
  //         vat: 0,
  //         vat_percent: 0,
  //         grand_total: grandTotal,
  //         due_amount: grandTotal - formValue?.paid_amount,
  //       }));
  //     } else {
  //       const mainPrice = parseInt(formValue?.total_amount);
  //       const vatPrice = parseInt(fieldValue);
  //       const percentage = Math.ceil((vatPrice * 100) / mainPrice);

  //       const grandTotal =
  //         formValue?.total_amount +
  //         formValue?.service_charge +
  //         vatPrice -
  //         formValue?.discount;
  //       setFormValue((prev) => ({
  //         ...prev,
  //         vat: parseInt(fieldValue),
  //         vat_percent: percentage,
  //         grand_total: grandTotal,
  //         due_amount: grandTotal - formValue?.paid_amount,
  //       }));
  //     }
  //   } else if (fieldName === "discount_percent") {
  //     if (fieldValue > 100) {
  //       handleErrorModalWithCross("Percent less than or equal 100");

  //       const grandTotal =
  //         formValue?.total_amount + formValue?.vat + formValue?.service_charge;
  //       setFormValue((prev) => ({
  //         ...prev,
  //         discount: 0,
  //         discount_percent: 0,
  //         grand_total: grandTotal,
  //         due_amount: grandTotal - formValue?.paid_amount,
  //       }));
  //     } else if (fieldValue < 1) {
  //       // handleErrorModalWithCross("Percent gether than or equal 1");
  //       const grandTotal =
  //         formValue?.total_amount + formValue?.vat + formValue?.service_charge;
  //       setFormValue((prev) => ({
  //         ...prev,
  //         discount: 0,
  //         discount_percent: 0,
  //         grand_total: grandTotal,
  //         due_amount: grandTotal - formValue?.paid_amount,
  //       }));
  //     } else {
  //       const mainPrice = parseInt(formValue?.total_amount);
  //       const discountPercentage = parseInt(fieldValue);
  //       const discountAmount = Math.ceil(
  //         (mainPrice * discountPercentage) / 100
  //       );
  //       const grandTotal =
  //         formValue?.total_amount +
  //         formValue?.vat +
  //         formValue?.service_charge -
  //         discountAmount;
  //       setFormValue((prev) => ({
  //         ...prev,
  //         discount: discountAmount,
  //         discount_percent: parseInt(fieldValue),
  //         grand_total: grandTotal,
  //         due_amount: grandTotal - formValue?.paid_amount,
  //       }));
  //     }
  //   } else if (fieldName === "discount") {
  //     if (parseInt(fieldValue) > parseInt(formValue?.total_amount)) {
  //       handleErrorModalWithCross("Discount less than or equal to main price");

  //       const grandTotal =
  //         formValue?.total_amount + formValue?.vat + formValue?.service_charge;
  //       setFormValue((prev) => ({
  //         ...prev,
  //         discount: 0,
  //         discount_percent: 0,
  //         grand_total: grandTotal,
  //         due_amount: grandTotal - formValue?.paid_amount,
  //       }));
  //     } else if (fieldValue < 1) {
  //       // handleErrorModalWithCross("Discount gether than or equal 1");
  //       const grandTotal =
  //         formValue?.total_amount + formValue?.vat + formValue?.service_charge;
  //       setFormValue((prev) => ({
  //         ...prev,
  //         discount: 0,
  //         discount_percent: 0,
  //         grand_total: grandTotal,
  //         due_amount: grandTotal - formValue?.paid_amount,
  //       }));
  //     } else {
  //       const mainPrice = parseInt(formValue?.total_amount);
  //       const discountPrice = parseInt(fieldValue);
  //       const percentage = Math.ceil((discountPrice * 100) / mainPrice);

  //       const grandTotal =
  //         formValue?.total_amount +
  //         formValue?.vat +
  //         formValue?.service_charge -
  //         discountPrice;
  //       setFormValue((prev) => ({
  //         ...prev,
  //         discount: parseInt(fieldValue),
  //         discount_percent: percentage,
  //         grand_total: grandTotal,
  //         due_amount: grandTotal - formValue?.paid_amount,
  //       }));
  //     }
  //   } else {
  //     setFormValue(newFormValue);
  //   }
  // };

  useEffect(() => {
    if (initialInvoicePrefix !== undefined) {
      setFormValue((prev) => ({
        ...prev,
        invoicePrefix: initialInvoicePrefix || "",
      }));
    }
  }, [initialInvoicePrefix]);

  const { handleOnChange } = useSalePurchaseOnChange(formValue, setFormValue);
  useEffect(() => {
    if (responseError !== undefined) {
      handleResponseErrorMessage(responseError, setError);
    } else if (isSuccess) {
      setError("");
      handleSuccessToast(responseData?.message?.message);
      // const newRoute = `/purchase/invoice/${responseData?.data?.purchase?.id}`;
      // window.open(newRoute, "_blank");
      createAnchorTagWithNewWindow(
        `/purchase/invoice/${responseData?.data?.purchase?.id}`
      );
      navigate("/purchase");
    }
  }, [responseError, isSuccess, responseData]);

  const handleSubmit = (formValue) => {
    if (formValue?.party_id === "") {
      setError("Party field is required");
    } else if (formValue?.invoicePrefix == "") {
      setError("Invoice field is required");
    } else if (formValue?.items?.length === 0) {
      setError("Minimum one product purchase is required");
    } else if (formValue?.items?.some((item) => item.quantity === 0)) {
      setError("The product quantity must be greater than 0 is required");
    } else if (formValue?.items?.some((item) => item.purchase_price <= 0)) {
      setError("Purchase Price must be greater than 0 is required");
    } else if (
      Number(formValue?.paid_amount) > Number(formValue?.grand_total)
    ) {
      setError("Must be paid amount is less than or equal to grand total");
    } else if (
      formValue?.paid_amount > 0 &&
      formValue?.payment_type_id === ""
    ) {
      setError("Payment Type field is required");
    } else if (
      formValue?.paid_amount <= 0 &&
      formValue?.payment_type_id === "1"
    ) {
      setError("Paying amount field is required");
    } else if (
      formValue?.paid_amount > 0 &&
      formValue?.payment_type_id == "6"
    ) {
      setError("Change payment type if paid amount is greater than 0");
    } else {
      let { warehouse, party_amount, invoicePrefix, ...newFormValue } = {
        ...formValue,
        items: formValue?.items?.map(
          ({
            name,
            stock_code,
            exist_serial_no,
            exist_free_serial_no,
            product_type,
            unit_name,
            warehouse_name,
            warehouse_open,
            exist_variation,
            ...rest
          }) => rest
        ),
      };

      addPurchase({
        ...newFormValue,
        prefix:
          formValue?.invoicePrefix === initialInvoicePrefix
            ? invoicePrefixData?.data?.["purchase-prefix"]
            : "",
        invoice:
          formValue?.invoicePrefix === initialInvoicePrefix
            ? invoicePrefixData?.data?.["purchase-invoice"]
            : formValue?.invoicePrefix,
        user_id: loginUser?.id || "",
        payment_type_id:
          newFormValue?.payment_type_id === ""
            ? "6"
            : newFormValue?.payment_type_id,
        purchase_date:
          new Date(newFormValue?.purchase_date).toLocaleDateString("en-GB") +
          " " +
          getCurrentTime(),
        due_date:
          newFormValue?.due_date === ""
            ? ""
            : new Date(newFormValue?.due_date).toLocaleDateString("en-GB"),
      });
    }
  };

  return (
    <div className="acnoo-dashboard-main-section">
      {invoicePrefixLoading && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper custom-details-wrapper">
          <div className="details-header">
            <div className="title">
              <h4>Create Purchase</h4>
            </div>
            <hr />
          </div>
          <div>
            <div className="row custom-form-control">
              <div className="col-sm-6 col-xl-4 mb-3">
                <PartyWithSupplier setFormValue={setFormValue} />
              </div>
              <div className="col-sm-6 col-xl-4 mb-3">
                <div className="custom-focus-label">
                  <input
                    type="date"
                    required
                    name="purchase_date"
                    className="form-control"
                    value={formValue?.purchase_date}
                    onChange={handleOnChange}
                  />
                  <label>Date</label>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4 mb-3">
                <div className="custom-focus-label">
                  <input
                    type="text"
                    required
                    name="invoicePrefix"
                    className="form-control"
                    placeholder="Enter Invoice"
                    value={formValue?.invoicePrefix}
                    onChange={handleOnChange}
                  />
                  <label>Invoice</label>
                </div>
              </div>
              <div className="col-sm-12 col-xl-8 mb-3">
                <SearchingProducts
                  formValue={formValue}
                  setFormValue={setFormValue}
                />
              </div>
              <div className="col-sm-12 col-xl-4 mb-3">
                <WarehouseField
                  warehouseId={formValue?.warehouse?.id}
                  setFormValue={setFormValue}
                />
              </div>
            </div>
            <InventoryProductsList
              formValue={formValue}
              setFormValue={setFormValue}
            />
            <div className="row custom-form-control border-top mt-3 pt-3">
              <div className="col-xl-6">
                <div className="row">
                  <div className="col-sm-6 mb-3">
                    <div className="custom-focus-label">
                      <input
                        type="number"
                        name="paid_amount"
                        className="form-control"
                        placeholder="Enter received amount"
                        value={
                          formValue?.paid_amount <= 0
                            ? ""
                            : formValue.paid_amount
                        }
                        onChange={handleOnChange}
                      />
                      <label>Paying Amount</label>
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <div className="custom-focus-label">
                      <input
                        type="text"
                        name="due_amount"
                        className="form-control"
                        placeholder="0"
                        readOnly
                        value={getNumberWithCommas(
                          twoDigitFixed(formValue.due_amount || 0)
                        )}
                        onChange={handleOnChange}
                      />
                      <label>Due Amount</label>
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3 mb-xl-0">
                    <div className="custom-focus-label">
                      <label>Payment Type</label>
                      <PaymentMethodDropdown
                        value={formValue?.payment_type_id}
                        handleOnChange={handleOnChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <div className="custom-focus-label">
                      <input
                        type="date"
                        name="due_date"
                        className="form-control"
                        value={formValue?.due_date}
                        onChange={handleOnChange}
                      />
                      <label>Due Date</label>
                    </div>
                  </div>

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
                        cols="50"
                      ></textarea>
                      <label>Note</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <TotalAmount
                  formValue={formValue}
                  handleOnChange={handleOnChange}
                />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <div className="button-group mt-3">
                <button
                  onClick={() => navigate("/purchase")}
                  className="btn cancel-btn"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn save-btn"
                  disabled={isLoading}
                  onClick={(e) => handleSubmit(formValue)}
                >
                  {isLoading ? <SpinnerBorderSm /> : "Save"}
                </button>
              </div>
            </div>
            {error !== "" && <Error message={error} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCreate;
