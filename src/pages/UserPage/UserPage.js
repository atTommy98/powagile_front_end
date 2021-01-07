// React
import React, { useState, useEffect } from "react";

// CSS
import "./UserPage.css";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

import Button from "@material-ui/core/Button";
import DatePickers from "../../../src/components/datePicker";
export default function UserPage() {
  const { user, isAuthenticated } = useAuth0();

  // state for filtered date
  const [dateFilter, setDateFilter] = useState(null);
  const [isDateFilter, setIsDateFilter] = useState(false);
  const [isCLicked, setIsClicked] = useState(false);

  // state for all previous meetings
  const [meetingHistory, setMeetingHistory] = useState([]);

  // get all meetings
  // async function getAllMeetings() {
  //   if (isAuthenticated) {
  //     const res = await fetch("http://localhost:8080/meeting/getAll");
  //     const data = await res.json();
  //     setMeetingHistory(data);
  //     console.log(data);
  //   }
  // }

  // get all meetings filtered by date

  async function getMeetingByDate() {
    let timestamp = new Date(dateFilter);
    timestamp = timestamp.getTime();

    const res = await fetch(
      `http://localhost:8080/meeting/getByDate?meetingStartTime=${timestamp}`
    );
    const { data } = await res.json();
    console.log(data);
    setMeetingHistory(data);
    setIsDateFilter(true);
  }

  function displayDataBtn() {
    setIsClicked(true);
  }
  function input(event) {
    setDateFilter(event.target.value);
  }
  // function removeDateFilter() {
  //   setIsDateFilter(false);
  //   setDateFilter("1970-01-01");
  // }

  return isAuthenticated ? (
    <div>
      <div id="userInfo">
        <img src={user.picture} alt={user.name} id="userImg" />
        <h4>{user.name}</h4>
        <p>{user.email}</p>
      </div>
      <div className="input-container">
        <h2>Filter your meeting by Date</h2>
        <br></br>
        <span>
          <DatePickers />

          <input
            style={{
              width: "175px",
              align: "center",
              display: "inline-block",
            }}
            className="form-control-homepage"
            type="date"
            onChange={(event) => setDateFilter(event.target.value)}
            placeholder="filter"
            name="filter-date"
          ></input>
        </span>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={getMeetingByDate}
        >
          Get all Meetings
        </Button>

        <h2>Showing all meetings since {dateFilter} 📅</h2>
        {meetingHistory.map((obj, i) => {
          return (
            <div className="notes inner">
              <div key={i}>
                <h2>Type: {obj.type}</h2>
                <p>
                  <b>Date: </b>
                  {obj.meetingStartTime}
                </p>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  key={i}
                  onClick={displayDataBtn}
                >
                  {obj.type} on {dateFilter}
                </Button>
                {isCLicked ? (
                  <div className="row table">
                    <div className="column">
                      <p>
                        <b>Participants: </b>
                        {obj.meetingParticipants.map((ojs) => {
                          return <div>Name: {ojs.name}</div>;
                        })}
                      </p>
                    </div>
                    <div className="column">
                      <p>
                        <b>Had their Turn:: </b>
                        {obj.meetingParticipants.map((ojs) => {
                          return <div>Had Turn:: {ojs.hasHadTurn}</div>;
                        })}
                      </p>
                    </div>
                    <div className="column">
                      <p>
                        <b>Time Left: </b>
                        {obj.meetingParticipants.map((ojs) => {
                          return <div>Time left: {ojs.timeLeft}</div>;
                        })}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <h2>🤔 You don't seem to be logged in!</h2>
  );
}
