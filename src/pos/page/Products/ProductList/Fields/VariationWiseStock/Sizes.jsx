import React from "react";
import SearchSelectOption from "../../../../../components/common/SearchSelectOption";
import useSearchSelectOption from "../../../../../hooks/useSearchSelectOption";
import { useGetProductSizeQuery } from "../../../../../redux/features/products/variation/size/productSizeApi";

const Sizes = ({ name, value, setVariationValue, selectedKey }) => {
  const {
    data: productSizes,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductSizeQuery();

  const initialData = productSizes?.data?.sizes;
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
      placeholder="Size..."
      handleSearchChange={handleSearchChange}
      handleFieldClick={handleFieldClick}
      handleResultClick={handleResultClick}
    />
  );
};

export default React.memo(Sizes);
