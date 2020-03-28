import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import GameContext from "../context/GameContext";

const Game = () => {
  const context = useContext(GameContext);
  const { id } = useParams();

  useEffect(() => {
    context.setPageFade(false);
  }, []);

  return (
    <div>
      <h1>Game {id}</h1>
    </div>
  );
};

export default Game;
