import React from "react";

const VariationPricing = ({
  section,
  star,
  name,
  variationValue,
  handleOnChange,
}) => {
  const title = name?.replace(/_/g, " ");
  return (
    <div className="variation custom-focus-label">
      <label className="text-capitalize">
        {title}
        <span className="text-orange">{star}</span>
      </label>
      <div className="pos-up-down-arrow">
        <input
          type="number"
          className="form-control"
          // placeholder={`Enter ${title}`}
          placeholder="0"
          name={`variation[${section?.id - 1}][${name}]`}
          value={
            variationValue[`variation[${section?.id - 1}][${name}]`] < 0
              ? ""
              : variationValue[`variation[${section?.id - 1}][${name}]`]
          }
          onChange={(e) => handleOnChange(e, section?.id - 1, name)}
        />
      </div>
    </div>
  );
};

export default VariationPricing;
