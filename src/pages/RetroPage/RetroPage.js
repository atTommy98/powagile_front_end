// React
import React, { useState, useEffect } from "react";

// Material UI
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Collapse from "@material-ui/core/Collapse";

// Customer Components
import ProductTitle from "../../components/ProductTitle/ProductTitle";
import InstructionsRetro from "./01_Instructions/01_InstructionsRetro";
import PickRole from "./02_PickRole/02_PickRole";
import SetupFacilitator from "./03_Setup/03_SetupFacilitator";
import SetupParticipant from "./03_Setup/03_SetupParticipant";
import MeetingInProgress from "./04_MeetingInProgress/04_MeetingInProgress";
import FinishedMeeting from "./05_FinishedMeeting/05_FinishedMeeting";

// nanoid
import { nanoid } from "nanoid";

// _lodash.debounce
// import debounce from "lodash.debounce";

// CSS
import "./RetroPage.css";

function Retro() {
  // Steps
  const [retroStep, setRetroStep] = useState(1);
  const steps = [
    "Review instructions",
    "Select your role",
    "Create / Join a Retrospective",
    "Run your Retrospective",
    "Finish!",
  ];
  // Navigate through steps
  function previousStep() {
    setRetroStep(retroStep - 1);
  }
  function nextStep(role) {
    setRetroStep(retroStep + 1);
    if (!role) {
      return;
    } else if (role === "facilitator") {
      setParticipant({ ...participant, isFacilitator: true });
    } else if (role === "participant") {
      setParticipant({ ...participant, isFacilitator: false });
    }
  }

  // Blank Participant State
  const blankParticipant = {
    name: "",
    isFacilitator: false,
    meetingEmitted: false,
    avatar: "",
    votedOn: [],
  };
  const [participant, setParticipant] = useState({
    ...blankParticipant,
  });

  // Blank Meeting State
  const blankRetro = {
    roomId: null,
    title: `Retro meeting on ${new Date().toUTCString()}`,
    type: "retro",
    subtype: "Four Ls (4Ls)",
    columns: ["Liked", "Learned", "Lacked", "Longed For"],
    cards: [],
    meetingStarted: false,
    meetingFinished: false,
    meetingStartTime: null,
    meetingEndTime: null,
  };
  const [meeting, setMeeting] = useState({ ...blankRetro });

  // Socket.io
  const [socket, setSocket] = useState(null);

  // Check if this is an attempt to join
  useEffect(() => {
    function checkForJoin() {
      if (meeting.meetingStarted === true || retroStep !== 1) {
        return;
      }
      // Get URL params
      const urlParams = new URLSearchParams(window.location.search);

      if (urlParams.get("roomId") === null) {
        console.log("No attempt to join detected...");
        return;
      } else if (meeting.roomId === null) {
        console.log(`Joining roomId ${urlParams.get("roomId")}...`);
        // Not a facilitator
        setParticipant({ ...participant, isFacilitator: false });
        // Set Meeting Room ID
        setMeeting({ ...meeting, roomId: urlParams.get("roomId") });
        // Fast forward to Step 3
        setRetroStep(3);
      }
    }

    checkForJoin();
  });

  //// 👉 2 types of sources - local, and socket
  ////// 👉  With local, we want to socket.emit the card
  ////// 👉  With socket, we want to avoid that to prevent an infinite loop
  function addCard({ card }) {
    // Create card
    const newCard = {
      id: nanoid(),
      addedBy: participant.name,
      columnIndex: card.i,
      content: "",
      thumbsUp: 0,
      thumbsDown: 0,
      isDeleted: false,
    };
    // Emit from socket
    if (socket) {
      socket.emit("addCard", newCard);
    }
  }

  function deleteCard({ id }) {
    // Emit from socket
    if (socket) {
      socket.emit("deleteCard", id);
    }
  }

  function updateCardText({ id, content }) {
    // Update the card (locally)
    const newCards = [...meeting.cards];
    const index = newCards.findIndex((card) => card.id === id);
    newCards[index].content = content;
    setMeeting({ ...meeting, cards: newCards });

    // Emit from socket (debounced)
    if (socket) {
      socket.emit("updateCardText", { id, content });
    }
  }

  function updateCardVotes({ id, thumb }) {
    setParticipant({ ...participant, votedOn: [...participant.votedOn, id] });
    if (socket) {
      socket.emit("updateCardVotes", { id, thumb });
    }
  }

  function moveCard({ id, direction }) {
    // Emit
    if (socket) {
      socket.emit("moveCard", { id, direction });
    }
  }

  return (
    <div>
      <Collapse in={retroStep === 1} timeout={800}>
        <ProductTitle title="Retrospective">
          <p className="stepsTitleText">
            Real time, collaborative, and engaging retros that make a positive
            impact on your team.
          </p>
        </ProductTitle>
      </Collapse>

      <Stepper activeStep={retroStep - 1} style={{ background: "none" }}>
        {steps.map((label, index) => {
          return (
            <Step key={`RetroStep_${index}`}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {retroStep === 1 ? (
        <InstructionsRetro props={{ nextButton: nextStep }} />
      ) : null}

      {retroStep === 2 ? <PickRole props={{ previousStep, nextStep }} /> : null}

      {retroStep === 3 && participant.isFacilitator ? (
        <SetupFacilitator
          props={{
            previousStep,
            nextStep,
            participant,
            setParticipant,
            meeting,
            setMeeting,
          }}
        />
      ) : retroStep === 3 && participant.isFacilitator === false ? (
        <SetupParticipant
          props={{
            previousStep,
            nextStep,
            participant,
            setParticipant,
            meeting,
            setMeeting,
          }}
        />
      ) : null}

      {retroStep === 4 ? (
        <MeetingInProgress
          props={{
            meeting,
            setMeeting,
            addCard,
            deleteCard,
            updateCardText,
            updateCardVotes,
            moveCard,
            participant,
            setParticipant,
            socket,
            setSocket,
          }}
        />
      ) : null}
    </div>
  );
}

export default Retro;
