import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userMinusIcon from "../../../../assets/images/icons/user-minus.svg";
import { getNumberWithCommas } from "../../../../components/function/getNumberWithCommas";
import { isCreatedAtDifferent } from "../../../../components/function/isCreatedAtDifferent";
import { twoDigitFixed } from "../../../../components/function/twoDigitFixed";
import useScrollPagination from "../../../../hooks/useScrollPagination";
import { useGetAllPartyQuery } from "../../../../redux/features/party/party/partyApi";
import PartyAddWithoutSupplierModal from "./PartyAddWithoutSupplierModal";
import { partyTypeMap } from "../../../../components/types/partyTypeMap";

const PartyWithoutSupplier = ({ formValue, setFormValue }) => {
  const [searchText, setSearchText] = useState("");
  const [dueAmount, setDueAmount] = useState(0);
  const [enabledResult, setEnabledResult] = useState(false);
  const [allDataResult, setAllDataResult] = useState(false);
  const { perPage } = useScrollPagination("search-select-option");

  const filterQuery = `?extend=Sale&search=${
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
      handlePriceUpdateWithParty();
      setDueAmount(0);
      setFormValue((prev) => ({ ...prev, party_id: "", party_amount: "" }));
    }
  };

  const handleResultClick = (item) => {
    const { id, name, party_type, balance } = item;
    setEnabledResult(false);
    setSearchText(name);
    // setDueAmount(balance >= 0 ? 0 : Math.abs(balance));
    setDueAmount(balance);
    handlePriceUpdateWithParty(id, party_type, balance);
  };

  useEffect(() => {
    if (isCreatedAtDifferent(initialData)?.length > 0) {
      const result = isCreatedAtDifferent(initialData);
      setSearchText(result[0]?.name || "");
      // setDueAmount(result[0]?.balance >= 0 ? 0 : Math.abs(result[0]?.balance));
      setDueAmount(result[0]?.balance);
      handlePriceUpdateWithParty(
        result[0]?.id,
        result[0]?.party_type,
        result[0]?.balance
      );
    }
  }, [initialData]);

  const handlePriceUpdateWithParty = (partyId, partyType, balance) => {
    const custom_sale_price =
      partyType == 2
        ? "dealer_price"
        : partyType == 4
        ? "wholesale_price"
        : "old_sale_price";

    const updatedData = formValue?.items?.map((item) => ({
      ...item,
      sale_price: item[custom_sale_price],
      discount:
        partyType == 3
          ? item?.discount_type === "Fixed"
            ? twoDigitFixed(item?.exist_unit_price - item[custom_sale_price])
            : twoDigitFixed(
                100 - (item[custom_sale_price] / item?.exist_unit_price) * 100
              )
          : 0,
    }));

    const totalAmount = updatedData?.reduce(
      (total, item) => total + item.sale_price * item.quantity,
      0
    );

    setFormValue((prev) => ({
      ...prev,
      party_id: partyId || "",
      party_type: partyType || "",
      party_amount: balance,
      items: updatedData,
      total_amount: totalAmount,
      grand_total: twoDigitFixed(
        totalAmount +
          Number(prev?.vat) +
          Number(prev?.service_charge) -
          Number(prev?.discount)
      ),
      due_amount: twoDigitFixed(
        totalAmount +
          Number(prev?.vat) +
          Number(prev?.service_charge) -
          Number(prev?.discount) -
          Number(prev?.paid_amount)
      ),
    }));
  };

  // console.log("initialData", initialData);

  const partyInfo = formValue?.party;
  useEffect(() => {
    if (partyInfo !== undefined && searchText === "") {
      setSearchText(partyInfo?.name);
      setDueAmount(partyInfo?.balance);
    }
  }, [partyInfo]);

  // console.log(" initialData", initialData);
  return (
    <div className="custom-focus-label">
      <label>
        Party
        <small className={dueAmount > 0 ? "text-green-lg" : "text-orange"}>
          (Balance: ${getNumberWithCommas(twoDigitFixed(Math.abs(dueAmount)))})
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
                    onMouseDown={() => handleResultClick(item)}
                    className="option-btn"
                  >
                    {item.name} -{" "}
                    <strong
                      className={
                        (item?.party_type == 3 && "text-retailer") ||
                        (item?.party_type == 4 && "text-wholesaler") ||
                        (item?.party_type == 2 && "text-dealer")
                      }
                    >
                      ( {partyTypeMap[item?.party_type]} )
                    </strong>{" "}
                    ( {item?.phone} )
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
      <PartyAddWithoutSupplierModal setSearchText={setSearchText} />
    </div>
  );
};

export default PartyWithoutSupplier;
