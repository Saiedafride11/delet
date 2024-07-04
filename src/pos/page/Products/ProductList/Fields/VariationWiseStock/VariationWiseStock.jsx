import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import kingIcon from "../../../../../assets/images/icons/king.svg";
import plusCircleIcon from "../../../../../assets/images/icons/plus-circle.svg";
import plusIcon from "../../../../../assets/images/icons/plus.svg";
import rightCircleIcon from "../../../../../assets/images/icons/right-circle.svg";
import trashRedIcon from "../../../../../assets/images/icons/trash-red.svg";
import { twoDigitFixed } from "../../../../../components/function/twoDigitFixed";
import ProductWarehouseModal from "../../../../../components/modal/Warehouse/ProductWarehouseModal";
import { handleErrorModalWithCross } from "../../../../../components/ui/Toast/handleErrorModalWithCross";
import ProductCapacityModal from "../../../components/modal/variation/ProductCapacityModal";
import ProductColorModal from "../../../components/modal/variation/ProductColorModal";
import ProductSizeModal from "../../../components/modal/variation/ProductSizeModal";
import ProductTypeModal from "../../../components/modal/variation/ProductTypeModal";
import ProductWeightModal from "../../../components/modal/variation/ProductWeightModal";
import Capacity from "./Capacity";
import Colors from "./Colors";
import Sizes from "./Sizes";
import Type from "./Type";
import VariationFreeQuantity from "./VariationFreeQuantity";
import VariationLowStockQuantity from "./VariationLowStockQuantity";
import VariationPricing from "./VariationPricing";
import VariationQuantity from "./VariationQuantity";
import VariationWarehouse from "./VariationWarehouse";
import Weight from "./Weight";

const VariationWiseStock = ({
  formValue,
  setFormValue,
  globalSettings,
  page,
}) => {
  const [selectedKey, setSelectedKey] = useState("");
  const [sections, setSections] = useState([{ id: 1 }]);
  const [variationValue, setVariationValue] = useState({
    "variation[0][color_id]": "",
    "variation[0][size_id]": "",
    "variation[0][weight_id]": "",
    "variation[0][capacity_id]": "",
    "variation[0][type_id]": "",
    "variation[0][warehouse_id]": "",
    "variation[0][purchase_price]": "",
    "variation[0][sale_price]": "",
    "variation[0][wholesale_price]": "",
    "variation[0][dealer_price]": "",
    "variation[0][discount]": 0,
    "variation[0][discount_type]": "Fixed",
    "variation[0][quantity]": "",
    "variation[0][free_quantity]": "",
    "variation[0][low_quantity]": "",
    "variation[0][serial_no][0]": "",
    "variation[0][free_serial_no][0]": "",
  });
  const [serialItems, setSerialItems] = useState({});
  const [freeSerialItems, setFreeSerialItems] = useState({});

  const handleOnChange = (e, sectionId, key) => {
    const field = e.target.name;
    const value = e.target.value;
    const newVariationValue = { ...variationValue };
    newVariationValue[field] = parseInt(value);

    if (field === `variation[${sectionId}][${key}]`) {
      if (key === "sale_price") {
        if (value < 0 || value === "") {
          setVariationValue((prev) => ({
            ...prev,
            [`variation[${sectionId}][sale_price]`]: "",
            [`variation[${sectionId}][discount]`]: 0,
            [`variation[${sectionId}][discount_type]`]: "Fixed",
          }));
        } else {
          setVariationValue((prev) => ({
            ...prev,
            [`variation[${sectionId}][${key}]`]: twoDigitFixed(value),
          }));
        }
      } else if (key === "discount") {
        if (
          variationValue[`variation[${sectionId}][discount_type]`] ===
          "Percentage"
        ) {
          if (value > 100) {
            handleErrorModalWithCross("Percent less than or equal 100");
            setVariationValue((prev) => ({
              ...prev,
              [`variation[${sectionId}][discount]`]: 0,
            }));
          } else if (value < 1) {
            setVariationValue((prev) => ({
              ...prev,
              [`variation[${sectionId}][discount]`]: 0,
            }));
          } else {
            setVariationValue((prev) => ({
              ...prev,
              [`variation[${sectionId}][discount]`]: twoDigitFixed(value),
            }));
          }
        } else {
          if (
            parseInt(value) >
            parseInt(variationValue[`variation[${sectionId}][sale_price]`])
          ) {
            handleErrorModalWithCross(
              "Discount less than or equal to main price"
            );
            setVariationValue((prev) => ({
              ...prev,
              [`variation[${sectionId}][discount]`]: 0,
            }));
          } else if (value < 1) {
            setVariationValue((prev) => ({
              ...prev,
              [`variation[${sectionId}][discount]`]: 0,
            }));
          } else {
            setVariationValue((prev) => ({
              ...prev,
              [`variation[${sectionId}][discount]`]: twoDigitFixed(value),
            }));
          }
        }
      } else if (key === "discount_type") {
        setVariationValue((prev) => ({
          ...prev,
          [`variation[${sectionId}][discount]`]: 0,
          [`variation[${sectionId}][discount_type]`]: value,
        }));
      } else {
        if (value < 0 || value === "") {
          setVariationValue((prev) => ({
            ...prev,
            [`variation[${sectionId}][${key}]`]: "",
          }));
        } else {
          const validateQuantity = [
            "quantity",
            "free_quantity",
            "low_quantity",
          ];
          setVariationValue((prev) => ({
            ...prev,
            [`variation[${sectionId}][${key}]`]: validateQuantity.includes(key)
              ? parseInt(value)
              : twoDigitFixed(value),
          }));
        }
      }
    } else {
      setVariationValue(newVariationValue);
    }
  };

  //-----------------------------------------------
  //-----------------------------------------------
  // Duplicated Variation
  //-----------------------------------------------
  //-----------------------------------------------

  useEffect(() => {
    const outputArray = Object.entries(variationValue).reduce(
      (acc, [key, value]) => {
        const [, index, subKey] =
          key.match(/variation\[(\d+)\]\[(\w+)\]/) || [];
        acc[index] = { ...acc[index], [subKey]: value };
        return acc;
      },
      []
    );
    const hasDuplicatesFunc = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (
            arr[i]?.color_id === arr[j]?.color_id &&
            arr[i]?.size_id === arr[j]?.size_id &&
            arr[i]?.weight_id === arr[j]?.weight_id &&
            arr[i]?.type_id === arr[j]?.type_id &&
            arr[i]?.capacity_id === arr[j]?.capacity_id &&
            arr[i]?.warehouse_id === arr[j]?.warehouse_id
          ) {
            return false;
          }
        }
      }
      return true;
    };
    const hasDuplicates = hasDuplicatesFunc(outputArray);
    if (!hasDuplicates) {
      handleErrorModalWithCross("Duplicated Variation findOut");
    }
  }, [variationValue]);

  //-----------------------------------------------
  //-----------------------------------------------
  // Add Section
  //-----------------------------------------------
  //-----------------------------------------------

  const addSection = () => {
    // setSections([...sections, { id: sections.length + 2 }]);
    const newId = Math.max(...sections.map((section) => section.id), 0) + 1;
    const newSection = { id: newId };

    const minimumOneFieldValidation =
      // variationValue[[`variation[${newSection?.id - 2}][quantity]`]] !== "" &&
      variationValue[[`variation[${newSection?.id - 2}][color_id]`]] !== "" ||
      variationValue[[`variation[${newSection?.id - 2}][size_id]`]] !== "" ||
      variationValue[[`variation[${newSection?.id - 2}][weight_id]`]] !== "" ||
      variationValue[[`variation[${newSection?.id - 2}][capacity_id]`]] !==
        "" ||
      variationValue[[`variation[${newSection?.id - 2}][type_id]`]] !== "" ||
      variationValue[[`variation[${newSection?.id - 2}][warehouse_id]`]] !== "";

    const purchasePriceValidation =
      (variationValue[[`variation[${newSection?.id - 2}][quantity]`]] !== "" &&
        variationValue[[`variation[${newSection?.id - 2}][purchase_price]`]] ===
          "") ||
      (variationValue[[`variation[${newSection?.id - 2}][free_quantity]`]] !==
        "" &&
        variationValue[[`variation[${newSection?.id - 2}][purchase_price]`]] ===
          "");

    const salePriceValidation =
      (variationValue[[`variation[${newSection?.id - 2}][quantity]`]] !== "" &&
        variationValue[[`variation[${newSection?.id - 2}][sale_price]`]] ===
          "") ||
      (variationValue[[`variation[${newSection?.id - 2}][free_quantity]`]] !==
        "" &&
        variationValue[[`variation[${newSection?.id - 2}][sale_price]`]] ===
          "");

    if (purchasePriceValidation) {
      handleErrorModalWithCross("Purchase price is required");
    } else if (salePriceValidation) {
      handleErrorModalWithCross("Sale price is required");
    } else if (minimumOneFieldValidation) {
      setSections((prevSections) => [...prevSections, newSection]);

      const nextIndex = newSection?.id - 1;
      setVariationValue({
        ...variationValue,
        [`variation[${nextIndex}][color_id]`]: "",
        [`variation[${nextIndex}][size_id]`]: "",
        [`variation[${nextIndex}][weight_id]`]: "",
        [`variation[${nextIndex}][capacity_id]`]: "",
        [`variation[${nextIndex}][type_id]`]: "",
        [`variation[${nextIndex}][warehouse_id]`]: "",
        [`variation[${nextIndex}][purchase_price]`]: "",
        [`variation[${nextIndex}][sale_price]`]: "",
        [`variation[${nextIndex}][wholesale_price]`]: "",
        [`variation[${nextIndex}][dealer_price]`]: "",
        [`variation[${nextIndex}][discount]`]: 0,
        [`variation[${nextIndex}][discount_type]`]: "Fixed",
        [`variation[${nextIndex}][quantity]`]: "",
        [`variation[${nextIndex}][free_quantity]`]: "",
        [`variation[${nextIndex}][low_quantity]`]: "",
        [`variation[${nextIndex}][serial_no][0]`]: "",
        [`variation[${nextIndex}][free_serial_no][0]`]: "",
      });
    } else {
      handleErrorModalWithCross(
        "Must be quantity and others one field required"
      );
    }
  };

  //-----------------------------------------------
  //-----------------------------------------------
  // Remove Section
  //-----------------------------------------------
  //-----------------------------------------------

  const handleRemove = (sectionId) => {
    if (sections?.length > 1) {
      const allKeys = Object.keys(variationValue);
      const keysToRemove = allKeys?.filter((key) =>
        key.includes(`variation[${sectionId - 1}]`)
      );
      const updatedVariationValue = { ...variationValue };
      keysToRemove.forEach((key) => {
        delete updatedVariationValue[key];
      });
      setVariationValue(updatedVariationValue);

      const updatedSections = sections?.filter(
        (section) => section?.id !== sectionId
      );
      setSections(updatedSections);

      // formValue remove
      Object.keys(formValue).forEach((key) => {
        if (key.startsWith(`variation[${sectionId - 1}][`)) {
          delete formValue[key];
        }
      });
      // // serialItems and freeSerialItems remove
      [serialItems, freeSerialItems].forEach((items) => {
        Object.keys(items).forEach((key) => {
          if (key.startsWith(`variation[${sectionId - 1}]`)) {
            delete items[key];
          }
        });
      });
    }
  };

  useEffect(() => {
    let totalQuantity = 0;
    let totalFreeQuantity = 0;

    for (const key in variationValue) {
      const calculatedQuantity = isNaN(parseInt(variationValue[key]))
        ? 0
        : parseInt(variationValue[key]);

      if (key.includes("[quantity]")) {
        totalQuantity += calculatedQuantity;
      } else if (key.includes("[free_quantity]")) {
        totalFreeQuantity += calculatedQuantity;
      }
    }

    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      ...variationValue,
      quantity: totalQuantity,
      free_quantity: totalFreeQuantity,
    }));
  }, [variationValue]);

  useEffect(() => {
    if (formValue?.product_stocks?.length > 0) {
      setSections(
        formValue?.product_stocks?.map((item, index) => ({
          id: index + 1,
        }))
      );
      const updatedVariationValue = {};
      const updatedSerialItems = {};
      const updatedFreeSerialItems = {};
      formValue?.product_stocks?.forEach((item, index) => {
        updatedVariationValue[`variation[${index}][color_id]`] =
          item?.color_id || "";
        updatedVariationValue[`variation[${index}][size_id]`] =
          item?.size_id || "";
        updatedVariationValue[`variation[${index}][weight_id]`] =
          item?.weight_id || "";
        updatedVariationValue[`variation[${index}][capacity_id]`] =
          item?.capacity_id || "";
        updatedVariationValue[`variation[${index}][type_id]`] =
          item?.type_id || "";
        updatedVariationValue[`variation[${index}][warehouse_id]`] =
          item?.warehouse_id || "";
        updatedVariationValue[`variation[${index}][purchase_price]`] =
          item?.purchase_price || "";
        updatedVariationValue[`variation[${index}][sale_price]`] =
          item?.unit_price || "";
        updatedVariationValue[`variation[${index}][wholesale_price]`] =
          item?.wholesale_price || "";
        updatedVariationValue[`variation[${index}][dealer_price]`] =
          item?.dealer_price || "";
        updatedVariationValue[`variation[${index}][discount]`] =
          (item?.discount_type === "Fixed"
            ? item?.discount
            : item?.discount_percent) || 0;
        updatedVariationValue[`variation[${index}][discount_type]`] =
          item?.discount_type || "Fixed";
        updatedVariationValue[`variation[${index}][quantity]`] =
          item?.quantity || "";
        updatedVariationValue[`variation[${index}][free_quantity]`] =
          item?.free_quantity || "";
        updatedVariationValue[`variation[${index}][low_quantity]`] =
          item?.low_quantity || "";
        // Serial update with variation
        item?.serial_no?.length === 0
          ? (updatedVariationValue[`variation[${index}][serial_no][0]`] = "")
          : item?.serial_no?.map(
              (serialItem, serialIndex) =>
                (updatedVariationValue[
                  `variation[${index}][serial_no][${serialIndex}]`
                ] = serialItem || "")
            );
        // Serial update with serialItems
        item?.serial_no?.length === 0
          ? (updatedSerialItems[`variation[${index}][serial_no][0]`] = "")
          : item?.serial_no?.map(
              (serialItem, serialIndex) =>
                (updatedSerialItems[
                  `variation[${index}][serial_no][${serialIndex}]`
                ] = serialItem || "")
            );
        // Free Serial update with variation
        item?.free_serial_no?.length === 0
          ? (updatedVariationValue[`variation[${index}][free_serial_no][0]`] =
              "")
          : item?.free_serial_no?.map(
              (serialItem, serialIndex) =>
                (updatedVariationValue[
                  `variation[${index}][free_serial_no][${serialIndex}]`
                ] = serialItem || "")
            );
        // Free Serial update with freeSerialItems
        item?.free_serial_no?.length === 0
          ? (updatedFreeSerialItems[`variation[${index}][free_serial_no][0]`] =
              "")
          : item?.free_serial_no?.map(
              (serialItem, serialIndex) =>
                (updatedFreeSerialItems[
                  `variation[${index}][free_serial_no][${serialIndex}]`
                ] = serialItem || "")
            );
      });

      setVariationValue(updatedVariationValue);
      setSerialItems(updatedSerialItems);
      setFreeSerialItems(updatedFreeSerialItems);
    }
  }, [formValue?.product_stocks]);

  // console.log("product_stocks", formValue?.product_stocks);

  // console.log(result);

  // console.log("freeSerialItems", freeSerialItems);
  // console.log("variationValue", variationValue);
  // console.log("variationValue", formValue?.product_stocks);

  return (
    <div className="border rounded-2 pb-3">
      <div className="d-flex align-items-center justify-content-between bg-sky-light p-2">
        <div className="d-flex align-items-center gap-2">
          <img src={kingIcon} alt="icon" />
          <p className="text-sky">Add Product Variation Wise Stock</p>
        </div>
        <img
          onClick={addSection}
          src={plusCircleIcon}
          alt="icon"
          className="cursor-pointer"
        />
      </div>

      {sections?.map((section, index) => (
        <div
          key={section?.id}
          className="d-flex justify-content-between gap-2 px-3"
        >
          <div
            className={`w-100 ${
              index === sections.length - 1 ? "" : "border-bottom-sky pb-3"
            }`}
          >
            <div className="w-100 product-variation-wise-stock">
              {globalSettings?.variation?.color && (
                <div className="variation custom-focus-label">
                  <label>Color</label>
                  <div className="input-wrapper pos-up-down-arrow">
                    <Colors
                      name={`variation[${section?.id - 1}][color_id]`}
                      value={
                        variationValue[
                          `variation[${section?.id - 1}][color_id]`
                        ]
                      }
                      setVariationValue={setVariationValue}
                      selectedKey={selectedKey}
                    />
                    <span className="pos-right-arrow"></span>
                    <Link
                      data-bs-toggle="modal"
                      data-bs-target="#product-color-modal"
                      onClick={() => setSelectedKey(section?.id - 1)}
                    >
                      <img src={plusIcon} alt="icon" />
                    </Link>
                  </div>
                </div>
              )}
              {globalSettings?.variation?.size && (
                <div className="variation custom-focus-label">
                  <label>Size</label>
                  <div className="input-wrapper pos-up-down-arrow">
                    <Sizes
                      name={`variation[${section?.id - 1}][size_id]`}
                      value={
                        variationValue[`variation[${section?.id - 1}][size_id]`]
                      }
                      setVariationValue={setVariationValue}
                      selectedKey={selectedKey}
                    />
                    <span className="pos-right-arrow"></span>
                    <Link
                      data-bs-toggle="modal"
                      data-bs-target="#product-size-modal"
                      onClick={() => setSelectedKey(section?.id - 1)}
                    >
                      <img src={plusIcon} alt="icon" />
                    </Link>
                  </div>
                </div>
              )}
              {globalSettings?.variation?.weight && (
                <div className="variation custom-focus-label">
                  <label>Weight</label>
                  <div className="input-wrapper pos-up-down-arrow">
                    <Weight
                      name={`variation[${section?.id - 1}][weight_id]`}
                      value={
                        variationValue[
                          `variation[${section?.id - 1}][weight_id]`
                        ]
                      }
                      setVariationValue={setVariationValue}
                      selectedKey={selectedKey}
                    />
                    <span className="pos-right-arrow"></span>
                    <Link
                      data-bs-toggle="modal"
                      data-bs-target="#product-weight-modal"
                      onClick={() => setSelectedKey(section?.id - 1)}
                    >
                      <img src={plusIcon} alt="icon" />
                    </Link>
                  </div>
                </div>
              )}
              {globalSettings?.variation?.capacity && (
                <div className="variation custom-focus-label">
                  <label>Capacity</label>
                  <div className="input-wrapper pos-up-down-arrow">
                    <Capacity
                      name={`variation[${section?.id - 1}][capacity_id]`}
                      value={
                        variationValue[
                          `variation[${section?.id - 1}][capacity_id]`
                        ]
                      }
                      setVariationValue={setVariationValue}
                      selectedKey={selectedKey}
                    />
                    <span className="pos-right-arrow"></span>
                    <Link
                      data-bs-toggle="modal"
                      data-bs-target="#product-capacity-modal"
                      onClick={() => setSelectedKey(section?.id - 1)}
                    >
                      <img src={plusIcon} alt="icon" />
                    </Link>
                  </div>
                </div>
              )}
              {globalSettings?.variation?.type && (
                <div className="variation custom-focus-label">
                  <label>Type</label>
                  <div className="input-wrapper pos-up-down-arrow">
                    <Type
                      name={`variation[${section?.id - 1}][type_id]`}
                      value={
                        variationValue[`variation[${section?.id - 1}][type_id]`]
                      }
                      setVariationValue={setVariationValue}
                      selectedKey={selectedKey}
                    />
                    <span className="pos-right-arrow"></span>
                    <Link
                      data-bs-toggle="modal"
                      data-bs-target="#product-type-modal"
                      onClick={() => setSelectedKey(section?.id - 1)}
                    >
                      <img src={plusIcon} alt="icon" />
                    </Link>
                  </div>
                </div>
              )}

              {globalSettings?.item_info?.warehouse &&
              page === "product_create" ? (
                <div className="variation custom-focus-label">
                  <label>Warehouse</label>
                  <div className="input-wrapper pos-up-down-arrow">
                    <VariationWarehouse
                      name={`variation[${section?.id - 1}][warehouse_id]`}
                      value={
                        variationValue[
                          `variation[${section?.id - 1}][warehouse_id]`
                        ]
                      }
                      setVariationValue={setVariationValue}
                      selectedKey={selectedKey}
                    />
                    <span className="pos-right-arrow"></span>
                    <Link
                      data-bs-toggle="modal"
                      data-bs-target="#product-warehouse-modal"
                      onClick={() => setSelectedKey(section?.id - 1)}
                    >
                      <img src={plusIcon} alt="icon" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="variation custom-focus-label">
                  <input
                    value={
                      variationValue[
                        `variation[${section?.id - 1}][warehouse_id]`
                      ] || "No data!"
                    }
                    disabled
                    className="form-control m-0"
                  />
                  <label className="bg-transparent">Warehouse</label>
                </div>
              )}

              {globalSettings?.price?.product_discount && (
                <div className="variation custom-focus-label">
                  <label
                    className={`mt-0 ${
                      formValue?.sale_price === "" || formValue?.sale_price <= 0
                        ? "bg-transparent"
                        : ""
                    }`}
                  >
                    Discount
                  </label>
                  <div className="input-select-option d-flex align-items-center">
                    <div className="form-group w-100">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Discount..."
                        name={`variation[${section?.id - 1}][discount]`}
                        disabled={
                          variationValue[
                            `variation[${section?.id - 1}][sale_price]`
                          ] === "" ||
                          variationValue[
                            `variation[${section?.id - 1}][sale_price]`
                          ] <= 0
                            ? true
                            : false
                        }
                        value={
                          variationValue[
                            `variation[${section?.id - 1}][discount]`
                          ] <= 0
                            ? ""
                            : variationValue[
                                `variation[${section?.id - 1}][discount]`
                              ]
                        }
                        onChange={(e) =>
                          handleOnChange(e, section?.id - 1, "discount")
                        }
                      />
                    </div>
                    <div className="w-52">
                      <select
                        className="form-control m-0 ps-2 pe-0"
                        name={`variation[${section?.id - 1}][discount_type]`}
                        value={
                          variationValue[
                            `variation[${section?.id - 1}][discount_type]`
                          ] === "Fixed"
                            ? "$"
                            : "%"
                        }
                        onChange={(e) =>
                          handleOnChange(e, section?.id - 1, "discount_type")
                        }
                      >
                        <option className="d-none">
                          {variationValue[
                            `variation[${section?.id - 1}][discount_type]`
                          ] === "Fixed"
                            ? "$"
                            : "%"}
                        </option>
                        <option value="Fixed">Fixed</option>
                        <option value="Percentage">Percentage</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-100 product-variation-wise-stock">
              <VariationQuantity
                page={page}
                section={section}
                globalSettings={globalSettings}
                formValue={formValue}
                serialItems={serialItems}
                setSerialItems={setSerialItems}
                freeSerialItems={freeSerialItems}
                variationValue={variationValue}
                setVariationValue={setVariationValue}
                selectedKey={selectedKey}
                setSelectedKey={setSelectedKey}
                handleOnChange={handleOnChange}
              />
              <VariationFreeQuantity
                page={page}
                section={section}
                globalSettings={globalSettings}
                formValue={formValue}
                freeSerialItems={freeSerialItems}
                setFreeSerialItems={setFreeSerialItems}
                serialItems={serialItems}
                variationValue={variationValue}
                setVariationValue={setVariationValue}
                selectedKey={selectedKey}
                setSelectedKey={setSelectedKey}
                handleOnChange={handleOnChange}
              />
              <VariationLowStockQuantity
                page={page}
                section={section}
                globalSettings={globalSettings}
                variationValue={variationValue}
                handleOnChange={handleOnChange}
              />
              <VariationPricing
                section={section}
                star="*"
                name="purchase_price"
                variationValue={variationValue}
                handleOnChange={handleOnChange}
              />

              <VariationPricing
                section={section}
                star="*"
                name="sale_price"
                variationValue={variationValue}
                handleOnChange={handleOnChange}
              />

              {globalSettings?.price?.wholesale_price && (
                <VariationPricing
                  section={section}
                  name="wholesale_price"
                  variationValue={variationValue}
                  handleOnChange={handleOnChange}
                />
              )}
              {globalSettings?.price?.dealer_price && (
                <VariationPricing
                  section={section}
                  name="dealer_price"
                  variationValue={variationValue}
                  handleOnChange={handleOnChange}
                />
              )}

              {/* <div className="variation custom-focus-label">
                <label>
                  Purchase Price<span className="text-orange">*</span>
                </label>
                <div className="pos-up-down-arrow">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter purchase price"
                    name={`variation[${section?.id - 1}][purchase_price]`}
                    value={
                      variationValue[
                        `variation[${section?.id - 1}][purchase_price]`
                      ] <= 0
                        ? ""
                        : variationValue[
                            `variation[${section?.id - 1}][purchase_price]`
                          ]
                    }
                    onChange={(e) =>
                      handleOnChange(e, section?.id - 1, "purchase_price")
                    }
                  />
                </div>
              </div>
              <div className="variation custom-focus-label">
                <label>
                  Sales price<span className="text-orange">*</span>
                </label>
                <div className="pos-up-down-arrow">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter sales price"
                    name={`variation[${section?.id - 1}][sale_price]`}
                    value={
                      variationValue[
                        `variation[${section?.id - 1}][sale_price]`
                      ] <= 0
                        ? ""
                        : variationValue[
                            `variation[${section?.id - 1}][sale_price]`
                          ]
                    }
                    onChange={(e) =>
                      handleOnChange(e, section?.id - 1, "sale_price")
                    }
                  />
                </div>
              </div>
              {globalSettings?.price?.wholesale_price && (
                <div className="variation custom-focus-label">
                  <label>Wholesale Price</label>
                  <div className="pos-up-down-arrow">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter wholesale price"
                      name={`variation[${section?.id - 1}][wholesale_price]`}
                      value={
                        variationValue[
                          `variation[${section?.id - 1}][wholesale_price]`
                        ] <= 0
                          ? ""
                          : variationValue[
                              `variation[${section?.id - 1}][wholesale_price]`
                            ]
                      }
                      onChange={(e) =>
                        handleOnChange(e, section?.id - 1, "wholesale_price")
                      }
                    />
                  </div>
                </div>
              )}
              {globalSettings?.price?.dealer_price && (
                <div className="variation custom-focus-label">
                  <label>Dealer price</label>
                  <div className="pos-up-down-arrow">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter dealer price"
                      name={`variation[${section?.id - 1}][dealer_price]`}
                      value={
                        variationValue[
                          `variation[${section?.id - 1}][dealer_price]`
                        ] <= 0
                          ? ""
                          : variationValue[
                              `variation[${section?.id - 1}][dealer_price]`
                            ]
                      }
                      onChange={(e) =>
                        handleOnChange(e, section?.id - 1, "dealer_price")
                      }
                    />
                  </div>
                </div>
              )} */}
            </div>
          </div>
          {index === 0 ? (
            <div className="mt-2">
              <img src={rightCircleIcon} alt="icon" />
            </div>
          ) : (
            <div
              onClick={() => handleRemove(section?.id)}
              className="mt-2 cursor-pointer"
            >
              <img src={trashRedIcon} alt="icon" />
            </div>
          )}
        </div>
      ))}
      <ProductColorModal />
      <ProductSizeModal />
      <ProductWeightModal />
      <ProductCapacityModal />
      <ProductTypeModal />
      <ProductWarehouseModal />
    </div>
  );
};

export default React.memo(VariationWiseStock);
