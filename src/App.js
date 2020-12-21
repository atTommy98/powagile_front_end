import "./App.css";

// React
import React from "react";

// React Router
// import { Router, Route, Switch, Link } from "react-router";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

// Components
import Nav from "./components/Nav/Nav.js";
import StandUpPage from "./pages/StandUpPage/StandUpPage.js";
import LogInButton from "./components/Login/LogInButton/LogInButton";
import LogOutButton from "./components/Login/LogOutButton/LogOutButton";
import UserInfo from "./components/Login/UserInfo/UserInfo";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <div className="appContainer">
      <header>
        <Nav />
      </header>
      <main>
        <StandUpPage />
        <UserInfo />
        {isAuthenticated ? <LogOutButton /> : <LogInButton />}
      </main>
    </div>
  );
}

export default App;
