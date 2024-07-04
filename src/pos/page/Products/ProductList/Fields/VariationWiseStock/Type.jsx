import React from "react";
import SearchSelectOption from "../../../../../components/common/SearchSelectOption";
import useSearchSelectOption from "../../../../../hooks/useSearchSelectOption";
import { useGetProductTypeQuery } from "../../../../../redux/features/products/variation/type/productTypeApi";

const Type = ({ name, value, setVariationValue, selectedKey }) => {
  const {
    data: productType,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductTypeQuery();

  const initialData = productType?.data?.type;
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
      placeholder="Type..."
      handleSearchChange={handleSearchChange}
      handleFieldClick={handleFieldClick}
      handleResultClick={handleResultClick}
    />
  );
};

export default React.memo(Type);
