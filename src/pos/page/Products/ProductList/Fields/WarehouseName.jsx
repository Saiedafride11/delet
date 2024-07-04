import React from "react";
import { Link } from "react-router-dom";
import plusIcon from "../../../../assets/images/icons/plus.svg";

import SearchSelectOption from "../../../../components/common/SearchSelectOption";
import ProductWarehouseModal from "../../../../components/modal/Warehouse/ProductWarehouseModal";
import useSearchSelectOption from "../../../../hooks/useSearchSelectOption";
import { useGetWarehouseQuery } from "../../../../redux/features/warehouse/warehouseApi";

const WarehouseName = ({ initialKey, initialValue, setFormValue }) => {
  const {
    data: productWarehouse,
    isLoading,
    isError,
    isSuccess,
  } = useGetWarehouseQuery();

  const initialData = productWarehouse?.data?.warehouse;
  const {
    items,
    searchText,
    enabledResult,
    setEnabledResult,
    handleSearchChange,
    handleFieldClick,
    handleResultClick,
  } = useSearchSelectOption(
    initialData,
    setFormValue,
    initialKey,
    initialValue
  );

  return (
    <>
      <div className="input-wrapper pos-up-down-arrow">
        <SearchSelectOption
          items={items}
          searchText={searchText}
          enabledResult={enabledResult}
          setEnabledResult={setEnabledResult}
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
          label="Warehouse"
          placeholder="Enter warehouse"
          handleSearchChange={handleSearchChange}
          handleFieldClick={handleFieldClick}
          handleResultClick={handleResultClick}
        />
        <span className="pos-right-arrow"></span>
        <Link data-bs-toggle="modal" data-bs-target="#product-warehouse-modal">
          <img src={plusIcon} alt="icon" />
        </Link>
      </div>
      <ProductWarehouseModal />
    </>
  );
};

export default WarehouseName;
