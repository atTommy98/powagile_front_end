// React
import React, { useEffect, useState } from "react";

// Environment variables
require("dotenv").config();

const { REACT_APP_BACK_END_URL } = process.env;

export default function UserDashboard() {
  const [meetings, setMeetings] = useState([]);

  //Get meetings
  useEffect(() => {
    function retrieveMeetings() {
      fetch(`${REACT_APP_BACK_END_URL}/meetingStandUp/getAll`)
        .then((res) => res.json())
        .then((data) => setMeetings(data));
    }
    retrieveMeetings();
  }, []);

  function generateNumberOfStandups() {
    console.log(meetings);
    let numberOfStandups = 0;
    // eslint-disable-next-line array-callback-return
    meetings.map((obj) => {
      if (obj.type === "standup") {
        numberOfStandups++;
      }
    });
    return numberOfStandups;
  }

  generateNumberOfStandups();
  return <h3 className="stat">{generateNumberOfStandups()}</h3>;
}
