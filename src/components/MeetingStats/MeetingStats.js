// React
import React, { useState, useEffect } from "react";

// CSS
import "./MeetingStats.css";

// Material UI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";

//components
import SimpleAccordion from "./Acordion";
import FormPropsTextFields from "../../components/TextField/Text";

// Environment variables
require("dotenv").config();
const { REACT_APP_BACK_END_URL } = process.env;

export default function MeetingStats(props) {
  const { calculateTotalMeetingTime } = props;

  // state for filtered date
  const [dateFilter, setDateFilter] = useState(null);

  // state for all previous meetings
  const [meetingHistory, setMeetingHistory] = useState([]);

  // get all meetings filtered by date

  async function getMeetingByDate() {
    let timestamp = new Date(dateFilter);
    timestamp = timestamp.getTime();

    const res = await fetch(
      `${REACT_APP_BACK_END_URL}/meeting/getByDate?meetingStartTime=${timestamp}`
    );
    const { data } = await res.json();
    console.log(data);
    setMeetingHistory(data);
    // setIsDateFilter(true);
  }

  return (
    <div className="input-container">
      <Paper
        elevation={3}
        style={{ height: "auto", padding: "5px", margin: "0px auto" }}
      >
        <p style={{ fontSize: "26px", margin: "15px" }}>Select Meeting Date</p>
        <input
          style={{
            width: "175px",
            align: "center",
            display: "inline-block",
            marginBottom: "15px",
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
      </Paper>
      {meetingHistory.map((obj, i) => {
        return (
          <Card className="notes-inner" elevation={3}>
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
              defaultValue={`${Math.round(
                (new Date(obj.meetingEndTime).getTime() -
                  new Date(obj.meetingStartTime).getTime()) /
                  60000
              )} minutes`}
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
          </Card>
        );
      })}
    </div>
  );
}
