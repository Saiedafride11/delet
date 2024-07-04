import React from "react";

const PaginationLocal = ({
  items,
  filterPerPage,
  selectedPage,
  setSelectedPage,
}) => {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / filterPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const getVisiblePageNumbers = () => {
    const pageNumbers = getPageNumbers();

    if (totalPages <= 7) {
      return pageNumbers;
    }

    const visiblePages = [];
    if (selectedPage <= 4) {
      visiblePages.push(...pageNumbers.slice(0, 5), "...", totalPages);
    } else if (selectedPage >= totalPages - 3) {
      visiblePages.push(1, "...", ...pageNumbers.slice(-5));
    } else {
      visiblePages.push(
        selectedPage - 2,
        selectedPage - 1,
        selectedPage,
        selectedPage + 1,
        selectedPage + 2,
        "...",
        totalPages

        // 1,
        // "...",
        // selectedPage - 1,
        // selectedPage,
        // selectedPage + 1,
        // "...",
        // totalPages
      );
    }

    return visiblePages;
  };

  const paginate = (pageNumber) => setSelectedPage(pageNumber);
  const nextPage = () =>
    setSelectedPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const prevPage = () =>
    setSelectedPage((prevPage) => Math.max(prevPage - 1, 1));

  // const showItems = items?.slice(
  //   (selectedPage - 1) * filterPerPage,
  //   selectedPage * filterPerPage
  // );
  // console.log("showItems", showItems);

  const from = (selectedPage - 1) * filterPerPage + 1;
  const to = selectedPage * filterPerPage;

  return (
    <div className="showing-data-pagination print-d-none">
      <p>
        Showing {from || 0} to {to || 0} of {totalItems || 0} entries
      </p>
      <nav aria-label="...">
        <ul className="pagination">
          <li
            onClick={prevPage}
            className={`page-item ${selectedPage === 1 && "disabled"}`}
          >
            <span className="page-link">Prev</span>
          </li>
          {getVisiblePageNumbers().map((pageNumber, index) => (
            <li
              key={index}
              className={`page-item ${selectedPage === pageNumber && "active"}`}
              onClick={() => pageNumber !== "..." && paginate(pageNumber)}
            >
              <span
                className={`page-link ${
                  pageNumber === "..." && "cursor-not-allowed"
                }`}
              >
                {pageNumber}
              </span>
            </li>
          ))}
          <li
            onClick={nextPage}
            className={`page-item ${selectedPage === totalPages && "disabled"}`}
          >
            <span className="page-link">Next</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationLocal;
