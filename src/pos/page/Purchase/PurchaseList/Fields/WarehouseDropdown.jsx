import React from "react";
import useClickOutside from "../../../../hooks/useClickOutside";
import { useGetWarehouseQuery } from "../../../../redux/features/warehouse/warehouseApi";

const WarehouseDropdown = ({
  product_index,
  warehouse_name,
  warehouse_open,
  setFormValue,
}) => {
  const {} = useClickOutside(setFormValue, "sales-purchase-warehouse");

  const { data: productWarehouse, isLoading, isError } = useGetWarehouseQuery();

  const handleWarehouseClick = (product_index, id, name) => {
    setFormValue((prev) => ({
      ...prev,
      items: prev.items?.map((item, index) =>
        index === product_index
          ? {
              ...item,
              warehouse_id: id,
              warehouse_name: name,
              warehouse_open: !item?.warehouse_open,
            }
          : {
              ...item,
              warehouse_open: false,
            }
      ),
    }));
  };

  const handleOpen = () => {
    setFormValue((prev) => ({
      ...prev,
      items: prev.items?.map((item, index) => ({
        ...item,
        warehouse_open: index === product_index ? !item?.warehouse_open : false,
      })),
    }));
  };

  return (
    <div className="sales-purchase-warehouse">
      <div onClick={handleOpen}>
        {warehouse_name === "" ? (
          // <span className="arrow">{">"} In-house</span>
          <span>In-house</span>
        ) : (
          warehouse_name
        )}
      </div>
      <div className={`content ${warehouse_open ? "d-block" : "d-none"}`}>
        {productWarehouse?.data?.warehouse?.length === 0 ||
        productWarehouse?.data?.warehouse === undefined ||
        isLoading ||
        isError ? (
          <label>No data found!</label>
        ) : (
          <>
            <div>
              <label
                className="cursor-pointer d-block"
                onClick={() =>
                  handleWarehouseClick(product_index, "", "In-house")
                }
              >
                In-house
              </label>
            </div>
            {productWarehouse?.data?.warehouse?.map((warehouse) => (
              <div key={warehouse?.id}>
                <label
                  className="cursor-pointer d-block"
                  onClick={() =>
                    handleWarehouseClick(
                      product_index,
                      warehouse?.id,
                      warehouse?.name
                    )
                  }
                >
                  {warehouse?.name}
                </label>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default WarehouseDropdown;
