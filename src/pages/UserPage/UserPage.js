// React
import React, { useContext } from "react";

// CSS
import "./UserPage.css";

// Context
import { UserContext } from "../../UserContext";

export default function UserPage() {
  const user = useContext(UserContext);

  console.log(user);

  return (
    <div>
      <h1>User Information</h1>
      <p>{user[0] === undefined ? `Please Log In` : user[0].email}</p>
      <p>{`User logged in: ${user[1]}`}</p>
    </div>
  );
}
