import React from "react";

import { useParams } from "react-router-dom";
import DevelopedBy from "../../../components/ui/Invoice/DevelopedBy";
import InvoiceAmount from "../../../components/ui/Invoice/InvoiceAmount";
import InvoiceInfo from "../../../components/ui/Invoice/InvoiceInfo";
import InvoiceTitle from "../../../components/ui/Invoice/InvoiceTitle";
import PrintButton from "../../../components/ui/Invoice/PrintButton";
import SalePurchaseTable from "../../../components/ui/Invoice/SalePurchaseTable";
import Signature from "../../../components/ui/Invoice/Signature";
import StoreInfo from "../../../components/ui/Invoice/StoreInfo";
import WarrantyVoid from "../../../components/ui/Invoice/WarrantyVoid";
import BaseColorSpinnerGrow from "../../../components/ui/Spinner/BaseColorSpinnerGrow";
import { useGetSaleReturnQuery } from "../../../redux/features/sales/return/salesReturnApi";

const SalesReturnInvoice = () => {
  const { invoiceId } = useParams();
  const { data: saleReturnData, isLoading: saleIsLoading } =
    useGetSaleReturnQuery(invoiceId);
  const initialData = saleReturnData?.data?.["sale_return"];

  return (
    <div className="invoice-section custom-invoice-section overflow-auto">
      {saleIsLoading ? (
        <BaseColorSpinnerGrow />
      ) : (
        <div className="container print-max-w">
          <PrintButton initialData={initialData} />
          <div className="invoice-content print-p-15">
            <div>
              <StoreInfo />
              <InvoiceTitle initialData={initialData} title="Sales Return" />
              <InvoiceInfo items={initialData} />
              <SalePurchaseTable items={initialData} unitPrice="sale_price" />
              <InvoiceAmount initialData={initialData} />
            </div>
            <div>
              <Signature />
              <WarrantyVoid />
              <DevelopedBy />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesReturnInvoice;
