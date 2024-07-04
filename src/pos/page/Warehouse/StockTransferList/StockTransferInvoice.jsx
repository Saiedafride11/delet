import React from "react";

import { useParams } from "react-router-dom";
import { getNumberWithCommas } from "../../../components/function/getNumberWithCommas";
import { twoDigitFixed } from "../../../components/function/twoDigitFixed";
import DevelopedBy from "../../../components/ui/Invoice/DevelopedBy";
import PrintButton from "../../../components/ui/Invoice/PrintButton";
import StoreInfo from "../../../components/ui/Invoice/StoreInfo";
import BaseColorSpinnerGrow from "../../../components/ui/Spinner/BaseColorSpinnerGrow";
import { useGetWarehouseTransferQuery } from "../../../redux/features/warehouse/warehouseTransferApi";

const StockTransferInvoice = () => {
  const { stockTransferId } = useParams();
  const { data: stockTransferData, isLoading } =
    useGetWarehouseTransferQuery(stockTransferId);
  const initialData = stockTransferData?.data?.["stock-transfer"];

  console.log("initialData", initialData);

  return (
    <div className="invoice-section custom-invoice-section overflow-auto">
      {isLoading ? (
        <BaseColorSpinnerGrow />
      ) : (
        <div className="container print-max-w">
          <PrintButton initialData={initialData} />
          <div className="invoice-content print-p-15">
            <div>
              <StoreInfo />
              <div className="title text-center my-3">
                <h3 className="border-bottom-0">
                  Invoice ID:
                  {initialData?.prefix + initialData?.invoice}
                </h3>
              </div>
              {/* Info */}
              <div className="invoice-info">
                <div>
                  <h3 className="invoice-from-to-title">From</h3>
                  <ul>
                    <li>
                      <strong>Name</strong> <strong>:</strong>{" "}
                      {initialData?.from_warehouse?.name || " N/A"}
                    </li>
                    <li>
                      <strong>Mobile</strong>
                      <strong>:</strong>{" "}
                      {initialData?.from_warehouse?.phone || " N/A"}
                    </li>
                    <li>
                      <strong>Address</strong>
                      <strong>:</strong>{" "}
                      {initialData?.from_warehouse?.address || " N/A"}
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="invoice-from-to-title">To</h3>
                  <ul>
                    <li>
                      <strong>Name</strong> <strong>:</strong>
                      {initialData?.to_warehouse?.name || " N/A"}
                    </li>
                    <li>
                      <strong>Mobile</strong>
                      <strong>:</strong>{" "}
                      {initialData?.to_warehouse?.phone || " N/A"}
                    </li>
                    <li>
                      <strong>Address</strong>
                      <strong>:</strong>{" "}
                      {initialData?.to_warehouse?.address || " N/A"}
                    </li>
                  </ul>
                </div>
              </div>

              <table className="table table-bordered border-0 mt-3 mb-2">
                <thead>
                  <tr>
                    <th className="w-40">S.L</th>
                    <th className="text-start">Product Description</th>
                    <th className="text-center w-85">Warranty</th>
                    <th className="text-center w-55">QTY</th>
                    <th className="text-center w-90">Unit Price</th>
                    <th className="text-center w-90">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {initialData?.stock_transfer_details?.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index < 9 ? `0${index + 1}` : index + 1}</td>
                      <td className="text-start">
                        {item?.from_stock?.product?.name}
                        <br />
                        {item?.serial_no?.length === 0 ||
                        item?.serial_no[0] === null ? (
                          ""
                        ) : (
                          <>
                            <strong>S/N: </strong>
                            {item?.serial_no
                              .map((serial) => `${serial}, `)
                              .join("")
                              .replace(/, $/, "")}
                          </>
                        )}
                      </td>
                      <td className="text-center">
                        {item?.warranty === null || !item?.warranty
                          ? "N/A"
                          : item?.warranty}
                      </td>
                      <td className="text-center">{item?.quantity}</td>
                      <td className="text-center">
                        {getNumberWithCommas(item?.from_stock?.purchase_price)}
                      </td>
                      <td className="text-center">
                        {getNumberWithCommas(
                          item?.quantity * item?.from_stock?.purchase_price || 0
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="amount-section">
                <div></div>
                <div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p>Total Qty</p>
                    <p>
                      {getNumberWithCommas(
                        twoDigitFixed(
                          initialData?.stock_transfer_details?.reduce(
                            (total, item) => total + item.quantity,
                            0
                          )
                        )
                      )}
                    </p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p>Total Stock Value</p>
                    <p>
                      {getNumberWithCommas(
                        twoDigitFixed(
                          initialData?.stock_transfer_details?.reduce(
                            (total, item) =>
                              total +
                              item?.from_stock?.purchase_price * item?.quantity,
                            0
                          )
                        )
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="invoice-signature d-flex justify-content-between mb-3">
                <p>Form Warehouse Signature</p>
                <p>To Warehouse Signature</p>
              </div>
              <DevelopedBy />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockTransferInvoice;
