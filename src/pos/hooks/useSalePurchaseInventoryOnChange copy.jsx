import { handleErrorModalWithCross } from "../components/ui/Toast/handleErrorModalWithCross";

const useSalePurchaseInventoryOnChange = (formValue, setFormValue) => {
  const handleOnChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const newFormValue = { ...formValue };
    newFormValue[fieldName] = fieldValue;
    if (fieldName === "paid_amount") {
      if (parseFloat(fieldValue) > parseFloat(formValue?.grand_total)) {
        handleErrorModalWithCross(
          "Paying amount less than or equal to main price"
        );
        setFormValue((prev) => ({
          ...prev,
          paid_amount: 0,
          due_amount: formValue?.grand_total,
        }));
      } else {
        setFormValue((prev) => ({
          ...prev,
          paid_amount: fieldValue === "" ? 0 : parseFloat(fieldValue),
          due_amount:
            fieldValue === ""
              ? formValue?.grand_total
              : formValue?.grand_total - parseFloat(fieldValue),
        }));
      }
    } else if (fieldName === "service_charge") {
      if (fieldValue < 1) {
        const grandTotal =
          formValue?.total_amount + formValue?.vat - formValue?.discount;
        setFormValue((prev) => ({
          ...prev,
          service_charge: 0,
          grand_total: grandTotal,
          due_amount: grandTotal - formValue?.paid_amount,
        }));
      } else {
        const grandTotal =
          formValue?.total_amount +
          formValue?.vat +
          parseFloat(fieldValue) -
          formValue?.discount;
        setFormValue((prev) => ({
          ...prev,
          service_charge: parseFloat(fieldValue),
          grand_total: grandTotal,
          due_amount: grandTotal - formValue?.paid_amount,
        }));
      }
    } else if (fieldName === "vat_percent") {
      if (fieldValue > 100) {
        handleErrorModalWithCross("Percent less than or equal 100");
        const grandTotal =
          formValue?.total_amount +
          formValue?.service_charge -
          formValue?.discount;
        setFormValue((prev) => ({
          ...prev,
          vat: 0,
          vat_percent: 0,
          grand_total: grandTotal,
          due_amount: grandTotal - formValue?.paid_amount,
        }));
      } else if (fieldValue < 1) {
        // handleErrorModalWithCross("Percent gether than or equal 1");
        const grandTotal =
          formValue?.total_amount +
          formValue?.service_charge -
          formValue?.discount;
        setFormValue((prev) => ({
          ...prev,
          vat: 0,
          vat_percent: 0,
          grand_total: grandTotal,
          due_amount: grandTotal - formValue?.paid_amount,
        }));
      } else {
        const mainPrice = parseFloat(formValue?.total_amount);
        const discountPercentage = parseFloat(fieldValue);
        const vatAmount = Math.ceil((mainPrice * discountPercentage) / 100);

        const grandTotal =
          formValue?.total_amount +
          formValue?.service_charge +
          vatAmount -
          formValue?.discount;
        setFormValue((prev) => ({
          ...prev,
          vat: vatAmount,
          vat_percent: parseFloat(fieldValue),
          grand_total: grandTotal,
          due_amount: grandTotal - formValue?.paid_amount,
        }));
      }
    } else if (fieldName === "vat") {
      if (fieldValue < 1) {
        const grandTotal =
          formValue?.total_amount +
          formValue?.service_charge -
          formValue?.discount;
        setFormValue((prev) => ({
          ...prev,
          vat: 0,
          vat_percent: 0,
          grand_total: grandTotal,
          due_amount: grandTotal - formValue?.paid_amount,
        }));
      } else {
        const mainPrice = parseFloat(formValue?.total_amount);
        const vatPrice = parseFloat(fieldValue);
        const percentage = Math.ceil((vatPrice * 100) / mainPrice);
        const updatePercentage = percentage === Infinity ? 0 : percentage;
        const grandTotal =
          formValue?.total_amount +
          formValue?.service_charge +
          vatPrice -
          formValue?.discount;
        setFormValue((prev) => ({
          ...prev,
          vat: parseFloat(fieldValue),
          vat_percent: updatePercentage,
          grand_total: grandTotal,
          due_amount: grandTotal - formValue?.paid_amount,
        }));
      }
    } else if (fieldName === "discount_percent") {
      if (fieldValue > 100) {
        handleErrorModalWithCross("Percent less than or equal 100");

        const grandTotal =
          formValue?.total_amount + formValue?.vat + formValue?.service_charge;
        setFormValue((prev) => ({
          ...prev,
          discount: 0,
          discount_percent: 0,
          grand_total: grandTotal,
          due_amount: grandTotal - formValue?.paid_amount,
        }));
      } else if (fieldValue < 1) {
        // handleErrorModalWithCross("Percent gether than or equal 1");
        const grandTotal =
          formValue?.total_amount + formValue?.vat + formValue?.service_charge;
        setFormValue((prev) => ({
          ...prev,
          discount: 0,
          discount_percent: 0,
          grand_total: grandTotal,
          due_amount: grandTotal - formValue?.paid_amount,
        }));
      } else {
        const mainPrice = parseFloat(formValue?.total_amount);
        const discountPercentage = parseFloat(fieldValue);
        const discountAmount = Math.ceil(
          (mainPrice * discountPercentage) / 100
        );
        const grandTotal =
          formValue?.total_amount +
          formValue?.vat +
          formValue?.service_charge -
          discountAmount;
        setFormValue((prev) => ({
          ...prev,
          discount: discountAmount,
          discount_percent: parseFloat(fieldValue),
          grand_total: grandTotal,
          due_amount: grandTotal - formValue?.paid_amount,
        }));
      }
    } else if (fieldName === "discount") {
      if (parseFloat(fieldValue) > parseFloat(formValue?.total_amount)) {
        handleErrorModalWithCross("Discount less than or equal to main price");

        const grandTotal =
          formValue?.total_amount + formValue?.vat + formValue?.service_charge;
        setFormValue((prev) => ({
          ...prev,
          discount: 0,
          discount_percent: 0,
          grand_total: grandTotal,
          due_amount: grandTotal - formValue?.paid_amount,
        }));
      } else if (fieldValue < 1) {
        // handleErrorModalWithCross("Discount gether than or equal 1");
        const grandTotal =
          formValue?.total_amount + formValue?.vat + formValue?.service_charge;
        setFormValue((prev) => ({
          ...prev,
          discount: 0,
          discount_percent: 0,
          grand_total: grandTotal,
          due_amount: grandTotal - formValue?.paid_amount,
        }));
      } else {
        const mainPrice = parseFloat(formValue?.total_amount);
        const discountPrice = parseFloat(fieldValue);
        const percentage = Math.ceil((discountPrice * 100) / mainPrice);

        const grandTotal =
          formValue?.total_amount +
          formValue?.vat +
          formValue?.service_charge -
          discountPrice;
        setFormValue((prev) => ({
          ...prev,
          discount: parseFloat(fieldValue),
          discount_percent: percentage,
          grand_total: grandTotal,
          due_amount: grandTotal - formValue?.paid_amount,
        }));
      }
    } else {
      setFormValue(newFormValue);
    }
  };

  return { handleOnChange };
};

export default useSalePurchaseInventoryOnChange;

//----------------------------------
// input type text
//----------------------------------
// const handleOnChange = (e) => {
//   const field = e.target.name;
//   // const value = e.target.value.replace(/,/g, "");
//   const value = e.target.value.replace(/[^0-9]/g, "");
//   const newFormValue = { ...formValue };
//   newFormValue[field] = Number(value);
// newFormValue[field] = parseFloat(value);
//   setFormValue(newFormValue);
// };
