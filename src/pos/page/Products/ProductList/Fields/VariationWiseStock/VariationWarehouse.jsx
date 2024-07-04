import React from "react";
import SearchSelectOption from "../../../../../components/common/SearchSelectOption";
import useSearchSelectOption from "../../../../../hooks/useSearchSelectOption";
import { useGetWarehouseQuery } from "../../../../../redux/features/warehouse/warehouseApi";

const VariationWarehouse = ({
  name,
  value,
  setVariationValue,
  selectedKey,
}) => {
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
    setVariationValue,
    name,
    value,
    selectedKey,
    "variation"
  );

  return (
    <SearchSelectOption
      items={items}
      searchText={searchText}
      enabledResult={enabledResult}
      setEnabledResult={setEnabledResult}
      isLoading={isLoading}
      isError={isError}
      isSuccess={isSuccess}
      placeholder="Warehouse..."
      handleSearchChange={handleSearchChange}
      handleFieldClick={handleFieldClick}
      handleResultClick={handleResultClick}
    />
  );
};

export default React.memo(VariationWarehouse);
