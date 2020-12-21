// React
import React, { useState } from "react";

// FIXME: THIS NEEDS TO BE IMPLEMENTED
// React Router
// import { Router, Route, Switch, Link } from "react-router";

import "@fortawesome/fontawesome-svg-core";

import LogInButton from "../../components/Login/LogInButton/LogInButton";
import LogOutButton from "../../components/Login/LogOutButton/LogOutButton";
import { useAuth0 } from "@auth0/auth0-react";

// Menu Items
import { MenuItems } from "./MenuItems";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";

// CSS
import "./Nav.css";

export default function Nav() {
  const [onOff, setOnOff] = useState(false);

  function handleClick() {
    setOnOff(!onOff);
  }

  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="navContainer">
      <nav className="navbarItems">
        <h1 className="navbar-title">PowerShell Rangers</h1>
        <div className="menu-icon" onClick={handleClick}>
          <MenuRoundedIcon />
        </div>
        <ul className={onOff ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
          <li>{isAuthenticated ? <LogOutButton /> : <LogInButton />}</li>
        </ul>
      </nav>
    </div>
  );
}
