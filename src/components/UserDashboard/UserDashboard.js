// React
import React, { useEffect, useState } from "react";

//Auth0
import { useAuth0 } from "@auth0/auth0-react";

// CSS
import "./UserDashboard.css";

// MaterialUI
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";

//Components
import FastestMeeting from "../FastestMeeting/FastestMeeting";
import TotalRetros from "../TotalRetros/TotalRetros";
import TotalStandups from "../TotalStandups/TotalStandups"

export default function UserDashboard() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="dashboard-container">
      <div className="user-information">
        <h1>{user ? user.name : <h3>pws log in</h3>}</h1>
        <h3>Facilitator</h3>
        <h3>@ {user ? user.email : <h3>No e-mail</h3>}</h3>
        <FastestMeeting></FastestMeeting>
        <TotalRetros></TotalRetros>
        <TotalStandups></TotalStandups>
      </div>
      <div className="img-container">
        {user ? (
          <Avatar alt={user.name} src={user.picture} className="avatar-home" />
        ) : null}
      </div>
    </div>
  );
}
