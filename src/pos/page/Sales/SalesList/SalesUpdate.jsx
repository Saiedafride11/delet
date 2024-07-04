import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { customISODate } from "../../../components/function/customISODate";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { handleResponseErrorMessage } from "../../../components/function/handleResponseErrorMessage";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import Error from "../../../components/ui/Error/Error";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import SpinnerBorderSm from "../../../components/ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../components/ui/Toast/handleSuccessToast";
import useSalePurchaseOnChange from "../../../hooks/useSalePurchaseOnChange";
import {
  useEditSaleMutation,
  useGetSaleQuery,
} from "../../../redux/features/sales/sales/salesApi";
import InventoryProductsList from "./Fields/InventoryProductsList";
import PartyWithoutSupplier from "./Fields/PartyWithoutSupplier";
import SalesPaymentMethod from "./Fields/SalesPaymentMethod";
import SearchingProducts from "./Fields/SearchingProducts";
import TotalAmount from "./Fields/TotalAmount";
import WarehouseField from "./Fields/WarehouseField";

const SalesUpdate = () => {
  document.title = "Edit Sales";

  const { salesId } = useParams();
  const { data: saleData, isLoading: saleIsLoading } = useGetSaleQuery(salesId);
  const initialSale = saleData?.data?.sale;
  // console.log("saleData", initialSale);

  const loginUser = useSelector((state) => state?.admin?.adminProfile);
  const [formValue, setFormValue] = useState({
    credit_cash: "Credit",
    party_id: "",
    name: "",
    phone: "",
    party_amount: 0,
    party_type: "",
    sale_date: customISODate(),
    invoice: "",
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

  const [
    editSale,
    { data: responseData, isSuccess, isLoading, error: responseError },
  ] = useEditSaleMutation();

  useEffect(() => {
    if (!saleIsLoading && initialSale !== undefined) {
      setFormValue((prevValue) => ({
        ...prevValue,
        ...Object.fromEntries(
          Object.entries(initialSale)?.filter(
            ([key, value]) =>
              value !== null && key !== "sale_details" && key !== "payment_type"
          )
        ),

        name:
          initialSale?.credit_cash === "Cash"
            ? initialSale?.party?.name
            : "" || "",
        phone:
          initialSale?.credit_cash === "Cash"
            ? initialSale?.party?.phone
            : "" || "",
        party_type: initialSale?.party?.party_type,
        party_amount: initialSale?.party?.balance || 0,
        due_installment_date: (initialSale?.due_installment_date || "").split(
          " "
        )[0],
        sale_date: (initialSale?.sale_date || "").split(" ")[0],

        items: (initialSale?.sale_details || []).map((data) => {
          // const matchedStock = data?.product_stocks?.find(
          //   (stock) => stock?.stock_code === data?.stock_code
          // );

          const custom_sale_price =
            initialSale?.party?.party_type == 2
              ? "dealer_price"
              : initialSale?.party?.party_type == 4
              ? "wholesale_price"
              : "sale_price";

          return {
            product_id: data?.product_stock?.product?.id,
            stock_code: data?.product_stock?.stock_code,
            warehouse_id: data?.warehouse_id || "",
            name: data?.product_stock?.product?.name,
            exist_unit_price: data?.product_stock?.unit_price,
            purchase_price: data?.product_stock?.purchase_price,
            sale_price: data?.sale_price,
            old_sale_price: data?.product_stock?.unit_price,
            wholesale_price: data?.product_stock?.wholesale_price,
            dealer_price: data?.product_stock?.dealer_price,
            exist_serial_no:
              data?.product_stock?.serial_no?.length === 0
                ? data?.serial_no
                : data?.product_stock?.serial_no,
            serial_no: data?.serial_no,
            exist_free_serial_no:
              data?.product_stock?.free_serial_no?.length === 0
                ? data?.free_serial_no?.concat(data?.sale_free_serial_no)
                : data?.product_stock?.free_serial_no,
            free_serial_no: data?.free_serial_no,
            sale_free_serial_no: data?.sale_free_serial_no,
            exist_quantity: data?.quantity + data?.product_stock?.quantity,
            quantity: data?.quantity + data?.sale_free_quantity,
            exist_free_quantity:
              data?.free_quantity +
              data?.sale_free_quantity +
              +data?.product_stock?.free_quantity,
            free_quantity: data?.free_quantity,
            sale_free_quantity: data?.sale_free_quantity,
            exist_total_quantity:
              data?.quantity +
              data?.free_quantity +
              data?.sale_free_quantity +
              +data?.product_stock?.free_quantity,
            unit_name: data?.product_stock?.product?.unit?.name || "",
            discount:
              initialSale?.party?.party_type != 3
                ? data?.discount_type === "Fixed"
                  ? data?.product_stock[custom_sale_price] - data?.sale_price
                  : twoDigitFixed(
                      100 -
                        (data?.sale_price /
                          data?.product_stock[custom_sale_price]) *
                          100
                    )
                : data?.discount,
            discount_type: data?.discount_type || "Fixed",
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
  }, [saleIsLoading, initialSale]);

  const { handleOnChange } = useSalePurchaseOnChange(formValue, setFormValue);

  useEffect(() => {
    if (responseError !== undefined) {
      handleResponseErrorMessage(responseError, setError);
    } else if (isSuccess) {
      navigate("/sales");
      setError("");
      handleSuccessToast(responseData?.message?.message);
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
        const {
          name,
          phone,
          party,
          party_amount,
          party_type,
          invoice,
          prefix,
          user,
          ...restData
        } = formValue;
        restFormValue = restData;
      } else {
        const {
          party_id,
          party,
          party_amount,
          party_type,
          invoice,
          prefix,
          user,
          ...restData
        } = formValue;
        restFormValue = restData;
      }

      let newFormValue = {
        ...restFormValue,
        items: restFormValue?.items?.map(
          ({
            old_sale_price,
            exist_unit_price,
            name,
            wholesale_price,
            dealer_price,
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

      let update_sale_date;
      if (newFormValue?.sale_date) {
        update_sale_date =
          new Date(newFormValue.sale_date).toLocaleDateString("en-GB") +
          " " +
          (initialSale?.sale_date || "").split(" ")[1];
      }

      editSale({
        id: salesId,
        data: {
          ...newFormValue,
          user_id: loginUser?.id,
          payment_type_id:
            newFormValue?.payment_type_id === ""
              ? "6"
              : newFormValue?.payment_type_id,
          sale_date: update_sale_date,
          due_installment_date:
            newFormValue?.due_installment_date === ""
              ? null
              : new Date(newFormValue?.due_installment_date).toLocaleDateString(
                  "en-GB"
                ),
        },
      });
    }
  };

  // console.log("newData: ---", saleData);
  // console.log("formValue: ---", formValue);

  // console.log("loginUser: ---", loginUser);
  return (
    <div className="acnoo-dashboard-main-section">
      {saleIsLoading && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper custom-details-wrapper">
          <div className="details-header">
            <div className="title d-flex justify-content-unset gap-3">
              <h4>Update Sale</h4>
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
                      value={formValue?.prefix + "-" + formValue?.invoice}
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
                      value={initialSale?.user?.name || ""}
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
                      value={formValue?.prefix + "-" + formValue?.invoice}
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
                      value={initialSale?.user?.name || ""}
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

export default SalesUpdate;
