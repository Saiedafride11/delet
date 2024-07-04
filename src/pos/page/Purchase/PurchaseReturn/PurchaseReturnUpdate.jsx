import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { customISODate } from "../../../components/function/customISODate";
import { handleResponseErrorMessage } from "../../../components/function/handleResponseErrorMessage";
import Error from "../../../components/ui/Error/Error";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import SpinnerBorderSm from "../../../components/ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../components/ui/Toast/handleSuccessToast";

import { getCurrentTime } from "../../../components/function/getCurrentDateAndTime";
import useSalePurchaseOnChange from "../../../hooks/useSalePurchaseOnChange";
import {
  useEditPurchaseReturnMutation,
  useGetPurchaseReturnQuery,
} from "../../../redux/features/purchase/return/purchaseReturnApi";
import InventoryProductsList from "./Fields/InventoryProductsList";
import PartyWithSupplier from "./Fields/PartyWithSupplier";
import TotalAmount from "./Fields/TotalAmount";

const SalesReturnUpdate = () => {
  document.title = "Edit Sales Return";

  const { purchaseReturnId } = useParams();
  const { data: purchaseReturnData, isLoading: purchaseReturnIsLoading } =
    useGetPurchaseReturnQuery(purchaseReturnId);
  const initialPurchaseReturn = purchaseReturnData?.data?.purchase_return;
  // console.log("initialPurchaseReturn", initialPurchaseReturn);

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
    editPurchaseReturn,
    { data: responseData, isSuccess, isLoading, error: responseError },
  ] = useEditPurchaseReturnMutation();

  useEffect(() => {
    if (!purchaseReturnIsLoading && initialPurchaseReturn !== undefined) {
      setFormValue((prevValue) => ({
        ...prevValue,
        purchase_id: initialPurchaseReturn?.purchase_id || "",
        party: initialPurchaseReturn?.party || {},
        party_id: initialPurchaseReturn?.party?.id || "",
        payment_type_id: initialPurchaseReturn?.purchase?.payment_type_id || "",
        payment_by: initialPurchaseReturn?.payment_by || "",
        note: initialPurchaseReturn?.note || "",
        // paid_amount: initialPurchaseReturn?.purchase?.paid_amount || 0,
        // due_amount: initialPurchaseReturn?.purchase?.due_amount || 0,
        // total_amount: initialPurchaseReturn?.total_amount || 0,
        // grand_total: initialPurchaseReturn?.purchase?.grand_total || 0,

        paid_amount: initialPurchaseReturn?.paid_amount || 0,
        total_amount: initialPurchaseReturn?.total_amount || 0,
        grand_total: initialPurchaseReturn?.grand_total || 0,
        invoice_amount: {
          paidAmount: initialPurchaseReturn?.total_amount || 0,
          dueAmount: initialPurchaseReturn?.sale?.due_amount || 0,
          grandTotal: initialPurchaseReturn?.sale?.grand_total || 0,
        },
        items: (initialPurchaseReturn?.purchase_return_details || []).map(
          (data) => {
            const matchedData =
              initialPurchaseReturn?.purchase?.purchase_details?.find(
                (stock) => stock?.stock_code === data?.stock_code
              );

            return {
              product_id: data?.product_id,
              stock_code: data?.stock_code,
              warehouse_id: data?.warehouse_id || "",
              name: matchedData?.product_stock?.product?.name,
              purchase_price: data?.purchase_price,
              sale_price: data?.sale_price,
              exist_serial_no: matchedData?.serial_no,
              serial_no: data?.serial_no,
              free_serial_no: data?.free_serial_no,
              quantity: data?.quantity,
              free_quantity: matchedData?.free_quantity + data?.free_quantity,
              purchased_quantity: matchedData?.quantity + data?.quantity,
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
          }
        ),
      }));
    }
  }, [purchaseReturnIsLoading, initialPurchaseReturn]);

  const { handleOnChange } = useSalePurchaseOnChange(formValue, setFormValue);

  useEffect(() => {
    if (responseError !== undefined) {
      handleResponseErrorMessage(responseError, setError);
    } else if (isSuccess) {
      navigate("/purchase/return");
      setError("");
      handleSuccessToast(responseData?.message?.message);
    }
  }, [responseError, isSuccess, responseData]);

  const handleSubmit = (formValue) => {
    if (formValue?.items?.every((item) => item.quantity === 0)) {
      setError("The product quantity must be greater than 0 is required");
    } else {
      const { party, due_amount, invoice_amount, ...restFormValue } = formValue;
      let newFormValue = {
        ...restFormValue,
        items: restFormValue?.items?.map(
          ({
            name,
            exist_serial_no,
            exist_variation,
            quantity,
            sale_free_quantity,
            purchased_quantity,
            ...rest
          }) => ({
            ...rest,
            total_price: rest.sale_price * quantity,
            quantity: quantity,
            free_quantity:
              purchased_quantity <= quantity ? rest?.free_quantity : 0,
            free_serial_no:
              purchased_quantity <= quantity ? rest?.free_serial_no : [],
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

      editPurchaseReturn({
        id: purchaseReturnId,
        data: {
          ...newFormValue,
          user_id: loginUser?.id || "",
          // purchase_id: purchaseId,
          return_date: update_return_date,
        },
      });
    }
  };

  // console.log("initialPurchaseReturn: ---", initialPurchaseReturn);
  // console.log("formValue: ---", formValue);

  // console.log("loginUser: ---", loginUser);
  return (
    <div className="acnoo-dashboard-main-section">
      {purchaseReturnIsLoading && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper custom-details-wrapper">
          <div className="details-header">
            <div className="title">
              <h4>Update Purchase Return</h4>
            </div>
            <hr />
          </div>
          <div>
            <div className="row custom-form-control">
              <div className="col-sm-6 col-xl-4 mb-3">
                <PartyWithSupplier formValue={formValue} />
              </div>
              <div className="col-sm-6 col-xl-4 mb-3">
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
              <div className="col-sm-6 col-xl-4 mb-3">
                <div className="custom-focus-label">
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    placeholder="Enter Invoice"
                    value={
                      initialPurchaseReturn?.prefix +
                      "-" +
                      initialPurchaseReturn?.invoice
                    }
                  />
                  <label>Invoice</label>
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

export default SalesReturnUpdate;
