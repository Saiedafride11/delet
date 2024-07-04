import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { imageApiUrl } from "../../../components/env/envApi";
import { handleResponseErrorMessage } from "../../../components/function/handleResponseErrorMessage";
import Error from "../../../components/ui/Error/Error";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import SpinnerBorderSm from "../../../components/ui/Spinner/spinnerBorderSm";
import { handleErrorModalWithCross } from "../../../components/ui/Toast/handleErrorModalWithCross";
import { handleSuccessToast } from "../../../components/ui/Toast/handleSuccessToast";
import useProductCreateUpdateOnChange from "../../../hooks/useProductCreateUpdateOnChange";
import {
  useEditProductMutation,
  useGetProductQuery,
} from "../../../redux/features/products/products/productsApi";
import ProductSettingsOfCanvas from "../components/ProductSettings/ProductSettingsOfCanvas";
import ProductsTitle from "../components/ProductsTitle";
import ProductCreateUpdate from "./Fields/ProductCreateUpdate";
import { handleProductValidate } from "./Fields/handleProductValidate";

const ProductUpdate = () => {
  document.title = "Edit Product";

  const { productId } = useParams();
  const { data: productData, isLoading: productIsLoading } =
    useGetProductQuery(productId);
  const initialProduct = productData?.data?.product;

  const [formValue, setFormValue] = useState({
    name: "",
    sku_code: "",
    product_category_id: "",
    brand_id: "",
    unit_id: "",
    warehouse_id: "",
    p_model_id: "",
    quantity: "",
    free_quantity: "",
    low_quantity: "",
    purchase_price: "",
    sale_price: "",
    discount: "",
    discount_type: "Fixed",
    wholesale_price: "",
    dealer_price: "",
    warranty_id: "",
    description: "",
    product_type: "Standard",
    expire_date: "",
    manufacturer_date: "",
    "image[]": [],
    "image_old[]": [],
  });

  // console.log("initialProduct: ", initialProduct);
  // console.log("formValue: ", formValue);

  const [images, setImages] = useState([]);
  const [allowFileUpload, setAllowFileUpload] = useState(true);
  const [serialItems, setSerialItems] = useState({});
  const [freeSerialItems, setFreeSerialItems] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [
    editProduct,
    { data: responseData, isSuccess, isLoading, error: responseError },
  ] = useEditProductMutation();

  useEffect(() => {
    if (!productIsLoading && initialProduct !== undefined) {
      setFormValue((prevValue) => ({
        ...prevValue,
        ...Object.fromEntries(
          Object.entries(initialProduct)?.filter(
            ([key, value]) =>
              value !== null &&
              key !== "image" &&
              key !== "serial_no" &&
              key !== "created_at" &&
              key !== "updated_at"
            // !(
            //   key === "product_stocks" &&
            //   (value.length === 0 ||
            //     Object.values(value[0]).some((v) => v === null))
            // )
          )
        ),
        warehouse_id: initialProduct?.product_stocks?.[0]?.warehouse?.id || "",
        low_quantity: initialProduct?.product_stocks?.[0]?.low_quantity,
        purchase_price: initialProduct?.product_stocks?.[0]?.purchase_price,
        sale_price: initialProduct?.product_stocks?.[0]?.unit_price,
        wholesale_price: initialProduct?.product_stocks?.[0]?.wholesale_price,
        dealer_price: initialProduct?.product_stocks?.[0]?.dealer_price,
        discount:
          initialProduct?.product_stocks?.[0]?.discount_type === "Fixed"
            ? initialProduct?.product_stocks?.[0]?.discount
            : initialProduct?.product_stocks?.[0]?.discount_percent,
        discount_type: initialProduct?.product_stocks?.[0]?.discount_type || "",
        "image_old[]": initialProduct?.image,
        manufacturer_date: (initialProduct?.manufacturer_date || "").split(
          " "
        )[0],
        expire_date: (initialProduct?.expire_date || "").split(" ")[0],
      }));
      setSerialItems({
        ...serialItems,
        ...Object.fromEntries(
          (initialProduct?.product_stocks?.[0]?.serial_no || []).map(
            (item, index) => [`serial_no[${index}]`, item]
          )
        ),
      });
      setFreeSerialItems({
        ...serialItems,
        ...Object.fromEntries(
          (initialProduct?.product_stocks?.[0]?.free_serial_no || []).map(
            (item, index) => [`free_serial_no[${index}]`, item]
          )
        ),
      });
      setImages(
        (initialProduct?.image || []).map((image) => imageApiUrl + image)
      );
    }
  }, [productIsLoading, initialProduct]);

  const { handleOnChange } = useProductCreateUpdateOnChange(
    formValue,
    setFormValue,
    setSerialItems,
    setFreeSerialItems
  );

  const handleImageChange = (e) => {
    const files = e.target.files;

    if (images.length + files.length > 5) {
      handleErrorModalWithCross("You can upload a maximum of 5 images.");
      return;
    }

    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setImages((prevImages) => [...prevImages, ...newImages]);
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      "image[]": [...(prevFormValue["image[]"] || []), ...files],
    }));
  };

  const handleRemoveImage = (image, indexToRemove) => {
    const newImage = images?.filter((img) => img !== image);
    setImages(newImage);

    setFormValue((prevState) => ({
      ...prevState,
      "image[]": prevState["image[]"]?.filter(
        (_, index) => index !== indexToRemove
      ),
      "image_old[]": prevState["image_old[]"]?.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
    setAllowFileUpload(false);
    setTimeout(() => {
      setAllowFileUpload(true);
    }, 100);
  };

  useEffect(() => {
    if (responseError !== undefined) {
      handleResponseErrorMessage(responseError, setError);
    } else if (isSuccess) {
      // setError("");
      navigate("/products");
      handleSuccessToast(responseData?.message?.message);
    }
  }, [responseError, isSuccess, responseData]);

  const handleSubmit = (formValue) => {
    const error = handleProductValidate(formValue);
    if (error) {
      setError(error);
    } else {
      productUploadFunc();
    }
  };

  const productUploadFunc = async () => {
    const {
      brand,
      p_model,
      product_category,
      unit,
      warehouse,
      product_stocks,
      manufacturer_date,
      expire_date,
      ...restFormValue
    } = formValue;

    const formData = new FormData();
    if (
      restFormValue["image[]"]?.length === 0 &&
      restFormValue["image_old[]"]?.length === 0
    ) {
      const {
        ["image[]"]: [],
        ["image_old[]"]: [],
        ...formValueWithoutImage
      } = restFormValue;
      Object.entries(formValueWithoutImage).forEach(([key, value]) => {
        formData.append(key, value);
      });
    } else if (restFormValue["image[]"]?.length === 0) {
      const {
        ["image[]"]: [],
        ...formValueWithoutImage
      } = restFormValue;
      Object.entries(formValueWithoutImage).forEach(([key, value]) => {
        formData.append(key, value);
      });

      restFormValue?.["image_old[]"]?.forEach((img) => {
        formData.append("image_old[]", img);
      });
    } else {
      Object.entries(restFormValue).forEach(([key, value]) => {
        formData.append(key, value);
      });

      restFormValue?.["image_old[]"]?.forEach((img) => {
        formData.append("image_old[]", img);
      });

      for (const file of restFormValue["image[]"]) {
        formData.append("image[]", file);
      }
    }

    if (formValue?.manufacturer_date !== "") {
      const manufacturerDate = new Date(
        formValue?.manufacturer_date
      ).toLocaleDateString("en-GB");

      formData.append("manufacturer_date", manufacturerDate);
    }
    if (formValue?.expire_date !== "") {
      const expireDate = new Date(formValue?.expire_date).toLocaleDateString(
        "en-GB"
      );
      formData.append("expire_date", expireDate);
    }

    formData.append("_method", "PUT");

    try {
      const response = await editProduct({ id: productId, data: formData });
    } catch (error) {
      console.error("Error Product upload:", error);
    }
  };

  // console.log("formValue", formValue);

  return (
    <div className="acnoo-dashboard-main-section">
      {productIsLoading && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper min-vh-100">
          <ProductsTitle title="Edit Product" />
          <ProductSettingsOfCanvas />

          <hr />
          <ProductCreateUpdate
            formValue={formValue}
            setFormValue={setFormValue}
            handleOnChange={handleOnChange}
            images={images}
            serialItems={serialItems}
            setSerialItems={setSerialItems}
            freeSerialItems={freeSerialItems}
            setFreeSerialItems={setFreeSerialItems}
            allowFileUpload={allowFileUpload}
            handleImageChange={handleImageChange}
            handleRemoveImage={handleRemoveImage}
            page="product_update"
          />

          <div className="d-flex align-items-center justify-content-center">
            <div className="button-group">
              <button className="btn cancel-btn">Cancel</button>
              <button
                type="submit"
                className="btn save-btn"
                disabled={isLoading}
                onClick={(e) => handleSubmit(formValue)}
              >
                {isLoading ? <SpinnerBorderSm /> : "Save"}
              </button>
            </div>
          </div>
          {error !== "" && <Error message={error} />}
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
