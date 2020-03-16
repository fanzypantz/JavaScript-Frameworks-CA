import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.scss";

// Components
import { GameProvider } from "./context/GameContext";
import Home from "./components/Home";

function App() {
  const [defaultPage] = useState(
    "https://api.rawg.io/api/games?page=1&ordering=-rating"
  );
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    fetchPage();
  }, []);

  const fetchPage = query => {
    let url = query
      ? query
      : "https://api.rawg.io/api/games?page=1&ordering=-rating";

    axios.get(url).then(response => {
      setGameData(response.data);
    });
  };

  return (
    <GameProvider value={{ gameData: gameData, fetchPage: fetchPage }}>
      <Router>
        <Switch>
          <Route path={"/"}>
            <Home />
          </Route>
        </Switch>
      </Router>
    </GameProvider>
  );
}

export default App;
