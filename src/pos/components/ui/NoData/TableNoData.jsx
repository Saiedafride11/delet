import React from "react";
import noDataIcon from "../../../assets/images/icons/no-data.svg";

const TableNoData = () => {
  return (
    <tr>
      <td colSpan="13">
        <div className="py-3">
          <img src={noDataIcon} alt="icon" />
        </div>
      </td>
    </tr>
  );
};

export default TableNoData;
