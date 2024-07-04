import React from "react";

import { useParams } from "react-router-dom";

import BaseColorSpinnerGrow from "../../../../components/ui/Spinner/BaseColorSpinnerGrow";
import { useGetSalesDueSlipQuery } from "../../../../redux/features/due/dueApi";
import SalesPurchaseSlip from "./SalesPurchaseSlip";

const DueSalesSlipInvoice = () => {
  const { slipId } = useParams();
  const { data: dueData, isLoading: dueIsLoading } =
    useGetSalesDueSlipQuery(slipId);

  return (
    <div className="invoice-section custom-invoice-section overflow-auto">
      {dueIsLoading ? (
        <BaseColorSpinnerGrow />
      ) : (
        <SalesPurchaseSlip
          initialData={dueData?.data?.collection}
          slipType="sale"
        />
      )}
    </div>
  );
};

export default DueSalesSlipInvoice;
