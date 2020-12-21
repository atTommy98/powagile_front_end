import "./App.css";

// Pages
import StandUpPage from "./pages/StandUpPage/StandUpPage";
import HomePage from "./pages/HomePage/HomePage";
import RetroPage from "./pages/RetroPage/RetroPage";
import UserPage from "./pages/UserPage/UserPage";

// React
import React from "react";

// Components
import Nav from "./components/Nav/Nav.js";

//Router
import {Route, Switch } from "react-router-dom";

function App() {
  return (
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
  );
}

export default App;
