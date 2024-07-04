import React from "react";
import SearchSelectOption from "../../../../../components/common/SearchSelectOption";
import useSearchSelectOption from "../../../../../hooks/useSearchSelectOption";
import { useGetProductCapacityQuery } from "../../../../../redux/features/products/variation/capacity/productCapacityApi";

const Capacity = ({ name, value, setVariationValue, selectedKey }) => {
  const {
    data: productCapacity,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductCapacityQuery();

  const initialData = productCapacity?.data?.capacity;
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
      placeholder="Capacity..."
      handleSearchChange={handleSearchChange}
      handleFieldClick={handleFieldClick}
      handleResultClick={handleResultClick}
    />
  );
};

export default React.memo(Capacity);
