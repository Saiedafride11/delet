import Error from "../ui/Error/Error";
import SpinnerBorderSm from "../ui/Spinner/spinnerBorderSm";

const DeleteModal = ({
  handleDelete,
  id,
  error,
  setError,
  isLoading,
  page,
}) => {
  const handleDeleteFunc = (e) =>
    page === "multiple" ? handleDelete() : handleDelete(id);

  return (
    <div
      className=" modal fade modal-custom-design"
      id="delete_modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setError("")}
            ></button>
          </div>
          <div className="mb-3 d-flex align-items-center justify-content-center">
            <div className="text-center">
              <div className="my-3">
                <h6>Are You Sure?</h6>
                <p>You won’t be able to revert this!</p>
              </div>
              <div className="button-group">
                <button
                  className="btn cancel-btn"
                  data-bs-dismiss="modal"
                  onClick={() => setError("")}
                >
                  Cancel
                </button>
                <button
                  disabled={isLoading}
                  onClick={handleDeleteFunc}
                  className="btn delete-btn w-170"
                >
                  {isLoading ? <SpinnerBorderSm /> : "Yes, Delete It"}
                </button>
              </div>
            </div>
          </div>
          <div className="px-3 pb-2">
            {error !== "" && <Error message={error} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
