"use client";

import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selected: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount,currentPage,onPageChange }) => {

  return (
    <div className="flex justify-center mt-8">
      <div className="flex items-center">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={onPageChange}
          pageCount={pageCount}
          forcePage={currentPage - 1}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          previousClassName="px-2 py-1 border border-gray-400 rounded-md mr-2"
          nextClassName="px-2 py-1 border border-gray-400 rounded-md mr-2"
          activeClassName="px-2 py-1 border border-orange-500 bg-orange-500 rounded-full text-white mr-2"
          pageClassName="px-2 py-1 border border-gray-300 rounded-md mr-2"
          className="flex justify-center items-center cursor-pointer"
          disabledClassName="px-2 py-1 border border-gray-400 bg-gray-200 rounded-md mr-2"
        />
      </div>
    </div>
  );
};

export default Pagination;