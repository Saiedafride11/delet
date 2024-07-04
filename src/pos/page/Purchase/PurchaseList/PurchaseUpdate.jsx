import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PaymentMethodDropdown from "../../../components/dropdown/PaymentMethodDropdown";
import { customISODate } from "../../../components/function/customISODate";
import { handleResponseErrorMessage } from "../../../components/function/handleResponseErrorMessage";
import Error from "../../../components/ui/Error/Error";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import SpinnerBorderSm from "../../../components/ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../components/ui/Toast/handleSuccessToast";

import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import useSalePurchaseOnChange from "../../../hooks/useSalePurchaseOnChange";
import {
  useEditPurchaseMutation,
  useGetPurchaseQuery,
} from "../../../redux/features/purchase/purchase/purchaseApi";
import InventoryProductsList from "./Fields/InventoryProductsList";
import PartyWithSupplier from "./Fields/PartyWithSupplier";
import SearchingProducts from "./Fields/SearchingProducts";
import TotalAmount from "./Fields/TotalAmount";
import WarehouseField from "./Fields/WarehouseField";

const PurchaseUpdate = () => {
  document.title = "Edit Purchase";

  const { purchaseId } = useParams();
  const { data: purchaseData, isLoading: purchaseIsLoading } =
    useGetPurchaseQuery(purchaseId);
  const initialPurchase = purchaseData?.data?.purchase;
  // console.log("purchaseData", initialPurchase);

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
  const navigate = useNavigate();

  const [
    editPurchase,
    { data: responseData, isSuccess, isLoading, error: responseError },
  ] = useEditPurchaseMutation();

  useEffect(() => {
    if (!purchaseIsLoading && initialPurchase !== undefined) {
      setFormValue((prevValue) => ({
        ...prevValue,
        ...Object.fromEntries(
          Object.entries(initialPurchase)?.filter(
            ([key, value]) =>
              value !== null &&
              key !== "purchase_details" &&
              key !== "payment_type" &&
              key !== "user"
          )
        ),
        invoicePrefix: initialPurchase?.prefix + initialPurchase?.invoice,
        party_amount: initialPurchase?.party?.balance || 0,
        due_date: (initialPurchase?.due_date || "").split(" ")[0],
        purchase_date: (initialPurchase?.purchase_date || "").split(" ")[0],
        items: (initialPurchase?.purchase_details || []).map((data) => {
          // const matchedStock = data?.product_stocks?.find(
          //   (stock) => stock?.stock_code === data?.stock_code
          // );

          return {
            product_id: data?.product_stock?.product?.id,
            stock_code: data?.stock_code,
            name: data?.product_stock?.product?.name,
            purchase_price: data?.purchase_price,
            sale_price: data?.sale_price,
            wholesale_price: data?.wholesale_price,
            dealer_price: data?.dealer_price,
            exist_serial_no: data?.product_stock?.serial_no,
            serial_no: data?.serial_no,
            exist_free_serial_no: data?.product_stock?.free_serial_no,
            free_serial_no: data?.free_serial_no,
            quantity: data?.quantity,
            free_quantity: data?.free_quantity,
            unit_name: data?.product_stock?.product?.unit?.name,
            discount:
              data?.discount_type === "Fixed"
                ? data?.discount
                : data?.discount_percent,
            discount_type: data?.discount_type || "Fixed",
            warehouse_id: data?.warehouse?.id || "",
            warehouse_name: data?.warehouse?.name || "",

            variation: data?.variation,
            exist_variation:
              data?.variation?.length === 0
                ? {}
                : {
                    color: data?.product_stock?.color?.name,
                    size: data?.product_stock?.size?.name,
                    capacity: data?.product_stock?.capacity?.name,
                    type: data?.product_stock?.type?.name,
                    weight: data?.product_stock?.weight?.name,
                  },
          };
        }),
      }));
    }
  }, [purchaseIsLoading, initialPurchase]);

  const { handleOnChange } = useSalePurchaseOnChange(formValue, setFormValue);

  useEffect(() => {
    if (responseError !== undefined) {
      handleResponseErrorMessage(responseError, setError);
    } else if (isSuccess) {
      navigate("/purchase");
      setError("");
      handleSuccessToast(responseData?.message?.message);
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
      const {
        prefix,
        warehouse,
        party_amount,
        party,
        invoicePrefix,
        ...newFormValue
      } = {
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

      let update_purchase_date;
      if (newFormValue?.purchase_date) {
        update_purchase_date =
          new Date(newFormValue.purchase_date).toLocaleDateString("en-GB") +
          " " +
          (initialPurchase?.purchase_date || "").split(" ")[1];
      }

      editPurchase({
        id: purchaseId,
        data: {
          ...newFormValue,
          prefix:
            formValue?.invoicePrefix ===
            initialPurchase?.prefix + initialPurchase?.invoice
              ? initialPurchase?.prefix
              : "",
          invoice:
            formValue?.invoicePrefix ===
            initialPurchase?.prefix + initialPurchase?.invoice
              ? initialPurchase?.invoice
              : formValue?.invoicePrefix,

          user_id: loginUser?.id || "",
          payment_type_id:
            newFormValue?.payment_type_id === ""
              ? "6"
              : newFormValue?.payment_type_id,
          purchase_date: update_purchase_date,
          due_date:
            newFormValue?.due_date === ""
              ? ""
              : new Date(newFormValue?.due_date).toLocaleDateString("en-GB"),
        },
      });
    }
  };

  // console.log("initialPurchase: ---", initialPurchase);
  // console.log("formValue: ---", formValue);

  // console.log("loginUser: ---", loginUser);
  return (
    <div className="acnoo-dashboard-main-section">
      {purchaseIsLoading && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper custom-details-wrapper">
          <div className="details-header">
            <div className="title">
              <h4>Update Purchase</h4>
            </div>
            <hr />
          </div>
          <div>
            <div className="row custom-form-control">
              <div className="col-sm-6 col-xl-4 mb-3">
                <PartyWithSupplier
                  partyInfo={formValue?.party}
                  setFormValue={setFormValue}
                />
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

export default PurchaseUpdate;
