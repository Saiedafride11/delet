import React, { useState } from "react";
import CreateCategory from "./Fields/CreateCategory";
import ExpenseCreateUpdate from "./Fields/ExpenseCreateUpdate";

const ExpenseCreateUpdateModal = ({ updateData, setUpdateData }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  return (
    <div
      className="modal fade modal-custom-design"
      id="expense-list-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg-600">
        <ExpenseCreateUpdate
          updateData={updateData}
          setUpdateData={setUpdateData}
          isCategoryOpen={isCategoryOpen}
          setIsCategoryOpen={setIsCategoryOpen}
        />
        <CreateCategory
          isCategoryOpen={isCategoryOpen}
          setIsCategoryOpen={setIsCategoryOpen}
        />
      </div>
    </div>
  );
};

export default React.memo(ExpenseCreateUpdateModal);
