import React, { useContext } from "react";
import GameContext from "../context/GameContext";
import "../css/Home.scss";

const Home = () => {
  const context = useContext(GameContext);

  return (
    <div>
      {context.gameData !== null && (
        <div className={"library-container"}>
          {context.gameData.results.map((value, index) => {
            return (
              <a className={"library-card"}>
                <h2 className={"library-card-title"}>{value.name}</h2>
                <img
                  className={"library-card-img"}
                  src={value.background_image}
                  alt=""
                />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
