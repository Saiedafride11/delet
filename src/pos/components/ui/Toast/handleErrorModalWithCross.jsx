import Swal from "sweetalert2";

export const handleErrorModalWithCross = (message) => {
  const errorMessage =
    message?.data?.message?.message ||
    message?.data?.message ||
    message?.error ||
    message;
  Swal.fire({
    position: "center",
    icon: "error",
    // title: `${errorMessage}`,
    text: `${errorMessage}`,
    showConfirmButton: true,
  });
};
