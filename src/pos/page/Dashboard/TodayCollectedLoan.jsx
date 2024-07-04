import React from "react";
import { partyTypeMap } from "../../components/types/partyTypeMap";

const TodayCollectedLoan = ({ loanCollectedData }) => {
  return (
    <div className="acnoo-dashboard-wrapper">
      <div className="acnoo-dashboard-details-wrapper dashboard-home-content">
        <div className="border-bottom px-3 pb-2 pt-0">
          <h6>Today Loan Collected</h6>
        </div>
        <div className="p-3">
          <div className="five-items dashboard-custom-scroll">
            {loanCollectedData?.map((data, index) => (
              <div
                key={index}
                className="d-flex align-items-center card-content"
              >
                <div>
                  <h2 className="first-word-count bg-green-lg">
                    {data?.sale?.party?.name
                      ?.split(" ")
                      ?.slice(0, 2)
                      ?.map((word) => word[0])
                      .join("")}
                  </h2>
                </div>
                <div className="d-flex align-items-center justify-content-between w-100 ms-3">
                  <div>
                    <p>{data?.sale?.party?.name}</p>
                    <p>
                      <small>
                        {partyTypeMap[data?.sale?.party?.party_type]}
                      </small>
                    </p>
                  </div>
                  <div>
                    <p className="text-end">${data?.amount}</p>
                    <div className="d-flex align-items-center">
                      <div
                        className={`progress ${
                          // data?.collectUpper ? "upper " : "down"
                          "down"
                        }`}
                      >
                        <div className="percent"></div>
                      </div>
                      <p className="ms-2">
                        <small>50%</small>
                        {/* <small>{data?.percent}%</small> */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayCollectedLoan;
