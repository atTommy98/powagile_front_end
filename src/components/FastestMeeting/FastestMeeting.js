import React, { useEffect, useState } from "react";
// React

export default function UserDashboard() {
  const [meetings, setMeetings] = useState([]);

  const previousWeek = calculatePreviousWeek();

  // retrieve all meetings
  useEffect(() => {
    function retrieveMeetings() {
      fetch("https://powagile-back-end.herokuapp.com/meeting")
        .then((res) => res.json())
        .then((data) => setMeetings(data));
    }
    retrieveMeetings();
  }, []);

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

  function calculatePreviousWeek() {
    let date = new Date();
    let arrayOfPreviousWeek = [];
    for (let i = 0; i < 8; i++) {
      arrayOfPreviousWeek[i] = createDateObject(date - i * 86400000);
    }
    arrayOfPreviousWeek.reverse();
    return arrayOfPreviousWeek;
  }

  function calculateTotalTime(startTime, endTime) {
    let total = endTime - startTime;
    total = total / 60000;
    return total;
  }

  function generateDataset() {
    const values = [];
    // eslint-disable-next-line array-callback-return
    meetings.map((obj) => {
      let meetingTime = calculateTotalTime(
        obj.meetingStartTime,
        obj.meetingEndTime
      );
      // Check it's a valid meeting
      if (obj.meetingStartTime && obj.meetingEndTime) {
        let meetingDate = createDateObject(obj.createdAt);
        for (let i = 0; i < previousWeek.length; i++) {
          if (meetingDate.day === previousWeek[i].day && meetingTime > 0) {
            let array = [meetingTime, meetingDate.day];
            values.push(array);

            break;
          }
        }
      }
    });

    return values;
  }

  function quickestMeeting(timeArray) {
    let meetingTimeArr = [];
    let dayArray = [];
    for (let i = 0; i < timeArray.length; i++) {
      meetingTimeArr.push(timeArray[i][0]);
      dayArray.push(timeArray[i][1]);
    }
    let quickest = Math.ceil(Math.min(...meetingTimeArr));
    let quickestIndex = meetingTimeArr.indexOf(Math.min(...meetingTimeArr));
    let dayOfQuickest = dayArray[quickestIndex];
    if (dayOfQuickest === 1) {
      return `Your fastest meeting was ${quickest} minutes on the ${dayOfQuickest}th`;
    } else if (dayOfQuickest === 2) {
      return `Your fastest meeting was ${quickest} minutes on the ${dayOfQuickest}th`;
    } else if (dayOfQuickest === 3) {
      return `Your fastest meeting was ${quickest} minutes on the ${dayOfQuickest}th`;
    } else {
      return `Your fastest meeting was ${quickest} minutes on the ${dayOfQuickest}th`;
    }
  }
  const dataset = generateDataset();

  return <h3>{meetings ? quickestMeeting(dataset) : null}</h3>;
}
