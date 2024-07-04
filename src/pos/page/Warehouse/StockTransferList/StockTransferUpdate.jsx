import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customISODate } from "../../../components/function/customISODate";
import { getCurrentTime } from "../../../components/function/getCurrentDateAndTime";
import { handleResponseErrorMessage } from "../../../components/function/handleResponseErrorMessage";
import Error from "../../../components/ui/Error/Error";
import SpinnerBorderSm from "../../../components/ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../components/ui/Toast/handleSuccessToast";
import {
  useEditWarehouseTransferMutation,
  useGetWarehouseTransferQuery,
} from "../../../redux/features/warehouse/warehouseTransferApi";
import InventoryProductsList from "./Fields/InventoryProductsList";
import SearchingProducts from "./Fields/SearchingProducts";
import WarehouseFromToField from "./Fields/WarehouseFromToField";

const StockTransferUpdate = () => {
  document.title = "Stock Transfer Update";

  const { stockTransferId } = useParams();
  const { data: stockTransferData, isLoading: stockTransferIsLoading } =
    useGetWarehouseTransferQuery(stockTransferId);
  const initialStockTransfer = stockTransferData?.data?.["stock-transfer"];

  const [formValue, setFormValue] = useState({
    transfer_date: customISODate(),
    from_warehouse_id: null,
    to_warehouse_id: null,
    quantity: 0,
    free_quantity: 0,
    amount: 0,
    items: [],
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [
    editWarehouseTransfer,
    { data: responseData, isSuccess, isLoading, error: responseError },
  ] = useEditWarehouseTransferMutation();

  useEffect(() => {
    if (!stockTransferIsLoading && initialStockTransfer !== undefined) {
      setFormValue((prev) => ({
        ...prev,
        transfer_date: (initialStockTransfer?.transfer_date || "").split(
          " "
        )[0],
        from_warehouse_id: initialStockTransfer?.from_warehouse_id || "",
        to_warehouse_id: initialStockTransfer?.to_warehouse_id || "",
        items: (initialStockTransfer?.stock_transfer_details || []).map(
          (data) => {
            return {
              stock_id: data?.product_stock_id,
              name: data?.from_stock?.product?.name,
              purchase_price: data?.from_stock?.purchase_price,
              exist_serial_no: data?.from_stock?.serial_no,
              serial_no: data?.serial_no[0] === null ? [] : data?.serial_no,
              exist_free_serial_no: data?.from_stock?.free_serial_no,
              free_serial_no:
                data?.free_serial_no[0] === null ? [] : data?.free_serial_no,
              exist_quantity: data?.quantity + data?.from_stock?.quantity,
              quantity: data?.quantity,
              exist_free_quantity:
                data?.free_quantity + data?.from_stock?.free_quantity,
              free_quantity: data?.free_quantity,
              exist_variation:
                data?.from_stock?.product?.product_type === "Standard"
                  ? {}
                  : {
                      color: data?.from_stock?.color?.name,
                      size: data?.from_stock?.size?.name,
                      capacity: data?.from_stock?.capacity?.name,
                      type: data?.from_stock?.type?.name,
                      weight: data?.from_stock?.weight?.name,
                    },
            };
          }
        ),
      }));
    }
  }, [stockTransferIsLoading, initialStockTransfer]);

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
      setError("");
      handleSuccessToast(responseData?.message?.message);
      navigate("/warehouse/transfer");
    }
  }, [responseError, isSuccess, responseData]);

  const handleSubmit = (formValue) => {
    if (formValue?.party_id === "") {
      setError("Party field is required");
    } else if (formValue?.from_warehouse_id === null) {
      setError("From Warehouse Field is required");
    } else if (formValue?.to_warehouse_id === null) {
      setError("To Warehouse Field is required");
    } else if (formValue?.from_warehouse_id == formValue?.to_warehouse_id) {
      setError(
        "Please ensure the 'From Warehouse' and 'To Warehouse' selections are different"
      );
    } else if (formValue?.items?.length === 0) {
      setError("Minimum one product transfer is required");
    } else if (
      formValue?.items?.some(
        (item) => item?.quantity === 0 && item?.free_quantity === 0
      )
    ) {
      setError("The product quantity must be greater than 0 is required");
    } else {
      let newFormValue = {
        ...formValue,
        transfer_date:
          new Date(formValue?.transfer_date).toLocaleDateString("en-GB") +
          " " +
          getCurrentTime(),
        items: formValue?.items?.map(
          ({
            name,
            purchase_price,
            exist_serial_no,
            exist_free_serial_no,
            exist_quantity,
            exist_free_quantity,
            exist_variation,
            ...rest
          }) => ({
            ...rest,
          })
        ),
      };

      const formattedData = {};
      newFormValue?.items.forEach((item, index) => {
        formattedData[`item[${index}][stock_id]`] = item?.stock_id;
        formattedData[`item[${index}][quantity]`] = item?.quantity;
        formattedData[`item[${index}][free_quantity]`] = item?.free_quantity;
        // Serial items
        item?.serial_no?.length === 0
          ? (formattedData[`item[${index}][serial_no][0]`] = "")
          : item?.serial_no.forEach((serial, serialIndex) => {
              formattedData[`item[${index}][serial_no][${serialIndex}]`] =
                serial;
            });
        // Free serial
        item?.free_serial_no?.length === 0
          ? (formattedData[`item[${index}][free_serial_no][0]`] = "")
          : item?.free_serial_no.forEach((freeSerial, freeSerialIndex) => {
              formattedData[
                `item[${index}][free_serial_no][${freeSerialIndex}]`
              ] = freeSerial;
            });
      });

      const { items, ...restFormValue } = newFormValue;

      editWarehouseTransfer({
        id: stockTransferId,
        data: {
          ...restFormValue,
          ...formattedData,
        },
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
            <div className="title">
              <h4>Update Stock Transfer</h4>
            </div>
            <hr />
          </div>
          <div>
            <div className="row custom-form-control">
              <div className="col-sm-6 col-xl-4 mb-3">
                <div className="custom-focus-label">
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    placeholder="Enter Invoice"
                    value={
                      initialStockTransfer === undefined
                        ? ""
                        : (initialStockTransfer?.prefix || "") +
                          "-" +
                          (initialStockTransfer?.invoice || "")
                    }
                  />
                  <label>Invoice</label>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4 mb-3">
                <div className="custom-focus-label">
                  <input
                    type="date"
                    required
                    name="transfer_date"
                    className="form-control"
                    value={formValue?.transfer_date}
                    onChange={handleOnChange}
                  />
                  <label>Date</label>
                </div>
              </div>

              <div className="col-sm-6 col-xl-4 mb-3">
                <WarehouseFromToField
                  initialKey="from_warehouse_id"
                  initialValue={formValue?.from_warehouse_id}
                  setFormValue={setFormValue}
                  label="From"
                />
              </div>
              <div className="col-sm-12 col-xl-8 mb-3 d-none-max-xl">
                <SearchingProducts
                  formValue={formValue}
                  setFormValue={setFormValue}
                />
              </div>
              <div className="col-sm-6 col-xl-4 mb-3">
                <WarehouseFromToField
                  initialKey="to_warehouse_id"
                  initialValue={formValue?.to_warehouse_id}
                  setFormValue={setFormValue}
                  label="To"
                />
              </div>
              <div className="col-sm-12 col-xl-8 mb-3 d-none-min-xl">
                <SearchingProducts
                  formValue={formValue}
                  setFormValue={setFormValue}
                />
              </div>
            </div>
            <InventoryProductsList
              formValue={formValue}
              setFormValue={setFormValue}
            />
            <div className="d-flex align-items-center justify-content-center">
              <div className="button-group mt-3">
                <button
                  onClick={() => navigate("/warehouse/transfer")}
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

export default StockTransferUpdate;
