import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import AppsIcon from "@material-ui/icons/Apps";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import GroupWorkIcon from "@material-ui/icons/GroupWork";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

// React Router
import { Link, useHistory } from "react-router-dom";

// CSS
import "./HorizontalNav4.css";

// Custom Components
import LogInButton from "../Login/LogInButton/LogInButton";
import LogOutButton from "../Login/LogOutButton/LogOutButton";

// Logo
import PowAgileLogo from "./images/POW_Agile_Nav_Logo.png";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1),
  },
  linkBrand: {
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  linkBrandSmall: {
    display: "none",
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      display: "inline-block",
    },
  },
  drawerContainer: {
    width: 250,
  },
}));

export default function Navigation(props) {
  const { user, isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
  const history = useHistory();
  const classes = useStyles();

  const content = {
    brand: { image: "mui-assets/img/logo-pied-piper-white.png", width: 120 },
    "brand-small": {
      image: "mui-assets/img/logo-pied-piper-white-icon.png",
      width: 32,
    },
    link1: "Home",
    link2: "StandUp",
    link3: "Retro",
    avatar: "Sprint Review",
    ...props.content,
  };

  // Add avatar, if present
  if (user?.picture) {
    content.avatar = user.picture;
  }

  const [state, setState] = React.useState({ open: false });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, open });
  };

  return (
    <AppBar position="static">
      <Toolbar className="bar">
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <div className="link-container">
          <img
            className="navLogo"
            alt="POW!Agile Logo"
            src={PowAgileLogo}
          ></img>
          <Link
            to="/"
            className="nav-link"
            onClick={() => {
              history.replace("/");
              document.location.reload();
            }}
          >
            Home
          </Link>
          <Link
            to="/rituals/standup"
            className="nav-link"
            onClick={() => {
              history.replace("/rituals/standup");
              document.location.reload();
            }}
          >
            Stand Up
          </Link>
          <Link
            to="/rituals/retro"
            className="nav-link"
            onClick={() => {
              history.replace("/rituals/retro");
              document.location.reload();
            }}
          >
            Retro
          </Link>
        </div>
        <div
          className={
            isLoading
              ? "navbarUserSection hideWhileLoading"
              : "navbarUserSection"
          }
        >
          {isAuthenticated ? <LogOutButton /> : <LogInButton />}
          <Link to={isAuthenticated ? "/user" : "/login"}>
            <IconButton
              color="inherit"
              className="avatar"
              onClick={isAuthenticated ? null : () => loginWithRedirect()}
            >
              <Avatar alt="User Avatar" src={content["avatar"]} />
            </IconButton>
          </Link>
        </div>
      </Toolbar>

      <Drawer anchor="left" open={state.open} onClose={toggleDrawer(false)}>
        <div className={classes.drawerContainer}>
          <img
            className="drawerNavLogo"
            alt="POW!Agile Logo"
            src={PowAgileLogo}
          ></img>
          <List>
            <ListItem
              button
              onClick={() => {
                history.replace("/home");
                document.location.reload();
              }}
              key={content["link1"]}
            >
              <ListItemIcon>
                <AppsIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                history.replace("/rituals/standup");
                document.location.reload();
              }}
              key={content["link2"]}
            >
              <ListItemIcon>
                <ArrowUpwardIcon />
              </ListItemIcon>
              <ListItemText primary={"Stand Up"} />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                history.replace("/rituals/retro");
                document.location.reload();
              }}
              key={content["link3"]}
            >
              <ListItemIcon>
                <GroupWorkIcon />
              </ListItemIcon>
              <ListItemText primary={"Retro"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </AppBar>
  );
}
