import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { customISODate } from "../../../components/function/customISODate";
import { getCurrentTime } from "../../../components/function/getCurrentDateAndTime";
import { handleResponseErrorMessage } from "../../../components/function/handleResponseErrorMessage";
import Error from "../../../components/ui/Error/Error";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import SpinnerBorderSm from "../../../components/ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../components/ui/Toast/handleSuccessToast";
import {
  useEditSaleReturnMutation,
  useGetSaleReturnQuery,
} from "../../../redux/features/sales/return/salesReturnApi";
import InventoryProductsList from "./Fields/InventoryProductsList";
import PartyWithoutSupplier from "./Fields/PartyWithoutSupplier";
import TotalAmount from "./Fields/TotalAmount";

const SalesReturnUpdate = () => {
  document.title = "Edit Sales Return";

  const { saleReturnId } = useParams();
  const { data: saleReturnData, isLoading: saleIsReturnIsLoading } =
    useGetSaleReturnQuery(saleReturnId);
  const initialSaleReturn = saleReturnData?.data?.["sale_return"];

  const loginUser = useSelector((state) => state?.admin?.adminProfile);
  const [formValue, setFormValue] = useState({
    party_id: "",
    return_date: customISODate(),
    paid_amount: 0,
    due_amount: 0,
    payment_by: "cash",
    payment_type_id: "",
    note: "",
    total_amount: 0,
    grand_total: 0,
    discount: 0,
    items: [],
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [
    editSaleReturn,
    { data: responseData, isSuccess, isLoading, error: responseError },
  ] = useEditSaleReturnMutation();

  useEffect(() => {
    if (!saleIsReturnIsLoading && initialSaleReturn !== undefined) {
      setFormValue((prevValue) => ({
        ...prevValue,
        sale_id: initialSaleReturn?.sale_id || "",
        party: initialSaleReturn?.party || {},
        party_id: initialSaleReturn?.party?.id || "",
        payment_type_id: initialSaleReturn?.sale?.payment_type_id || "",
        payment_by: initialSaleReturn?.payment_by || "",
        note: initialSaleReturn?.note || "",
        // paid_amount: initialSaleReturn?.sale?.paid_amount || 0,
        // due_amount: initialSaleReturn?.sale?.due_amount || 0,
        // total_amount: initialSaleReturn?.total_amount || 0,
        // grand_total: initialSaleReturn?.sale?.grand_total || 0,

        paid_amount: initialSaleReturn?.paid_amount || 0,
        total_amount: initialSaleReturn?.total_amount || 0,
        grand_total: initialSaleReturn?.grand_total || 0,
        invoice_amount: {
          paidAmount: initialSaleReturn?.total_amount || 0,
          dueAmount: initialSaleReturn?.sale?.due_amount || 0,
          grandTotal: initialSaleReturn?.sale?.grand_total || 0,
        },
        // return_date: (initialSaleReturn?.sale_date || "").split(" ")[0],
        items: (initialSaleReturn?.sale_return_details || []).map((data) => {
          const matchedData = initialSaleReturn?.sale?.sale_details?.find(
            (stock) => stock?.stock_code === data?.stock_code
          );

          // console.log("matchedData", matchedData);
          return {
            product_id: data?.product_id,
            stock_code: data?.stock_code,
            warehouse_id: data?.warehouse_id || "",
            name: matchedData?.product_stock?.product?.name,
            purchase_price: data?.purchase_price,
            sale_price: data?.sale_price,
            exist_serial_no: matchedData?.serial_no,
            serial_no: data?.serial_no,
            exist_free_serial_no: matchedData?.sale_free_serial_no,
            free_serial_no: data?.free_serial_no,
            sale_free_serial_no: data?.sale_free_serial_no,
            quantity: data?.quantity + data?.sale_free_quantity,
            free_quantity: matchedData?.free_quantity + data?.free_quantity,
            sale_free_quantity:
              matchedData?.sale_free_quantity + data?.sale_free_quantity,
            sold_quantity:
              matchedData?.quantity +
              matchedData?.sale_free_quantity +
              data?.quantity +
              data?.sale_free_quantity,
            variation: data?.variation,
            exist_variation:
              data?.variation?.length === 0
                ? {}
                : {
                    color: matchedData?.product_stock?.color?.name,
                    size: matchedData?.product_stock?.size?.name,
                    capacity: matchedData?.product_stock?.capacity?.name,
                    type: matchedData?.product_stock?.type?.name,
                    weight: matchedData?.product_stock?.weight?.name,
                  },
          };
        }),
      }));
    }
  }, [saleIsReturnIsLoading, initialSaleReturn]);

  const handleOnChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const newFormValue = { ...formValue };
    newFormValue[fieldName] = fieldValue;
    setFormValue(newFormValue);
  };

  useEffect(() => {
    if (responseError !== undefined) {
      handleResponseErrorMessage(responseError, setError);
    } else if (isSuccess) {
      navigate("/sales/return");
      setError("");
      handleSuccessToast(responseData?.message?.message);
    }
  }, [responseError, isSuccess, responseData]);

  const handleSubmit = (formValue) => {
    if (
      formValue?.items?.every((item) => item.quantity === 0) &&
      formValue?.items?.every((item) => item.sale_free_quantity === 0)
    ) {
      setError("Any product quantity must be greater than 0 is required");
    } else {
      const { party, due_amount, invoice_amount, ...restFormValue } = formValue;
      let newFormValue = {
        ...restFormValue,
        items: restFormValue?.items?.map(
          ({
            name,
            exist_quantity,
            exist_serial_no,
            exist_free_serial_no,
            exist_variation,
            quantity,
            sale_free_quantity,
            sold_quantity,
            ...rest
          }) => ({
            ...rest,
            total_price: rest.sale_price * quantity,
            quantity: quantity,
            sale_free_quantity:
              exist_serial_no?.length > 0 || exist_free_serial_no?.length > 0
                ? sale_free_quantity
                : 0,
            free_quantity: sold_quantity <= quantity ? rest?.free_quantity : 0,
            free_serial_no:
              sold_quantity <= quantity ? rest?.free_serial_no : [],
          })
        ),
      };

      let update_return_date;
      if (newFormValue?.return_date) {
        update_return_date =
          new Date(newFormValue.return_date).toLocaleDateString("en-GB") +
          " " +
          getCurrentTime();
      }

      editSaleReturn({
        id: saleReturnId,
        data: {
          ...newFormValue,
          user_id: loginUser?.id,
          // sale_id: salesId,
          return_date: update_return_date,
        },
      });
    }
  };

  // console.log("initialSaleReturn", initialSaleReturn);
  // console.log("formValue: ---", formValue);

  // console.log("loginUser: ---", loginUser);
  return (
    <div className="acnoo-dashboard-main-section">
      {saleIsReturnIsLoading && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper custom-details-wrapper">
          <div className="details-header">
            <div className="title">
              <h4>Update Sale Return</h4>
            </div>
            <hr />
          </div>
          <div>
            <div className="row custom-form-control">
              <div className="col-sm-6 col-xl-3 mb-3">
                <PartyWithoutSupplier formValue={formValue} />
              </div>
              <div className="col-sm-6 col-xl-3 mb-3">
                <div className="custom-focus-label">
                  <input
                    type="date"
                    required
                    name="return_date"
                    className="form-control"
                    value={formValue?.return_date}
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
                    value={
                      initialSaleReturn?.prefix +
                        "-" +
                        initialSaleReturn?.invoice || ""
                    }
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
                    value={formValue?.sales_id}
                  />
                  <label className="bg-transparent">Sales by</label>
                </div>
              </div>
            </div>
            <InventoryProductsList
              formValue={formValue}
              setFormValue={setFormValue}
            />
            <div className="row custom-form-control border-top mt-3 pt-3">
              <div className="col-xl-6">
                <div className="mb-3">
                  <div className="custom-focus-label">
                    <label>Payment Type</label>
                    <div className="input-wrapper pos-up-down-arrow">
                      <select
                        name="payment_by"
                        value={formValue?.payment_by}
                        onChange={handleOnChange}
                        className="form-control m-0"
                      >
                        <option className="d-none text-gray-sm">
                          Choose one
                        </option>
                        <option value="cash">Cash</option>
                        <option value="due-cash">Due Cash</option>
                        <option value="wallet">Wallet</option>
                        <option value="due-wallet">Due Wallet</option>
                      </select>
                      <span></span>
                    </div>
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
                      rows="8"
                      cols="50"
                    ></textarea>
                    <label>Return Reason</label>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <TotalAmount formValue={formValue} />
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

export default SalesReturnUpdate;
