import React from "react";
import { imageApiUrl } from "../../../../components/env/envApi";
import { getMonthDayYearFormat } from "../../../../components/function/getMonthDayYearFormat";
import { getNumberWithCommas } from "../../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../../components/function/twoDigitFixed";
import { partyTypeMap } from "../../../../components/types/partyTypeMap";

const PartyListViewModal = ({ updateData, currencySymbol }) => {
  const referenceData = JSON.parse(updateData?.reference || "{}");

  return (
    <div
      className="modal fade modal-custom-design"
      id="party-view-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg-600">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
              Party Details
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="view-description product">
              <div className="d-flex justify-content-between flex-wrap">
                <ul>
                  <li>
                    <span>Joining Date</span> <span>:</span>
                    <strong>
                      {getMonthDayYearFormat(updateData?.date) || "N/A"}
                    </strong>
                  </li>
                  <li>
                    <span>Party Name</span> <span>:</span>
                    <strong className="max-w-200">
                      {updateData?.name || "N/A"}
                    </strong>
                  </li>
                  <li>
                    <span>Party Type </span> <span>:</span>
                    <strong>
                      {partyTypeMap[updateData?.party_type] || "N/A"}
                    </strong>
                  </li>
                  <li>
                    <span>Phone Number</span> <span>:</span>
                    <strong>{updateData?.phone || "N/A"}</strong>
                  </li>
                  <li>
                    <span>Email</span> <span>:</span>
                    <strong>{updateData?.email || "N/A"}</strong>
                  </li>
                  <li>
                    <span>Address</span> <span>:</span>
                    <strong>{updateData?.address || "N/A"}</strong>
                  </li>
                  <li>
                    <span>Reward Point</span> <span>:</span>
                    <strong>{updateData?.reward || 0}</strong>
                  </li>
                  <li>
                    <span>Wallet</span> <span>:</span>
                    <strong
                      className={`${
                        updateData?.balance > 0
                          ? "text-green-lg"
                          : "text-orange"
                      }`}
                    >
                      {currencySymbol}
                      {updateData?.balance > 0 ? "+" : ""}
                      {getNumberWithCommas(twoDigitFixed(updateData?.balance))}
                    </strong>
                  </li>
                  <li>
                    <span>Credit Limit</span> <span>:</span>
                    <strong>
                      {currencySymbol +
                        getNumberWithCommas(
                          twoDigitFixed(updateData?.credit_limit)
                        )}
                    </strong>
                  </li>
                  <li>
                    <span>Balance Type</span> <span>:</span>
                    <strong>{updateData?.opening_balance_type}</strong>
                  </li>
                </ul>
                <div>
                  {updateData?.nid_passport_image === null ? (
                    ""
                  ) : (
                    <img
                      src={imageApiUrl + updateData?.nid_passport_image}
                      alt="image"
                      className="w-120 rounded-2 object-fit-cover"
                    />
                  )}
                </div>
              </div>
              {referenceData?.length > 0 && (
                <>
                  <h6 className="mt-3 mb-2">
                    Reference (3 to {referenceData?.length})
                  </h6>
                  {referenceData?.map((reference, index) => (
                    <div key={index} className="mb-3">
                      <small className="fw-bold">Reference - {index + 1}</small>
                      <div className="d-flex justify-content-between flex-wrap">
                        <ul>
                          <li>
                            <span>Name</span> <span>:</span>
                            <strong className="max-w-200">
                              {reference?.name || "N/A"}
                            </strong>
                          </li>
                          <li>
                            <span>Phone Number</span> <span>:</span>
                            <strong>{reference?.phone || "N/A"}</strong>
                          </li>
                          <li>
                            <span>Email</span> <span>:</span>
                            <strong>{reference?.email || "N/A"}</strong>
                          </li>
                          <li>
                            <span>Address</span> <span>:</span>
                            <strong>{reference?.email || "N/A"}</strong>
                          </li>
                        </ul>
                        <div>
                          {reference?.nid_passport_image === null ? (
                            ""
                          ) : (
                            <img
                              src={
                                imageApiUrl +
                                reference?.nid_pass_image.replace(
                                  imageApiUrl,
                                  ""
                                )
                              }
                              alt="image"
                              className="w-120 rounded-2 object-fit-cover"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PartyListViewModal);
