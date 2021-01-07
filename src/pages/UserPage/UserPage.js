// React
import React, { useState, useEffect } from "react";

// CSS
import "./UserPage.css";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

// React-Charts
import { Bar } from "react-chartjs-2";

export default function UserPage() {
  const { user, isAuthenticated } = useAuth0();
  const [stats, setStats] = useState([]);
  const [yAxis, setyAxis] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    function retrieveMeetings() {
      fetch("https://powagile-back-end.herokuapp.com/meeting")
        .then((res) => res.json())
        .then((data) => setStats(data));
    }
    retrieveMeetings();
  }, []);

  useEffect(() => {
    if (stats.length !== 0) {
      let previousWeek = calculatePreviousWeek();
      stats.map((obj) => {
        setYAxisValues(obj, previousWeek);
      });
    }
    console.log(yAxis)
  }, [stats]);

  function setYAxisValues(obj, previousWeek) {
    let meetingDate = createDate(obj.createdAt);
    for (let i = 0; i < previousWeek.length; i++) {
      if (meetingDate.day === previousWeek[i].day) {
        const newState = yAxis;
        newState[i] =
          newState[i] +
          calculateTotalTime(obj.meetingStartTime, obj.meetingEndTime);
        setyAxis(newState);
      }
    }
  }

  function createDate(time) {
    const date = new Date(time);
    const obj = {
      day: date.getDate(),
      weekday: date.getDay(),
      month: date.getMonth(),
      year: date.getFullYear(),
      milliseconds: date.getTime(),
    };
    return obj;
  }

  function calculatePreviousWeek() {
    let date = new Date();
    let dateCreated = createDate(date);
    let dateCreatedMinus1 = createDate(dateCreated.milliseconds - 1 * 86400000);
    let dateCreatedMinus2 = createDate(dateCreated.milliseconds - 2 * 86400000);
    let dateCreatedMinus3 = createDate(dateCreated.milliseconds - 3 * 86400000);
    let dateCreatedMinus4 = createDate(dateCreated.milliseconds - 4 * 86400000);
    let dateCreatedMinus5 = createDate(dateCreated.milliseconds - 5 * 86400000);
    let dateCreatedMinus6 = createDate(dateCreated.milliseconds - 6 * 86400000);
    let dateCreatedMinus7 = createDate(dateCreated.milliseconds - 7 * 86400000);

    let arrayOfPreviousWeek = [
      dateCreatedMinus7,
      dateCreatedMinus6,
      dateCreatedMinus5,
      dateCreatedMinus4,
      dateCreatedMinus3,
      dateCreatedMinus2,
      dateCreatedMinus1,
      dateCreated,
    ];
    return arrayOfPreviousWeek;
  }

  const previousWeek = calculatePreviousWeek();
  const labels = [
    `${previousWeek[0].day}/${previousWeek[0].month + 1}`,
    `${previousWeek[1].day}/${previousWeek[1].month + 1}`,
    `${previousWeek[2].day}/${previousWeek[2].month + 1}`,
    `${previousWeek[3].day}/${previousWeek[3].month + 1}`,
    `${previousWeek[4].day}/${previousWeek[4].month + 1}`,
    `${previousWeek[5].day}/${previousWeek[5].month + 1}`,
    `${previousWeek[6].day}/${previousWeek[6].month + 1}`,
    `${previousWeek[7].day}/${previousWeek[7].month + 1}`,
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Meeting Time",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        minBarLength: 0,
        data: yAxis,
      },
    ],
  };

  function calculateTotalTime(startTime, endTime) {
    let total = endTime - startTime;
    total = total / 1000;
    return total;
  }

  return true ? (
    <div>
      {/* <div id="userInfo">
        <img src={user.picture} alt={user.name} id="userImg" />
        <h4>{user.name}</h4>
        <p>{user.email}</p>
      </div> */}
      <div>
        <Bar
          data={data}
          options={{
            scales: {
              yAxes: [{ ticks: { suggestedMin: 0, suggestedMax: 4000 } }],
            },
          }}
        />
      </div>
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
