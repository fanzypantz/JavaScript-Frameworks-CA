import React, { useContext, useEffect, useState } from "react";
import GameList from "./games/GameList";
import GameContext from "../context/GameContext";

const Favourites = props => {
  const context = useContext(GameContext);

  // State
  const [favouriteList, setFavouriteList] = useState(null);

  useEffect(() => {
    updateFavourites();
    context.setPageFade(false);
  }, []);

  const renderGameList = () => {
    return (
      <GameList
        games={favouriteList}
        usePageSize={false}
        updateFavourites={updateFavourites}
      />
    );
  };

  const updateFavourites = () => {
    let oldFav = localStorage.getItem("favourites");
    if (oldFav !== null) {
      setFavouriteList(JSON.parse(oldFav));
    }
  };

  return (
    <div className={"library"}>
      {favouriteList !== null && favouriteList.length > 0 && (
        <div>{renderGameList()}</div>
      )}
    </div>
  );
};

export default Favourites;
