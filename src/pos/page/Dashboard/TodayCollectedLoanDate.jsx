import React from "react";

const TodayCollectedLoanDate = ({ loanCollectedDate }) => {
  return (
    <div className="acnoo-dashboard-wrapper">
      <div className="acnoo-dashboard-details-wrapper dashboard-home-content">
        <div className="border-bottom px-3 pb-2 pt-0">
          <h6>Today Loan collection date </h6>
        </div>
        <div className="p-3">
          {loanCollectedDate?.map((data, index) => (
            <div key={index} className="d-flex align-items-center card-content">
              {/* <div>
                  <h2 className="first-word-count bg-green-lg">
                    {data?.sale?.party?.name
                      ?.split(" ")
                      ?.slice(0, 2)
                      ?.map((word) => word[0])
                      .join("")}
                  </h2>
                </div> */}
              <div>
                <h2 className="first-word-count bg-purple">JD</h2>
              </div>
              <div className="d-flex align-items-center justify-content-between w-100 ms-3">
                <div>
                  <p>{data?.title}</p>
                  <p>
                    <small>{data?.date}</small>
                  </p>
                </div>
                <div>
                  <p className="text-end">${data?.amount}</p>
                  <p className="text-end">
                    <small className={data?.paid ? "text-green" : "text-red"}>
                      {data?.paid ? "Paid" : "Unpaid"}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodayCollectedLoanDate;
