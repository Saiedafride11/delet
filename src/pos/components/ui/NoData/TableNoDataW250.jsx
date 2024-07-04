import React from "react";
import noDataIcon from "../../../assets/images/icons/no-data.svg";

const TableNoDataW250 = () => {
  return (
    <tr>
      <td colSpan="13">
        <div className="py-3 text-center">
          <img src={noDataIcon} alt="icon" className="w-250" />
        </div>
      </td>
    </tr>
  );
};

export default TableNoDataW250;
