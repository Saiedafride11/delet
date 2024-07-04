import React from "react";

const SearchSelectOption = ({
  items,
  searchText,
  enabledResult,
  setEnabledResult,
  isLoading,
  isError,
  isSuccess,
  placeholder,
  label,
  star,
  handleSearchChange,
  handleFieldClick,
  handleResultClick,
}) => {
  return (
    <div className="w-100">
      <div className="custom-focus-label">
        <input
          value={searchText || ""}
          onChange={handleSearchChange}
          onClick={handleFieldClick}
          onBlur={() => setEnabledResult(false)}
          type="text"
          placeholder={placeholder}
          className="form-control m-0 search-select-option-input"
        />
        <label className="d-flex align-items-center gap-1">
          {label}
          <div className="text-orange">{star}</div>
        </label>
      </div>
      <div
        className={`search-select-option ${
          enabledResult ? "d-block" : "d-none"
        }`}
      >
        {items?.length === 0 || items === undefined || isLoading || isError ? (
          <div>
            <button className="option-btn text-center">No data found!</button>
          </div>
        ) : (
          items?.map((item, i) => (
            <div key={i}>
              <button
                onMouseDown={() => handleResultClick(item?.id, item?.name)}
                className="option-btn"
              >
                {item.name}
              </button>
            </div>
          ))
        )}
        {/* when scroll pagination open, then show this loader */}
        {items !== undefined && isLoading === false && isSuccess === false && (
          <div className="bg-red">
            <button className="option-btn text-center text-white fw-bold">
              Loading...
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSelectOption;
