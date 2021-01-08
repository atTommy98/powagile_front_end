// React
import React, { useState, useEffect } from "react";

// React-Charts
import { Bar } from "react-chartjs-2";

export default function StatsGraph() {
  const [stats, setStats] = useState([]);
  const [yAxis, setyAxis] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  // retrieve all meetings from database
  useEffect(() => {
    function retrieveMeetings() {
      fetch("https://powagile-back-end.herokuapp.com/meeting")
        .then((res) => res.json())
        .then((data) => setStats(data));
    }
    retrieveMeetings();
  }, []);

  // when state "stats" is updated, place data in "yAxis" state and calculate the previous week for the x-axis
  useEffect(() => {
    setyAxis([0, 0, 0, 0, 0, 0, 0, 0]);
    if (stats.length !== 0) {
      let previousWeek = calculatePreviousWeek();
      // eslint-disable-next-line array-callback-return
      stats.map((obj, i) => {
        console.log({ [i]: stats[i] });
        if (obj.meetingStartTime === null || obj.meetingEndTime === null) {
          // eslint-disable-next-line array-callback-return
          return;
        } else setYAxisValues(obj, previousWeek);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats]);

  // creates a date object for a specific point in time. allows you to access the date, day, month, year and milliseconds at that point in time.
  function createDateObject(time) {
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

  // find total time of a meeting using start time and end time of the meeting
  function calculateTotalTime(startTime, endTime) {
    let total = endTime - startTime;
    total = total / 60000;
    return total;
  }

  // create an array for the y-axis data. if the date of a meetings was in the previous week, assign it to the corresponding day (using the index of the array). rounds up to nearest minutes and sets y-axis state.
  function setYAxisValues(obj, previousWeek) {
    let meetingDate = createDateObject(obj.createdAt);
    for (let i = 0; i < previousWeek.length; i++) {
      if (meetingDate.day === previousWeek[i].day && yAxis[i] === 0) {
        let newState = [...yAxis];
        newState[i] = Math.round(
          newState[i] +
            calculateTotalTime(obj.meetingStartTime, obj.meetingEndTime)
        );
        console.log(newState);
        setyAxis(newState);
      }
    }
  }

  console.log("rener");
  console.log(`Y axis ${yAxis}`);
  // calculates the dates of the past week based on todays date.
  function calculatePreviousWeek() {
    let date = new Date();
    let arrayOfPreviousWeek = [];
    for (let i = 0; i < 8; i++) {
      arrayOfPreviousWeek[i] = createDateObject(date - i * 86400000);
    }
    arrayOfPreviousWeek.reverse();
    return arrayOfPreviousWeek;
  }

  // makes labels for x-axis using the day and months.
  function createLabelArray(arr) {
    let labelArray = [];
    for (let i = 0; i < arr.length; i++) {
      let label = `${arr[i].day}/${arr[i].month + 1}`;
      labelArray.push(label);
    }
    return labelArray;
  }

  const previousWeek = calculatePreviousWeek();
  const labelArray = createLabelArray(previousWeek);

  // dataset for the graph
  const data = {
    labels: labelArray,
    datasets: [
      {
        label: "Total Meeting Time",
        backgroundColor: "rgba(100,100,100,0.2)",
        borderColor: "rgba(10,10,10,0.2)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(100,100,100,0.3)",
        hoverBorderColor: "rgba(10,10,10,0.5)",
        minBarLength: 0,
        data: yAxis,
        yAxesID: "Y-Axes",
      },
    ],
  };

  return (
    <div>
      {!yAxis ? null : (
        <Bar
          data={data}
          options={{
            title: {
              display: true,
              text: "Total Time in Meetings This Week",
              fontSize: 20,
            },
            animation: { duration: 2000 },
            legend: {
              display: true,
              align: "center",
              position: "top",
              labels: { padding: 5 },
            },
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Minutes",
                    fontSize: 15,
                  },
                  ticks: {
                    suggestedMin: 0,
                    suggestedMax: Math.ceil(Math.max(...yAxis) / 10) * 10 + 10,
                  },
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Date (day/month)",
                    fontSize: 15,
                  },
                },
              ],
            },
          }}
        />
      )}
    </div>
  );
}
