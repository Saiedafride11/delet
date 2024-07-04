import React from "react";
import { imageApiUrl } from "../../../../components/env/envApi";
import { getNumberWithCommas } from "../../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../../components/function/twoDigitFixed";

const ProductListViewModal = ({ updateData, currencySymbol }) => {
  // console.log("updateData", updateData);

  return (
    <div
      className="modal fade modal-custom-design"
      id="pos-view-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`modal-dialog modal-dialog-centered ${
          updateData?.product_type === "Variation" ? "modal-lg" : "modal-lg-600"
        }`}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
              Product Details
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
                    <span>Code</span> <span>:</span>
                    <strong>{updateData?.sku_code || "N/A"}</strong>
                  </li>
                  <li>
                    <span>Product Name</span> <span>:</span>
                    <strong className="max-w-200">
                      {updateData?.name || "N/A"}
                    </strong>
                  </li>
                  <li>
                    <span>Category </span> <span>:</span>
                    <strong>
                      {updateData?.product_category?.name || "N/A"}
                    </strong>
                  </li>
                  <li>
                    <span>Brand</span> <span>:</span>
                    <strong>{updateData?.brand?.name || "N/A"}</strong>
                  </li>
                  <li>
                    <span>Model</span> <span>:</span>
                    <strong>{updateData?.p_model?.name || "N/A"}</strong>
                  </li>
                  <li>
                    <span>Unit</span> <span>:</span>
                    <strong>{updateData?.unit?.name || "N/A"}</strong>
                  </li>
                  <li>
                    <span>Current Stock</span> <span>:</span>
                    <strong>
                      {updateData?.quantity} Pcs (Free{" "}
                      {updateData?.free_quantity})
                    </strong>
                  </li>
                </ul>
                <div>
                  {updateData?.image === null ||
                  updateData?.image?.length === 0 ? (
                    ""
                  ) : (
                    <img
                      src={imageApiUrl + updateData?.image?.[0]}
                      alt="image"
                      className="w-120 rounded-2 object-fit-cover"
                    />
                  )}
                </div>
              </div>

              <h6 className="my-2">Pricing</h6>

              <ul>
                <li>
                  <span>Purchase</span> <span>:</span>
                  <strong>
                    {Object.keys(updateData).length === 0
                      ? 0
                      : currencySymbol +
                        getNumberWithCommas(
                          twoDigitFixed(
                            Math.max(
                              ...updateData?.product_stocks?.map(
                                (item) => item.purchase_price
                              )
                            )
                          )
                        )}
                  </strong>
                </li>
                <li>
                  <span>Retailer</span> <span>:</span>
                  <strong>
                    {Object.keys(updateData).length === 0
                      ? 0
                      : currencySymbol +
                        getNumberWithCommas(
                          twoDigitFixed(
                            Math.max(
                              ...updateData?.product_stocks?.map(
                                (item) => item.sale_price
                              )
                            )
                          )
                        )}
                  </strong>
                </li>
                <li>
                  <span>Wholesale</span> <span>:</span>
                  <strong>
                    {Object.keys(updateData).length === 0
                      ? 0
                      : currencySymbol +
                        getNumberWithCommas(
                          twoDigitFixed(
                            Math.max(
                              ...updateData?.product_stocks?.map(
                                (item) => item.wholesale_price
                              )
                            )
                          )
                        )}
                  </strong>
                </li>
                <li>
                  <span>Dealer</span> <span>:</span>
                  <strong>
                    {Object.keys(updateData).length === 0
                      ? 0
                      : currencySymbol +
                        getNumberWithCommas(
                          twoDigitFixed(
                            Math.max(
                              ...updateData?.product_stocks?.map(
                                (item) => item.dealer_price
                              )
                            )
                          )
                        )}
                  </strong>
                </li>
              </ul>
              {updateData?.product_type === "Variation" && (
                <>
                  <h6 className="mt-3 mb-2">
                    Product Variation ({updateData?.product_stocks?.length})
                  </h6>

                  <div className="overflow-x-auto">
                    <table className="w-100">
                      <thead>
                        <tr className="border-0">
                          <th>S.L</th>
                          <th>Color</th>
                          <th>Size</th>
                          <th>Weight</th>
                          <th>Capacity</th>
                          <th>Type</th>
                          <th className="text-center">Qty</th>
                          <th className="text-center">Free Qty</th>
                        </tr>
                      </thead>
                      <tbody>
                        {updateData?.product_stocks?.map((data, index) => (
                          <tr
                            key={index}
                            className={index === 0 ? "border-0" : ""}
                          >
                            <td>{index < 9 ? `0${index + 1}` : index + 1}</td>
                            <td>{data?.color?.name}</td>
                            <td>{data?.size?.name}</td>
                            <td>{data?.weight?.name}</td>
                            <td>{data?.capacity?.name}</td>
                            <td>{data?.type?.name}</td>
                            <td className="text-center">{data?.quantity}</td>
                            <td className="text-center">
                              {data?.free_quantity}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {updateData?.description && (
                <>
                  <h6 className="my-2">Description</h6>
                  <p>{updateData?.description}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductListViewModal);
