import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./App.scss";

// Components
import { GameProvider } from "./context/GameContext";
import Library from "./components/Library";

function App() {
  const [gameData, setGameData] = useState(null);
  const [filters, setFilters] = useState({
    page_size: 25,
    ordering: "-rating"
  });

  useEffect(() => {
    fetchPage();
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
      value={{ gameData: gameData, fetchPage: fetchPage, setFilter: setFilter }}
    >
      <Router>
        <Switch>
          <Route path={"/"}>
            <Library />
          </Route>
        </Switch>
      </Router>
    </GameProvider>
  );
}

export default App;
