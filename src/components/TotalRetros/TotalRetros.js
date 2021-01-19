// React
import React, { useEffect, useState } from "react";

// Environment variables
require("dotenv").config();

const { REACT_APP_BACK_END_URL } = process.env;

export default function UserDashboard(props) {
  const [retros, setRetros] = useState([]);

  //Get meetings
  useEffect(() => {
    function retrieveMeetings() {
      fetch(`${REACT_APP_BACK_END_URL}/meetingRetro/getAll`)
        .then((res) => res.json())
        .then((data) => setRetros(data));
    }
    retrieveMeetings();
  }, []);

  function generateNumberOfRetros() {
    return retros.length;
  }

  generateNumberOfRetros();
  return <h3 className="stat">{generateNumberOfRetros()}</h3>;
}
