import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customISODate } from "../../../components/function/customISODate";
import { handleResponseErrorMessage } from "../../../components/function/handleResponseErrorMessage";
import Error from "../../../components/ui/Error/Error";
import { handleSuccessToast } from "../../../components/ui/Toast/handleSuccessToast";
import usePartyCreateUpdateOnChange from "../../../hooks/usePartyCreateUpdateOnChange";
import { useAddPartyMutation } from "../../../redux/features/party/party/partyApi";
import PartySettingsOfCanvas from "../components/PartySettings/PartySettingsOfCanvas";
import PartyTitle from "../components/PartyTitle";
import PartyCreateUpdate from "./Fields/PartyCreateUpdate";

const PartyCreate = () => {
  document.title = "Add Party";

  const [formValue, setFormValue] = useState({
    name: "",
    party_type: "",
    phone: "",
    email: "",
    address: "",
    opening_balance: "",
    opening_balance_type: "Advance",
    credit_limit: "",
    date: customISODate(),
    nid_passport_image: null,
  });
  const [references, setReferences] = useState([]);
  const [allowFileUpload, setAllowFileUpload] = useState(true);
  const [error, setError] = useState("");

  const [
    addParty,
    { data: responseData, isSuccess, isLoading, error: responseError },
  ] = useAddPartyMutation();

  const navigate = useNavigate();

  const { handleOnChange } = usePartyCreateUpdateOnChange(
    formValue,
    setFormValue
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setFormValue({ ...formValue, nid_passport_image: imageDataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormValue({
      ...formValue,
      nid_passport_image: null,
    });
    setAllowFileUpload(false);
    setTimeout(() => {
      setAllowFileUpload(true);
    }, 100);
  };

  useEffect(() => {
    if (responseError !== undefined) {
      handleResponseErrorMessage(responseError, setError);
    } else if (isSuccess) {
      navigate("/party");
      setError("");
      handleSuccessToast(responseData?.message?.message);
    }
  }, [responseError, isSuccess, responseData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValue?.name === "") {
      setError("Party name is required");
    } else if (formValue?.party_type == "") {
      setError("Party type is required");
    } else if (formValue?.phone == "") {
      setError("Party phone is required");
    } else if (formValue?.opening_balance == "") {
      setError("Opening balance is required");
    } else if (
      formValue?.opening_balance_type === "Due" &&
      Number(formValue?.credit_limit) > 0 &&
      Number(formValue?.credit_limit) < Number(formValue?.opening_balance)
    ) {
      setError("Must be credit limit gether then or equal to opening balance");
    } else if (
      formValue?.reference &&
      formValue?.reference[formValue?.reference?.length - 1]?.name === "" &&
      formValue?.reference[formValue?.reference?.length - 1]?.phone === ""
    ) {
      setError("Must be reference name and phone field is required");
    } else {
      addParty({
        ...formValue,
        reference: formValue?.reference ? formValue?.reference : [],
        date: new Date(formValue?.date).toLocaleDateString("en-GB"),
        credit_limit:
          formValue?.credit_limit === "" ? 0 : formValue?.credit_limit,
      });
    }
  };

  // console.log("formValue: ", formValue);
  return (
    <div className="acnoo-dashboard-main-section">
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper min-vh-100">
          <PartyTitle title="Add Party" />
          <PartySettingsOfCanvas />
          <hr />
          <PartyCreateUpdate
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleImageChange={handleImageChange}
            handleRemoveImage={handleRemoveImage}
            formValue={formValue}
            setFormValue={setFormValue}
            references={references}
            setReferences={setReferences}
            allowFileUpload={allowFileUpload}
            isLoading={isLoading}
            page="party_create"
          />
          {error !== "" && <Error message={error} />}
        </div>
      </div>
    </div>
  );
};

export default PartyCreate;
