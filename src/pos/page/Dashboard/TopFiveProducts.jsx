import React from "react";

const TopFiveProducts = ({ topFiveProducts }) => {
  return (
    <div className="acnoo-dashboard-wrapper">
      <div className="acnoo-dashboard-details-wrapper dashboard-home-content">
        <div className="border-bottom px-3 pb-2 pt-0">
          <h6>Top 5 Products</h6>
        </div>
        <div className="p-3">
          {topFiveProducts?.map((data, index) => (
            <div key={index} className="d-flex align-items-center card-content">
              <div>
                <h2 className="first-word-count bg-violet">
                  {data?.name
                    ?.split(" ")
                    ?.slice(0, 2)
                    ?.map((word) => word[0])
                    .join("")}
                </h2>
              </div>
              <div className="d-flex align-items-center justify-content-between w-100 ms-3">
                <div>
                  <p>{data?.name}</p>
                  <p>
                    <small>{data?.product_category?.name}</small>
                  </p>
                </div>
                <p>{data?.sale_details_sum_quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopFiveProducts;
