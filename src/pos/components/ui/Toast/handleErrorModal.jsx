import Swal from "sweetalert2";

export const handleErrorModal = (message) => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: `${message}`,
    showConfirmButton: true,
    timer: 2000,
  });
};
