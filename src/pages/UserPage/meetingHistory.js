// React
import React, { useState, useEffect } from "react";

// CSS
import "./UserPage.css";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

import DateFilter from "./dateFilter";
const moment = require("moment");

export default function UserPage() {
  const { user, isAuthenticated } = useAuth0();
  const [meeting, setMeeting] = useState([]);
  const [meetingHistory, setMeetingHistory] = useState([]);
  const [date, setDate] = useState("");
  const [isDateFilter, setIsDateFilter] = useState(false);
  const [dateFilter, setDateFilter] = useState(null);

  // function filterHistoryDate(date) {
  //   setIsDateFilter(true);
  //   setDateFilter(date);
  // }
  console.log(date);
  console.log(isDateFilter);
  console.log(dateFilter);

  async function getAllMeetings() {
    const res = await fetch("http://localhost:8080/meeting");
    const data = await res.json();
    const { payload } = data;
    setMeeting(payload);
  }

  async function getMeetingDate(date) {
    const res = await fetch(
      `http://localhost:8080/meeting?meetingStartTime=${dateFilter}`
    );
    const data = await res.json();
    const { payload } = data;
    setMeetingHistory(payload);
    setIsDateFilter(true);
    setDateFilter(date);
    console.log(data);
  }

  function removeDateFilter() {
    setIsDateFilter(false);
    setDateFilter("1970-01-01");
  }
  return isAuthenticated ? (
    <div>
      <div id="userInfo">
        <img src={user.picture} alt={user.name} id="userImg" />
        <h4>{user.name}</h4>
        <p>{user.email}</p>
      </div>
      <div className="input-container">
        <div className="notes inner2">
          <h2>Filter by Date</h2>
          <br></br>
          <span>
            <input
              style={{
                width: "175px",
                align: "center",
                display: "inline-block",
              }}
              className="form-control-homepage"
              type="date"
              onChange={(event) => setDate(event.target.value)}
              placeholder="filter"
              name="filter-date"
            ></input>
            <button
              style={{
                display: "inline-block",
                fontSize: "10px",
                width: "60px",
                height: "37px",
                margin: "5px",
                backgroundColor: "rgb(120, 130, 134)",
              }}
              onClick={() => getMeetingDate(date)}
            >
              Filter
            </button>
          </span>
        </div>
      </div>
      {/* {isDateFilter === false && (
          <div>
            <br></br>
            <DateFilter filterHistoryDate={filterHistoryDate} />
            <br></br>
            <h2>Showing all meetings ☑️</h2>
            <br></br>
          </div>
        )}
        {isDateFilter && (
          <div>
            <br></br>
            <h2>
              Showing all meetings since{" "}
              {moment(dateFilter).format("YYYY-MM-DD")} 📅
            </h2>
            <br></br>
            <button
              style={{
                backgroundColor: "rgb(120, 130, 134)",
                fontSize: "12px",
              }}
              onClick={() => removeDateFilter()}
            >
              Remove Filter`
            </button>
            <br></br>
          </div>
        )}
        <div>
          {meetingHistory.map((meetingHistory) => {
            return (
              <div key={meetingHistory.id} className="notes inner">
                <div className="row">
                  <h2>Type: {meetingHistory.type}</h2>
                  <br></br>
                  <p className="column">
                    <b>Date: </b>
                    {moment(meetingHistory.meeting_date).format("Do MMMM YYYY")}
                  </p>
                </div>
                <div className="row">
                  <p className="column">
                    <br></br>
                    <a href="#top">Return to Top of Page</a>
                    <br></br>
                    <button onClick={() => handleDelete(meetingHistory.id)}>
                      Delete
                    </button>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <br></br>
      </div>
    </div> */}
    </div>
  ) : (
    <h2>🤔 You don't seem to be logged in!</h2>
  );
}
