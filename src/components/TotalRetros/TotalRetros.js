import React, { useEffect, useState } from "react";
// React

export default function UserDashboard() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    function retrieveMeetings() {
      fetch("https://powagile-back-end.herokuapp.com/meeting")
        .then((res) => res.json())
        .then((data) => setMeetings(data));
    }
    retrieveMeetings();
  }, []);

  function generateNumberOfRetros() {
      console.log(meetings)
      let numberOfRetros = 0
      // eslint-disable-next-line array-callback-return
      meetings.map((obj) => {
          if (obj.type === "retro") {
              numberOfRetros++
          }
      })
      return numberOfRetros
  }

  generateNumberOfRetros()
  return <h3 className="stat">{generateNumberOfRetros()}</h3>;
}
