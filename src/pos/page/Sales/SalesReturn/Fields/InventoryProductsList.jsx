import React, { useState } from "react";
// import noDataIcon from "../../../../assets/images/icons/no-data.svg";
import { useSelector } from "react-redux";
import listIcon from "../../../../assets/images/icons/list.svg";
import SalesPurchaseVariation from "../../../../components/common/SalesPurchase/SalesPurchaseVariation";
import { getNumberWithCommas } from "../../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../../components/function/twoDigitFixed";
import TableNoDataW250 from "../../../../components/ui/NoData/TableNoDataW250";
import QuantityField from "./Quantity/QuantityField";
import QuantitySerialModal from "./Quantity/QuantitySerialModal";

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
              <th>Qty Sold</th>
              <th>Qty Return</th>
              <th>Sale Price</th>
              <th className="w-200">Subtotal</th>
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
                  <td>
                    <div className="qty-sold">{data?.sold_quantity}</div>
                  </td>

                  {data?.exist_serial_no?.length > 0 ||
                  data?.exist_free_serial_no?.length > 0 ? (
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
                              disabled={data?.sold_quantity <= 0}
                              className={`border-0 bg-transparent p-0 ${
                                data?.sold_quantity <= 0 && "opacity-50"
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

                  <td>
                    ${getNumberWithCommas(twoDigitFixed(data?.sale_price))}
                  </td>

                  <td>
                    {getNumberWithCommas(
                      twoDigitFixed(data?.sale_price * data?.quantity)
                    )}
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
    </>
  );
};

export default InventoryProductsList;
