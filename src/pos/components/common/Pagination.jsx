import React, { useCallback } from "react";

const Pagination = ({ pagination, setSelectedPage }) => {
  const { from, to, total, current_page, links } = pagination || {};

  const removeFirstAndLastData = links?.slice(1, links?.length - 1);
  const getPaginationData = useCallback((array, countBefore, countAfter) => {
    const activeIndex = array?.findIndex((item) => item.active);
    if (activeIndex === -1) {
      return [];
    }
    let startIndex = Math.max(0, activeIndex - countBefore);
    let endIndex = Math.min(array?.length - 1, activeIndex + countAfter);
    let combinedArray;
    if (startIndex === 0) {
      endIndex = Math.min(
        array?.length - 1,
        startIndex + countBefore + countAfter
      );
    } else if (endIndex === array?.length - 1) {
      startIndex = Math.max(0, endIndex - countBefore - countAfter);
    }

    if (array?.length < 8) {
      combinedArray = array || [];
    } else if (endIndex === array?.length - 1) {
      combinedArray = [
        { url: null, label: "1", active: false },
        { url: null, label: "...", active: false },
        ...(array?.slice(startIndex, endIndex + 1) || []),
      ];
    } else {
      combinedArray = [
        ...(array?.slice(startIndex, endIndex + 1) || []),
        { url: null, label: "...", active: false },
        { url: null, label: array?.[array?.length - 1]?.label, active: false },
      ];
    }
    return combinedArray;
  }, []);
  const results = getPaginationData(removeFirstAndLastData, 2, 2);

  return (
    <div className="showing-data-pagination print-d-none">
      <p>
        Showing {from || 0} to {to || 0} of {total || 0} entries
      </p>
      <nav aria-label="...">
        <ul className="pagination">
          <li
            onClick={() =>
              current_page > 1 && setSelectedPage(current_page - 1)
            }
            className={`page-item ${current_page === 1 && "disabled"}`}
          >
            <span className="page-link">Prev</span>
          </li>
          {results?.map((link, index) => (
            <li
              key={index}
              className={`page-item ${link?.active && "active"}`}
              onClick={(e) =>
                link?.label !== "..." && setSelectedPage(e.target.textContent)
              }
            >
              <span
                className={`page-link ${
                  link?.label === "..." && "cursor-not-allowed"
                }`}
              >
                {link?.label}
              </span>
            </li>
          ))}
          <li
            onClick={() => total !== to && setSelectedPage(current_page + 1)}
            className={`page-item ${total === to && "disabled"}`}
          >
            <span className="page-link">Next</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
