import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import plusIcon from "../../../../assets/images/icons/plus.svg";
import SearchSelectOption from "../../../../components/common/SearchSelectOption";
import { isCreatedAtDifferent } from "../../../../components/function/isCreatedAtDifferent";
import useSearchSelectOption from "../../../../hooks/useSearchSelectOption";
import { useGetProductModelQuery } from "../../../../redux/features/products/model/productModelApi";
import ProductModelModal from "../../components/Modal/ProductModelModal";

const ModelName = ({ initialKey, formValue, setFormValue }) => {
  const [filterBrands, setFilterBrands] = useState([]);
  const {
    data: productModel,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductModelQuery();

  const initialData = productModel?.data?.model;

  const {
    items,
    // setItems,
    searchText,
    enabledResult,
    setEnabledResult,
    handleSearchChange,
    handleFieldClick,
    handleResultClick,
  } = useSearchSelectOption(
    filterBrands,
    setFormValue,
    initialKey,
    formValue?.p_model_id //initialValue
  );

  useEffect(() => {
    if (initialData !== undefined && formValue?.brand_id !== "") {
      const matchedBrands = initialData?.filter(
        (data) => data?.brand_id === formValue?.brand_id
      );
      if (isCreatedAtDifferent(initialData)?.length === 0) {
        setFormValue((prev) => ({ ...prev, p_model_id: "" }));
        setFilterBrands(matchedBrands);
      } else {
        setFilterBrands(initialData);
        setTimeout(() => {
          setFilterBrands(matchedBrands);
        }, 500);
      }
    }
  }, [initialData, formValue?.brand_id]);

  return (
    <>
      <div className="input-wrapper pos-up-down-arrow">
        {formValue?.brand_id === "" ? (
          <div className="w-100">
            <div className="custom-focus-label">
              <input
                disabled
                type="text"
                placeholder="Enter model"
                className="form-control m-0 search-select-option-input"
              />
              <label className="bg-transparent">Model</label>
            </div>
          </div>
        ) : (
          <>
            <SearchSelectOption
              items={items}
              searchText={searchText}
              enabledResult={enabledResult}
              setEnabledResult={setEnabledResult}
              isLoading={isLoading}
              isError={isError}
              isSuccess={isSuccess}
              label="Model"
              placeholder="Enter model"
              handleSearchChange={handleSearchChange}
              handleFieldClick={handleFieldClick}
              handleResultClick={handleResultClick}
            />
            <span className="pos-right-arrow"></span>
          </>
        )}
        <Link data-bs-toggle="modal" data-bs-target="#product-model-modal">
          <img src={plusIcon} alt="icon" />
        </Link>
      </div>
      <ProductModelModal />
    </>
  );
};

export default ModelName;
