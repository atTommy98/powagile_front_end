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
  const [standUpStep, setStandUpStep] = useState(2);

  /*Meeting Setup*/
  const [minutesPerParticipant, setMinutesPerParticipant] = useState(1);
  const [timeBetweenSpeakers, setTimeBetweenSpeakers] = useState(2);

  const [participantToAdd, setParticipantToAdd] = useState("");

  const dummyMeeting = {
    type: "standup",
    meetingParticipants: [
      { name: "Daniela", hasHadTurn: false, timeLeft: 12 },
      { name: "Stefan", hasHadTurn: false, timeLeft: 12 },
      { name: "Tommy", hasHadTurn: false, timeLeft: 12 },
      { name: "Kawalpreet", hasHadTurn: false, timeLeft: 12 },
      { name: "Jon", hasHadTurn: false, timeLeft: 12 },
    ],
    meetingStartTime: null,
    meetingEndTime: null,
  };

  // const blankMeeting = {
  //   meetingParticipants: [],
  //   meetingStartTime: null,
  //   meetingEndTime: null,
  // };

  // FIXME: Change to "blankMeeting" before testing
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

  function shuffleParticipants() {
    const array = [...meeting.meetingParticipants];

    //Fisher Yates algorithm - Shuffle Array
    for (let i = array.length; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    setMeeting({ ...meeting, meetingParticipants: array });
  }

  function startMeeting() {
    // Always shuffle participants
    shuffleParticipants();

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
              speakerTime: minutesPerParticipant * 60,
              timeBetweenSpeakers,
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
