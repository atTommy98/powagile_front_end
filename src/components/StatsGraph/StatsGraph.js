// React
import React, { useState, useEffect } from "react";

// React-Charts
import { Bar } from "react-chartjs-2";

export default function StatsGraph() {
  const [stats, setStats] = useState([]);

  // retrieve all meetings from database
  useEffect(() => {
    function retrieveMeetings() {
      fetch("https://powagile-back-end.herokuapp.com/meeting")
        .then((res) => res.json())
        .then((data) => setStats(data));
    }
    retrieveMeetings();
  }, []);

  // generates an array of y-valeus representing the total minutes spent in meetings, corresponds to the last 7 days
  function generateDataset() {
    const values = [0, 0, 0, 0, 0, 0, 0, 0];
    // eslint-disable-next-line array-callback-return
    stats.map((obj) => {
      // Check it's a valid meeting
      if (obj.meetingStartTime && obj.meetingEndTime) {
        let meetingDate = createDateObject(obj.createdAt);
        for (let i = 0; i < previousWeek.length; i++) {
          if (meetingDate.day === previousWeek[i].day) {
            values[i] = Math.round(
              values[i] +
                calculateTotalTime(obj.meetingStartTime, obj.meetingEndTime)
            );

            break;
          }
        }
      }
    });

    return values;
  }

  // creates a date object to allow you to access the date, day, month, year and milliseconds at a point in time.
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

  // calculate total time of a meeting
  function calculateTotalTime(startTime, endTime) {
    let total = endTime - startTime;
    total = total / 60000;
    return total;
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
        data: generateDataset(),
        yAxesID: "Y-Axes",
      },
    ],
  };

  return (
    <div>
      {!stats ? null : (
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
                    suggestedMax:
                      Math.ceil(Math.max(...generateDataset()) / 10) * 10,
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
