import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleResponseErrorMessage } from "../../../components/function/handleResponseErrorMessage";
import Error from "../../../components/ui/Error/Error";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import SpinnerBorderSm from "../../../components/ui/Spinner/spinnerBorderSm";
import { handleSuccessToast } from "../../../components/ui/Toast/handleSuccessToast";
import { useUpdateGlobalSettingsMutation } from "../../../redux/features/settings/global/globalSettingsApi";
import AddProduct from "./component/AddProduct";
import Application from "./component/Application";
import BarcodeScanner from "./component/BarcodeScanner";
import BulkProduct from "./component/BulkProduct";
import ProductPrice from "./component/ProductPrice";
import ProductStock from "./component/ProductStock";
import ProductVariation from "./component/ProductVariation";
import VatTaxDiscount from "./component/VatTaxDiscount";

const ProductManagement = () => {
  document.title = "Product Management";
  const globalSettings = useSelector(
    (state) => state?.settings?.globalSettings?.value?.product
  );
  const prefixSettings = useSelector(
    (state) => state?.settings?.globalSettings?.value?.prefix
  );

  const [formValue, setFormValue] = useState({});
  const [prefixValue, setPrefixValue] = useState({});
  const [error, setError] = useState("");

  // const navigate = useNavigate();

  const [
    updateGlobalSettings,
    { data: responseData, isSuccess, isLoading, error: responseError },
  ] = useUpdateGlobalSettingsMutation();

  useEffect(() => {
    if (globalSettings !== undefined) {
      setFormValue(globalSettings);
    }
  }, [globalSettings]);

  useEffect(() => {
    if (prefixSettings !== undefined) {
      setPrefixValue(prefixSettings);
    }
  }, [prefixSettings]);

  useEffect(() => {
    if (responseError !== undefined) {
      handleResponseErrorMessage(responseError, setError);
    } else if (isSuccess) {
      // navigate("/");
      setError("");
      handleSuccessToast(responseData?.message?.message);
    }
  }, [responseError, isSuccess, responseData]);

  const prefixValidate =
    (prefixValue?.sale_invoice_prefix && prefixValue?.sale_prefix === "") ||
    (prefixValue?.purchase_invoice_prefix &&
      prefixValue?.purchase_prefix === "") ||
    (prefixValue?.sale_due_invoice_prefix &&
      prefixValue?.sale_due_prefix === "") ||
    (prefixValue?.purchase_due_invoice_prefix &&
      prefixValue?.purchase_due_prefix === "") ||
    (prefixValue?.loan_invoice_prefix && prefixValue?.loan_prefix === "");

  const handleSubmit = (formValue, prefixValue) => {
    if (prefixValidate) {
      setError("Please invoice prefix input field is required");
    } else {
      updateGlobalSettings({ product: formValue, prefix: prefixValue });
    }
  };

  // console.log("globalSettings", globalSettings);
  // console.log("prefixSettings", prefixSettings);
  return (
    <div className="acnoo-dashboard-main-section">
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper">
          {globalSettings == undefined || prefixSettings == undefined ? (
            <>
              <LineLoader />
              <p className="placeholder-glow">
                <span className="placeholder col-12 vh-100"></span>
              </p>
            </>
          ) : (
            <>
              <div className="details-header border-bottom">
                <div className="title">
                  <h4>Product Management</h4>
                </div>
              </div>

              <div className="row px-20">
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <AddProduct
                    settings={formValue?.item_info}
                    setFormValue={setFormValue}
                  />
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <ProductStock
                    settings={formValue?.item_stock}
                    setFormValue={setFormValue}
                  />
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <ProductVariation
                    settings={formValue?.variation}
                    setFormValue={setFormValue}
                  />
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Application
                    settingsApplication={formValue?.application}
                    setFormValue={setFormValue}
                    settingsInvoice={prefixValue}
                    setPrefixValue={setPrefixValue}
                  />
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <ProductPrice
                    settings={formValue?.price}
                    setFormValue={setFormValue}
                  />
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <VatTaxDiscount
                    settings={formValue?.taxes_discount}
                    setFormValue={setFormValue}
                  />
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <BulkProduct
                    settings={formValue?.bulk_product}
                    setFormValue={setFormValue}
                  />
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <BarcodeScanner
                    settings={formValue?.scanner_settings}
                    setFormValue={setFormValue}
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn save-btn w-120"
                  disabled={isLoading}
                  onClick={(e) => handleSubmit(formValue, prefixValue)}
                >
                  {isLoading ? <SpinnerBorderSm /> : "Update"}
                </button>
              </div>
              {error !== "" && <Error message={error} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
