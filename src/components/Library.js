import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import GameContext from "../context/GameContext";
import "../css/Home.scss";

const Library = () => {
  const context = useContext(GameContext);

  const [showDetails, setShowDetails] = useState(false);
  const [current, setCurrent] = useState(null);

  const previousPage = () => {
    if (context.gameData.previous !== null) {
      context.fetchPage(context.gameData.previous);
    }
  };

  const nextPage = () => {
    if (context.gameData.next !== null) {
      context.fetchPage(context.gameData.next);
    }
  };

  const changeFilter = () => {};

  const checkLoad = () => {
    console.log("image loaded: ");
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

  return (
    <div className="[ library ]">
      {context.gameData !== null && (
        <div className="[ library__container ]">
          {context.gameData.results.map((value, index) => {
            return (
              <Link
                to={{
                  pathname: "/game",
                  search: `?id=${value.id}`
                }}
                key={index}
                className="[ library__card ]"
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
                <div className="[ library__detailContainer ]">
                  <h2 className="[ library__cardTitle ]">{value.name}</h2>
                  {showDetails && value.id === current && (
                    <div className="[ library__cardPlatforms ]">
                      {value.platforms.map((platform, index) => {
                        return platformIcon(platform.platform.name);
                      })}
                    </div>
                  )}
                  {showDetails && value.id === current && (
                    <div className="[ library__cardGenres ]">
                      {value.genres.map((genre, index) => {
                        return (
                          <p className="[ library__cardGenres__p ]">
                            {genre.name}
                          </p>
                        );
                      })}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Library;
