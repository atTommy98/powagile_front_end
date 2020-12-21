// React
import React from "react";
// Auth0
import { useAuth0 } from "@auth0/auth0-react";
// CSS
import "./LogOutButton.css";

export default function LogOutButton() {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
}
