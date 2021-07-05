import React from "react";
import logo from "../images/header-logo.svg";
import { Link } from "react-router-dom";

function Header({ link, email, headingLink, handleLogOut }) {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Главная страница" className="header__logo" />
      </Link>
      <div className="header__menu">
        {email && <p className="header__email">{email}</p>}
        <Link to={link} className="header__button-link" onClick={handleLogOut}>
          {headingLink}
        </Link>
      </div>
    </header>
  );
}

export default Header;