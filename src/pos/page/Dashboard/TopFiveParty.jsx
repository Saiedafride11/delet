import React from "react";
import { partyTypeMap } from "../../components/types/partyTypeMap";

const TopFiveParty = ({ topFiveParty }) => {
  return (
    <div className="acnoo-dashboard-wrapper">
      <div className="acnoo-dashboard-details-wrapper dashboard-home-content">
        <div className="border-bottom px-3 pb-2 pt-0">
          <h6>Top 5 Party</h6>
        </div>
        <div className="p-3">
          {topFiveParty?.map((data, index) => (
            <div key={index} className="d-flex align-items-center card-content">
              <div>
                <h2 className="first-word-count bg-orange">
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
                    <small>{partyTypeMap[data?.party_type]}</small>
                  </p>
                </div>
                <p>${Math.floor(data?.sales_sum_grand_total)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopFiveParty;
