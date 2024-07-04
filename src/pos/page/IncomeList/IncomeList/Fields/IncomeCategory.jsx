import React from "react";
import { Link } from "react-router-dom";
import plusIcon from "../../../../assets/images/icons/plus.svg";
import SearchSelectOption from "../../../../components/common/SearchSelectOption";
import useSearchSelectOption from "../../../../hooks/useSearchSelectOption";
import { useGetAllIncomeExpenseCategoryQuery } from "../../../../redux/features/income_expense/income_expense_category/incomeExpenseCategoryApi";

const IncomeCategory = ({
  initialKey,
  initialValue,
  setFormValue,
  setIsCategoryOpen,
}) => {
  const {
    data: categoryData,
    isLoading,
    isSuccess,
    isError,
  } = useGetAllIncomeExpenseCategoryQuery("?filter=income");

  const initialData = categoryData?.data["income-expense-category"];
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
          placeholder="Select Category"
          label="Category"
          handleSearchChange={handleSearchChange}
          handleFieldClick={handleFieldClick}
          handleResultClick={handleResultClick}
        />
        <span className="pos-right-arrow"></span>
        <Link onClick={() => setIsCategoryOpen((prev) => !prev)}>
          <img src={plusIcon} alt="icon" />
        </Link>
      </div>
    </>
  );
};

export default IncomeCategory;
