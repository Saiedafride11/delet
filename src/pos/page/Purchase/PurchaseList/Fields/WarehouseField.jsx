import React, { useEffect, useState } from "react";
import { useGetWarehouseQuery } from "../../../../redux/features/warehouse/warehouseApi";

const WarehouseField = ({ warehouseId, setFormValue }) => {
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
    if (warehouseId == "") {
      setSearchText("In-house");
    } else if (warehouseId !== "") {
      const matchedData = initialData?.find((item) => item?.id === warehouseId);
      setSearchText(matchedData?.name);
      filterSearchItems(searchText);
    } else {
      setSearchText("");
    }
  }, [warehouseId, initialData]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value === "") {
      setFormValue((prev) => ({ ...prev, warehouse: { id: "", name: "" } }));
    }
  };

  const handleFieldClick = () => {
    // if (searchText === "" || searchText === undefined) {
    //   setItems(initialData);
    // }
    setItems(initialData);
    setEnabledResult(true);
  };

  const handleResultClick = (id, name) => {
    setEnabledResult(false);
    setSearchText(name);
    setItems(initialData);
    setFormValue((prev) => ({ ...prev, warehouse: { id: id, name: name } }));
  };

  const filterSearchItems = (text) => {
    const matchedData = initialData?.filter((item) =>
      item?.name?.toLowerCase().includes(text?.toLowerCase())
    );
    setItems(matchedData || []);
  };

  return (
    <div className="input-wrapper pos-up-down-arrow">
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
          <label className="d-flex align-items-center gap-1">Warehouse</label>
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
              <button className="option-btn text-center">No data found!</button>
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
                    onMouseDown={() => handleResultClick(item?.id, item?.name)}
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
    </div>
  );
};

export default WarehouseField;
