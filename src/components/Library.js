import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import GameContext from "../context/GameContext";
import "../css/Library.scss";

const Library = props => {
  // This component could probably be split up a bit, but probably require some refactoring
  const { page } = useParams();
  const context = useContext(GameContext);
  const history = useHistory();

  // State
  const [showDetails, setShowDetails] = useState(false);
  const [current, setCurrent] = useState(null);
  const [loadingImages, setLoadingImages] = useState(true);

  let imageCount = 0;

  const setNewFilter = (key, value) => {
    let filters = context.filters;
    filters[key] = value;
    context.setNewFilter(filters);
  };

  useEffect(() => {
    if (page) {
      // Set the correct page before you fetch the data
      setNewFilter("page", page);
      context.fetchPage();
    } else {
      setNewFilter("page", 1);
      context.fetchPage();
    }
    context.setPageFade(false);
  }, []);

  const previousPage = () => {
    if (
      !loadingImages &&
      context.gameData.previous !== null &&
      parseInt(page) - 1 > 0
    ) {
      history.push(`/${parseInt(page) - 1}`);
      setNewFilter("page", parseInt(page) - 1);
      setLoadingImages(true);
      context.fetchPage(context.gameData.previous);
    }
  };

  const nextPage = () => {
    if (!loadingImages && context.gameData.next !== null) {
      if (page === undefined) {
        history.push(`/${context.filters.page + 1}`);
        setNewFilter("page", context.filters.page + 1);
      } else {
        history.push(`/${parseInt(page) + 1}`);
        setNewFilter("page", parseInt(page) + 1);
      }
      setLoadingImages(true);
      context.fetchPage(context.gameData.next);
    }
  };

  const checkLoad = () => {
    imageCount++;
    if (imageCount === context.filters.page_size) {
      setLoadingImages(false);
    }
  };

  const checkError = e => {
    // If this function is ever called just display the content that is being loaded regardless of loading state
    if (e) {
      console.log("error: ", e);
    }
    setLoadingImages(false);
  };

  const handleClick = (e, to) => {
    e.preventDefault();
    context.setPageFade(true);
    setTimeout(() => {
      // If clicked manually send the user to the URL instead of using the Link element
      history.push(to);
    }, 1000);
  };

  const handleHover = id => {
    setCurrent(id);
    setShowDetails(true);
  };

  const handleLeave = () => {
    setCurrent(null);
    setShowDetails(false);
  };

  return (
    <div className="[ library ]">
      <div className="[ library__controlContainer ]">
        <div className="[ library__paginationControl ]">
          <button
            onClick={previousPage}
            className="[ library__paginationControl__button ]"
          >
            Previous Page
          </button>
          <button
            onClick={nextPage}
            className="[ library__paginationControl__button ]"
          >
            Next Page
          </button>
        </div>
      </div>

      {context.gameData !== null && (
        <div
          className={
            "[ library__container ]" +
            (loadingImages ? "[ library__loadingImages ]" : "")
          }
        >
          {context.gameData.results.map((value, index) => {
            return (
              <a
                onClick={e =>
                  handleClick(e, {
                    pathname: "/game",
                    search: `?id=${value.id}&page=${context.filters.page}`
                  })
                }
                href={`/game?id=${value.id}&page=${context.filters.page}`}
                onMouseEnter={() => handleHover(value.id)}
                onMouseLeave={handleLeave}
                key={index}
                className={
                  "[ library__card ]" +
                  (value.id === current ? "[ library__openCard ]" : "")
                }
              >
                <img
                  onLoad={checkLoad}
                  onError={checkError}
                  className="[ library__cardImg ]"
                  src={
                    value.background_image !== null
                      ? value.background_image
                      : require("../images/image_not_found.jpg")
                  }
                  alt=""
                />
                <div
                  className={
                    "[ library__detailContainer ]" +
                    (value.id === current && showDetails
                      ? "[ library__showDetails ]"
                      : "")
                  }
                >
                  <h2 className="[ library__cardTitle ]">{value.name}</h2>
                  <h3 className="[ library__cardRating ]">
                    <p className="[ library__released ]">
                      {value.released !== null
                        ? "Release Date: " + value.released
                        : "Not Released"}
                    </p>
                    <p className="[ library__rating ]">
                      Rating: {Math.round(value.rating * 10) / 10} /{" "}
                      {value.rating_top}
                    </p>
                  </h3>
                </div>
              </a>
            );
          })}
        </div>
      )}

      {loadingImages && (
        // From loading.io
        <div className="[ lds-ellipsis ]">
          <div />
          <div />
          <div />
          <div />
        </div>
      )}

      {!loadingImages && (
        <div className="[ library__controlContainer ]">
          <div className="[ library__paginationControl ]">
            <button
              onClick={previousPage}
              className="[ library__paginationControl__button ]"
            >
              Previous Page
            </button>
            <button
              onClick={nextPage}
              className="[ library__paginationControl__button ]"
            >
              Next Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
