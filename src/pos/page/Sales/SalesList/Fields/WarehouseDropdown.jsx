import React, { useState } from "react";
import useGetWarehouseQuery from "../../../../redux/features/warehouse/warehouseApi";

const WarehouseDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: productWarehouse, isLoading, isError } = useGetWarehouseQuery();
  return (
    <div className="sales-purchase-warehouse">
      <span onClick={() => setIsOpen(!isOpen)}>Mirpur 10</span>
      <div className={`content ${isOpen ? "d-block" : "d-none"}`}>
        {productWarehouse?.data?.warehouse?.length === 0 ||
        productWarehouse?.data?.warehouse === undefined ||
        isLoading ||
        isError ? (
          <label>No data found!</label>
        ) : (
          productWarehouse?.data?.warehouse?.map((warehouse) => (
            <div key={warehouse?.id}>
              <label className="cursor-pointer d-block">
                {warehouse?.name}
              </label>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WarehouseDropdown;
