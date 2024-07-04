import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userMinusIcon from "../../../../assets/images/icons/user-minus.svg";
import { getNumberWithCommas } from "../../../../components/function/getNumberWithCommas";
import { isCreatedAtDifferent } from "../../../../components/function/isCreatedAtDifferent";
import { twoDigitFixed } from "../../../../components/function/twoDigitFixed";
import useScrollPagination from "../../../../hooks/useScrollPagination";
import { useGetAllPartyQuery } from "../../../../redux/features/party/party/partyApi";
import PartyAddModal from "./PartyAddModal";

const PartyWithSupplier = ({ partyInfo, setFormValue }) => {
  const [searchText, setSearchText] = useState("");
  const [partyAmount, setPartyAmount] = useState(0);
  const [enabledResult, setEnabledResult] = useState(false);
  const [allDataResult, setAllDataResult] = useState(false);
  const { perPage } = useScrollPagination("search-select-option");

  const filterQuery = `?extend=Purchase&search=${
    allDataResult ? "" : searchText
  }&page=1&per_page=${perPage}`;
  const {
    data: partyData,
    isLoading,
    isError,
    isSuccess,
  } = useGetAllPartyQuery(filterQuery);

  const initialData = partyData?.data?.parties?.data;

  const handleFieldClick = () => {
    setEnabledResult(true);
    setAllDataResult(true);
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setAllDataResult(false);

    if (value === "") {
      setFormValue((prev) => ({ ...prev, party_id: "", party_amount: "" }));
      setPartyAmount(0);
    }
  };

  const handleResultClick = (id, name, due_amount) => {
    setEnabledResult(false);
    setSearchText(name);
    setPartyAmount(due_amount);
    setFormValue((prev) => ({
      ...prev,
      party_id: id,
      party_amount: due_amount,
    }));
  };

  useEffect(() => {
    if (isCreatedAtDifferent(initialData)?.length > 0) {
      const result = isCreatedAtDifferent(initialData);
      setSearchText(result[0]?.name || "");
      setPartyAmount(result[0]?.balance);
      setFormValue((prev) => ({
        ...prev,
        party_id: result[0]?.id,
        party_amount: result[0]?.balance,
      }));
    }
  }, [initialData]);

  useEffect(() => {
    if (partyInfo !== undefined && searchText === "") {
      setSearchText(partyInfo?.name);
      setPartyAmount(partyInfo?.balance);
    }
  }, [partyInfo]);

  return (
    <div className="custom-focus-label">
      <label>
        Party
        <small className={partyAmount > 0 ? "text-green-lg" : "text-orange"}>
          (Balance: ${getNumberWithCommas(twoDigitFixed(Math.abs(partyAmount)))}
          )
        </small>
      </label>
      <div className="input-wrapper pos-up-down-arrow">
        <div className="w-100">
          <input
            value={searchText || ""}
            onClick={handleFieldClick}
            onChange={handleOnChange}
            onBlur={() => setEnabledResult(false)}
            type="text"
            placeholder="Enter party name"
            className="form-control m-0 search-select-option-input"
          />
          <div
            className={`search-select-option ${
              enabledResult ? "d-block" : "d-none"
            }`}
          >
            {initialData?.length === 0 ||
            initialData === undefined ||
            isLoading ||
            isError ? (
              <div>
                <button className="option-btn text-center">
                  No data found!
                </button>
              </div>
            ) : (
              initialData?.map((item, i) => (
                <div key={i}>
                  <button
                    onMouseDown={() =>
                      handleResultClick(item.id, item.name, item.balance)
                    }
                    className="option-btn"
                  >
                    {item.name} - ( {item?.phone} )
                  </button>
                </div>
              ))
            )}
            {/* when scroll pagination open, then show this loader */}
            {initialData !== undefined &&
              isLoading === false &&
              isSuccess === false && (
                <div className="bg-red">
                  <button className="option-btn text-center text-white fw-bold">
                    Loading...
                  </button>
                </div>
              )}
          </div>
        </div>
        <span className="pos-right-arrow"></span>
        <Link
          data-bs-toggle="modal"
          data-bs-target="#party-add-modal"
          className="bg-sky"
        >
          <img src={userMinusIcon} alt="icon" />
        </Link>
      </div>
      <PartyAddModal setSearchText={setSearchText} />
    </div>
  );
};

export default PartyWithSupplier;
