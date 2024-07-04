import React, { useState } from "react";
import listIcon from "../../../../assets/images/icons/list.svg";
// import noDataIcon from "../../../../assets/images/icons/no-data.svg";
import { useSelector } from "react-redux";
import SalesPurchaseCross from "../../../../components/common/SalesPurchase/SalesPurchaseCross";
import SalesPurchaseDiscount from "../../../../components/common/SalesPurchase/SalesPurchaseDiscount";
import SalesPurchasePricing from "../../../../components/common/SalesPurchase/SalesPurchasePricing";
import SalesPurchaseVariation from "../../../../components/common/SalesPurchase/SalesPurchaseVariation";
import { twoDigitFixed } from "../../../../components/function/twoDigitFixed";
import TableNoDataW250 from "../../../../components/ui/NoData/TableNoDataW250";
import PurchaseSettings from "./PurchaseSettings";
import FreeQuantityField from "./Quantity/FreeQuantityField";
import FreeQuantitySerialModal from "./Quantity/FreeQuantitySerialModal";
import QuantityField from "./Quantity/QuantityField";
import QuantitySerialModal from "./Quantity/QuantitySerialModal";
import WarehouseDropdown from "./WarehouseDropdown";

const InventoryProductsList = ({ formValue, setFormValue }) => {
  const [selectedId, setSelectedId] = useState("");
  const globalSettings = useSelector(
    (state) =>
      state?.settings?.globalSettings?.value?.purchase_settings?.item_info
  );

  // console.log("formValue", formValue);
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
              {globalSettings?.unit && <th>Unit</th>}
              <th>Purchase Price</th>
              {globalSettings?.discount && <th>Discount</th>}
              <th>Retail / MRP Price</th>
              {globalSettings?.wholesale_price && <th>Wholesale Price</th>}
              {globalSettings?.dealer_price && <th>Dealer Price</th>}
              <th>Subtotal</th>
              <th className="w-160">Warehouse</th>
              <th>
                <PurchaseSettings />
              </th>
            </tr>
          </thead>
          <tbody>
            {formValue?.items?.length === 0 ? (
              <TableNoDataW250 />
            ) : (
              formValue?.items?.map((data, index) => (
                <tr key={index}>
                  {/* <td>{data?.name}</td> */}

                  <td>
                    <SalesPurchaseVariation data={data} />
                  </td>

                  {data?.exist_serial_no?.length > 0 ||
                  data?.exist_free_serial_no?.length > 0 ? (
                    <>
                      {globalSettings?.serial_no && (
                        <td>
                          <div className="w-40 mx-auto d-flex align-items-center justify-content-between">
                            <p>{data?.serial_no?.length}</p>
                            <button
                              data-bs-toggle="modal"
                              data-bs-target="#product-quantity-modal"
                              className="border-0 bg-transparent p-0"
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
                      data?.exist_free_serial_no?.length > 0 ? (
                        <>
                          {globalSettings?.serial_no && (
                            <td>
                              <div className="w-40 mx-auto d-flex align-items-center justify-content-between">
                                <p>{data?.free_serial_no?.length}</p>
                                <button
                                  data-bs-toggle="modal"
                                  data-bs-target="#product-free-quantity-modal"
                                  className="border-0 bg-transparent"
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
                      name="purchase_price"
                      totalAmountKey="purchase_price"
                      data={data}
                      formValue={formValue}
                      setFormValue={setFormValue}
                    />
                  </td>

                  {globalSettings?.discount && (
                    <td>
                      <SalesPurchaseDiscount
                        dynamicKey="purchase_price"
                        data={data}
                        formValue={formValue}
                        setFormValue={setFormValue}
                      />
                    </td>
                  )}
                  <td>
                    <SalesPurchasePricing
                      name="sale_price"
                      totalAmountKey="purchase_price"
                      data={data}
                      formValue={formValue}
                      setFormValue={setFormValue}
                    />
                  </td>

                  {globalSettings?.wholesale_price && (
                    <td>
                      <SalesPurchasePricing
                        name="wholesale_price"
                        totalAmountKey="purchase_price"
                        data={data}
                        formValue={formValue}
                        setFormValue={setFormValue}
                      />
                    </td>
                  )}
                  {globalSettings?.dealer_price && (
                    <td>
                      <SalesPurchasePricing
                        name="dealer_price"
                        totalAmountKey="purchase_price"
                        data={data}
                        formValue={formValue}
                        setFormValue={setFormValue}
                      />
                    </td>
                  )}

                  <td>
                    {twoDigitFixed(data?.purchase_price * data?.quantity)}
                  </td>
                  <td>
                    <WarehouseDropdown
                      product_index={index}
                      warehouse_name={data?.warehouse_name}
                      warehouse_open={data?.warehouse_open}
                      setFormValue={setFormValue}
                    />
                  </td>
                  <td>
                    <SalesPurchaseCross
                      totalAmountKey="purchase_price"
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
      </div>
    </>
  );
};

export default React.memo(InventoryProductsList);
