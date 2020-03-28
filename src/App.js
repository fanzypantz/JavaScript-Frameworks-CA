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
    page_size: 25,
    ordering: "-rating"
  });

  useEffect(() => {
    fetchPage();
    setPageFade(false);
  }, []);

  const fetchPage = query => {
    let url = query
      ? query
      : `https://api.rawg.io/api/games?page=1&ordering=${filters.ordering}&page_size=${filters.page_size}`;

    axios.get(url).then(response => {
      setGameData(response.data);
    });
  };

  const setFilter = filter => {
    setFilters(filter);
  };

  return (
    <GameProvider
      value={{
        setPageFade: setPageFade,
        gameData: gameData,
        fetchPage: fetchPage,
        filters: filters,
        setFilter: setFilter
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
          <Route exact path={"/"}>
            <Library />
          </Route>
        </Switch>
      </Router>
    </GameProvider>
  );
}

export default App;
