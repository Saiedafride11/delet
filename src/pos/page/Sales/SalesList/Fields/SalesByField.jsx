import React from "react";
import SearchSelectOption from "../../../../components/common/SearchSelectOption";
import useSearchSelectOption from "../../../../hooks/useSearchSelectOption";
import { useGetProductWarehouseQuery } from "../../../../redux/features/products/warehouse/productWarehouseApi";

const SalesByField = ({ initialKey, initialValue, setFormValue }) => {
  const {
    data: productWarehouse,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductWarehouseQuery();

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

  //   console.log("initialData", initialData, items);

  return (
    <div className="input-wrapper pos-up-down-arrow">
      <SearchSelectOption
        items={items}
        searchText={searchText}
        enabledResult={enabledResult}
        setEnabledResult={setEnabledResult}
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        placeholder="Enter sales by"
        label="Sales by"
        handleSearchChange={handleSearchChange}
        handleFieldClick={handleFieldClick}
        handleResultClick={handleResultClick}
      />
      <span></span>
    </div>
  );
};

export default SalesByField;
