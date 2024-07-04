import React, { useState } from "react";
// import noDataIcon from "../../../../assets/images/icons/no-data.svg";
import { useSelector } from "react-redux";
import listIcon from "../../../../assets/images/icons/list.svg";
import SalesPurchaseCross from "../../../../components/common/SalesPurchase/SalesPurchaseCross";
import SalesPurchasePricing from "../../../../components/common/SalesPurchase/SalesPurchasePricing";
import SalesPurchaseVariation from "../../../../components/common/SalesPurchase/SalesPurchaseVariation";
import { getNumberWithCommas } from "../../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../../components/function/twoDigitFixed";
import TableNoDataW250 from "../../../../components/ui/NoData/TableNoDataW250";
import FreeQuantityField from "./Quantity/FreeQuantityField";
import FreeQuantitySerialModal from "./Quantity/FreeQuantitySerialModal";
import QuantityField from "./Quantity/QuantityField";
import QuantitySerialModal from "./Quantity/QuantitySerialModal";
import SalesSettings from "./SalesSettings";

const InventoryProductsList = ({ formValue, setFormValue }) => {
  const [selectedId, setSelectedId] = useState("");

  const globalSettings = useSelector(
    (state) => state?.settings?.globalSettings?.value?.sale_settings?.item_info
  );

  // console.log("productWarehouse", productWarehouse);

  return (
    <>
      <div className="max-h-320">
        <table className="table sales-purchase-inventory-table">
          <thead>
            <tr>
              <th>Product Name</th>
              {/* {globalSettings?.serial_no && <th>Serial</th>} */}
              <th>Qty</th>
              {/* {globalSettings?.serial_no && <th>Free Serial</th>} */}
              {globalSettings?.free_quantity && <th>Free Qty</th>}
              {/* <th>Purchase Price</th> */}
              {globalSettings?.unit && <th>Unit</th>}
              <th>Sale Price</th>
              {globalSettings?.discount && <th>Discount</th>}
              {/* {globalSettings?.wholesale_price && <th>Wholesale Price</th>}
              {globalSettings?.dealer_price && <th>Dealer Price</th>} */}
              <th>Subtotal</th>
              {/* <th>Warehouse</th> */}
              <th>
                <SalesSettings />
              </th>
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
                  data?.free_serial_no?.length > 0 ||
                  data?.sale_free_serial_no?.length > 0 ? (
                    <>
                      {globalSettings?.serial_no && (
                        <td>
                          <div className="w-40 mx-auto d-flex align-items-center justify-content-between">
                            <p>
                              {data?.serial_no?.length +
                                data?.sale_free_serial_no?.length}
                            </p>
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
                              onClick={() => setSelectedId(data?.stock_code)}
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
                      data?.free_serial_no?.length > 0 ||
                      data?.sale_free_serial_no?.length > 0 ? (
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
                                  onClick={() =>
                                    setSelectedId(data?.stock_code)
                                  }
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

                  {globalSettings?.unit && <td>{data?.unit_name}</td>}
                  <td>
                    <SalesPurchasePricing
                      name="sale_price"
                      totalAmountKey="sale_price"
                      data={data}
                      formValue={formValue}
                      setFormValue={setFormValue}
                    />
                  </td>

                  {globalSettings?.discount && (
                    <td>
                      {data.discount > 0
                        ? data?.discount_type === "Fixed"
                          ? `$${data.discount}`
                          : `${data.discount}%`
                        : 0}
                    </td>
                  )}
                  {/* {globalSettings?.wholesale_price && (
                    <td>${data.wholesale_price}</td>
                  )}
                  {globalSettings?.dealer_price && (
                    <td>${data.dealer_price}</td>
                  )} */}
                  <td>
                    {getNumberWithCommas(
                      twoDigitFixed(data?.sale_price * data?.quantity)
                    )}
                  </td>
                  <td>
                    <SalesPurchaseCross
                      totalAmountKey="sale_price"
                      data={data}
                      formValue={formValue}
                      setFormValue={setFormValue}
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
