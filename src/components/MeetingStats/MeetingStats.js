// React
import React, { useState, useEffect } from "react";

// CSS
import "./MeetingStats.css";

// Material UI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

//components
import SimpleAccordion from "./Acordion";
import FormPropsTextFields from "../../components/TextField/Text";

export default function MeetingStats() {
  // state for filtered date
  const [dateFilter, setDateFilter] = useState(null);

  // state for all previous meetings
  const [meetingHistory, setMeetingHistory] = useState([]);

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
    // setIsDateFilter(true);
  }

  function TimeDiff(startTime, endTime) {
    let sT = new Date(startTime);
    let eT = new Date(endTime);
    let difference = eT - sT;
    let diff_seconds = Math.floor(difference / 1000);
    let diff_minutes = Math.floor(difference / (1000 * 60));
    let diffsec2 = diff_seconds - 60;
    if (diff_minutes === 0) {
      return `${diff_minutes}:${diff_seconds}`;
    } else {
      return `${Math.floor(diff_seconds / 60)}:${Math.abs(diffsec2)}`;
    }
  }
  return (
    <div className="input-container">
      <Paper
        elevation={3}
        style={{ maxWidth: "700px", padding: "5px", margin: "10px auto" }}
      >
        <p className="statsTitle">Filter your meeting by Date</p>
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
        {"  "}
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={getMeetingByDate}
        >
          Get all Meetings
        </Button>
        <p>Showing all meetings from: {dateFilter} 📅</p>
        {meetingHistory.map((obj, i) => {
          return (
            <div className="notes inner">
              <div key={i}>
                <FormPropsTextFields
                  index={i}
                  label="Meeting Type"
                  defaultValue={obj.type}
                />
                <FormPropsTextFields
                  index={i}
                  label="Meeting Date"
                  defaultValue={dateFilter}
                />
                <FormPropsTextFields
                  index={i}
                  label="Meeting Time"
                  defaultValue={TimeDiff(
                    obj.meetingStartTime,
                    obj.meetingEndTime
                  )}
                />
                <SimpleAccordion
                  title="Details"
                  textParticipant={obj.meetingParticipants.map((ojs) => {
                    return <div>Name: {ojs.name}</div>;
                  })}
                  textTimeLeft={obj.meetingParticipants.map((ojs) => {
                    return <div>Time left: {ojs.timeLeft}</div>;
                  })}
                  //   textTimePaused={obj.meetingParticipants.map((ojs) => {
                  //     return <div>Pauses: {ojs.pauses}</div>;
                  //   })}
                ></SimpleAccordion>
              </div>
            </div>
          );
        })}
      </Paper>
    </div>
  );
}
