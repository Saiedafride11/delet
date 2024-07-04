import React, { useState } from "react";
import CollectPayment from "./Fields/CollectPayment";

const CollectPaymentModal = ({ partyId, dueType }) => {
  const [dueModalOpen, setDueModalOpen] = useState({
    mainPageOpen: true,
    isInvoiceOpen: false,
    isBankOpen: false,
  });

  return (
    <div
      className="modal fade modal-custom-design"
      id="collect-payment-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div
        className={`modal-dialog modal-dialog-centered ${
          dueModalOpen?.mainPageOpen ? "modal-lg" : "modal-lg-600"
        }`}
      >
        <CollectPayment
          partyId={partyId}
          dueType={dueType}
          dueModalOpen={dueModalOpen}
          setDueModalOpen={setDueModalOpen}
        />
      </div>
    </div>
  );
};

export default React.memo(CollectPaymentModal);
