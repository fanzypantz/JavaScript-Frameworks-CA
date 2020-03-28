/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./App.scss";

// Components
import { GameProvider } from "./context/GameContext";
import Library from "./components/Library";
import Game from "./components/Game";

function App() {
  const [pageFade, setPageFade] = useState(true);
  const [gameData, setGameData] = useState(null);
  const [filters, setFilters] = useState({
    page: null,
    page_size: 25,
    ordering: "-rating"
  });

  useEffect(() => {
    setPageFade(false);
  }, []);

  const fetchPage = query => {
    // The default page is 1, if it is not set by the library component
    // This can be called from any component
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
    <GameProvider
      value={{
        setPageFade: setPageFade,
        gameData: gameData,
        fetchPage: fetchPage,
        filters: filters,
        setFilters: setFilters
      }}
    >
      <div
        className={"[ pageFade ]" + (pageFade ? "[ pageFade__anim ]" : "")}
      />
      <Router>
        <Switch>
          <Route path={"/game/:id"}>
            <Game />
          </Route>
          <Route path={"/:page"}>
            <Library />
          </Route>
          <Route exact path={"/"}>
            <Library />
          </Route>
        </Switch>
      </Router>
    </GameProvider>
  );
}

export default App;
