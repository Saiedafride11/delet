import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import plusIcon from "../../../../assets/images/icons/plus.svg";
import SearchSelectOption from "../../../../components/common/SearchSelectOption";
import useSearchSelectOption from "../../../../hooks/useSearchSelectOption";
import { useGetProductBrandQuery } from "../../../../redux/features/products/brand/productBrandApi";
import ProductBrandModal from "../../components/modal/ProductBrandModal";

const BrandName = ({ initialKey, formValue, setFormValue }) => {
  const {
    data: productBrand,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductBrandQuery();

  const initialData = productBrand?.data?.brand;
  const {
    items,
    searchText,
    setSearchText,
    enabledResult,
    setEnabledResult,
    handleSearchChange,
    handleFieldClick,
    handleResultClick,
  } = useSearchSelectOption(
    initialData,
    setFormValue,
    initialKey,
    formValue?.brand_id //initialValue
  );

  useEffect(() => {
    if (initialData !== undefined && formValue?.p_model_id !== "") {
      const matchedBrand = initialData?.find((item) =>
        item.models?.some((model) => model.id === formValue?.p_model_id)
      );
      setFormValue((prev) => ({ ...prev, brand_id: matchedBrand?.id }));
      setSearchText(matchedBrand?.name);
    }
  }, [initialData, formValue?.p_model_id]);

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
          label="Brand"
          placeholder="Enter brand"
          handleSearchChange={handleSearchChange}
          handleFieldClick={handleFieldClick}
          handleResultClick={handleResultClick}
        />
        <span className="pos-right-arrow"></span>
        <Link data-bs-toggle="modal" data-bs-target="#product-brand-modal">
          <img src={plusIcon} alt="icon" />
        </Link>
      </div>
      <ProductBrandModal />
    </>
  );
};

export default BrandName;
