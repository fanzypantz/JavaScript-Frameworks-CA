import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GameContext from "../context/GameContext";

const Game = () => {
  const context = useContext(GameContext);
  const { id } = useParams();

  useEffect(() => {
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
      game => game.id === parseInt(id)
    );
    return <div>{game.name}</div>;
  };

  return (
    <div>
      <h1>Game {id}</h1>
      {context.gameData !== null && <div>{gameData()}</div>}
    </div>
  );
};

export default Game;
