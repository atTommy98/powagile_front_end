// React
import { useState, useEffect } from "react";

// CSS
import "./StandUpPage.css";

// Custom Componenets
import InstructionsPage from "./01_Instructions/01_Instructions";
import SetupPage from "./02_Setup/02_Setup";
import Randomiser from "../../components/Randomiser/randomiser2.js";

export default function StandUpPage() {
  /*Steps*/
  const [standUpStep, setStandUpStep] = useState(3);

  /*Meeting Setup*/
  const [minutesPerParticipant, setMinutesPerParticipant] = useState(2);
  const [timeBetweenSpeakers, setTimeBetweenSpeakers] = useState(15);

  const [participantToAdd, setParticipantToAdd] = useState("");

  /*🔴🔴🔴🔴🔴*/
  const dummyMeeting = {
    meetingParticipants: [
      { name: "Daniela", hasHadTurn: false, timeLeft: null },
      { name: "Stefan", hasHadTurn: false, timeLeft: null },
      { name: "Tommy", hasHadTurn: false, timeLeft: null },
      { name: "Kawalpreet", hasHadTurn: false, timeLeft: null },
      { name: "Jon", hasHadTurn: false, timeLeft: null },
    ],
    meetingStartTime: null,
    meetingEndTime: null,
  };

  const properMeeting = {
    meetingParticipants: [],
    meetingStartTime: null,
    meetingEndTime: null,
  };
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
          <Randomiser
            props={{
              setMeeting,
              array: meeting.meetingParticipants,
              timeInSeconds: minutesPerParticipant * 60,
              timeBetweenSpeakers,
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
