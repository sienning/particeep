import React from "react";
import { Pagination } from "semantic-ui-react";

const PaginationDiv = ({ nbPages, currentPage, handlePageChange }) => {
  return (
    <Pagination
      boundaryRange={0}
      activePage={currentPage}
      ellipsisItem={null}
      firstItem={null}
      lastItem={null}
      siblingRange={1}
      totalPages={nbPages}
      onPageChange={handlePageChange}

    />
  );
};
export default PaginationDiv;
