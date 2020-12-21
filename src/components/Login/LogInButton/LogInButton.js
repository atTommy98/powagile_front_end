// React
import React from "react";
// Auth0
import { useAuth0 } from "@auth0/auth0-react";
// CSS
import "./LogInButton.css";

export default function LogInButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className="btn" onClick={() => loginWithRedirect()}>
      Log In
    </button>
  );
}
