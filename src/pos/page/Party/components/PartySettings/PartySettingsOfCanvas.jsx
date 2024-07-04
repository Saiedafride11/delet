import React, { useEffect, useState } from "react";
import Error from "../../../../components/ui/Error/Error";
import LineLoader from "../../../../components/ui/Spinner/LineLoader";
import { useGetGlobalSettingsQuery } from "../../../../redux/features/settings/global/globalSettingsApi";
import PartyAddress from "./component/PartyAddress";
import PartyBalance from "./component/PartyBalance";
import PartyReference from "./component/PartyReference";

const PartySettingsOfCanvas = () => {
  // const globalSettings = useSelector(
  //   (state) => state?.settings?.globalSettings?.value?.product
  // );
  const {
    data: globalSettingsData,
    isLoading,
    isError,
  } = useGetGlobalSettingsQuery();
  const globalSettings = globalSettingsData?.data?.value?.party_settings;

  const [formValue, setFormValue] = useState({});
  const [error, setError] = useState("");

  // useEffect(() => {
  //   if (globalSettings !== undefined) {
  //     setFormValue(globalSettings);
  //   }
  // }, [globalSettings]);

  // console.log("formValue", formValue);

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
      id="add-party-settings-offcanvas"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header border-bottom">
        <h5 id="offcanvasRightLabel" className="fw-bold">
          Party Settings
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
          <PartyAddress
            settings={formValue?.address}
            formValue={formValue}
            setFormValue={setFormValue}
            setError={setError}
          />
          <PartyBalance
            settings={formValue?.balance}
            formValue={formValue}
            setFormValue={setFormValue}
            setError={setError}
          />
          <PartyReference
            settings={formValue?.reference}
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

export default PartySettingsOfCanvas;
