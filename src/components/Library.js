import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import GameContext from "../context/GameContext";
import "../css/Home.scss";

const Library = props => {
  const context = useContext(GameContext);
  const history = useHistory();

  const [showDetails, setShowDetails] = useState(false);
  const [current, setCurrent] = useState(null);
  const [loadingImages, setLoadingImages] = useState(true);

  let imageCount = 0;

  const previousPage = () => {
    if (context.gameData.previous !== null) {
      setLoadingImages(true);
      context.fetchPage(context.gameData.previous);
    }
  };

  const nextPage = () => {
    if (context.gameData.next !== null) {
      setLoadingImages(true);

      context.fetchPage(context.gameData.next);
    }
  };

  const changeFilter = () => {};

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

  const platformIcon = platform => {
    return (
      <img
        className="[ library__platformIcon ]"
        src={require(`../images/${platform}.png`)}
        alt={platform}
      />
    );
  };

  const handleClick = (e, to) => {
    e.preventDefault();
    context.setPageFade(true);
    setTimeout(() => {
      history.push(to);
      console.log("to: ", to);
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
                onClick={e => handleClick(e, `/game/${value.id}`)}
                href={`/game/${value.id}`}
                onMouseEnter={() => handleHover(value.id)}
                onMouseLeave={handleLeave}
                key={index}
                className={
                  "[ library__card ]" +
                  (value.id === current ? "[ library__openCard ]" : "")
                }
              >
                {value.background_image !== null ? (
                  <img
                    onLoad={checkLoad}
                    className="[ library__cardImg ]"
                    src={value.background_image}
                    alt=""
                  />
                ) : (
                  <img
                    onLoad={checkLoad}
                    onError={checkError}
                    className="[ library__cardImg ]"
                    src={require("../images/image_not_found.jpg")}
                    alt=""
                  />
                )}
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
