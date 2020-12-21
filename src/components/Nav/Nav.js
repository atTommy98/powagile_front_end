// React
import React, { useState } from "react";

// Other Pages
import LogInButton from "../../components/Login/LogInButton/LogInButton";
import LogOutButton from "../../components/Login/LogOutButton/LogOutButton";

//Auth0
import { useAuth0 } from "@auth0/auth0-react";

//Router
import { Link } from "react-router-dom";

// Nav Items
import { MenuItems } from "./MenuItems";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import "@fortawesome/fontawesome-svg-core";

// CSS
import "./Nav.css";

export default function Nav() {
  const [onOff, setOnOff] = useState(false);

  function handleClick() {
    setOnOff(!onOff);
  }

  const { isAuthenticated } = useAuth0();

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
              <Link className={item.cName} to={`${item.url}`}>
                {item.title}
              </Link>
            );
          })}
          <li>{isAuthenticated ? <LogOutButton /> : <LogInButton />}</li>
        </ul>
      </nav>
    </div>
  );
}
