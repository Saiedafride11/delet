import { useEffect, useState } from "react";

const useContentOffsetWidth = (className) => {
  // const [offsetWidth, setOffsetWidth] = useState(window.innerWidth);
  // const [offsetHeight, setOffsetHeight] = useState(window.innerHeight);

  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const updateChartWidth = () => {
      const parentWidth = document.querySelector(`.${className}`).offsetWidth;
      setContentWidth(parentWidth);
    };

    updateChartWidth();

    window.addEventListener("resize", updateChartWidth);

    return () => {
      window.removeEventListener("resize", updateChartWidth);
    };
  }, []);

  return { contentWidth };
};

export default useContentOffsetWidth;
