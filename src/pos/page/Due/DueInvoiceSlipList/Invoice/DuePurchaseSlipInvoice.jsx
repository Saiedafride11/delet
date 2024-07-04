import React from "react";

import { useParams } from "react-router-dom";
import BaseColorSpinnerGrow from "../../../../components/ui/Spinner/BaseColorSpinnerGrow";
import { useGetPurchaseDueSlipQuery } from "../../../../redux/features/due/dueApi";
import SalesPurchaseSlip from "./SalesPurchaseSlip";

const DuePurchaseSlipInvoice = () => {
  const { slipId } = useParams();
  const { data: dueData, isLoading: dueIsLoading } =
    useGetPurchaseDueSlipQuery(slipId);

  return (
    <div className="invoice-section custom-invoice-section overflow-auto">
      {dueIsLoading ? (
        <BaseColorSpinnerGrow />
      ) : (
        <SalesPurchaseSlip
          initialData={dueData?.data?.collection}
          slipType="purchase"
        />
      )}
    </div>
  );
};

export default DuePurchaseSlipInvoice;
