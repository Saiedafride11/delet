import { twoDigitFixed } from "../components/function/twoDigitFixed";
import { handleErrorModalWithCross } from "../components/ui/Toast/handleErrorModalWithCross";

const useSalePurchaseOnChange = (formValue, setFormValue) => {
  const handleOnChange = (e) => {
    // const rawValue = e.target.value;
    // const numericValue = parseFloat(rawValue.replace(/[^\d.]+/gi, "")) || 0;
    // const numberWithCommas = numericValue.toLocaleString("en-US", {
    //   maximumFractionDigits: 2,
    // });
    // let numberWithoutCommas = numberWithCommas.replace(/,/g, "");

    // let numberWithoutCommas = numberWithCommas.replace(/,/g, "");
    // console.log("numberWithCommas", numberWithCommas);
    // console.log("numberWithoutCommas", numberWithoutCommas);

    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const newFormValue = { ...formValue };
    newFormValue[fieldName] = fieldValue;
    if (fieldName === "paid_amount") {
      if (Number(fieldValue) > Number(formValue?.grand_total)) {
        handleErrorModalWithCross(
          "Paying amount less than or equal to main price"
        );
        setFormValue((prev) => ({
          ...prev,
          paid_amount: 0,
          due_amount: twoDigitFixed(formValue?.grand_total),
        }));
      } else {
        setFormValue((prev) => ({
          ...prev,
          paid_amount: fieldValue === "" ? 0 : twoDigitFixed(fieldValue),
          due_amount:
            fieldValue === ""
              ? twoDigitFixed(formValue?.grand_total)
              : twoDigitFixed(formValue?.grand_total - Number(fieldValue)),
        }));
      }
    } else if (fieldName === "service_charge") {
      if (fieldValue < 1) {
        const grandTotal =
          Number(formValue?.total_amount) +
          Number(formValue?.vat) -
          Number(formValue?.discount);
        setFormValue((prev) => ({
          ...prev,
          service_charge: 0,
          grand_total: twoDigitFixed(grandTotal),
          due_amount: twoDigitFixed(grandTotal - formValue?.paid_amount),
        }));
      } else {
        const grandTotal =
          Number(formValue?.total_amount) +
          Number(formValue?.vat) +
          Number(fieldValue) -
          Number(formValue?.discount);

        setFormValue((prev) => ({
          ...prev,
          service_charge: twoDigitFixed(fieldValue),
          grand_total: twoDigitFixed(grandTotal),
          due_amount: twoDigitFixed(grandTotal - formValue?.paid_amount),
        }));
      }
    } else if (fieldName === "vat_percent") {
      if (fieldValue > 100) {
        handleErrorModalWithCross("Percent less than or equal 100");
        const grandTotal =
          Number(formValue?.total_amount) +
          Number(formValue?.service_charge) -
          Number(formValue?.discount);
        setFormValue((prev) => ({
          ...prev,
          vat: 0,
          vat_percent: 0,
          grand_total: twoDigitFixed(grandTotal),
          due_amount: twoDigitFixed(grandTotal - formValue?.paid_amount),
        }));
      } else if (fieldValue < 1) {
        // handleErrorModalWithCross("Percent gether than or equal 1");
        const grandTotal =
          Number(formValue?.total_amount) +
          Number(formValue?.service_charge) -
          Number(formValue?.discount);
        setFormValue((prev) => ({
          ...prev,
          vat: 0,
          vat_percent: 0,
          grand_total: twoDigitFixed(grandTotal),
          due_amount: twoDigitFixed(grandTotal - formValue?.paid_amount),
        }));
      } else {
        const mainPrice = Number(formValue?.total_amount);
        const discountPercentage = Number(fieldValue);
        const vatAmount = twoDigitFixed((mainPrice * discountPercentage) / 100);

        const grandTotal =
          Number(formValue?.total_amount) +
          Number(formValue?.service_charge) +
          Number(vatAmount) -
          Number(formValue?.discount);
        setFormValue((prev) => ({
          ...prev,
          vat: twoDigitFixed(vatAmount),
          vat_percent: twoDigitFixed(fieldValue),
          grand_total: twoDigitFixed(grandTotal),
          due_amount: twoDigitFixed(grandTotal - formValue?.paid_amount),
        }));
      }
    } else if (fieldName === "vat") {
      if (fieldValue < 1) {
        const grandTotal =
          Number(formValue?.total_amount) +
          Number(formValue?.service_charge) -
          Number(formValue?.discount);
        setFormValue((prev) => ({
          ...prev,
          vat: 0,
          vat_percent: 0,
          grand_total: twoDigitFixed(grandTotal),
          due_amount: twoDigitFixed(grandTotal - formValue?.paid_amount),
        }));
      } else {
        const mainPrice = Number(formValue?.total_amount);
        const vatPrice = Number(fieldValue);
        const percentage = twoDigitFixed((vatPrice * 100) / mainPrice);
        const updatePercentage = percentage === Infinity ? 0 : percentage;
        const grandTotal =
          Number(formValue?.total_amount) +
          Number(formValue?.service_charge) +
          vatPrice -
          Number(formValue?.discount);

        setFormValue((prev) => ({
          ...prev,
          vat: twoDigitFixed(fieldValue),
          vat_percent: twoDigitFixed(updatePercentage),
          grand_total: twoDigitFixed(grandTotal),
          due_amount: twoDigitFixed(grandTotal - formValue?.paid_amount),
        }));
      }
    } else if (fieldName === "discount_percent") {
      if (fieldValue > 100) {
        handleErrorModalWithCross("Percent less than or equal 100");

        const grandTotal =
          Number(formValue?.total_amount) +
          Number(formValue?.vat) +
          Number(formValue?.service_charge);
        setFormValue((prev) => ({
          ...prev,
          discount: 0,
          discount_percent: 0,
          grand_total: twoDigitFixed(grandTotal),
          due_amount: twoDigitFixed(grandTotal - formValue?.paid_amount),
        }));
      } else if (fieldValue < 1) {
        // handleErrorModalWithCross("Percent gether than or equal 1");
        const grandTotal =
          Number(formValue?.total_amount) +
          Number(formValue?.vat) +
          Number(formValue?.service_charge);
        setFormValue((prev) => ({
          ...prev,
          discount: 0,
          discount_percent: 0,
          grand_total: twoDigitFixed(grandTotal),
          due_amount: twoDigitFixed(grandTotal - formValue?.paid_amount),
        }));
      } else {
        const mainPrice = Number(formValue?.total_amount);
        const discountPercentage = Number(fieldValue);
        const discountAmount = twoDigitFixed(
          (mainPrice * discountPercentage) / 100
        );
        const grandTotal =
          Number(formValue?.total_amount) +
          Number(formValue?.vat) +
          Number(formValue?.service_charge) -
          Number(discountAmount);
        setFormValue((prev) => ({
          ...prev,
          discount: twoDigitFixed(discountAmount),
          discount_percent: twoDigitFixed(fieldValue),
          grand_total: twoDigitFixed(grandTotal),
          due_amount: twoDigitFixed(grandTotal - formValue?.paid_amount),
        }));
      }
    } else if (fieldName === "discount") {
      if (Number(fieldValue) > Number(formValue?.total_amount)) {
        handleErrorModalWithCross("Discount less than or equal to main price");

        const grandTotal =
          Number(formValue?.total_amount) +
          Number(formValue?.vat) +
          Number(formValue?.service_charge);
        setFormValue((prev) => ({
          ...prev,
          discount: 0,
          discount_percent: 0,
          grand_total: twoDigitFixed(grandTotal),
          due_amount: twoDigitFixed(grandTotal - formValue?.paid_amount),
        }));
      } else if (fieldValue < 1) {
        // handleErrorModalWithCross("Discount gether than or equal 1");
        const grandTotal =
          Number(formValue?.total_amount) +
          Number(formValue?.vat) +
          Number(formValue?.service_charge);
        setFormValue((prev) => ({
          ...prev,
          discount: 0,
          discount_percent: 0,
          grand_total: twoDigitFixed(grandTotal),
          due_amount: twoDigitFixed(grandTotal - formValue?.paid_amount),
        }));
      } else {
        const mainPrice = Number(formValue?.total_amount);
        const discountPrice = Number(fieldValue);
        const percentage = twoDigitFixed((discountPrice * 100) / mainPrice);

        const grandTotal =
          Number(formValue?.total_amount) +
          Number(formValue?.vat) +
          Number(formValue?.service_charge) -
          discountPrice;
        setFormValue((prev) => ({
          ...prev,
          discount: twoDigitFixed(fieldValue),
          discount_percent: twoDigitFixed(percentage),
          grand_total: twoDigitFixed(grandTotal),
          due_amount: twoDigitFixed(grandTotal - formValue?.paid_amount),
        }));
      }
    } else {
      setFormValue(newFormValue);
    }
  };

  return { handleOnChange };
};

export default useSalePurchaseOnChange;

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
