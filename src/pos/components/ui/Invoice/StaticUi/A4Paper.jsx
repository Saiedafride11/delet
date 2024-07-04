import React from "react";
import logoUrl from "../../../../assets/images/logo.svg";

const A4Paper = () => {
  return (
    <div className="invoice-section">
      <div className="container print-max-w">
        <div className="invoice-content">
          <div>
            <div className="heading d-flex justify-content-between">
              <div>
                <img src={logoUrl} alt="logo" className="w-300" />
              </div>
              <div className="store-name text-end">
                <h2>aPOS</h2>
                <p>Mobile : 09423671415</p>
                <p>16 Rr 2, Ketchikan, Alaska 99901, USA</p>
                <p>Email: info@mybusiness.com</p>
              </div>
            </div>
            <div className="title text-center my-3">
              <h3 className="static-ui-h3">Invoice/Bill</h3>
            </div>

            <div className="invoice-info">
              <ul>
                <li>
                  <strong>Customer</strong> <strong>:</strong> Shaidul Islam
                </li>
                <li>
                  <strong>Mobile</strong>
                  <strong>:</strong>017365214561
                </li>
                <li>
                  <strong>Address</strong>
                  <strong>:</strong> 16 Rr 2, Ketchikan, Alaska 99901, USA
                </li>
                <li>
                  <strong>Remarks</strong> <strong>:</strong> N/A
                </li>
              </ul>
              <ul>
                <li>
                  <strong>Invoice No</strong>
                  <strong>:</strong>AN2add561443
                </li>
                <li>
                  <strong>Date</strong> <strong>:</strong>
                  25/11/2023
                </li>
                <li>
                  <strong>Bill Type</strong> <strong>:</strong>
                  Due
                </li>
                <li>
                  <strong>Sold By</strong>
                  <strong>:</strong> Rakib Himel
                </li>
                <li>
                  <strong>Sale By</strong>
                  <strong>:</strong>Tarongo Himel
                </li>
              </ul>
            </div>

            <table className="table table-bordered border-0 mt-3 mb-2">
              <thead>
                <tr>
                  <th className="w-40">S.L</th>
                  <th className="text-start">Product Description</th>
                  <th className="w-85">Warranty</th>
                  <th className="w-55">QTY</th>
                  <th className="text-end w-90">Unit Price</th>
                  <th className="text-end w-90">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01</td>
                  <td className="text-start">Watch</td>
                  <td>N/A</td>
                  <td>5</td>
                  <td className="text-end">200</td>
                  <td className="text-end">1000</td>
                </tr>
                <tr>
                  <td>02</td>
                  <td className="text-start">Shoes</td>
                  <td>N/A</td>
                  <td>10</td>
                  <td className="text-end">100</td>
                  <td className="text-end">1000</td>
                </tr>
              </tbody>
            </table>

            <div className="amount-section static-amount">
              <div className="d-flex align-items-center pe-5">
                <p>
                  <strong>Amounts in words : </strong>One thousand one hundred
                </p>
              </div>
              <div>
                <div className="d-flex align-items-center justify-content-between">
                  <p>Sub-Total</p>
                  <p>1,20,000.00</p>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p>Discount</p>
                  <p>0.00</p>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p>Added VAT </p>
                  <p>0.00</p>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p>Add Service Charges</p>
                  <p>0.00</p>
                </div>
                <div className="d-flex align-items-center justify-content-between amount">
                  <h5>Total Amount</h5>
                  <h5>1,20,000.00</h5>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p>Receive Amount</p>
                  <p>50,000.00</p>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p>Previous Due</p>
                  <p>1,70,000.00</p>
                </div>
                <div className="d-flex align-items-center justify-content-between amount">
                  <h5>Current Due Amount</h5>
                  <h5>1,70,000.00</h5>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="invoice-signature d-flex justify-content-between mb-3">
              <p>Customer Signature</p>
              <p>Authorized Signature</p>
            </div>

            <div className="text-center develop-by">
              <p>Development by: acnoo.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default A4Paper;
