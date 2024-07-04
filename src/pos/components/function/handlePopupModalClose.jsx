export const handlePopupModalClose = () => {
  const closeButtons = document.querySelectorAll(".modal .btn-close");
  closeButtons.forEach((button) => {
    button.click();
  });
};

export const handleSerialModalClose = () => {
  const closeButtons = document.querySelectorAll(".serial-item-modal");
  closeButtons.forEach((button) => {
    button.setAttribute("data-bs-dismiss", "modal");
    button.setAttribute("aria-label", "Close");
    button.click();

    setTimeout(function () {
      button.removeAttribute("data-bs-dismiss");
      button.removeAttribute("aria-label");
    }, 100);
  });
};
