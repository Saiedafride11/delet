import React from "react";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";

const LossProfitViewModal = ({ updateData }) => {
  const updateItemData = updateData?.sale_details?.map((data) => ({
    name: data?.product?.name,
    quantity: data?.quantity,
    purchase_price: data?.purchase_price,
    sale_price: data?.sale_price,
    profit: data?.loss_profit > 0 ? data?.loss_profit : 0,
    loss: data?.loss_profit < 0 ? data?.loss_profit : 0,
  }));

  const totals = updateItemData?.reduce(
    (total, item) => ({
      quantity: total.quantity + (item?.quantity || 0),
      purchasePrice: total.purchasePrice + (item?.purchase_price || 0),
      salePrice: total.salePrice + (item?.sale_price || 0),
      profit: total.profit + (item?.profit || 0),
      loss: total.loss + (item?.loss || 0),
    }),
    { quantity: 0, purchasePrice: 0, salePrice: 0, profit: 0, loss: 0 }
  );

  return (
    <div
      className="modal fade modal-custom-design"
      id="show-loss-profit-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
              Invoice: {updateData?.prefix + updateData?.invoice}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="mb-3 d-flex align-items-center justify-content-center">
            <div className="overflow-auto w-100 mx-3">
              <table className="table mb-0 mt-3">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th className="text-center">Purchases Price</th>
                    <th className="text-center">Sale Price</th>
                    <th className="text-center">Profit (+)</th>
                    <th className="text-center">Loss (-)</th>
                  </tr>
                </thead>
                <tbody>
                  {updateItemData?.map((data, index) => (
                    <tr key={index}>
                      <td>{data?.name}</td>
                      <td>{data?.quantity}</td>
                      <td className="text-center">
                        $
                        {getNumberWithCommas(
                          twoDigitFixed(data?.purchase_price)
                        )}
                      </td>
                      <td className="text-center">
                        ${getNumberWithCommas(twoDigitFixed(data?.sale_price))}
                      </td>
                      <td className="text-center text-green">
                        ${getNumberWithCommas(twoDigitFixed(data?.profit))}
                      </td>
                      <td className="text-center text-orange">
                        ${getNumberWithCommas(twoDigitFixed(data?.loss))}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <thead>
                  <tr>
                    <th>Total</th>
                    <th>{totals?.quantity}</th>
                    <th className="text-center">
                      $
                      {getNumberWithCommas(
                        twoDigitFixed(totals?.purchasePrice)
                      )}
                    </th>
                    <th className="text-center">
                      ${getNumberWithCommas(twoDigitFixed(totals?.salePrice))}
                    </th>
                    <th className="text-center">
                      ${getNumberWithCommas(twoDigitFixed(totals?.profit))}
                    </th>
                    <th className="text-center">
                      ${getNumberWithCommas(twoDigitFixed(totals?.loss))}
                    </th>
                  </tr>
                </thead>
              </table>
              <div>
                <div className="d-flex align-items-center justify-content-between mt-2">
                  <label className="col-form-label">Total Profit</label>
                  <label className="col-form-label">
                    $
                    {getNumberWithCommas(
                      twoDigitFixed(updateData?.sale_details_sum_profit)
                    )}
                  </label>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <label className="col-form-label">Total Loss</label>
                  <label className="col-form-label">
                    $
                    {getNumberWithCommas(
                      twoDigitFixed(updateData?.sale_details_sum_loss)
                    )}
                  </label>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <label className="col-form-label">Total Discount</label>
                  <label className="col-form-label">Coming...</label>
                </div>
                <div className="d-flex align-items-center justify-content-between bg-sky-sm rounded-bottom px-2 mt-2">
                  <label className="col-form-label fw-bold">
                    {updateData?.sale_details_sum_profit > 0
                      ? "Total Profit"
                      : "Total Loss"}
                  </label>
                  <label className="col-form-label">
                    $
                    {getNumberWithCommas(
                      twoDigitFixed(
                        updateData?.sale_details_sum_profit > 0
                          ? updateData?.sale_details_sum_profit
                          : updateData?.sale_details_sum_loss
                      )
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LossProfitViewModal;
