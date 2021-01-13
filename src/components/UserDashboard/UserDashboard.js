// React
import React, { useEffect, useState } from "react";

//Auth0
import { useAuth0 } from "@auth0/auth0-react";

// CSS
import "./UserDashboard.css";

// MaterialUI
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

//Components
import FastestMeeting from "../FastestMeeting/FastestMeeting";
import TotalRetros from "../TotalRetros/TotalRetros";
import TotalStandups from "../TotalStandups/TotalStandups";

export default function UserDashboard() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Card elevation={3}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          {user ? (
            <Avatar
              alt={user.name}
              src={user.picture}
              className="avatar-user"
            />
          ) : null}
        </Grid>
        <Grid item xs={6}>
          <div className="user-details-container">
            <h2 className="user-name">
              {user ? user.name : <h3>pws log in</h3>}
            </h2>
            <h4 className="user-details">Facilitator</h4>
            <h4 className="user-details">
              @ {user ? user.email : <h3>No e-mail</h3>}
            </h4>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="stat-container">
            <TotalStandups></TotalStandups>
            <h4 className="stat-title">Total Standups</h4>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="stat-container">
            <TotalRetros></TotalRetros>
            <h4 className="stat-title">Total Retros</h4>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
}
