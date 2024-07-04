import Swal from "sweetalert2";

export const handleNoInternetConnection = () => {
  Swal.fire({
    position: "center",
    icon: "question",
    title: "No Internet?",
    text: "No Internet connection. Make sure Wi-Fi or cellular data is turned on, then try again",
    showConfirmButton: false,
    allowOutsideClick: false,
    denyButtonColor: "#ff2525",
    showDenyButton: true,
    denyButtonText: `Retry`,
  }).then((result) => {
    location.reload();
  });
};
