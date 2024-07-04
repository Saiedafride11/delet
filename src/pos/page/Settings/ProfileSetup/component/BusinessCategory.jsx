import React from "react";
import SearchSelectOption from "../../../../components/common/SearchSelectOption";
import useSearchSelectOption from "../../../../hooks/useSearchSelectOption";
import { useGetBusinessCategoriesQuery } from "../../../../redux/features/auth/admin/adminApi";

const BusinessCategory = ({ initialKey, initialValue, setFormValue }) => {
  const {
    data: categoriesData,
    isLoading,
    isError,
    isSuccess,
  } = useGetBusinessCategoriesQuery();

  const initialData = categoriesData?.data?.business_categories;
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
          placeholder="Enter category"
          label="Business Category"
          handleSearchChange={handleSearchChange}
          handleFieldClick={handleFieldClick}
          handleResultClick={handleResultClick}
        />
        <span></span>
      </div>
    </>
  );
};

export default BusinessCategory;
