import React from "react";

const StockInventory = () => {
  const lowStockData = [];
  return (
    <div className="acnoo-dashboard-wrapper">
      <div className="acnoo-dashboard-details-wrapper dashboard-home-content">
        <div className="d-flex align-items-center justify-content-between flex-wrap px-3 pb-2 pt-0">
          <h6>Stock Value & Low Stock</h6>
          <p className="text-green fw-bold">$4726793.75</p>
        </div>
        <div className="px-3 pb-3">
          <div className="stock-item dashboard-custom-scroll">
            {lowStockData === undefined || lowStockData?.length === 0
              ? Array.from(Array(20))?.map((_, index) => (
                  <div key={index}>
                    <p>Loading...</p>
                  </div>
                ))
              : lowStockData?.map((data, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <p>{data?.name}</p>
                    <p className="text-red">{data?.quantity}</p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockInventory;
