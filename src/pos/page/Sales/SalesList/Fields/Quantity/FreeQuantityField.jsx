import React from "react";
import minusSquareIcon from "../../../../../assets/images/icons/minus-square.svg";
import plusSquareIcon from "../../../../../assets/images/icons/plus-square.svg";

const FreeQuantityField = ({ data, formValue, setFormValue }) => {
  // const mainQuantityDistance =
  //   data?.exist_quantity < data?.quantity
  //     ? data?.quantity - data?.exist_quantity
  //     : 0;
  // const freQuantityDistance = data?.exist_free_quantity - mainQuantityDistance;
  // console.log("mainQuantityDistance", mainQuantityDistance);
  // // console.log("freQuantityDistance", freQuantityDistance);

  const handleQuantity = (stockCode, text) => {
    const inputValue = text === "" ? 0 : text;
    const updatedData = (formValue?.items || []).map((item) =>
      item.stock_code === stockCode
        ? {
            ...item,
            free_quantity:
              text === "plus"
                ? item.free_quantity + 1
                : text === "minus"
                ? item.free_quantity - 1
                : item?.exist_free_quantity < parseInt(inputValue)
                ? 0
                : parseInt(inputValue),
            quantity:
              text === "plus"
                ? item?.exist_free_quantity -
                    (item?.quantity - item?.exist_quantity) <
                  item.free_quantity + 1
                  ? item?.exist_total_quantity - (item.free_quantity + 1)
                  : item?.quantity
                : item?.exist_free_quantity -
                    (item?.quantity - item?.exist_quantity) <
                    parseInt(inputValue) &&
                  item?.exist_free_quantity >= parseInt(inputValue)
                ? item?.exist_total_quantity - parseInt(inputValue)
                : item?.quantity,
          }
        : item
    );

    setFormValue((prev) => ({
      ...prev,
      items: updatedData,
    }));
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <button
        onClick={() => handleQuantity(data?.stock_code, "minus")}
        disabled={
          data?.exist_free_serial_no?.length > 0 || data?.free_quantity <= 0
        }
        className={`p-0 m-0 border-0 bg-transparent ${
          (data?.exist_free_serial_no?.length > 0 && "opacity-50") ||
          (data?.free_quantity <= 0 && "opacity-50")
        }`}
      >
        <img src={minusSquareIcon} alt="icon" />
      </button>
      {/* <h6 className="mx-2">6</h6> */}
      <input
        type="number"
        disabled={
          data?.exist_free_serial_no?.length > 0 ||
          data?.exist_free_quantity < data?.free_quantity
          // data?.free_quantity > freQuantityDistance
        }
        className="form-control w-55 text-center fw-bold border-0 bg-transparent px-1"
        placeholder="0"
        value={data?.free_quantity <= 0 ? "" : data.free_quantity}
        onChange={(e) => handleQuantity(data?.stock_code, e.target.value)}
      />
      <button
        onClick={() => handleQuantity(data?.stock_code, "plus")}
        disabled={
          data?.exist_free_serial_no?.length > 0 ||
          data?.exist_free_quantity <= data?.free_quantity
          // data?.free_quantity >= freQuantityDistance
        }
        className={`p-0 m-0 border-0 bg-transparent ${
          (data?.exist_free_serial_no?.length > 0 && "opacity-50") ||
          (data?.exist_free_quantity <= data?.free_quantity && "opacity-50")
          // (data?.free_quantity >= freQuantityDistance && "opacity-50")
        }`}
      >
        <img src={plusSquareIcon} alt="icon" />
      </button>
    </div>
  );
};

export default FreeQuantityField;
