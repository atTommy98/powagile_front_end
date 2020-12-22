import "./App.css";

// Pages
import StandUpPage from "./pages/StandUpPage/StandUpPage";
import HomePage from "./pages/HomePage/HomePage";
import RetroPage from "./pages/RetroPage/RetroPage";
import UserPage from "./pages/UserPage/UserPage";

// React
import React, { useState, useContext } from "react";

import Wheel from "./components/Spinner/index";

// Components
import Nav from "./components/Nav/Nav.js";
import { UserContext } from "./UserContext.js";

// Router
import { Route, Switch } from "react-router-dom";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <UserContext.Provider value={[user, isAuthenticated]}>
      <div className="appContainer">
        <header>
          <Nav />
        </header>
        <main>
          <Switch>
            <Route path="/rituals/retro" component={RetroPage}></Route>
            <Route path="/rituals/standup" component={StandUpPage}></Route>
            <Route path="/user" component={UserPage}></Route>
            <Route path="/" component={HomePage}></Route>
          </Switch>
        </main>
      </div>
    </UserContext.Provider>
  );
}

export default App;

//
