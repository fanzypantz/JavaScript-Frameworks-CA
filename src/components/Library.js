import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import GameContext from "../context/GameContext";
import Pagination from "../components/Pagination";
import GameList from "../components/GameList";
import "../css/Library.scss";
import axios from "axios";

const Library = props => {
  const { page } = useParams();
  const context = useContext(GameContext);
  const params = new URLSearchParams(useLocation().search);

  // State
  const [gameData, setGameData] = useState(null);
  const [filters, setFilters] = useState({
    page: null,
    page_size: 25,
    ordering: "-rating"
  });

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
    context.setLoadingImages(true);
    let url = query
      ? query
      : `https://api.rawg.io/api/games?page=${
          filters.page === null ? 1 : filters.page
        }&ordering=${filters.ordering}&page_size=${filters.page_size}`;
    console.log("url: ", url);
    axios.get(url).then(response => {
      setGameData(response.data);
    });
  };

  return (
    <div className={"library"}>
      {/*I might have moved too much into props from context.*/}
      {/*But I felt like I wanted most of this contained inside the library, not the context*/}
      <Pagination
        page={page}
        gameData={gameData}
        filters={filters}
        setNewFilter={setNewFilter}
        fetchPage={fetchPage}
      />
      {gameData !== null && (
        <GameList games={gameData.results} filters={filters} />
      )}
    </div>
  );
};

export default Library;
