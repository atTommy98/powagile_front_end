// React
import React, { useState, useEffect } from "react";

// CSS
import "./UserPage.css";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

import Button from "@material-ui/core/Button";
import ParticipantCard from "../../../src/components/MeetingParticipants/ParticipantCard/ParticipantCard";

export default function UserPage() {
  const { user, isAuthenticated } = useAuth0();

  // state for all previous meetings
  const [meetingHistory, setMeetingHistory] = useState({});

  // const [date, setDate] = useState(null);

  // state for filtered date
  const [dateFilter, setDateFilter] = useState(null);
  const [isDateFilter, setIsDateFilter] = useState(false);

  // function filterHistoryDate(date) {
  //   setIsDateFilter(true);
  //   setDateFilter(date);
  // }

  // get all meetings

  const meeting = {
    type: "",
    meetingParticipants: [],
    meetingStartTime: null,
    meetingEndTime: null,
    meetingFinished: false,
  };

  async function getAllMeetings() {
    if (isAuthenticated) {
      const res = await fetch("http://localhost:8080/meeting/getAll");
      const data = await res.json();

      setMeetingHistory({ data });

      console.log(data);
      console.log(meetingHistory);
    }
  }

  // get all meetings filtered by date
  // async function getMeetingByDate(date) {
  //   const res = await fetch(
  //     `http://localhost:8080/meeting/getByDate?meetingStartTime=${dateFilter}`
  //   );
  //   const data = await res.json();
  //   const { payload } = data;
  //   setMeetingHistory(payload);
  //   setIsDateFilter(true);
  //   setDateFilter(date);
  //   console.log(data);
  //   console.log(dateFilter);
  // }

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
          onClick={getAllMeetings}
        >
          Get all Meetings
        </Button>
        {meeting.meetingParticipants.map((obj, i) => (
          <ParticipantCard key={i} name={obj.name} />
        ))}
        {console.log(meetingParticipants)}
        {/* <button
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
      </div> */}
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

            <h2>
              Showing all meetings since{" "}
              {moment(dateFilter).format("YYYY-MM-DD")} 📅
            </h2>
     
            <button
              style={{
                backgroundColor: "rgb(120, 130, 134)",
                fontSize: "12px",
              }}
              onClick={() => removeDateFilter()}
            >
              Remove Filter`
            </button>

          </div>
        )}
        <div>
          {meetingHistory.map((meetingHistory) => {
            return (
              <div key={meetingHistory.id} className="notes inner">
                <div className="row">
                  <h2>Type: {meetingHistory.type}</h2>

                  <p className="column">
                    <b>Date: </b>
                    {moment(meetingHistory.meeting_date).format("Do MMMM YYYY")}
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
    </div>
  ) : (
    <h2>🤔 You don't seem to be logged in!</h2>
  );
}
