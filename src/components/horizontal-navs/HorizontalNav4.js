import React from "react";
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
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";

import { Link, useHistory } from "react-router-dom";

import "./HorizontalNav4.css"

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
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
    width: 256,
  },
}));

export default function Navigation(props) {

  const history = useHistory();
  const classes = useStyles();

  const content = {
    brand: { image: "mui-assets/img/logo-pied-piper-white.png", width: 120 },
    "brand-small": {
      image: "mui-assets/img/logo-pied-piper-white-icon.png",
      width: 32,
    },
    link1: "Features",
    link2: "Enterprise",
    link3: "Support",
    link4: "ICO",
    avatar:
      "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    ...props.content,
  };

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
    <AppBar position="static" >
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
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/rituals" className="nav-link">
          Rituals
        </Link>
        <Link to="/rituals/standup" className="nav-link">
          Stand Up
        </Link>
        <Link to="/rituals/retro" className="nav-link">
          Retro
        </Link>
        </div>
        <IconButton color="inherit" className="avatar">
          <Avatar alt="" src={content["avatar"]} />
        </IconButton>
      </Toolbar>
      <Drawer anchor="left" open={state.open} onClose={toggleDrawer(false)}>
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button onClick={() => {
              history.replace("/home")
              document.location.reload()
            }}  key={content["link1"]}>
              <ListItemIcon>
                <AppsIcon />
              </ListItemIcon>
              <ListItemText primary={content["link1"]} />
            </ListItem>
            <ListItem button onClick={() => {
              history.replace("/rituals/standup")
              document.location.reload()
            }} key={content["link2"]}>
              <ListItemIcon>
                <BusinessCenterIcon />
              </ListItemIcon>
              <ListItemText primary={content["link2"]} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </AppBar>
  );
}
