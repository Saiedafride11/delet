import { twoDigitFixed } from "../components/function/twoDigitFixed";
import { handleErrorModalWithCross } from "../components/ui/Toast/handleErrorModalWithCross";

const useProductCreateUpdateOnChange = (
  formValue,
  setFormValue,
  setSerialItems,
  setFreeSerialItems
) => {
  const handleOnChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const newFormValue = { ...formValue };
    newFormValue[fieldName] = fieldValue;

    if (fieldName === "quantity") {
      setFormValue((prev) => ({
        ...prev,
        quantity: fieldValue < 0 ? "" : parseInt(fieldValue),
      }));
    } else if (fieldName === "free_quantity") {
      setFormValue((prev) => ({
        ...prev,
        free_quantity: fieldValue < 0 ? "" : parseInt(fieldValue),
      }));
    } else if (fieldName === "low_quantity") {
      setFormValue((prev) => ({
        ...prev,
        low_quantity: fieldValue < 0 ? "" : parseInt(fieldValue),
      }));
    } else if (fieldName === "purchase_price") {
      setFormValue((prev) => ({
        ...prev,
        purchase_price: fieldValue < 0 ? "" : twoDigitFixed(fieldValue),
      }));
    } else if (fieldName === "sale_price") {
      setFormValue((prev) => ({
        ...prev,
        sale_price: fieldValue < 0 ? "" : twoDigitFixed(fieldValue),
        discount: fieldValue < 0 ? "" : prev.discount,
        discount_type: fieldValue < 1 ? "Fixed" : prev.discount_type,
      }));
    } else if (fieldName === "wholesale_price") {
      setFormValue((prev) => ({
        ...prev,
        wholesale_price: fieldValue < 0 ? "" : twoDigitFixed(fieldValue),
      }));
    } else if (fieldName === "dealer_price") {
      setFormValue((prev) => ({
        ...prev,
        dealer_price: fieldValue < 0 ? "" : twoDigitFixed(fieldValue),
      }));
    } else if (fieldName === "discount") {
      if (formValue?.discount_type === "Percentage") {
        if (fieldValue > 100) {
          handleErrorModalWithCross("Percent less than or equal 100");
          setFormValue((prev) => ({
            ...prev,
            discount: 0,
          }));
        } else if (fieldValue < 1) {
          setFormValue((prev) => ({
            ...prev,
            discount: 0,
          }));
        } else {
          setFormValue((prev) => ({
            ...prev,
            discount: twoDigitFixed(fieldValue),
          }));
        }
      } else {
        if (Number(fieldValue) > Number(formValue?.sale_price)) {
          handleErrorModalWithCross(
            "Discount less than or equal to main price"
          );
          setFormValue((prev) => ({
            ...prev,
            discount: 0,
          }));
        } else if (fieldValue < 1) {
          setFormValue((prev) => ({
            ...prev,
            discount: 0,
          }));
        } else {
          setFormValue((prev) => ({
            ...prev,
            discount: twoDigitFixed(fieldValue),
          }));
        }
      }
    } else if (fieldName === "discount_type") {
      setFormValue({
        ...formValue,
        discount: 0,
        discount_type: fieldValue,
      });
    } else if (fieldName === "product_type") {
      if (fieldValue === "Standard") {
        const allKeys = Object.keys(formValue);
        const keysToRemove = allKeys?.filter((key) =>
          key.includes(`variation[`)
        );
        const updatedFormValue = { ...formValue };
        keysToRemove.forEach((key) => {
          delete updatedFormValue[key];
        });
        setFormValue({
          ...updatedFormValue,
          product_type: fieldValue,
          product_stocks: [],
          quantity: "",
          free_quantity: "",
        });
      } else {
        setSerialItems([]);
        setFreeSerialItems([]);

        const allKeys = Object.keys(formValue);
        const keysToRemove = allKeys?.filter((key) =>
          key.includes(`serial_no[`)
        );
        const updatedFormValue = { ...formValue };
        keysToRemove.forEach((key) => {
          delete updatedFormValue[key];
        });

        setFormValue({
          ...updatedFormValue,
          product_type: fieldValue,
          quantity: "",
          free_quantity: "",
        });
      }
    } else {
      setFormValue(newFormValue);
    }
  };

  return { handleOnChange };
};

export default useProductCreateUpdateOnChange;
