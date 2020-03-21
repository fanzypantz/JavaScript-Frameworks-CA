import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import GameContext from "../context/GameContext";
import "../css/Home.scss";

const Library = () => {
  const context = useContext(GameContext);

  const [showDetails, setShowDetails] = useState(false);
  const [current, setCurrent] = useState(null);
  const [loadingImages, setloadingImages] = useState(true);

  let imageCount = 0;

  const previousPage = () => {
    if (context.gameData.previous !== null) {
      setloadingImages(true);
      context.fetchPage(context.gameData.previous);
    }
  };

  const nextPage = () => {
    if (context.gameData.next !== null) {
      setloadingImages(true);

      context.fetchPage(context.gameData.next);
    }
  };

  const changeFilter = () => {};

  const checkLoad = () => {
    imageCount++;
    if (imageCount === context.filters.page_size) {
      setloadingImages(false);
    }
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

  const handleHover = id => {
    setCurrent(id);
    setTimeout(() => {
      setShowDetails(true);
    }, 250);
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
              <Link
                onMouseEnter={() => handleHover(value.id)}
                onMouseLeave={handleLeave}
                to={{
                  pathname: "/game",
                  search: `?id=${value.id}`
                }}
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
                  {value.id === current && (
                    <div className="[ library__secondaryDetails ]">
                      {/*<div className="[ library__cardPlatforms ]">*/}
                      {/*  {value.platforms.map((platform, index) => {*/}
                      {/*    return platformIcon(platform.platform.name);*/}
                      {/*  })}*/}
                      {/*</div>*/}
                      {/*<div className="[ library__cardGenres ]">*/}
                      {/*  {value.genres.map((genre, index) => {*/}
                      {/*    return (*/}
                      {/*      <p className="[ library__cardGenres__p ]">*/}
                      {/*        {genre.name}*/}
                      {/*      </p>*/}
                      {/*    );*/}
                      {/*  })}*/}
                      {/*</div>*/}
                      <h3 className="[ library__cardRating ]">
                        Release Date: {value.released} | Rating: {value.rating}{" "}
                        / {value.rating_top}
                      </h3>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {loadingImages && (
        <div className="[ library__loading ]">loading images</div>
      )}

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
    </div>
  );
};

export default Library;
