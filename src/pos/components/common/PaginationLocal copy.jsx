import React, { useState } from "react";

const PaginationLocal = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = data?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
    if (currentPage <= 4) {
      visiblePages.push(...pageNumbers.slice(0, 5), "...", totalPages);
    } else if (currentPage >= totalPages - 3) {
      visiblePages.push(1, "...", ...pageNumbers.slice(-5));
    } else {
      visiblePages.push(
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        "...",
        totalPages

        // 1,
        // "...",
        // currentPage - 1,
        // currentPage,
        // currentPage + 1,
        // "...",
        // totalPages
      );
    }

    return visiblePages;
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const prevPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  const showData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // console.log("showData", showData);

  const from = (currentPage - 1) * itemsPerPage + 1;
  const to = currentPage * itemsPerPage;

  return (
    <div className="showing-data-pagination print-d-none">
      <p>
        Showing {from || 0} to {to || 0} of {totalPages || 0} entries
      </p>
      <nav aria-label="...">
        <ul className="pagination">
          <li
            onClick={prevPage}
            className={`page-item ${currentPage === 1 && "disabled"}`}
          >
            <span className="page-link">Prev</span>
          </li>
          {getVisiblePageNumbers().map((pageNumber, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === pageNumber && "active"}`}
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
            className={`page-item ${currentPage === totalPages && "disabled"}`}
          >
            <span className="page-link">Next</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationLocal;
