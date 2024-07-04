import React from "react";

const MultipleDeleteItems = ({ selectItems }) => {
  return (
    <>
      <div className="multiple-delete-selected mt-3 d-flex align-items-center justify-content-between flex-wrap gap-2 mx-20">
        <p>{selectItems?.length} rows selected</p>
        <button data-bs-toggle="modal" data-bs-target="#delete_modal">
          Delete
        </button>
      </div>
    </>
  );
};

export default MultipleDeleteItems;
