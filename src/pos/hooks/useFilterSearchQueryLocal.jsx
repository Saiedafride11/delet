import { useState } from "react";

const useFilterSearchQueryLocal = (allListData) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [filterPerPage, setFilterPerPage] = useState(20);
  const [searchText, setSearchText] = useState("");
  const [searchMatchedData, setSearchMatchedData] = useState([]);

  // const allListData = productCategories?.data?.product_categories;
  const initialListData = searchText === "" ? allListData : searchMatchedData;

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setSelectedPage(1);
    const matchedData = allListData?.filter((item) =>
      item?.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchMatchedData(matchedData);
  };

  const updateDataList = initialListData?.slice(
    (selectedPage - 1) * filterPerPage,
    filterPerPage === "all"
      ? initialListData?.length
      : selectedPage * filterPerPage
  );
  const updatePerPage =
    filterPerPage === "all" ? initialListData?.length : filterPerPage;

  const dataFrom = (selectedPage - 1) * updatePerPage + 1;

  const handlePerPageFilter = (e) => {
    setFilterPerPage(e.target.value);
    setSelectedPage(1);
  };

  return {
    searchText,
    filterPerPage,
    selectedPage,
    setSelectedPage,
    initialListData,
    updateDataList,
    handlePerPageFilter,
    handleSearchChange,
    dataFrom,
  };
};

export default useFilterSearchQueryLocal;
