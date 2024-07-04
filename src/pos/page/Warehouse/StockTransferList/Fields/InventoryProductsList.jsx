import React, { useState } from "react";
// import noDataIcon from "../../../../assets/images/icons/no-data.svg";
import { useSelector } from "react-redux";
import listIcon from "../../../../assets/images/icons/list.svg";
import crossIcon from "../../../../assets/images/icons/x-red.svg";
import SalesPurchaseVariation from "../../../../components/common/SalesPurchase/SalesPurchaseVariation";
import { getNumberWithCommas } from "../../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../../components/function/twoDigitFixed";
import TableNoDataW250 from "../../../../components/ui/NoData/TableNoDataW250";
import FreeQuantityField from "./Quantity/FreeQuantityField";
import FreeQuantitySerialModal from "./Quantity/FreeQuantitySerialModal";
import QuantityField from "./Quantity/QuantityField";
import QuantitySerialModal from "./Quantity/QuantitySerialModal";

const InventoryProductsList = ({ formValue, setFormValue }) => {
  const [selectedId, setSelectedId] = useState("");

  const globalSettings = useSelector(
    (state) => state?.settings?.globalSettings?.value?.sale_settings?.item_info
  );

  const handleRemove = (data) => {
    const newProducts = formValue?.items?.filter(
      (item) => item?.stock_id !== data?.stock_id
    );

    const totalAmount = newProducts?.reduce(
      (total, item) => total + item?.purchase_price * item?.quantity,
      0
    );

    const totalQuantity = newProducts?.reduce(
      (total, item) => total + item?.quantity,
      0
    );

    const totalFreeQuantity = newProducts?.reduce(
      (total, item) => total + item?.free_quantity,
      0
    );

    setFormValue((prev) => ({
      ...prev,
      items: newProducts,
      amount: totalAmount,
      quantity: totalQuantity,
      free_quantity: totalFreeQuantity,
    }));
  };

  return (
    <>
      <div className="max-h-57vh">
        <table className="table sales-purchase-inventory-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th className="w-200">Qty</th>
              <th className="w-200">Free Qty</th>
              <th>Purchase Price</th>
              <th>Stock Value</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {formValue?.items?.length === 0 ? (
              <TableNoDataW250 />
            ) : (
              formValue?.items?.map((data, index) => (
                <tr key={index}>
                  <td>
                    <SalesPurchaseVariation data={data} />
                  </td>

                  {data?.exist_serial_no?.length > 0 ||
                  data?.exist_free_serial_no?.length > 0 ||
                  data?.serial_no?.length > 0 ||
                  data?.free_serial_no?.length > 0 ? (
                    <>
                      {globalSettings?.serial_no && (
                        <td>
                          <div className="w-40 mx-auto d-flex align-items-center justify-content-between">
                            <p>{data?.serial_no?.length}</p>
                            <button
                              data-bs-toggle="modal"
                              data-bs-target="#product-quantity-modal"
                              disabled={
                                data?.exist_serial_no?.length === 0 &&
                                data?.serial_no?.length === 0
                              }
                              className={`border-0 bg-transparent p-0 ${
                                data?.exist_serial_no?.length === 0 &&
                                "opacity-50" &&
                                data?.serial_no?.length === 0 &&
                                "opacity-50"
                              }`}
                              onClick={() => setSelectedId(data?.stock_id)}
                            >
                              <img src={listIcon} alt="icon" />
                            </button>
                          </div>
                        </td>
                      )}
                    </>
                  ) : (
                    <td>
                      <QuantityField
                        data={data}
                        formValue={formValue}
                        setFormValue={setFormValue}
                      />
                    </td>
                  )}

                  {globalSettings?.free_quantity && (
                    <>
                      {data?.exist_serial_no?.length > 0 ||
                      data?.exist_free_serial_no?.length > 0 ||
                      data?.serial_no?.length > 0 ||
                      data?.free_serial_no?.length > 0 ? (
                        <>
                          {globalSettings?.serial_no && (
                            <td>
                              <div className="w-40 mx-auto d-flex align-items-center justify-content-between">
                                <p>{data?.free_serial_no?.length}</p>
                                <button
                                  data-bs-toggle="modal"
                                  data-bs-target="#product-free-quantity-modal"
                                  disabled={
                                    data?.exist_free_serial_no?.length === 0 &&
                                    data?.free_serial_no?.length === 0
                                  }
                                  className={`border-0 bg-transparent ${
                                    data?.exist_free_serial_no?.length === 0 &&
                                    "opacity-50" &&
                                    data?.free_serial_no?.length === 0 &&
                                    "opacity-50"
                                  }`}
                                  onClick={() => setSelectedId(data?.stock_id)}
                                >
                                  <img src={listIcon} alt="icon" />
                                </button>
                              </div>
                            </td>
                          )}
                        </>
                      ) : (
                        <td>
                          <FreeQuantityField
                            data={data}
                            formValue={formValue}
                            setFormValue={setFormValue}
                          />
                        </td>
                      )}
                    </>
                  )}

                  <td>
                    {getNumberWithCommas(
                      twoDigitFixed(data?.purchase_price || 0)
                    )}
                  </td>
                  <td>
                    {getNumberWithCommas(
                      twoDigitFixed(data?.quantity * data?.purchase_price || 0)
                    )}
                  </td>
                  <td>
                    <img
                      onClick={() => handleRemove(data)}
                      src={crossIcon}
                      alt="icon"
                      className="cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <QuantitySerialModal
        formValue={formValue}
        setFormValue={setFormValue}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <FreeQuantitySerialModal
        formValue={formValue}
        setFormValue={setFormValue}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </>
  );
};

export default InventoryProductsList;
