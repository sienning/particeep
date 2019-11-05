import React from "react";
import { Pagination } from "semantic-ui-react";

const PaginationDiv = ( ) => {
  return (
    <Pagination
      boundaryRange={0}
      defaultActivePage={1}
      ellipsisItem={null}
      firstItem={null}
      lastItem={null}
      siblingRange={1}
      totalPages={1}
      disabled
    />
  );
};
export default PaginationDiv;
