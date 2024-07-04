import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleResponseErrorMessage } from "../../../components/function/handleResponseErrorMessage";
import Error from "../../../components/ui/Error/Error";
import SpinnerBorderSm from "../../../components/ui/Spinner/spinnerBorderSm";
import { handleErrorModalWithCross } from "../../../components/ui/Toast/handleErrorModalWithCross";
import { handleSuccessToast } from "../../../components/ui/Toast/handleSuccessToast";
import useProductCreateUpdateOnChange from "../../../hooks/useProductCreateUpdateOnChange";
import { useAddProductsMutation } from "../../../redux/features/products/products/productsApi";
import ProductSettingsOfCanvas from "../components/ProductSettings/ProductSettingsOfCanvas";
import ProductsTitle from "../components/ProductsTitle";
import ProductCreateUpdate from "./Fields/ProductCreateUpdate";
import { handleProductValidate } from "./Fields/handleProductValidate";

const ProductCreate = () => {
  document.title = "Add Product";

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
    discount: 0,
    discount_type: "Fixed",
    wholesale_price: "",
    dealer_price: "",
    warranty_id: "",
    description: "",
    product_type: "Standard",
    expire_date: "",
    manufacturer_date: "",
    "image[]": [],
  });
  const [images, setImages] = useState([]);
  const [allowFileUpload, setAllowFileUpload] = useState(true);
  const [serialItems, setSerialItems] = useState({});
  const [freeSerialItems, setFreeSerialItems] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [
    addProducts,
    { data: responseData, isSuccess, isLoading, error: responseError },
  ] = useAddProductsMutation();

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
    const formData = new FormData();

    if (formValue["image[]"]?.length === 0) {
      const {
        ["image[]"]: [],
        manufacturer_date,
        expire_date,
        ...formValueWithoutImage
      } = formValue;
      Object.entries(formValueWithoutImage).forEach(([key, value]) => {
        formData.append(key, value);
      });
    } else {
      const { manufacturer_date, expire_date, ...formValueWithImage } =
        formValue;

      Object.entries(formValueWithImage).forEach(([key, value]) => {
        formData.append(key, value);
      });

      for (const file of formValueWithImage["image[]"]) {
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

    try {
      const response = await addProducts(formData);
    } catch (error) {
      console.error("Error Product upload:", error);
    }
  };

  // console.log("formValue--", formValue);

  return (
    <div className="acnoo-dashboard-main-section">
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper min-vh-100">
          <ProductsTitle title="Add New Product" />
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
            page="product_create"
          />

          <div className="d-flex align-items-center justify-content-center">
            <div className="button-group">
              <button
                onClick={() => navigate("/products")}
                className="btn cancel-btn"
              >
                Cancel
              </button>
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

export default ProductCreate;
