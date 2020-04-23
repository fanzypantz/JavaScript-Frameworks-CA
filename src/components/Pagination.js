import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import GameContext from "../context/GameContext";

const Pagination = props => {
  const context = useContext(GameContext);
  const history = useHistory();

  const previousPage = () => {
    if (
      !context.loadingImages &&
      props.gameData.previous !== null &&
      parseInt(props.page) - 1 > 0
    ) {
      history.push(`/${parseInt(props.page) - 1}`);
      props.setNewFilter("page", parseInt(props.page) - 1);
      props.fetchPage(props.gameData.previous);
    }
  };

  const nextPage = () => {
    if (!context.loadingImages && props.gameData.next !== null) {
      if (props.page === undefined) {
        history.push(`/${props.filters.page + 1}`);
        props.setNewFilter("page", props.filters.page + 1);
      } else {
        history.push(`/${parseInt(props.page) + 1}`);
        props.setNewFilter("page", parseInt(props.page) + 1);
      }
      props.fetchPage(props.gameData.next);
    }
  };

  const handleSorting = e => {
    props.setNewFilter(
      "ordering",
      props.filters.ordering.startsWith("-")
        ? "-" + e.target.value
        : e.target.value
    );
    props.setNewFilter("page", 1);
    history.push(`/1?sortby=${props.filters.ordering}`);
    props.fetchPage();
  };

  const handleDirection = e => {
    props.setNewFilter(
      "ordering",
      props.filters.ordering.startsWith("-")
        ? props.filters.ordering.substr(1)
        : props.filters.ordering
    );
    props.setNewFilter("page", 1);
    history.push(`/1?sortby=${props.filters.ordering}`);
    props.fetchPage();
  };

  return (
    <div className={"library__controlContainer"}>
      <select
        onChange={handleSorting}
        className={"select sorting"}
        value={
          props.filters.ordering.startsWith("-")
            ? props.filters.ordering.substr(1)
            : props.filters.ordering
        }
      >
        <option value="name">Name</option>
        <option value="released">Released</option>
        <option value="added">Added</option>
        <option value="created">Created</option>
        <option value="rating">Rating</option>
      </select>
      <select
        onChange={handleDirection}
        className={"select direction"}
        value={
          props.filters.ordering.startsWith("-") ? "descending" : "ascending"
        }
      >
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
      <div className={"library__paginationControl"}>
        <button
          onClick={previousPage}
          className={"library__paginationControl__button"}
        >
          Previous Page
        </button>
        <button
          onClick={nextPage}
          className={"library__paginationControl__button"}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Pagination;
