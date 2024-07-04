import Swal from "sweetalert2";

export const handleSuccessModal = (message) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: `${message}`,
    showConfirmButton: false,
    timer: 2000,
  });
};
