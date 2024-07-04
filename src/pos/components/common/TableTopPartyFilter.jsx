import React from "react";

const TableTopPartyFilter = ({ partyType, setPartyType }) => {
  return (
    <div className="input-wrapper pos-up-down-arrow wrapper-type">
      <select
        required
        name="party_type"
        className="form-control m-0"
        value={partyType}
        onChange={(e) => setPartyType(e.target.value)}
      >
        <option className="d-none">Select Party</option>
        <option value="1">Supplier</option>
        <option value="2">Dealer</option>
        <option value="3">Retailer</option>
        <option value="4">Wholesaler</option>
        <option value="">All</option>
      </select>
      <span></span>
    </div>
  );
};

export default TableTopPartyFilter;
