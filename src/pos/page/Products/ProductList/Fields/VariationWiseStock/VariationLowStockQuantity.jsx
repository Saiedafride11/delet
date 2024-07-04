import React from "react";

const VariationLowStockQuantity = ({
  section,
  page,
  globalSettings,
  variationValue,
  handleOnChange = { handleOnChange },
}) => {
  return (
    <>
      {globalSettings?.item_stock?.low_quantity && (
        <div className="variation custom-focus-label">
          <label>Low Qty</label>
          <div className="pos-up-down-arrow">
            <input
              type="number"
              className="form-control"
              placeholder="0"
              name={`variation[${section?.id - 1}][low_quantity]`}
              readOnly={
                page === "product_update" &&
                variationValue[
                  `variation[${section?.id - 1}][warehouse_id]`
                ] !== ""
              }
              value={
                variationValue[`variation[${section?.id - 1}][low_quantity]`] <=
                0
                  ? ""
                  : variationValue[
                      `variation[${section?.id - 1}][low_quantity]`
                    ]
              }
              onChange={(e) =>
                handleOnChange(e, section?.id - 1, "low_quantity")
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VariationLowStockQuantity;
