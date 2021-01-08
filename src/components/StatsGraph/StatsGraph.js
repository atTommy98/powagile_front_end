// React
import React, { useState, useEffect } from "react";

// React-Charts
import { Bar } from "react-chartjs-2";

export default function StatsGraph() {
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
        return setYAxisValues(obj, previousWeek);
      });
    }
  }, [stats]);

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

  function calculateTotalTime(startTime, endTime) {
    let total = endTime - startTime;
    total = total / 60000;
    return total;
  }

  function setYAxisValues(obj, previousWeek) {
    let meetingDate = createDateObject(obj.createdAt);
    for (let i = 0; i < previousWeek.length; i++) {
      if (meetingDate.day === previousWeek[i].day) {
        // TODO: Currently setting to 0 every time same date is found, want to have cumulative addition, not most recent. I think?
        let newState = [0, 0, 0, 0, 0, 0, 0, 0];
        newState[i] = Math.round(
          newState[i] +
            calculateTotalTime(obj.meetingStartTime, obj.meetingEndTime)
        );
        setyAxis(newState);
      }
    }
  }

  function calculatePreviousWeek() {
    let date = new Date();
    let arrayOfPreviousWeek = [];
    for (let i = 0; i < 8; i++) {
      arrayOfPreviousWeek[i] = createDateObject(date - i * 86400000);
    }
    arrayOfPreviousWeek.reverse();
    return arrayOfPreviousWeek;
  }

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
