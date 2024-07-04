import { useEffect, useState } from "react";

const useScrollPagination = (className, twoNoDependency) => {
  const [perPage, setPerPage] = useState(20);

  const handleScroll = () => {
    const scrollContainer = document.querySelector(`.${className}`);
    const scrollDistance =
      scrollContainer.scrollTop + scrollContainer.clientHeight;

    const newPerPage = Math.floor(scrollDistance / 600) * 20 + 20;

    if (newPerPage !== perPage) {
      setPerPage(newPerPage);
      // console.log(
      //   `every scroll ${scrollDistance} after perPage = ${newPerPage}, output ${newPerPage}`
      // );
    }
  };

  useEffect(() => {
    const scrollContainer = document.querySelector(`.${className}`);
    scrollContainer?.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [perPage, twoNoDependency]);

  return { perPage };
};

export default useScrollPagination;
