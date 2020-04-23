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

  if (favouriteList !== null && favouriteList.length > 0) {
    return <div className={"library"}>{renderGameList()}</div>;
  } else {
    return null;
  }
};

export default Favourites;
