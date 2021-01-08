// React
import React from "react";

// CSS
import "./UserPage.css";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

// React-Charts
import StatsGraph from "../../components/StatsGraph/StatsGraph"

export default function UserPage() {
  const { user, isAuthenticated } = useAuth0();

  return true ? (
    <div>
      <div id="userInfo">
        <img src={user.picture} alt={user.name} id="userImg" />
        <h4>{user.name}</h4>
        <p>{user.email}</p>
      </div>
      <StatsGraph></StatsGraph>
    </div>
  ) : (
    <h2>🤔 You don't seem to be logged in!</h2>
  );
}

/* 
x-axis, previous 7 days
  > take date object to find current day
  > if created at is within current day - 7 days, then use that data to plot y-axis

y-axis total meeting time per day
  > if meeting is within last 7 days
  > find day it was on, use date (01, 05, 22 of that month etc to work out whether it was mon, tue, fri etc)
  > subtract startTime from endTime to find total time of meeting
  add all meeting times together for that day and present that as data on the y-axis for that day

  Get text
  Subtract 1 day 7 times
  Convert to day
  Push to array
*/
