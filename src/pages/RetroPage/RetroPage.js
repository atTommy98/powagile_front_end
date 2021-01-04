// React
import React, { useState } from "react";

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
import RetroColumn from "./03_Retro/RetroColumn/RetroColumn";

// uuid
import { v4 as uuidv4 } from "uuid";

// CSS
import "./RetroPage.css";

function Retro() {
  const [meeting, setMeeting] = useState({
    type: "retro",
    subtype: undefined,
    columns: ["Test1", "Test2", "Test3", "Test4", "Test5", "Test6"],
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
      id: uuidv4(),
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
      <p>Pick your retro type:</p>
      <div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Looks4Icon />}
          onClick={() => setRetroType("fourLs")}
        >
          Four Ls (4Ls)
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<StarRateIcon />}
          onClick={() => setRetroType("starfishSmall")}
        >
          Starfish (Small)
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<StarIcon />}
          onClick={() => setRetroType("starfishLarge")}
        >
          Starfish (Large)
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<TrafficIcon />}
          onClick={() => setRetroType("startStopContinue")}
        >
          Start, Stop, Continue
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<EmojiEmotionsIcon />}
          onClick={() => setRetroType("madSadGlad")}
        >
          Mad, Sad, Glad
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<ChatBubbleIcon />}
          onClick={() => setRetroType("oneWord")}
        >
          One Word Retro
        </Button>

        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AssignmentIcon />}
          onClick={() => setRetroType("KALM")}
        >
          KALM Retro
        </Button>
      </div>

      <TimerPartyParrotHorizontal
        props={{
          totalTime: 600,
          timeLeft: 600,
        }}
      />

      <div>
        <Grid
          className="retroBoardContainer"
          container
          spacing={2}
          wrap="nowrap"
        >
          {meeting.columns.map((columnTitle, index) => (
            <RetroColumn
              props={{
                meeting,
                setMeeting,
                columnTitle,
                index,
                addCard,
                updateCardText,
                updateCardVotes,
                deleteCard,
                moveCard,
                cards: meeting.cards.filter((card) =>
                  card.columnIndex === index ? true : false
                ),
              }}
            ></RetroColumn>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Retro;
