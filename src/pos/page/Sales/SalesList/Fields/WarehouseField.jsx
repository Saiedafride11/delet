import React, { useEffect, useState } from "react";
import { useGetWarehouseQuery } from "../../../../redux/features/warehouse/warehouseApi";

const WarehouseField = ({ initialKey, formValue, setFormValue }) => {
  const initialValue = formValue?.warehouse_id;
  const {
    data: productWarehouse,
    isLoading,
    isError,
    isSuccess,
  } = useGetWarehouseQuery();

  const initialData = productWarehouse?.data?.warehouse;
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [enabledResult, setEnabledResult] = useState(false);

  useEffect(() => {
    if (searchText === "" || searchText === undefined) {
      setItems(initialData);
    } else {
      filterSearchItems(searchText);
    }
  }, [searchText, initialData]);

  useEffect(() => {
    if (initialValue == "") {
      setSearchText("In-house");
    } else if (initialValue !== "") {
      const matchedData = initialData?.find(
        (item) => item?.id === initialValue
      );
      setSearchText(matchedData?.name);
      filterSearchItems(searchText);
    } else {
      setSearchText("");
    }
  }, [initialValue, initialData]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value === "") {
      setFormValue((prev) => ({ ...prev, [initialKey]: "" }));
    }
  };

  const handleFieldClick = () => {
    setItems(initialData);
    setEnabledResult(true);
  };

  const handleResultClick = (id, name) => {
    setEnabledResult(false);
    setSearchText(name);
    setItems(initialData);
    setFormValue((prev) => ({ ...prev, [initialKey]: id }));
  };

  const filterSearchItems = (text) => {
    const matchedData = initialData?.filter((item) =>
      item?.name?.toLowerCase().includes(text?.toLowerCase())
    );
    setItems(matchedData || []);
  };

  return (
    <div className="input-wrapper pos-up-down-arrow">
      {formValue?.items?.length > 0 ? (
        <div className="custom-focus-label w-100">
          <input
            value={searchText || ""}
            type="text"
            placeholder="Enter warehouse"
            className="form-control m-0 search-select-option-input"
            disabled
          />
          <label className="bg-transparent">Warehouse</label>
        </div>
      ) : (
        <>
          <div className="w-100">
            <div className="custom-focus-label">
              <input
                value={searchText || ""}
                onChange={handleSearchChange}
                onClick={handleFieldClick}
                onBlur={() => setEnabledResult(false)}
                type="text"
                placeholder="Enter warehouse"
                className="form-control m-0 search-select-option-input"
              />
              <label className="d-flex align-items-center gap-1">
                Warehouse
              </label>
            </div>
            <div
              className={`search-select-option ${
                enabledResult ? "d-block" : "d-none"
              }`}
            >
              {items?.length === 0 ||
              items === undefined ||
              isLoading ||
              isError ? (
                <div>
                  <button className="option-btn text-center">
                    No data found!
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <button
                      onMouseDown={() => handleResultClick("", "In-house")}
                      className="option-btn"
                    >
                      In-house
                    </button>
                  </div>
                  {items?.map((item, i) => (
                    <div key={i}>
                      <button
                        onMouseDown={() =>
                          handleResultClick(item?.id, item?.name)
                        }
                        className="option-btn"
                      >
                        {item.name}
                      </button>
                    </div>
                  ))}
                </>
              )}
              {/* when scroll pagination open, then show this loader */}
              {items !== undefined &&
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
          <span></span>
        </>
      )}
    </div>
  );
};

export default WarehouseField;
