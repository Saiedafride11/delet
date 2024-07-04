export const handleMobileSidebar = (value) => {
  const sidebar = document.querySelector(".side-bar");
  // const privacyModeElement = document.querySelector(
  //   ".dashboard-header-wrapper .header-right-side .header-menu .privacy-mode"
  // );

  if (sidebar) {
    sidebar.style.left = value;
  }

  // if (value === "0") {
  //   privacyModeElement.style.zIndex = "999";
  // } else {
  //   privacyModeElement.style.zIndex = "999999999";
  // }
};
