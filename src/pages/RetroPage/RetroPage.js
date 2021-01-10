// React
import React, { useState, useEffect } from "react";

// Material UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

// Retro Types Icons
import Looks4Icon from "@material-ui/icons/Looks4";
import StarRateIcon from "@material-ui/icons/StarRate";
import StarIcon from "@material-ui/icons/Star";
import TrafficIcon from "@material-ui/icons/Traffic";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import AssignmentIcon from "@material-ui/icons/Assignment";

// Customer Components
import ProductTitle from "../../components/ProductTitle/ProductTitle";
import TimerPartyParrotHorizontal from "../../components/TimerPartyParrot/TimerPartyParrotHorizontal";
import RetroColumn from "./03_Setup/RetroColumn/RetroColumn";

// nanoid
import { nanoid } from "nanoid";

// CSS
import "./RetroPage.css";

// Socket.io Client
import { io } from "socket.io-client";

function Retro() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!socket) {
      // connect the socket
      setSocket(io("http://localhost:8080"));
    }
    // try an emit
  });

  const [meeting, setMeeting] = useState({
    type: "retro",
    subtype: undefined,
    columns: ["Start", "Stop", "Continue"],
    cards: [],
    meetingStarted: false,
    meetingStartTime: null,
    meetingEndTime: null,
  });

  const retroColumns = {
    fourLs: ["Liked", "Learned", "Lacked", "Longed For"],
    starfishSmall: ["Keep", "More Of", "Less Of / Stop"],
    starfishLarge: [
      "Keep Doing",
      "More Of",
      "Start Doing",
      "Stop Doing",
      "Less Of",
    ],
    startStopContinue: ["Start", "Stop", "Continue"],
    madSadGlad: ["Mad", "Sad", "Glad"],
    oneWord: ["Your Thoughts In One Word"],
    KALM: ["Keep", "Add", "More", "Less"],
  };

  function setRetroType(type = "fourLs") {
    // Set the meeting columns, default to 4Ls
    setMeeting({ ...meeting, subtype: type, columns: retroColumns[type] });
  }

  function addCard(colIndex) {
    const newState = { ...meeting };
    newState.cards.push({
      id: nanoid(),
      columnIndex: colIndex,
      content: "",
      thumbsUp: 0,
      thumbsDown: 0,
    });
    setMeeting(newState);
  }

  function deleteCard(id) {
    setMeeting({
      ...meeting,
      cards: meeting.cards.filter((el) => (el.id !== id ? true : false)),
    });
  }

  function updateCardText({ id, content }) {
    const index = meeting.cards.findIndex((card) => card.id === id);
    const newCard = meeting.cards[index];
    // Move the card
    newCard.content = content;
    const newCards = [...meeting.cards];
    newCards[index] = newCard;
    // Set state
    setMeeting({
      ...meeting,
      cards: newCards,
    });
  }

  function updateCardVotes({ id, thumb }) {
    // Find Card
    const index = meeting.cards.findIndex((card) => card.id === id);
    const newCard = meeting.cards[index];
    // Move the card
    newCard[thumb] += 1;
    const newCards = [...meeting.cards];
    newCards[index] = newCard;
    // Set state
    setMeeting({
      ...meeting,
      cards: newCards,
    });
  }

  function moveCard(id, direction) {
    // Find the card
    const index = meeting.cards.findIndex((card) => card.id === id);
    const newCard = meeting.cards[index];
    // Move the card
    switch (direction) {
      case "left":
        newCard.columnIndex -= 1;
        break;
      case "right":
        newCard.columnIndex += 1;
        break;
      default:
        break;
    }
    const newCards = [...meeting.cards];
    newCards[index] = newCard;
    setMeeting({
      ...meeting,
      cards: newCards,
    });
  }

  return (
    <div className="Retro">
      <ProductTitle title="Retrospective" />
    </div>
  );
}

export default Retro;
