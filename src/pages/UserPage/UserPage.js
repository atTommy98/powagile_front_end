// React
import React, { useContext } from "react";

// CSS
import "./UserPage.css";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

export default function UserPage() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div>
      <h1>User Information</h1>
      <p>{user[0] === undefined ? `Please Log In` : user[0].email}</p>
      <p>{`User logged in: ${user[1]}`}</p>
    </div>
  );
}
