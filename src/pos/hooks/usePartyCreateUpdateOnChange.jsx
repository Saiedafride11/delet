import { twoDigitFixed } from "../components/function/twoDigitFixed";

const usePartyCreateUpdateOnChange = (formValue, setFormValue) => {
  const handleOnChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const newFormValue = { ...formValue };
    newFormValue[fieldName] = fieldValue;
    if (fieldName === "opening_balance") {
      if (fieldValue < 0) {
        setFormValue((prev) => ({
          ...prev,
          opening_balance: 0,
        }));
      } else {
        setFormValue((prev) => ({
          ...prev,
          opening_balance: twoDigitFixed(fieldValue),
        }));
      }
    } else if (fieldName === "credit_limit") {
      if (fieldValue < 0) {
        setFormValue((prev) => ({
          ...prev,
          credit_limit: 0,
        }));
      } else {
        setFormValue((prev) => ({
          ...prev,
          credit_limit: twoDigitFixed(fieldValue),
        }));
      }
    } else {
      setFormValue(newFormValue);
    }
  };

  return { handleOnChange };
};

export default usePartyCreateUpdateOnChange;
