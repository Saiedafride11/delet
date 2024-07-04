import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAnchorTagWithNewWindow } from "../../../components/function/CreateAnchorTagWithNewWindow";
import { customISODate } from "../../../components/function/customISODate";
import { getCurrentTime } from "../../../components/function/getCurrentDateAndTime";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { handleResponseErrorMessage } from "../../../components/function/handleResponseErrorMessage";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import Error from "../../../components/ui/Error/Error";
import SpinnerBorderSm from "../../../components/ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../components/ui/Toast/handleSuccessToast";
import useSalePurchaseOnChange from "../../../hooks/useSalePurchaseOnChange";
import { useGetPrefixInvoiceQuery } from "../../../redux/features/global/invoice_prefix/invoicePrefixApi";
import { useAddSaleMutation } from "../../../redux/features/sales/sales/salesApi";
import InventoryProductsList from "./Fields/InventoryProductsList";
import PartyWithoutSupplier from "./Fields/PartyWithoutSupplier";
import SalesPaymentMethod from "./Fields/SalesPaymentMethod";
import SearchingProducts from "./Fields/SearchingProducts";
import TotalAmount from "./Fields/TotalAmount";
import WarehouseField from "./Fields/WarehouseField";

const SalesCreate = () => {
  document.title = "Add Sales";
  const loginUser = useSelector((state) => state?.admin?.adminProfile);
  const [formValue, setFormValue] = useState({
    credit_cash: "Credit",
    party_id: "",
    name: "",
    phone: "",
    party_amount: 0,
    party_type: "",
    sale_date: customISODate(),
    warehouse_id: "",
    paid_amount: 0,
    due_amount: 0,
    due_installment_date: "",
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
  const navigate = useNavigate();

  // sale invoice prefix
  const { data: invoicePrefixData, isLoading: invoicePrefixLoading } =
    useGetPrefixInvoiceQuery();

  const [
    addSale,
    { data: responseData, isSuccess, isLoading, error: responseError },
  ] = useAddSaleMutation();

  const { handleOnChange } = useSalePurchaseOnChange(formValue, setFormValue);

  useEffect(() => {
    if (responseError !== undefined) {
      handleResponseErrorMessage(responseError, setError);
    } else if (isSuccess) {
      setError("");
      handleSuccessToast(responseData?.message?.message);
      // const newRoute = `/sales/invoice/${responseData?.data?.sale?.id}`;
      // window.open(newRoute, "_blank");
      createAnchorTagWithNewWindow(
        `/sales/invoice/${responseData?.data?.sale?.id}`
      );
      navigate("/sales");
    }
  }, [responseError, isSuccess, responseData]);

  const handleSubmit = (formValue) => {
    if (formValue?.credit_cash === "Credit" && formValue?.party_id === "") {
      setError("Party field is required");
    } else if (formValue?.name !== "" && formValue?.phone === "") {
      setError("Phone number is required");
    } else if (formValue?.items?.length === 0) {
      setError("Minimum one product sale is required");
    } else if (formValue?.items?.some((item) => item.quantity === 0)) {
      setError("The product quantity must be greater than 0 is required");
    } else if (formValue?.items?.some((item) => item.sale_price <= 0)) {
      setError("Sale Price must be greater than 0 is required");
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
      let restFormValue;
      if (formValue?.credit_cash === "Credit") {
        const { name, phone, party_amount, party_type, ...restData } =
          formValue;
        restFormValue = restData;
      } else {
        const { party_id, party_amount, party_type, ...restData } = formValue;
        restFormValue = restData;
      }

      let newFormValue = {
        ...restFormValue,
        items: restFormValue?.items?.map(
          ({
            old_sale_price,
            exist_unit_price,
            name,
            unit_name,
            exist_quantity,
            exist_free_quantity,
            exist_serial_no,
            exist_free_serial_no,
            exist_total_quantity,
            exist_variation,
            quantity,
            sale_free_quantity,
            discount,
            ...rest
          }) => ({
            ...rest,
            total_price: rest.sale_price * quantity,
            quantity:
              exist_serial_no?.length > 0 || exist_free_serial_no?.length > 0
                ? quantity - rest?.sale_free_serial_no?.length
                : quantity > exist_quantity
                ? exist_quantity
                : quantity,
            sale_free_quantity:
              exist_serial_no?.length > 0 || exist_free_serial_no?.length > 0
                ? sale_free_quantity
                : quantity > exist_quantity
                ? quantity - exist_quantity
                : 0,
            discount: formValue?.party_type == 3 ? discount : 0,
          })
        ),
      };

      addSale({
        ...newFormValue,
        user_id: loginUser?.id,
        payment_type_id:
          newFormValue?.payment_type_id === ""
            ? "6"
            : newFormValue?.payment_type_id,
        sale_date:
          new Date(newFormValue?.sale_date).toLocaleDateString("en-GB") +
          " " +
          getCurrentTime(),
        due_installment_date:
          newFormValue?.due_installment_date === ""
            ? null
            : new Date(newFormValue?.due_installment_date).toLocaleDateString(
                "en-GB"
              ),
      });
    }
  };

  // console.log("formValue: ---", formValue);

  // console.log("loginUser: ---", loginUser);

  return (
    <div className="acnoo-dashboard-main-section">
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper custom-details-wrapper">
          <div className="details-header">
            <div className="title d-flex justify-content-unset gap-3">
              <h4>Create Sale</h4>
              <div className="sale-cash-credit-tabs">
                <div
                  className={
                    formValue?.credit_cash === "Credit" ? "active" : ""
                  }
                  onClick={() =>
                    setFormValue((prev) => ({ ...prev, credit_cash: "Credit" }))
                  }
                >
                  Create
                </div>
                <div
                  className={formValue?.credit_cash === "Cash" ? "active" : ""}
                  onClick={() =>
                    setFormValue((prev) => ({ ...prev, credit_cash: "Cash" }))
                  }
                >
                  Cash
                </div>
              </div>
            </div>
            <hr />
          </div>
          <div>
            {formValue?.credit_cash === "Credit" ? (
              <div className="row custom-form-control">
                <div className="col-sm-6 col-xl-3 mb-3">
                  <PartyWithoutSupplier
                    formValue={formValue}
                    setFormValue={setFormValue}
                  />
                </div>
                <div className="col-sm-6 col-xl-3 mb-3">
                  <div className="custom-focus-label">
                    <input
                      type="date"
                      required
                      name="sale_date"
                      className="form-control"
                      value={formValue?.sale_date}
                      onChange={handleOnChange}
                    />
                    <label>Date</label>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3 mb-3">
                  <div className="custom-focus-label">
                    <input
                      type="text"
                      readOnly
                      className="form-control"
                      placeholder="Enter Invoice"
                      value={invoicePrefixData?.data?.["sale-invoice"] || ""}
                    />
                    <label>Invoice</label>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3 mb-3">
                  <div className="custom-focus-label">
                    <input
                      type="text"
                      disabled
                      className="form-control"
                      placeholder="Enter sales by"
                      value={loginUser?.name || ""}
                    />
                    <label className="bg-transparent">Sales by</label>
                  </div>
                </div>
                <div className="col-sm-12 col-xl-9 mb-3">
                  <SearchingProducts
                    formValue={formValue}
                    setFormValue={setFormValue}
                  />
                </div>
                <div className="col-sm-12 col-xl-3 mb-3">
                  <WarehouseField
                    initialKey="warehouse_id"
                    formValue={formValue}
                    setFormValue={setFormValue}
                  />
                </div>
              </div>
            ) : (
              <div className="row custom-form-control">
                <div className="col-sm-6 col-xl-3 mb-3">
                  <div className="custom-focus-label">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter buyer name"
                      value={formValue?.name}
                      onChange={handleOnChange}
                    />
                    <label>Buyer Name</label>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3 mb-3">
                  <div className="custom-focus-label">
                    <input
                      type="number"
                      name="phone"
                      className="form-control"
                      placeholder="Enter Buyer Phone Number"
                      value={formValue?.phone}
                      onChange={handleOnChange}
                    />
                    <label>Buyer Phone Number</label>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3 mb-3">
                  <div className="custom-focus-label">
                    <input
                      type="date"
                      required
                      name="sale_date"
                      className="form-control"
                      value={formValue?.sale_date}
                      onChange={handleOnChange}
                    />
                    <label>Date</label>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3 mb-3">
                  <div className="custom-focus-label">
                    <input
                      type="text"
                      readOnly
                      className="form-control"
                      placeholder="Enter Invoice"
                      value={invoicePrefixData?.data?.["sale-invoice"] || ""}
                    />
                    <label>Invoice</label>
                  </div>
                </div>

                <div className="col-sm-12 col-xl-6 mb-3">
                  <SearchingProducts
                    formValue={formValue}
                    setFormValue={setFormValue}
                  />
                </div>
                <div className="col-sm-12 col-xl-3 mb-3">
                  <WarehouseField
                    initialKey="warehouse_id"
                    formValue={formValue}
                    setFormValue={setFormValue}
                  />
                </div>
                <div className="col-sm-6 col-xl-3 mb-3">
                  <div className="custom-focus-label">
                    <input
                      type="text"
                      disabled
                      className="form-control"
                      placeholder="Enter sales by"
                      value={loginUser?.name || ""}
                    />
                    <label className="bg-transparent">Sales by</label>
                  </div>
                </div>
              </div>
            )}
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
                      <SalesPaymentMethod
                        formValue={formValue}
                        handleOnChange={handleOnChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <div className="custom-focus-label">
                      <input
                        type="date"
                        name="due_installment_date"
                        className="form-control"
                        value={formValue?.due_installment_date}
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
                  onClick={() => navigate("/sales")}
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

export default SalesCreate;
