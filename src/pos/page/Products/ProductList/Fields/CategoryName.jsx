import React from "react";
import { Link } from "react-router-dom";
import plusIcon from "../../../../assets/images/icons/plus.svg";
import SearchSelectOption from "../../../../components/common/SearchSelectOption";
import useSearchSelectOption from "../../../../hooks/useSearchSelectOption";
import { useGetProductCategoriesQuery } from "../../../../redux/features/products/categories/productCategoriesApi";
import ProductCategoryModal from "../../components/modal/ProductCategoryModal";

const CategoryName = ({ initialKey, initialValue, setFormValue }) => {
  const {
    data: productCategories,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductCategoriesQuery();

  const initialData = productCategories?.data?.product_categories;
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
          label="Category Name"
          star="*"
          placeholder="Enter category"
          handleSearchChange={handleSearchChange}
          handleFieldClick={handleFieldClick}
          handleResultClick={handleResultClick}
        />
        <span className="pos-right-arrow"></span>
        <Link data-bs-toggle="modal" data-bs-target="#product-category-modal">
          <img src={plusIcon} alt="icon" />
        </Link>
      </div>
      <ProductCategoryModal />
    </>
  );
};

export default CategoryName;
