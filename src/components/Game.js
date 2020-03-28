import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GameContext from "../context/GameContext";

const Game = ({ location }) => {
  const context = useContext(GameContext);
  const params = new URLSearchParams(useLocation().search);

  useEffect(() => {
    let filters = context.filters;
    console.log("page: ", params.get("page"));
    filters.page = params.get("page");
    context.setFilters(filters);
    context.fetchPage();
    context.setPageFade(false);
    // setGame(context.gameData.results.find(game => game.id === id));
  }, []);

  const platformIcon = platform => {
    return (
      <img
        className="[ library__platformIcon ]"
        src={require(`../images/${platform}.png`)}
        alt={platform}
      />
    );
  };

  const gameData = () => {
    const game = context.gameData.results.find(
      game => game.id === parseInt(params.get("id"))
    );
    console.log("game: ", game);
    return <div>{game.name}</div>;
  };

  return (
    <div>
      <h1>Game </h1>
      {context.gameData !== null && <div>{gameData()}</div>}
    </div>
  );
};

export default Game;
