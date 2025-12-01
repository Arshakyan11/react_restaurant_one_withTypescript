import React from "react";
import "./Pagination.scss";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPagination,
  setCurrentPage,
} from "../../store/PaginationSlice/PaginationSlice";

const Pagination = ({ length }) => {
  const dispatch = useDispatch();
  const { currentPage, postsPerPage } = useSelector(getAllPagination);
  const pages = Array.from(
    { length: postsPerPage > 1 ? Math.ceil(length / postsPerPage) : 0 },
    (_, i) => i + 1
  );

  return (
    <section className="pagination">
      <div className="buttons">
        <button
          disabled={currentPage == 1}
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        >
          {"<"}
        </button>
        {pages.map((elm) => {
          return (
            <button
              className={currentPage == elm ? "activePage" : "normal"}
              key={nanoid(3)}
              onClick={() => dispatch(setCurrentPage(elm))}
            >
              {elm}
            </button>
          );
        })}
        <button
          disabled={currentPage == Math.ceil(length / postsPerPage)}
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        >
          {">"}
        </button>
      </div>
    </section>
  );
};

export default Pagination;
