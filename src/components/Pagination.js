import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

const Pagination = props => {
  const history = useHistory();

  const previousPage = () => {
    if (
      !props.loadingImages &&
      props.gameData.previous !== null &&
      parseInt(props.page) - 1 > 0
    ) {
      history.push(`/${parseInt(props.page) - 1}`);
      props.setNewFilter("page", parseInt(props.page) - 1);
      props.setLoadingImages(true);
      props.fetchPage(props.gameData.previous);
    }
  };

  const nextPage = () => {
    if (!props.loadingImages && props.gameData.next !== null) {
      if (props.page === undefined) {
        history.push(`/${props.filters.page + 1}`);
        props.setNewFilter("page", props.filters.page + 1);
      } else {
        history.push(`/${parseInt(props.page) + 1}`);
        props.setNewFilter("page", parseInt(props.page) + 1);
      }
      props.setLoadingImages(true);
      props.fetchPage(props.gameData.next);
    }
  };

  return (
    <div className={"library__controlContainer"}>
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
