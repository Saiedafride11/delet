import React, { useEffect, useState } from "react";
import plusCircleIcon from "../../../../assets/images/icons/plus-circle.svg";
import uploaderImage from "../../../../assets/images/icons/upload-icon.svg";
import { handleErrorModalWithCross } from "../../../../components/ui/Toast/handleErrorModalWithCross";
import { handleSuccessToast } from "../../../../components/ui/Toast/handleSuccessToast";

const AddReference = ({ setFormValue, references, setReferences }) => {
  const [allowFileUpload, setAllowFileUpload] = useState(true);
  // const [references, setReferences] = useState([
  //   // {
  //   //   name: "",
  //   //   phone: "",
  //   //   email: "",
  //   //   address: "",
  //   //   nid_pass_image: null,
  //   // },
  // ]);

  const handleOnChange = (e, i) => {
    const field = e.target.name;
    const value = e.target.value;
    const updatedData = references.map((item, index) =>
      index === i ? { ...item, [field]: value } : item
    );
    setReferences(updatedData);
  };

  const addSection = () => {
    if (references?.length === 0) {
      newAddSectionFunc();
    } else if (
      references[references.length - 1].name !== "" &&
      references[references.length - 1].phone !== ""
    ) {
      newAddSectionFunc();
    } else {
      handleErrorModalWithCross("Must be name and phone field required");
    }
  };

  const newAddSectionFunc = () => {
    const newReference = {
      name: "",
      phone: "",
      email: "",
      address: "",
      nid_pass_image: null,
    };
    setReferences([...references, newReference]);
    handleSuccessToast("New Section added successfully");
  };

  const handleRemoveSection = (i) => {
    setReferences((prev) => prev?.filter((_, index) => index !== i));
    handleSuccessToast("Section remove successfully");
  };

  const handleImageChange = (e, i) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        const updatedData = references?.map((item, index) =>
          index === i ? { ...item, nid_pass_image: imageDataUrl } : item
        );
        setReferences(updatedData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (i) => {
    const updatedData = references?.map((item, index) =>
      index === i ? { ...item, nid_pass_image: null } : item
    );
    setReferences(updatedData);
    setAllowFileUpload(false);
    setTimeout(() => {
      setAllowFileUpload(true);
    }, 100);
  };

  useEffect(() => {
    setFormValue((prev) => ({
      ...prev,
      reference: references,
    }));
  }, [references]);

  // console.log("reference", references);

  return (
    <>
      <div>
        <h4>
          Reference <span>({references?.length} to 3)</span>
        </h4>
      </div>

      {references?.map((reference, index) => (
        <div key={index}>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <small>Reference - {index + 1}</small>
            <p
              onClick={() => handleRemoveSection(index)}
              className="text-end w-55 text-danger cursor-pointer"
            >
              Remove
            </p>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6 mb-2">
                  <div className="custom-focus-label mb-20">
                    <label>Full Name*</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter full name"
                      value={reference?.name || ""}
                      onChange={(e) => handleOnChange(e, index)}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="custom-focus-label mb-20">
                    <label>Phone Number*</label>
                    <input
                      type="number"
                      name="phone"
                      className="form-control"
                      placeholder="Enter phone number"
                      value={reference?.phone || ""}
                      onChange={(e) => handleOnChange(e, index)}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="custom-focus-label mb-20">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={reference?.email || ""}
                      onChange={(e) => handleOnChange(e, index)}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="custom-focus-label mb-20">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="Enter address"
                      value={reference?.address || ""}
                      onChange={(e) => handleOnChange(e, index)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="position-relative">
                <label className="upload-img-top-label">NID/ Passport*</label>
                <div className="upload-img-v2">
                  <label className="upload-v4">
                    <div className="img-wrp">
                      <div className="position-relative">
                        <img
                          src={reference?.nid_pass_image || uploaderImage}
                          alt="user"
                          id="nid"
                        />
                        {reference?.nid_pass_image !== null && (
                          <span
                            onClick={() => handleRemoveImage(index)}
                            className="w-h-lh-18 position-absolute top-0 end-0 bg-red text-white px-1 rounded-circle"
                          >
                            ⨯
                          </span>
                        )}
                      </div>
                    </div>
                    <input
                      type="file"
                      name="image"
                      accept="image/jpeg, image/jpg, image/png"
                      className="d-none"
                      disabled={allowFileUpload === true ? false : true}
                      onChange={(e) => handleImageChange(e, index)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {references?.length < 3 && (
        <div
          onClick={addSection}
          className="w-auto d-flex align-items-center cursor-pointer"
        >
          <img src={plusCircleIcon} alt="icon" />
          <p className="ms-1">Add Reference</p>
        </div>
      )}
    </>
  );
};

export default React.memo(AddReference);
