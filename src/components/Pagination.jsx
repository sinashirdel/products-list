import React, { useEffect, useState } from "react";
import { useFilter } from "../contexts/FilterContext";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { setCurrentPage } = useFilter();

  const [maxVisiblePages, setMaxVisiblePages] = useState(() =>
    window.innerWidth <= 640 ? 3 : 5
  );

  useEffect(() => {
    const handleResize = () => {
      setMaxVisiblePages(window.innerWidth <= 640 ? 3 : 5);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange?.(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    // Responsive logic for mobile (3 pages) and desktop (5 pages)
    if (maxVisiblePages === 3) {
      if (totalPages <= 3) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage === 1) {
          pages.push(1);
          pages.push(2);
          pages.push("...");
          pages.push(totalPages);
        } else if (currentPage === totalPages) {
          pages.push(1);
          pages.push("...");
          pages.push(totalPages - 1);
          pages.push(totalPages);
        } else {
          pages.push(1);
          pages.push("...");
          pages.push(currentPage);
          pages.push("...");
          pages.push(totalPages);
        }
      }
      // Always return [1, '...', currentPage, '...', totalPages] for middle pages
      if (
        maxVisiblePages === 3 &&
        totalPages > 3 &&
        currentPage !== 1 &&
        currentPage !== totalPages
      ) {
        return [1, "...", currentPage, "...", totalPages];
      }
      // Remove duplicates and keep order
      return [
        ...new Set(
          pages.filter((p) => p === "..." || (p >= 1 && p <= totalPages))
        ),
      ];
    }
    // Desktop logic (5 pages)
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
        for (let i = 1; i <= maxVisiblePages - 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - Math.floor(maxVisiblePages / 2)) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - (maxVisiblePages - 2); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 ">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-auto px-3 h-9 flex items-center justify-center text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        Prev
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1 ">
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="size-9 flex items-center justify-center text-sm text-gray-500">
                ...
              </span>
            ) : (
              <button
                onClick={() => handlePageChange(page)}
                className={`size-9 flex items-center justify-center text-sm font-medium rounded-full cursor-pointer ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-auto px-3 h-9 flex items-center justify-center text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
