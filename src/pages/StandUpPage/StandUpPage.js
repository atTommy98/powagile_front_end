// React
import { useState, useEffect } from "react";

// CSS
import "./StandUpPage.css";

// Material UI
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Collapse from "@material-ui/core/Collapse";

// Custom Componenets
import InstructionsPage from "./01_Instructions/01_Instructions";
import SetupPage from "./02_Setup/02_Setup";
import RandomizerAndTimer from "./03_RandomizerAndTimer/03_RandomizerAndTimer";
import MeetingFinished from "./04_MeetingFinished/04_MeetingFinished";
import ProductTitle from "../../components/ProductTitle/ProductTitle";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

export default function StandUpPage() {
  /*Steps*/
  const [standUpStep, setStandUpStep] = useState(1);

  /*Meeting Setup*/
  const [secondsPerParticipant, setSecondsPerParticipant] = useState(60);
  const [timeBetweenSpeakers, setTimeBetweenSpeakers] = useState(10);
  const [participantToAdd, setParticipantToAdd] = useState("");

  /*Logged in user (if any)*/
  const { user } = useAuth0();

  // const dummyMeeting = {
  //   userId: null,
  //   type: "standup",
  //   meetingParticipants: [
  //     { name: "Daniela", hasHadTurn: true, timeLeft: 43, pauses: [] },
  //     { name: "Stefan", hasHadTurn: true, timeLeft: -60, pauses: [] },
  //     { name: "Tommy", hasHadTurn: true, timeLeft: 50, pauses: [] },
  //     { name: "Kawalpreet", hasHadTurn: true, timeLeft: 20, pauses: [] },
  //     { name: "Jon", hasHadTurn: false, timeLeft: 10, pauses: [] },
  //   ],
  //   meetingStartTime: 1610191221089,
  //   meetingEndTime: 1610191229759,
  //   meetingFinished: false,
  // };

  const blankMeeting = {
    userId: null,
    type: "standup",
    meetingParticipants: [],
    meetingStartTime: null,
    meetingEndTime: null,
    meetingFinished: false,
  };

  const [meeting, setMeeting] = useState({ ...blankMeeting });

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
  // Add User ID if logged in
  useEffect(() => {
    if (user) {
      setMeeting({ ...meeting, userId: user.sub });
    }
  }, [user]);

  // Calculate meeting time
  useEffect(() => {
    function calculateMeetingTime() {
      const people = meeting.meetingParticipants.length;
      const speakingTimeInSeconds = people * secondsPerParticipant;
      const timeBetweenSpeakersInSeconds = people * timeBetweenSpeakers;
      const totalTimeInMinutes = Math.round(
        (speakingTimeInSeconds + timeBetweenSpeakersInSeconds) / 60
      );
      setTotalMeetingTime(totalTimeInMinutes);
    }
    if (standUpStep === 2) {
      calculateMeetingTime();
    }
  }, [
    standUpStep,
    meeting.meetingParticipants.length,
    secondsPerParticipant,
    timeBetweenSpeakers,
  ]);

  // Check if meeting is finished
  useEffect(() => {
    if (meeting.meetingFinished === true) {
      setStandUpStep(4);
    }
  }, [setStandUpStep, meeting.meetingFinished]);

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
      pauses: [],
    });
    setParticipantToAdd("");
    setMeeting(newState);
  }

  // FIXME: Not working
  // function shuffleParticipants() {
  //   // Generate array of indices
  //   const indices = meeting.meetingParticipants.map((el, i) => i);

  //   //Fisher Yates algorithm - Shuffle Array
  //   for (let i = indices.length; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     const temp = indices[i];
  //     indices[i] = indices[j];
  //     indices[j] = temp;
  //   }

  //   // Shuffle participants via shuffled indices
  //   const shuffledParticipants = indices.map(
  //     (el) => meeting.meetingParticipants[el]
  //   );

  //   console.log(indices);
  //   console.log(shuffledParticipants);

  //   setMeeting({ ...meeting, meetingParticipants: shuffledParticipants });
  // }

  function startMeeting() {
    // Give each participant their time
    const myArr = meeting.meetingParticipants.map((el) => {
      el.timeLeft = secondsPerParticipant;
      return el;
    });
    setMeeting({ ...meeting, meetingParticipants: [...myArr] });

    const newState = { ...meeting };
    newState.meetingStartTime = Date.now();
    setMeeting(newState);
    setStandUpStep(3);
  }

  const steps = [
    "Review instructions",
    "Pick settings, add participants",
    "Run your StandUp",
    "Finish!",
  ];

  return (
    <div>
      <Collapse in={standUpStep === 1} timeout={800}>
        <ProductTitle title="StandUp">
          <p className="stepsTitleText">
            Our formula for fast and engaging remote standups.
          </p>
        </ProductTitle>
      </Collapse>

      <Stepper activeStep={standUpStep - 1} style={{ background: "none" }}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {standUpStep === 1 ? (
        <InstructionsPage nextButton={() => setStandUpStep(2)} />
      ) : null}

      {standUpStep === 2 ? (
        <SetupPage
          props={{
            secondsPerParticipant,
            setSecondsPerParticipant,
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
            setMeeting,
          }}
        />
      ) : null}

      {standUpStep === 3 ? (
        <div>
          <RandomizerAndTimer
            props={{
              meeting,
              setMeeting,
              speakerTime: secondsPerParticipant,
              timeBetweenSpeakers,
            }}
          />
        </div>
      ) : null}

      {standUpStep === 4 ? (
        <MeetingFinished
          props={{
            secondsPerParticipant,
            meeting,
          }}
        />
      ) : null}
    </div>
  );
}
