// React
import React, { useContext } from "react";

// CSS
import "./UserPage.css";

// Context
// FIXME: OLD CONTEXT, MUST IMPORT NEW ONE HERE!!
// import { UserContext } from "../../UserContext";

export default function UserPage() {
  // FIXME: OLD CONTEXT, MUST IMPORT NEW ONE HERE!!
  // const user = useContext(UserContext);

  const user = null;

  console.log(user);

  return (
    <div>
      <h1>User Information</h1>
      <p>{user[0] === undefined ? `Please Log In` : user[0].email}</p>
      <p>{`User logged in: ${user[1]}`}</p>
    </div>
  );
}
