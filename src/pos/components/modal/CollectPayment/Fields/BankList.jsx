import React from "react";
import { Link } from "react-router-dom";
import plusIcon from "../../../../assets/images/icons/plus.svg";
import SearchSelectOption from "../../../../components/common/SearchSelectOption";
import useSearchSelectOption from "../../../../hooks/useSearchSelectOption";
import { useGetBanksQuery } from "../../../../redux/features/global/bank/bankApi";

const BankList = ({
  initialKey,
  initialValue,
  setFormValue,
  setDueModalOpen,
}) => {
  const { data: banks, isLoading, isSuccess, isError } = useGetBanksQuery();

  const initialData = banks?.data?.banks;
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
          placeholder="Select bank name"
          label="Bank Name"
          handleSearchChange={handleSearchChange}
          handleFieldClick={handleFieldClick}
          handleResultClick={handleResultClick}
        />
        <span className="pos-right-arrow"></span>
        <Link
          onClick={() =>
            setDueModalOpen({
              mainPageOpen: false,
              isInvoiceOpen: false,
              isBankOpen: true,
            })
          }
        >
          <img src={plusIcon} alt="icon" />
        </Link>
      </div>
    </>
  );
};

export default BankList;
