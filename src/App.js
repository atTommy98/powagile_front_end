import "./App.css";

// Pages
import StandUpPage from "./pages/StandUpPage/StandUpPage";
import HomePage from "./pages/HomePage/HomePage";
import RetroPage from "./pages/RetroPage/RetroPage";
import UserPage from "./pages/UserPage/UserPage";

// React
import React, { createContext } from "react";

// Components
import HorizontalNav4 from "./components/horizontal-navs/HorizontalNav4";

// Router
import { Route, Switch } from "react-router-dom";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, isAuthenticated } = useAuth0();
  const UserContext = createContext("loggedIn");

  return (
    <UserContext.Provider value={[user, isAuthenticated]}>
      <div className="appContainer">
        <header>
          <HorizontalNav4
            content={{
              brand: {
                text: "PowerShellRangers",
                image: "",
                width: "120",
              },
              link1: "Home",
              link2: "Rituals",
            }}
          />
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
