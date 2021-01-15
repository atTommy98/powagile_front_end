// React
import React, { useEffect, useState } from "react";

// Environment variables
require("dotenv").config();

const { REACT_APP_BACK_END_URL } = process.env;

export default function UserDashboard(props) {
  const [meetings, setMeetings] = useState([]);

  //Get meetings
  useEffect(() => {
    function retrieveMeetings() {
      fetch(`${REACT_APP_BACK_END_URL}/meeting/getAll`)
        .then((res) => res.json())
        .then((data) => setMeetings(data));
    }
    retrieveMeetings();
  }, []);

  function generateNumberOfRetros() {
    console.log(meetings);
    let numberOfRetros = 0;
    // eslint-disable-next-line array-callback-return
    meetings.map((obj) => {
      if (obj.type === "retro") {
        numberOfRetros++;
      }
    });
    return numberOfRetros;
  }

  generateNumberOfRetros();
  return <h3 className="stat">{generateNumberOfRetros()}</h3>;
}
