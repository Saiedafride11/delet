import React from "react";

const SalesPurchaseVariation = ({ data }) => {
  return (
    <>
      {Object.keys(data?.exist_variation || {}).length === 0
        ? data?.name
        : [
            data?.name,
            data?.exist_variation?.color,
            data?.exist_variation?.size,
            data?.exist_variation?.weight,
            data?.exist_variation?.type,
            data?.exist_variation?.capacity,
          ]
            .filter(Boolean)
            .join(", ")}
    </>
  );
};

export default SalesPurchaseVariation;
