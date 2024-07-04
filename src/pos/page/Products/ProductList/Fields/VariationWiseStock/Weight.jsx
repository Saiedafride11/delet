import React from "react";
import SearchSelectOption from "../../../../../components/common/SearchSelectOption";
import useSearchSelectOption from "../../../../../hooks/useSearchSelectOption";
import { useGetProductWeightQuery } from "../../../../../redux/features/products/variation/weight/productWeightApi";

const Weight = ({ name, value, setVariationValue, selectedKey }) => {
  const {
    data: productWeight,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductWeightQuery();

  const initialData = productWeight?.data?.weight;
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
      placeholder="Weight..."
      handleSearchChange={handleSearchChange}
      handleFieldClick={handleFieldClick}
      handleResultClick={handleResultClick}
    />
  );
};

export default React.memo(Weight);
