export const createAnchorTagWithNewWindow = (route) => {
  // const newRoute = `/sales/invoice/${responseData?.data?.sale?.id}`;
  const anchor = document.createElement("a");
  anchor.href = route;
  anchor.target = "_blank";
  document.body.appendChild(anchor);
  anchor?.click();
  document.body.removeChild(anchor);
};
