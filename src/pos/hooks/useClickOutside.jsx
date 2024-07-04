import { useEffect } from "react";

const useClickOutside = (dynamicState, className) => {
  useEffect(() => {
    function handleClickOutside(event) {
      const elements = document.querySelectorAll(`.${className}`);
      let isOutside = true;
      elements.forEach((element) => {
        if (element.contains(event.target)) {
          isOutside = false;
        }
      });

      if (isOutside) {
        if (className === "sales-purchase-warehouse") {
          dynamicState((prev) => ({
            ...prev,
            items: prev.items?.map((item) => ({
              ...item,
              warehouse_open: false,
            })),
          }));
        } else {
          dynamicState(false);
        }
      }
    }

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dynamicState]);

  return {};
};

export default useClickOutside;
