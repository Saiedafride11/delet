import React from "react";
import { getNumberWithCommas } from "../../function/getNumberWithCommas";

const SalePurchaseTable = ({ items, unitPrice }) => {
  return (
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
        {/* {(
          items?.sale_details ||
          items?.purchase_details ||
          items?.sale_return_details ||
          items?.purchase_return_details
        )?.map((item, index) => 
          
          <tr key={index}>
            <td>{index < 9 ? `0${index + 1}` : index + 1}</td>
            <td className="text-start">
            
              {item?.product_stock?.product?.name}
              <br />
              {item?.serial_no?.length === 0 ? (
                ""
              ) : (
                <>
                  <strong>S/N: </strong>
                  {item?.serial_no
                    ?.map((item) => `${item}, `)
                    .join("")
                    .replace(/, $/, "")}
                </>
              )}
            </td>
            <td>
              {item?.warranty === null || !item?.warranty
                ? "N/A"
                : item?.warranty}
            </td>
            <td>{item?.quantity}</td>
            <td className="text-center">
              {getNumberWithCommas(item?.[unitPrice])}
            </td>
            <td className="text-center">
              {getNumberWithCommas(item?.total_price)}
            </td>
          </tr>
        )} */}

        {(
          items?.sale_details ||
          items?.purchase_details ||
          items?.sale_return_details ||
          items?.purchase_return_details
        )?.map((item, index) => {
          const matchedPurchaseData = items?.purchase?.purchase_details?.find(
            (stock) => stock?.stock_code === item?.stock_code
          );
          const matchedSalesData = items?.sale?.sale_details?.find(
            (stock) => stock?.stock_code === item?.stock_code
          );

          // console.log("matchedData", matchedData);
          return (
            <tr key={item.id}>
              <td>{index < 9 ? `0${index + 1}` : index + 1}</td>
              <td className="text-start">
                {item?.product_stock?.product?.name ||
                  matchedPurchaseData?.product_stock?.product?.name ||
                  matchedSalesData?.product_stock?.product?.name}
                <br />
                {item?.serial_no?.length === 0 ? (
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
              <td className="text-center">
                {!item?.sale_free_quantity
                  ? item?.quantity
                  : item?.quantity + item?.sale_free_quantity}
              </td>
              <td className="text-center">
                {getNumberWithCommas(item?.[unitPrice])}
              </td>
              <td className="text-center">
                {getNumberWithCommas(item?.total_price)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SalePurchaseTable;
