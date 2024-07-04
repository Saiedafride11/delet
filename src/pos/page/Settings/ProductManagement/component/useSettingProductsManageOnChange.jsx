const useSettingProductsManageOnChange = (setFormValue, dynamicKey) => {
  const handleOnChange = (e) => {
    const field = e.target.name;
    if (field !== "isChecked") {
      setFormValue((prev) => ({
        ...prev,
        [dynamicKey]: {
          ...prev[dynamicKey],
          [field]:
            e.target.type === "checkbox"
              ? !prev[dynamicKey][field]
              : e.target.value,
        },
      }));
    }
  };

  return { handleOnChange };
};

export default useSettingProductsManageOnChange;
