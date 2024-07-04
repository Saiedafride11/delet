import React, { useState } from "react";
import listIcon from "../../../../assets/images/icons/list.svg";
// import noDataIcon from "../../../../assets/images/icons/no-data.svg";
import { useSelector } from "react-redux";
import crossIcon from "../../../../assets/images/icons/x-red.svg";
import TableNoDataW250 from "../../../../components/ui/NoData/TableNoDataW250";
import PurchaseSettings from "./PurchaseSettings";
import FreeQuantity from "./Quantity/FreeQuantity";
import StandardQuantity from "./Quantity/StandardQuantity";
import StandardSerialModal from "./Quantity/StandardSerialModal";
import VariationQuantity from "./Quantity/VariationQuantity";
import VariationSerialModal from "./Quantity/VariationSerialModal";
import WarehouseDropdown from "./WarehouseDropdown";

const InventoryProductsList = ({ formValue, setFormValue }) => {
  const [selectedId, setSelectedId] = useState("");
  const globalSettings = useSelector(
    (state) =>
      state?.settings?.globalSettings?.value?.purchase_settings?.item_info
  );

  const handleRemove = (data) => {
    // const newProducts = formValue?.items?.filter(
    //   (item) => item.product_id !== id
    // );

    const newProducts = formValue?.items?.filter(
      (item) =>
        (item?.product_type === "Standard" &&
          item.product_id !== data.product_id) ||
        (item?.product_type === "Variation" &&
          item?.exist_variation?.variation_id !==
            data?.exist_variation?.variation_id)
    );

    const totalAmount = newProducts?.reduce(
      (total, item) => total + item.purchase_price * item.quantity,
      0
    );
    setFormValue((prev) => ({
      ...prev,
      items: newProducts,
      total_amount: totalAmount,
      grand_total:
        totalAmount + prev?.vat + prev?.service_charge - prev?.discount,
      due_amount:
        totalAmount +
        prev?.vat +
        prev?.service_charge -
        prev?.discount -
        prev?.paid_amount,
    }));
  };

  const handlePriceChange = (e, data) => {
    const name = e.target.name;
    const value = e.target.value;
    const updateValue = value === "" ? 0 : value;

    let updatedData;
    if (data?.product_type === "Standard") {
      updatedData = formValue?.items?.map((item) =>
        item?.product_id === data?.product_id
          ? { ...item, [name]: parseInt(updateValue) }
          : item
      );
    } else {
      updatedData = formValue?.items?.map((item) =>
        item.exist_variation?.variation_id ===
        data?.exist_variation?.variation_id
          ? { ...item, [name]: parseInt(updateValue) }
          : item
      );
    }

    // const totalAmount = updatedData?.reduce(
    //   (total, item) => total + item.purchase_price * item.quantity,
    //   0
    // );

    const totalAmount = updatedData?.reduce((total, item) => {
      const itemPurchasePrice = item.purchase_price * item.quantity;

      const variationPurchasePrice =
        (item?.purchase_price || 0) * (item?.variation?.[0]?.quantity || 0);

      return total + itemPurchasePrice + variationPurchasePrice;
    }, 0);

    setFormValue((prev) => ({
      ...prev,
      items: updatedData,
      total_amount: totalAmount,
      grand_total:
        totalAmount + prev?.vat + prev?.service_charge - prev?.discount,
      due_amount:
        totalAmount +
        prev?.vat +
        prev?.service_charge -
        prev?.discount -
        prev?.paid_amount,
    }));
  };

  // console.log("globalSettings", globalSettings);

  return (
    <>
      <div className="max-h-320">
        <table className="table sales-purchase-inventory-table">
          <thead>
            <tr>
              <th>Product Name</th>
              {globalSettings?.serial_no && <th>Serial</th>}
              <th>Qty</th>
              <th>Free Qty</th>
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
                    {Object.keys(data?.exist_variation || {})?.length === 0
                      ? data?.name
                      : `${data?.name}, ${data?.exist_variation?.color}, ${data?.exist_variation?.size}, ${data?.exist_variation?.weight}, ${data?.exist_variation?.type}, ${data?.exist_variation?.capacity}`}
                  </td>

                  {globalSettings?.serial_no && (
                    <td>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target={
                          data?.product_type === "Standard"
                            ? "#standard-product-quantity-modal"
                            : "#variation-product-quantity-modal"
                        }
                        disabled={data?.exist_serial_no?.length === 0}
                        className={`border-0 bg-transparent ${
                          data?.exist_serial_no?.length === 0 && "opacity-50"
                        }`}
                        onClick={() =>
                          setSelectedId(
                            data?.product_type === "Standard"
                              ? data?.product_id
                              : data?.exist_variation?.variation_id
                          )
                        }
                      >
                        <img src={listIcon} alt="icon" />
                      </button>
                    </td>
                  )}
                  <td>
                    {data?.product_type === "Standard" ? (
                      <StandardQuantity
                        data={data}
                        formValue={formValue}
                        setFormValue={setFormValue}
                      />
                    ) : (
                      <VariationQuantity
                        data={data}
                        formValue={formValue}
                        setFormValue={setFormValue}
                      />
                    )}
                  </td>
                  <td>
                    <FreeQuantity
                      data={data}
                      formValue={formValue}
                      setFormValue={setFormValue}
                    />
                  </td>
                  {globalSettings?.unit && <td>{data?.unit_name}</td>}
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      <span>$</span>
                      <input
                        type="number"
                        name="purchase_price"
                        className="form-control w-60 text-start border-0 bg-transparent px-1"
                        placeholder="0"
                        value={
                          data?.purchase_price <= 0 ? "" : data?.purchase_price
                        }
                        onChange={(e) => handlePriceChange(e, data)}
                      />
                    </div>
                  </td>
                  {globalSettings?.discount && <td>{data?.discount}</td>}
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      <span>$</span>
                      <input
                        type="number"
                        name="sale_price"
                        className="form-control w-60 text-start border-0 bg-transparent px-1"
                        placeholder="0"
                        value={data?.sale_price <= 0 ? "" : data.sale_price}
                        onChange={(e) => handlePriceChange(e, data)}
                      />{" "}
                    </div>
                  </td>

                  {globalSettings?.wholesale_price && (
                    <td>
                      <div className="d-flex align-items-center justify-content-center">
                        <span>$</span>
                        <input
                          type="number"
                          name="wholesale_price"
                          className="form-control w-60 text-start border-0 bg-transparent px-1"
                          placeholder="0"
                          value={
                            data?.wholesale_price <= 0
                              ? ""
                              : data.wholesale_price
                          }
                          onChange={(e) => handlePriceChange(e, data)}
                        />{" "}
                      </div>
                    </td>
                  )}
                  {globalSettings?.dealer_price && (
                    <td>
                      <div className="d-flex align-items-center justify-content-center">
                        <span>$</span>
                        <input
                          type="number"
                          name="dealer_price"
                          className="form-control w-60 text-start border-0 bg-transparent px-1"
                          placeholder="0"
                          value={
                            data?.dealer_price <= 0 ? "" : data.dealer_price
                          }
                          onChange={(e) => handlePriceChange(e, data)}
                        />{" "}
                      </div>
                    </td>
                  )}
                  <td>
                    {data?.product_type === "Standard"
                      ? data?.purchase_price * data?.quantity
                      : data?.purchase_price * data?.variation[0]?.quantity}
                  </td>
                  <td>
                    <WarehouseDropdown
                      product_index={index}
                      warehouse_name={data?.warehouse_name}
                      warehouse_open={data?.warehouse_open}
                      setFormValue={setFormValue}
                    />
                  </td>
                  <td className="cross">
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

        <VariationSerialModal
          formValue={formValue}
          setFormValue={setFormValue}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
        <StandardSerialModal
          formValue={formValue}
          setFormValue={setFormValue}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      </div>
    </>
  );
};

export default InventoryProductsList;
