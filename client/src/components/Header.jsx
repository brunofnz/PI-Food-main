import React from "react";
import { Link, useLocation } from "react-router-dom";
import logoFoods from "../assets/svg/LOGO_WHITE.svg";
import style from "../assets/styles/Header.module.css";

const Header = () => {
  let location = useLocation();
  return (
    <nav className={style.header}>
      <div className={style.containerNav}>
        <div className={style.logo}>
          <img src={logoFoods} alt="logo" className={style.imageLogo} />

          <h1>Foods</h1>
        </div>

        {location.pathname !== "/recipes" ? (
          <Link to="/recipes" className={style.buttonLinks}>Home</Link>
        ) : (
          ""
        )}
        {location.pathname !== "/add" ? (
          <Link to="/add" className={style.buttonLinks}>Add Recipe</Link>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Header;