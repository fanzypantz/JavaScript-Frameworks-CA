import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav className="[ nav ]">
      <Link className={"nav__navItem"} to="/">
        Home
      </Link>
      <Link className={"nav__navItem"} to="/contact">
        Contact
      </Link>
    </nav>
  );
};

export default Menu;
