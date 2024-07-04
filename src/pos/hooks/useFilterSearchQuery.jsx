import { useEffect, useState } from "react";

const useFilterSearchQuery = (dynamic_page) => {
  // show per page
  const [perPageQuery, setPerPageQuery] = useState(false);
  const [filterPerPage, setFilterPerPage] = useState(
    dynamic_page === "ReportLedgerDetails" ? "19" : "20"
  );
  const [storeFilterPerPage, setStoreFilterPerPage] = useState("20");
  // search and pagination
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState(true);
  const [selectedPage, setSelectedPage] = useState(1);
  const [storeSelectedPage, setStoreSelectedPage] = useState(1);
  // all query
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    let query;

    if (searchText !== "") {
      if (selectedPage > 1 && searchQuery) {
        setSelectedPage(1);
        setSearchQuery(false);
        if (filterPerPage === 20) {
          query = `?search=${searchText}`;
        } else {
          query = `?search=${searchText}&per_page=${filterPerPage}`;
        }
      } else {
        if (filterPerPage === 20) {
          query = `?search=${searchText}&page=${selectedPage}`;
        } else {
          query = `?search=${searchText}&page=${selectedPage}&per_page=${filterPerPage}`;
        }
      }
    } else if (searchText === "") {
      if (storeSelectedPage > 1 && !searchQuery) {
        setSearchQuery(true);
        if (filterPerPage === 20) {
          query = `?page=${storeSelectedPage}`;
        } else {
          query = `?page=${storeSelectedPage}&per_page=${filterPerPage}`;
        }
      } else {
        setSearchQuery(true);
        setStoreSelectedPage(selectedPage);
        if (filterPerPage === storeFilterPerPage && perPageQuery) {
          query = `?per_page=${filterPerPage}`;
          setPerPageQuery(false);
          setSelectedPage(1);
        } else {
          query = `?page=${selectedPage}&per_page=${filterPerPage}`;
        }
      }
    }
    setFilterQuery(query);
  }, [searchText, selectedPage, storeSelectedPage, filterPerPage]);

  const handlePerPageFilter = (e) => {
    setFilterPerPage(e.target.value);
    setStoreFilterPerPage(e.target.value);
    setPerPageQuery(true);
    setSelectedPage(1);
    setStoreSelectedPage(1);
  };

  return {
    filterPerPage,
    handlePerPageFilter,
    searchText,
    setSearchText,
    selectedPage,
    setSelectedPage,
    filterQuery,
  };
};

export default useFilterSearchQuery;
