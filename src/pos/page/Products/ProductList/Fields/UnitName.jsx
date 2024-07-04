import React from "react";
import { Link } from "react-router-dom";
import plusIcon from "../../../../assets/images/icons/plus.svg";
import SearchSelectOption from "../../../../components/common/SearchSelectOption";
import useSearchSelectOption from "../../../../hooks/useSearchSelectOption";
import { useGetProductUnitQuery } from "../../../../redux/features/products/unit/productUnitApi";
import ProductUnitModal from "../../components/Modal/ProductUnitModal";

const UnitName = ({ initialKey, initialValue, setFormValue }) => {
  const {
    data: productUnit,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductUnitQuery();

  const initialData = productUnit?.data?.unit;
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
          label="Product Units"
          star="*"
          placeholder="Enter unit"
          handleSearchChange={handleSearchChange}
          handleFieldClick={handleFieldClick}
          handleResultClick={handleResultClick}
        />
        <span className="pos-right-arrow"></span>
        <Link data-bs-toggle="modal" data-bs-target="#product-unit-modal">
          <img src={plusIcon} alt="icon" />
        </Link>
      </div>
      <ProductUnitModal />
    </>
  );
};

export default UnitName;
