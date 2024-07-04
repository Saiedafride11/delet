import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { imageApiUrl } from "../../../components/env/envApi";
import { customISODate } from "../../../components/function/customISODate";
import { handleResponseErrorMessage } from "../../../components/function/handleResponseErrorMessage";
import Error from "../../../components/ui/Error/Error";
import LineLoader from "../../../components/ui/Spinner/LineLoader";
import { handleSuccessToast } from "../../../components/ui/Toast/handleSuccessToast";
import usePartyCreateUpdateOnChange from "../../../hooks/usePartyCreateUpdateOnChange";
import {
  useEditPartyMutation,
  useGetPartyQuery,
} from "../../../redux/features/party/party/partyApi";
import PartySettingsOfCanvas from "../components/PartySettings/PartySettingsOfCanvas";
import PartyTitle from "../components/PartyTitle";
import PartyCreateUpdate from "./Fields/PartyCreateUpdate";

const PartyUpdate = () => {
  document.title = "Edit Party";

  const { partyId } = useParams();
  const { data: partyData, isLoading: partyIsLoading } =
    useGetPartyQuery(partyId);

  const initialParty = partyData?.data;

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
    editParty,
    { data: responseData, isSuccess, isLoading, error: responseError },
  ] = useEditPartyMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!partyIsLoading && initialParty !== undefined) {
      setFormValue((prevValue) => ({
        ...prevValue,
        ...Object.fromEntries(
          Object.entries(initialParty)?.filter(
            ([key, value]) =>
              value !== null &&
              key !== "created_at" &&
              key !== "updated_at" &&
              // key !== "sales" &&
              // key !== "purchase" &&
              key !== "reward" &&
              key !== "balance_info"
          )
        ),

        opening_balance: initialParty?.balance_info?.opening_balance,
        opening_balance_type: initialParty?.balance_info?.opening_balance_type,
        date: initialParty?.date?.split(" ")[0],
        nid_passport_image:
          initialParty?.nid_passport_image === null
            ? null
            : imageApiUrl + initialParty?.nid_passport_image,
      }));
      setReferences(
        (initialParty?.reference || [])?.map((item) => ({
          ...item,
          nid_pass_image:
            item.nid_pass_image === null
              ? null
              : imageApiUrl + item.nid_pass_image.replace(imageApiUrl, ""),
        }))
      );
    }
  }, [partyIsLoading, initialParty]);

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

  const { handleOnChange } = usePartyCreateUpdateOnChange(
    formValue,
    setFormValue
  );

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
      setError("Must be reference name and phone field required");
    } else {
      const { sales, purchase, ...restFormValue } = formValue;
      editParty({
        id: partyId,
        data: {
          ...restFormValue,
          reference: restFormValue?.reference ? restFormValue?.reference : [],
          date: new Date(restFormValue?.date).toLocaleDateString("en-GB"),
          credit_limit:
            restFormValue?.credit_limit === ""
              ? 0
              : restFormValue?.credit_limit,
        },
      });
    }
  };

  // console.log("initialParty--", initialParty);
  // console.log("formValue--", formValue);
  return (
    <div className="acnoo-dashboard-main-section">
      {partyIsLoading && <LineLoader />}
      <div className="acnoo-dashboard-wrapper">
        <div className="acnoo-dashboard-details-wrapper min-vh-100">
          <PartyTitle title="Edit Party" />
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
            page="party_update"
          />
          {error !== "" && <Error message={error} />}
        </div>
      </div>
    </div>
  );
};

export default PartyUpdate;
