import React from "react";
import SearchSelectOption from "../../../../../components/common/SearchSelectOption";
import useSearchSelectOption from "../../../../../hooks/useSearchSelectOption";
import { useGetProductColorQuery } from "../../../../../redux/features/products/variation/color/productColorApi";

const Colors = ({ name, value, setVariationValue, selectedKey }) => {
  const {
    data: productColors,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductColorQuery();

  const initialData = productColors?.data?.colors;
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
      placeholder="Color..."
      handleSearchChange={handleSearchChange}
      handleFieldClick={handleFieldClick}
      handleResultClick={handleResultClick}
    />
  );
};

export default React.memo(Colors);
