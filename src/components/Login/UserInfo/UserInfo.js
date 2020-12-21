import React from "react";
// Auth0
import { useAuth0 } from "@auth0/auth0-react";
// CSS
import "./UserInfo.css";

export default function UserInfo() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div id="userInfo">
        <img src={user.picture} alt={user.name} id="userImg" />
        <h4>{user.name}</h4>
        <p>{user.email}</p>
      </div>
    )
  );
}
