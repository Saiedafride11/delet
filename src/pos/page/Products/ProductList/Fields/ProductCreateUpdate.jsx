import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import listIcon from "../../../../assets/images/icons/list.svg";
import scanIcon from "../../../../assets/images/icons/scan.svg";
import uploadIconIcon from "../../../../assets/images/icons/upload-icon.svg";
import ProductFreeSerialModal from "../../components/modal/ProductFreeSerialModal";
import ProductSerialModal from "../../components/modal/ProductSerialModal";
import BrandName from "./BrandName";
import CategoryName from "./CategoryName";
import ModelName from "./ModelName";
import UnitName from "./UnitName";
import VariationWiseStock from "./VariationWiseStock/VariationWiseStock";
import WarehouseName from "./WarehouseName";
import WarrantyName from "./WarrantyName";

const ProductCreateUpdate = ({
  formValue,
  setFormValue,
  handleOnChange,
  images,
  serialItems,
  setSerialItems,
  freeSerialItems,
  setFreeSerialItems,
  allowFileUpload,
  handleImageChange,
  handleRemoveImage,
  page,
}) => {
  const globalSettings = useSelector(
    (state) => state?.settings?.globalSettings?.value?.product
  );

  return (
    <div className="row custom-form-control">
      <div
        className={`${
          globalSettings?.item_info?.image ? "col-md-9" : "col-md-12"
        }`}
      >
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="custom-focus-label">
              <label>
                Product Name <span className="text-orange">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter product name"
                value={formValue?.name}
                onChange={handleOnChange}
                // autoComplete="off"
              />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <CategoryName
              initialKey="product_category_id"
              initialValue={formValue?.product_category_id}
              setFormValue={setFormValue}
            />
          </div>

          {globalSettings?.item_info?.brand && (
            <div className="col-md-6 mb-3">
              <BrandName
                initialKey="brand_id"
                // initialValue={formValue?.brand_id}
                formValue={formValue}
                setFormValue={setFormValue}
              />
            </div>
          )}

          {globalSettings?.item_info?.model && (
            <div className="col-md-6 mb-3">
              <ModelName
                initialKey="p_model_id"
                // initialValue={formValue?.p_model_id}
                formValue={formValue}
                setFormValue={setFormValue}
              />
            </div>
          )}
          {globalSettings?.item_stock?.serial_no === false ||
          formValue?.product_type === "Variation" ? (
            <div className="col-md-6 mb-3">
              <div className="custom-focus-label">
                <label>
                  Quantity<span className="text-orange">*</span>
                </label>
                <div className="pos-up-down-arrow">
                  <input
                    type="number"
                    name="quantity"
                    readOnly={formValue?.product_type === "Variation"}
                    className="form-control"
                    placeholder={
                      formValue?.product_type === "Variation"
                        ? "Product qty"
                        : "Enter product qty"
                    }
                    value={formValue?.quantity < 0 ? "" : formValue.quantity}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="col-md-6 mb-3">
              <div className="custom-focus-label">
                <label>
                  Quantity<span className="text-orange">*</span>
                </label>
                {Object.keys(formValue).some(
                  (key) =>
                    key.startsWith("serial_no[") ||
                    key.startsWith("free_serial_no[")
                ) ? (
                  <div
                    className="pos-up-down-arrow"
                    data-bs-toggle="modal"
                    data-bs-target="#product-qty-serial-modal"
                  >
                    <input
                      type="number"
                      name="quantity"
                      readOnly
                      className="form-control cursor-pointer"
                      placeholder="Enter product qty"
                      value={formValue?.quantity < 0 ? "" : formValue.quantity}
                      onChange={handleOnChange}
                    />
                    <Link>
                      <img src={listIcon} alt="icon" />
                    </Link>
                  </div>
                ) : (
                  <div className="pos-up-down-arrow">
                    <input
                      type="number"
                      name="quantity"
                      className="form-control"
                      placeholder="Enter product qty"
                      value={formValue?.quantity < 0 ? "" : formValue.quantity}
                      onChange={handleOnChange}
                    />
                    <Link
                      data-bs-toggle="modal"
                      data-bs-target="#product-qty-serial-modal"
                    >
                      <img src={listIcon} alt="icon" />
                    </Link>
                  </div>
                )}
              </div>
              <ProductSerialModal
                formValue={formValue}
                setFormValue={setFormValue}
                serialItems={serialItems}
                setSerialItems={setSerialItems}
                freeSerialItems={freeSerialItems}
              />
            </div>
          )}

          {globalSettings?.item_stock?.free_quantity && (
            <>
              {globalSettings?.item_stock?.serial_no === false ||
              formValue?.product_type === "Variation" ? (
                <div className="col-md-6 mb-3">
                  <div className="custom-focus-label">
                    <label>Free Items Qty</label>
                    <div className="pos-up-down-arrow">
                      <input
                        type="number"
                        name="free_quantity"
                        readOnly={formValue?.product_type === "Variation"}
                        className="form-control"
                        placeholder={
                          formValue?.product_type === "Variation"
                            ? "Product free qty"
                            : "Enter product free qty"
                        }
                        value={
                          formValue?.free_quantity < 0
                            ? ""
                            : formValue.free_quantity
                        }
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-6 mb-3">
                  <div className="custom-focus-label">
                    <label>Free Items Qty</label>
                    {Object.keys(formValue).some(
                      (key) =>
                        key.startsWith("serial_no[") ||
                        key.startsWith("free_serial_no[")
                    ) ? (
                      <div
                        className="pos-up-down-arrow"
                        data-bs-toggle="modal"
                        data-bs-target="#product-free-qty-serial-modal"
                      >
                        <input
                          type="number"
                          name="free_quantity"
                          readOnly
                          className="form-control cursor-pointer"
                          placeholder="Enter product qty"
                          value={
                            formValue?.free_quantity < 0
                              ? ""
                              : formValue.free_quantity
                          }
                          onChange={handleOnChange}
                        />
                        <Link>
                          <img src={listIcon} alt="icon" />
                        </Link>
                      </div>
                    ) : (
                      <div className="pos-up-down-arrow">
                        <input
                          type="number"
                          name="free_quantity"
                          className="form-control"
                          placeholder="Enter product qty"
                          value={
                            formValue?.free_quantity < 0
                              ? ""
                              : formValue.free_quantity
                          }
                          onChange={handleOnChange}
                        />
                        <Link
                          data-bs-toggle="modal"
                          data-bs-target="#product-free-qty-serial-modal"
                        >
                          <img src={listIcon} alt="icon" />
                        </Link>
                      </div>
                    )}
                  </div>
                  <ProductFreeSerialModal
                    formValue={formValue}
                    setFormValue={setFormValue}
                    serialItems={serialItems}
                    setFreeSerialItems={setFreeSerialItems}
                    freeSerialItems={freeSerialItems}
                  />
                </div>
              )}
            </>
          )}

          {globalSettings?.item_stock?.low_quantity &&
            formValue?.product_type === "Standard" && (
              <div className="col-md-6 mb-3">
                <div className="custom-focus-label">
                  <label>Low Stock QTY</label>
                  <input
                    type="number"
                    name="low_quantity"
                    className="form-control"
                    placeholder="Enter low stock qty"
                    value={
                      formValue?.low_quantity < 0 ? "" : formValue.low_quantity
                    }
                    onChange={handleOnChange}
                  />
                </div>
              </div>
            )}

          {globalSettings?.item_stock?.unit && (
            <div className="col-md-6 mb-3">
              <UnitName
                initialKey="unit_id"
                initialValue={formValue?.unit_id}
                setFormValue={setFormValue}
              />
            </div>
          )}

          {globalSettings?.item_info?.sku_code && (
            <div className="col-md-6 mb-3">
              <div className="custom-focus-label">
                <label>Product Code</label>
                <div className="pos-up-down-arrow">
                  <input
                    type="text"
                    name="sku_code"
                    className="form-control"
                    placeholder="Enter product code"
                    value={formValue?.sku_code}
                    onChange={handleOnChange}
                  />
                  <Link>
                    <img src={scanIcon} alt="icon" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {globalSettings?.item_info?.warehouse &&
            formValue?.product_type === "Standard" && (
              <>
                {page === "product_create" ? (
                  <div className="col-md-6 mb-3">
                    <WarehouseName
                      initialKey="warehouse_id"
                      initialValue={formValue?.warehouse_id}
                      setFormValue={setFormValue}
                    />
                  </div>
                ) : (
                  <div className="col-md-6 mb-3">
                    <div className="custom-focus-label">
                      <label className="bg-transparent">Warehouse</label>
                      <input
                        className="form-control"
                        disabled
                        placeholder="Enter Warehouse"
                        value={formValue?.product_stocks?.[0]?.warehouse?.name}
                      />
                    </div>
                  </div>
                )}
              </>
            )}

          {globalSettings?.variation?.variation_menu && (
            <div className="col-md-6 mb-3">
              <div className="custom-focus-label">
                <label>Product Type</label>
                <div className="input-wrapper pos-up-down-arrow">
                  <select
                    name="product_type"
                    value={formValue?.product_type}
                    onChange={handleOnChange}
                    className="form-control m-0"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Variation">Variation</option>
                  </select>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          {formValue?.product_type === "Variation" &&
            globalSettings?.variation?.variation_menu && (
              <div className="col-md-12 mb-3">
                <VariationWiseStock
                  formValue={formValue}
                  setFormValue={setFormValue}
                  globalSettings={globalSettings}
                  page={page}
                />
              </div>
            )}

          {formValue?.product_type === "Standard" && (
            <div className="col-md-6 mb-3">
              <div className="custom-focus-label">
                <label>
                  Purchase Price<span className="text-orange">*</span>
                </label>
                <input
                  type="number"
                  name="purchase_price"
                  className="form-control"
                  placeholder="Enter purchase price"
                  value={
                    formValue?.purchase_price < 0
                      ? ""
                      : formValue.purchase_price
                  }
                  onChange={handleOnChange}
                />
              </div>
            </div>
          )}

          {globalSettings?.item_info?.warranty && (
            <div className="col-md-6 mb-3">
              <WarrantyName
                initialKey="warranty_id"
                initialValue={formValue?.warranty_id}
                setFormValue={setFormValue}
              />
            </div>
          )}

          {formValue?.product_type === "Standard" && (
            <div className="col-md-6 mb-3">
              <div className="custom-focus-label">
                <label>
                  Retail/MRP/Sales price
                  <span className="text-orange">*</span>
                </label>
                <input
                  type="number"
                  name="sale_price"
                  className="form-control"
                  placeholder="Enter mrp price"
                  value={formValue?.sale_price < 0 ? "" : formValue.sale_price}
                  onChange={handleOnChange}
                />
              </div>
            </div>
          )}

          {globalSettings?.price?.product_discount &&
            formValue?.product_type === "Standard" && (
              <div className="col-md-6 mb-3">
                <div className="custom-focus-label">
                  <label
                    className={`${
                      formValue?.sale_price === "" || formValue?.sale_price < 0
                        ? "bg-transparent"
                        : ""
                    }`}
                  >
                    Discount
                  </label>
                  <div className="input-select-option d-flex align-items-center">
                    <div className="form-group w-100">
                      <input
                        type="number"
                        name="discount"
                        className="form-control"
                        placeholder="Enter discount"
                        disabled={
                          formValue?.sale_price === "" ||
                          formValue?.sale_price <= 0
                            ? true
                            : false
                        }
                        value={
                          formValue?.discount <= 0 ? "" : formValue.discount
                        }
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="input-wrapper pos-up-down-arrow w-200">
                      <select
                        className="form-control m-0"
                        name="discount_type"
                        value={formValue?.discount_type}
                        onChange={handleOnChange}
                      >
                        <option value="Fixed">Fixed</option>
                        <option value="Percentage">Percentage</option>
                      </select>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          {globalSettings?.price?.wholesale_price &&
            formValue?.product_type === "Standard" && (
              <div className="col-md-6 mb-3">
                <div className="custom-focus-label">
                  <label>Wholesale Price</label>
                  <input
                    type="number"
                    name="wholesale_price"
                    className="form-control"
                    placeholder="Enter wholesale price"
                    value={
                      formValue?.wholesale_price < 0
                        ? ""
                        : formValue.wholesale_price
                    }
                    onChange={handleOnChange}
                  />
                </div>
              </div>
            )}

          {globalSettings?.price?.dealer_price &&
            formValue?.product_type === "Standard" && (
              <div className="col-md-6 mb-3">
                <div className="custom-focus-label">
                  <label>Dealer price </label>
                  <input
                    type="number"
                    name="dealer_price"
                    className="form-control"
                    placeholder="Enter dealer price"
                    value={
                      formValue?.dealer_price < 0 ? "" : formValue.dealer_price
                    }
                    onChange={handleOnChange}
                  />
                </div>
              </div>
            )}
          {globalSettings?.item_stock?.manufacturer_date && (
            <div className="col-md-6 mb-3">
              <div className="custom-focus-label">
                <label>Manufacturing Date</label>
                <input
                  type="date"
                  name="manufacturer_date"
                  className="form-control"
                  value={formValue?.manufacturer_date}
                  onChange={handleOnChange}
                />
              </div>
            </div>
          )}

          {globalSettings?.item_stock?.expire_date && (
            <div className="col-md-12 mb-3">
              <div className="custom-focus-label">
                <label>Expire Date</label>
                <input
                  type="date"
                  name="expire_date"
                  className="form-control"
                  value={formValue?.expire_date}
                  onChange={handleOnChange}
                />
              </div>
            </div>
          )}

          {globalSettings?.item_info?.description && (
            <div className="col-md-12 mb-3">
              <div className="custom-focus-label">
                <label>Description</label>
                <textarea
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Enter description"
                  value={formValue?.description}
                  onChange={handleOnChange}
                  rows="4"
                  cols="50"
                ></textarea>
              </div>
            </div>
          )}
        </div>
      </div>

      {globalSettings?.item_info?.image && (
        <div className="col-md-3">
          <div className="mb-3">
            <div className="position-relative">
              <label className="upload-img-top-label">Product Image</label>
              <div className="upload-img-v2">
                <label className="upload-v4 dashed-border">
                  <div className="img-wrp multiple-img-wrp">
                    {images?.length === 0 ? (
                      <img src={uploadIconIcon} alt="user" />
                    ) : (
                      images?.map((image, index) => (
                        <div key={index} className="position-relative">
                          <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            style={{
                              maxWidth: "100px",
                              maxHeight: "100px",
                              margin: "5px",
                            }}
                          />
                          <span
                            onClick={() => handleRemoveImage(image, index)}
                            className="w-h-lh-18 position-absolute top-0 end-0 bg-red text-white px-1 rounded-circle"
                          >
                            ⨯
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    multiple
                    className="d-none"
                    disabled={allowFileUpload === true ? false : true}
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCreateUpdate;
