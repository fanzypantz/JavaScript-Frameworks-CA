import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import GameContext from "../context/GameContext";
import Pagination from "../components/Pagination";
import LoadingEllipsis from "./LoadingEllipsis";
import "../css/Library.scss";
import axios from "axios";

const Library = props => {
  const { page } = useParams();
  const context = useContext(GameContext);
  const params = new URLSearchParams(useLocation().search);
  const history = useHistory();

  // State
  const [showDetails, setShowDetails] = useState(false);
  const [current, setCurrent] = useState(null);
  const [loadingImages, setLoadingImages] = useState(true);
  const [gameData, setGameData] = useState(null);
  const [filters, setFilters] = useState({
    page: null,
    page_size: 25,
    ordering: "-rating"
  });

  let imageCount = 0;

  useEffect(() => {
    if (params.get("sortby")) {
      let sorting = params.get("sortby").startsWith("-")
        ? params.get("sortby").substr(1)
        : params.get("sortby");
      setNewFilter(
        "ordering",
        params.get("direction") === "ascending" ? sorting : "-" + sorting
      );
    }

    if (page) {
      // Set the correct page before you fetch the data
      setNewFilter("page", page);
      fetchPage();
    } else {
      setNewFilter("page", 1);
      fetchPage();
    }
    context.setPageFade(false);
  }, []);

  const setNewFilter = (key, value) => {
    let newFilters = filters;
    newFilters[key] = value;
    setFilters(newFilters);
  };

  const fetchPage = query => {
    // The default page is 1, if it is not set by the library component.
    // This can be called from any component.
    // This url query can be expanded upon with plenty of features like ordering,
    // dynamic page size etc.
    setLoadingImages(true);
    let url = query
      ? query
      : `https://api.rawg.io/api/games?page=${
          filters.page === null ? 1 : filters.page
        }&ordering=${filters.ordering}&page_size=${filters.page_size}`;
    axios.get(url).then(response => {
      setGameData(response.data);
    });
  };

  const checkLoad = () => {
    imageCount++;
    if (imageCount === filters.page_size) {
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
    <div className={"library"}>
      <Pagination
        page={page}
        gameData={gameData}
        loadingImages={loadingImages}
        filters={filters}
        setNewFilter={setNewFilter}
        fetchPage={fetchPage}
      />
      {gameData !== null && (
        <div
          className={
            "library__container" +
            (loadingImages ? " library__loadingImages" : "")
          }
        >
          {gameData.results.map((value, index) => {
            return (
              <a
                onClick={e =>
                  handleClick(e, {
                    pathname: "/game",
                    search: `?id=${value.id}&page=${filters.page}&sortby=${filters.ordering}`
                  })
                }
                href={`/game?id=${value.id}&page=${filters.page}`}
                onMouseEnter={() => handleHover(value.id)}
                onMouseLeave={handleLeave}
                key={index}
                className={
                  "library__card" +
                  (value.id === current ? " library__openCard" : "")
                }
              >
                <img
                  onLoad={checkLoad}
                  onError={checkError}
                  className={"library__cardImg"}
                  src={
                    value.background_image !== null
                      ? value.background_image
                      : require("../images/image_not_found.jpg")
                  }
                  alt=""
                />
                <div
                  className={
                    "library__detailContainer" +
                    (value.id === current && showDetails
                      ? " library__showDetails"
                      : "")
                  }
                >
                  <h2 className={"library__cardTitle"}>{value.name}</h2>
                  <h3 className={"library__cardRating"}>
                    <p className={"library__released"}>
                      {value.released !== null
                        ? "Release Date: " + value.released
                        : "Not Released"}
                    </p>
                    <p className={"library__rating"}>
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
        <LoadingEllipsis />
      )}
    </div>
  );
};

export default Library;
