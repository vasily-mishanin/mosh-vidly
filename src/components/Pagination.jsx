import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

let Pagination = (props) => {
  //destructuring
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  let pagesCount = Math.ceil(itemsCount / pageSize);
  //if no Pagination needed
  if (pagesCount === 1) {
    return null;
  }
  // else create array of pages titles (using lodash)
  let pages = _.range(1, pagesCount + 1); // returns [1,2,3,...pagecount+1]
  //console.log(pages);
  return (
    <nav>
      <ul className="pagination">
        {pages.map(function (page) {
          return (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }>
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

//checking types of props
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
