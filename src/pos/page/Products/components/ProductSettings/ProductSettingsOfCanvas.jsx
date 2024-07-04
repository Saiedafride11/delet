import React, { useEffect, useState } from "react";
import Error from "../../../../components/ui/Error/Error";
import LineLoader from "../../../../components/ui/Spinner/LineLoader";
import { useGetGlobalSettingsQuery } from "../../../../redux/features/settings/global/globalSettingsApi";
import AddProduct from "./component/AddProduct";
import BulkProduct from "./component/BulkProduct";
import ProductPrice from "./component/ProductPrice";
import ProductStock from "./component/ProductStock";
import ProductVariation from "./component/ProductVariation";
import VatTaxDiscount from "./component/VatTaxDiscount";

const ProductSettingsOfCanvas = () => {
  // const globalSettings = useSelector(
  //   (state) => state?.settings?.globalSettings?.value?.product
  // );
  const {
    data: globalSettingsData,
    isLoading,
    isError,
  } = useGetGlobalSettingsQuery();
  const globalSettings = globalSettingsData?.data?.value?.product;

  const [formValue, setFormValue] = useState({});
  const [error, setError] = useState("");
  const [apiFirstCall, setApiFirstCall] = useState(false);

  //--------------------------------------------------------
  //--------------------------------------------------------
  // just i am api response data received first time,
  // another time no receive api response.
  // because switch toggle very bad, api update but ui show local response
  //--------------------------------------------------------
  //--------------------------------------------------------
  useEffect(() => {
    if (globalSettings !== undefined && apiFirstCall === false) {
      setFormValue(globalSettings);
    }
  }, [globalSettings, apiFirstCall]);

  useEffect(() => {
    if (!isLoading) {
      const timeoutId = setTimeout(() => {
        setApiFirstCall(true);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);
  //--------------------------------------------------------
  //--------------------------------------------------------
  //--------------------------------------------------------
  //--------------------------------------------------------

  return (
    <div
      className="offcanvas offcanvas-end settings-of-canvas"
      tabIndex="-1"
      id="add-product-settings-offcanvas"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header border-bottom">
        <h5 id="offcanvasRightLabel" className="fw-bold">
          Product Settings
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      {globalSettings == undefined || isLoading || isError ? (
        <div className="offcanvas-body">
          <LineLoader />
          <p className="placeholder-glow">
            <span className="placeholder col-12 vh-100"></span>
          </p>
        </div>
      ) : (
        <div className="offcanvas-body">
          <AddProduct
            settings={formValue?.item_info}
            formValue={formValue}
            setFormValue={setFormValue}
            setError={setError}
          />
          <ProductStock
            settings={formValue?.item_stock}
            formValue={formValue}
            setFormValue={setFormValue}
            setError={setError}
          />
          <ProductVariation
            settings={formValue?.variation}
            formValue={formValue}
            setFormValue={setFormValue}
            setError={setError}
          />
          <ProductPrice
            settings={formValue?.price}
            formValue={formValue}
            setFormValue={setFormValue}
            setError={setError}
          />
          <VatTaxDiscount
            settings={formValue?.taxes_discount}
            formValue={formValue}
            setFormValue={setFormValue}
            setError={setError}
          />
          <BulkProduct
            settings={formValue?.bulk_product}
            formValue={formValue}
            setFormValue={setFormValue}
            setError={setError}
          />
          {error !== "" && <Error message={error} />}
        </div>
      )}
    </div>
  );
};

export default ProductSettingsOfCanvas;
