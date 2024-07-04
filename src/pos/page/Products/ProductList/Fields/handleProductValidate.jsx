export const handleProductValidate = (formValue) => {
  const variationMinimumOneField = (formValue) => {
    for (const key in formValue) {
      if (key.startsWith("variation[")) {
        const index = key.match(/\d+/)[0];
        if (
          formValue[[`variation[${index}][color_id]`]] === "" &&
          formValue[[`variation[${index}][size_id]`]] === "" &&
          formValue[[`variation[${index}][weight_id]`]] === "" &&
          formValue[[`variation[${index}][capacity_id]`]] === "" &&
          formValue[[`variation[${index}][type_id]`]] === "" &&
          formValue[[`variation[${index}][warehouse_id]`]] === ""
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const variationPricingRequired = (formValue, priceKey) => {
    for (const key in formValue) {
      if (key.startsWith("variation[")) {
        const index = key.match(/\d+/)[0];
        if (
          formValue[`variation[${index}][quantity]`] !== "" &&
          formValue[`variation[${index}][${priceKey}]`] === ""
        ) {
          return true;
        }
      }
    }
    return false;
  };

  if (formValue?.name === "") {
    return "Product name is required";
  } else if (formValue?.product_category_id == "") {
    return "Product category is required";
  } else if (
    (formValue?.product_type === "Standard" &&
      (formValue?.quantity > 0 || formValue?.free_quantity > 0) &&
      formValue?.purchase_price == "") ||
    (formValue?.product_type === "Variation" &&
      variationPricingRequired(formValue, "purchase_price"))
  ) {
    return "Purchase price is required";
  } else if (
    (formValue?.product_type === "Standard" &&
      (formValue?.quantity > 0 || formValue?.free_quantity > 0) &&
      formValue?.sale_price == "") ||
    (formValue?.product_type === "Variation" &&
      variationPricingRequired(formValue, "sale_price"))
  ) {
    return "Sale price is required";
  } else if (variationMinimumOneField(formValue)) {
    return "Must be variation one field required";
  }
};

// const handleSubmit = (formValue) => {
//   if (formValue?.name === "") {
//     setError("Product name is required");
//   } else if (formValue?.product_category_id == "") {
//     setError("Product category is required");
//   } else if (
//     (formValue?.product_type === "Standard" &&
//       (formValue?.quantity > 0 || formValue?.free_quantity > 0) &&
//       formValue?.purchase_price == "") ||
//     (formValue?.product_type === "Variation" &&
//       variationPricingRequired(formValue, "purchase_price"))
//   ) {
//     setError("Purchase price is required");
//   } else if (
//     (formValue?.product_type === "Standard" &&
//       (formValue?.quantity > 0 || formValue?.free_quantity > 0) &&
//       formValue?.sale_price == "") ||
//     (formValue?.product_type === "Variation" &&
//       variationPricingRequired(formValue, "sale_price"))
//   ) {
//     setError("Sale price is required");
//   } else if (variationMinimumOneField(formValue)) {
//     setError("Must be variation one field required");
//   } else {
//     productUploadFunc();
//   }
// };
