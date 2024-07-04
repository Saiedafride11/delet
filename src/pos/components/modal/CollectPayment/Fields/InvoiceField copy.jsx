import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const InvoiceField = ({
  searchText,
  setSearchText,
  partyData,
  setFormValue,
  modifiedSingleParty,
}) => {
  const [enabledResult, setEnabledResult] = useState(false);
  const [matchedData, setMatchedData] = useState([]);
  const getSingleInvoice = useSelector(
    (state) => state?.dueList?.dueSingleInvoice
  );

  const initialData =
    partyData?.sales?.length > 0 ? partyData?.sales : partyData?.purchase;

  const handleChange = (e) => {
    const value = e.target.value;
    searchFunc(value);
    setSearchText(value);
    setFormValue((prev) => ({
      ...prev,
      id: "",
      payable_due_amount: 0,
    }));
  };

  const handleFieldClick = () => {
    setMatchedData(initialData);
    setEnabledResult(true);
  };

  const handleResultClick = (data) => {
    setEnabledResult(false);

    if (data === "Party_Due") {
      setSearchText("Party Due");
      setFormValue((prev) => ({
        ...prev,
        id: null,
        payable_due_amount: Math.abs(partyData?.balance), //when party balance minus
        amount: 0,
      }));
    } else {
      const invoice = data?.invoice;
      setSearchText(invoice);
      searchFunc(invoice);

      setFormValue((prev) => ({
        ...prev,
        id: data.id,
        payable_due_amount: data?.payable_due_amount,
        amount: 0,
      }));
    }

    // console.log("partyData", data);
  };

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  // Without Invoice Select, Single Invoice
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  useEffect(() => {
    if (
      getSingleInvoice !== undefined &&
      Object.keys(getSingleInvoice).length !== 0
    ) {
      setSearchText(getSingleInvoice?.invoice);
      searchFunc(getSingleInvoice?.invoice);
      setFormValue((prev) => ({
        ...prev,
        id: getSingleInvoice.id,
        payable_due_amount: getSingleInvoice?.payable_due_amount,
      }));
    }
  }, [getSingleInvoice]);

  useEffect(() => {
    if (modifiedSingleParty?.party_id !== "") {
      setSearchText("Party Due");
      setFormValue((prev) => ({
        ...prev,
        id: null,
        payable_due_amount: Math.abs(modifiedSingleParty?.balance),
        amount: 0,
      }));
    }
  }, [modifiedSingleParty?.party_id]);

  const searchFunc = (value) => {
    // const filterData = initialData?.filter((item) =>
    //   ["invoice", "pur_invoice"].some((key) =>
    //     item[key]?.toLowerCase().includes(value?.toLowerCase())
    //   )
    // );

    const filterData = initialData?.filter((item) =>
      item?.invoice?.toLowerCase().includes(value?.toLowerCase())
    );
    setMatchedData(filterData);
  };

  const displayData = searchText === "" ? initialData : matchedData;

  return (
    <div className="custom-focus-label">
      <label>Select Invoice</label>
      <div className="input-wrapper pos-up-down-arrow">
        {Object.keys(getSingleInvoice).length === 0 &&
        modifiedSingleParty?.party_id === "" ? (
          <>
            <div className="w-100">
              <input
                value={searchText || ""}
                onClick={handleFieldClick}
                onChange={handleChange}
                onBlur={() => setEnabledResult(false)}
                type="text"
                placeholder="Enter invoice"
                className="form-control m-0 search-select-option-input"
              />
              <div
                className={`search-select-option ${
                  enabledResult ? "d-block" : "d-none"
                }`}
              >
                {displayData?.length === 0 ? (
                  <div>
                    <button className="option-btn text-center">
                      No data found!
                    </button>
                  </div>
                ) : (
                  <>
                    {partyData?.balance < 0 && (
                      <div>
                        <button
                          onMouseDown={() => handleResultClick("Party_Due")}
                          className="option-btn party-due-invoice"
                        >
                          Party Due
                        </button>
                      </div>
                    )}
                    {displayData?.map((item, i) => (
                      <div key={i}>
                        <button
                          onMouseDown={() => handleResultClick(item)}
                          className="option-btn"
                        >
                          {item.invoice}
                        </button>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
            <span></span>
          </>
        ) : (
          <div className="w-100">
            <input
              readOnly
              value={"searchText" || ""}
              type="text"
              placeholder="Enter invoice"
              className="form-control m-0 search-select-option-input"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceField;
