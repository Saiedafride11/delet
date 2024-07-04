import React from "react";
import { Link } from "react-router-dom";
import plusIcon from "../../../../assets/images/icons/plus.svg";
import { useGetProductWarrantyQuery } from "../../../../redux/features/products/warranty/productWarrantyApi";

import SearchSelectOption from "../../../../components/common/SearchSelectOption";
import useSearchSelectOption from "../../../../hooks/useSearchSelectOption";
import ProductWarrantyModal from "../../components/Modal/ProductWarrantyModal";

const WarrantyName = ({ initialKey, initialValue, setFormValue }) => {
  const {
    data: productWarranty,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductWarrantyQuery();

  const initialData = productWarranty?.data?.warranty;
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
          label="Product Warranty"
          placeholder="Enter warranty"
          handleSearchChange={handleSearchChange}
          handleFieldClick={handleFieldClick}
          handleResultClick={handleResultClick}
        />
        <span className="pos-right-arrow"></span>
        <Link data-bs-toggle="modal" data-bs-target="#product-warranty-modal">
          <img src={plusIcon} alt="icon" />
        </Link>
      </div>
      <ProductWarrantyModal />
    </>
  );
};

export default WarrantyName;
