import React from "react";

const LanguageDropdown = ({ value, handleOnChange, className }) => {
  const languageOptions = [
    { value: "en", label: "English" },
    { value: "bn", label: "Bangla" },
  ];
  return (
    <div className={`input-wrapper pos-up-down-arrow ${className}`}>
      <select
        className="form-control m-0"
        name="lang"
        value={value}
        onChange={handleOnChange}
      >
        <option className="d-none text-gray-sm">Language</option>
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <span></span>
    </div>
  );
};

export default LanguageDropdown;
