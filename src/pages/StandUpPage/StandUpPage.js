// React
import { useState, useEffect } from "react";

// CSS
import "./StandUpPage.css";

// Custom Componenets
import InstructionsPage from "./01_Instructions/01_Instructions";
import SetupPage from "./02_Setup/02_Setup";
import RandomizerAndTimer from "./03_RandomizerAndTimer/03_RandomizerAndTimer";

export default function StandUpPage() {
  /*Steps*/
  const [standUpStep, setStandUpStep] = useState(1);

  /*Meeting Setup*/
  const [minutesPerParticipant, setMinutesPerParticipant] = useState(1);
  const [timeBetweenSpeakers, setTimeBetweenSpeakers] = useState(10);

  const [participantToAdd, setParticipantToAdd] = useState("");

  /*🔴🔴🔴🔴🔴*/
  const dummyMeeting = {
    meetingParticipants: [
      { name: "Daniela", hasHadTurn: false, timeLeft: 60 },
      { name: "Stefan", hasHadTurn: false, timeLeft: 60 },
      { name: "Tommy", hasHadTurn: false, timeLeft: 60 },
      { name: "Kawalpreet", hasHadTurn: false, timeLeft: 60 },
      { name: "Jon", hasHadTurn: false, timeLeft: 60 },
    ],
    meetingStartTime: null,
    meetingEndTime: null,
  };

  // const properMeeting = {
  //   meetingParticipants: [],
  //   meetingStartTime: null,
  //   meetingEndTime: null,
  // };
  /*🔴🔴🔴🔴🔴*/

  const [meeting, setMeeting] = useState({ ...dummyMeeting });

  /*Steps*/
  const [totalMeetingTime, setTotalMeetingTime] = useState(0);

  function deleteParticipant(i) {
    if (i === undefined) {
      console.error("No index passed to deleteParticipant");
      return;
    }
    const newState = { ...meeting };
    newState.meetingParticipants.splice(i, 1);
    setMeeting(newState);
  }

  function calculateMeetingTime() {
    const people = meeting.meetingParticipants.length;
    const speakingTimeInSeconds = people * minutesPerParticipant * 60;
    const timeBetweenSpeakersInSeconds = people * timeBetweenSpeakers;
    const totalTimeInMinutes = Math.round(
      (speakingTimeInSeconds + timeBetweenSpeakersInSeconds) / 60
    );
    setTotalMeetingTime(totalTimeInMinutes);
  }

  useEffect(() => {
    calculateMeetingTime();
  });

  function addParticipant(event) {
    event.preventDefault();
    if (participantToAdd === "") {
      return;
    }
    const newState = { ...meeting };
    newState.meetingParticipants.push({
      name: participantToAdd,
      hasHadTurn: false,
      timeLeft: null,
      timesPaused: [],
    });
    setParticipantToAdd("");
    setMeeting(newState);
  }

  function startMeeting() {
    // Give each participant their time
    const myArr = meeting.meetingParticipants.map((el) => {
      el.timeLeft = minutesPerParticipant * 60;
      return el;
    });
    setMeeting({ ...meeting, meetingParticipants: [...myArr] });

    const newState = { ...meeting };
    newState.meetingStartTime = Date.now();
    setMeeting(newState);
    setStandUpStep(3);
  }

  return (
    <div>
      {standUpStep === 1 ? (
        <InstructionsPage nextButton={() => setStandUpStep(2)} />
      ) : null}

      {standUpStep === 2 ? (
        <SetupPage
          props={{
            minutesPerParticipant,
            setMinutesPerParticipant,
            timeBetweenSpeakers,
            setTimeBetweenSpeakers,
            participantToAdd,
            addParticipant,
            deleteParticipant,
            setParticipantToAdd,
            meeting,
            totalMeetingTime,
            setStandUpStep,
            startMeeting,
          }}
        />
      ) : null}

      {standUpStep === 3 ? (
        <div>
          <RandomizerAndTimer
            props={{
              meeting,
              setMeeting,
              array: meeting.meetingParticipants,
              speakerTime: minutesPerParticipant * 60,
              timeBetweenSpeakers,
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
