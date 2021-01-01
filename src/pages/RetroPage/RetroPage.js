// React
import React, { useState } from "react";

// Material UI
import Paper from "@material-ui/core/Paper";
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
import RetroCard from "../../components/RetroCard/RetroCard";
import RetroColumn from "../../components/RetroColumn/RetroColumn";

function Retro() {
  const [meeting, setMeeting] = useState({
    type: "retro",
    subtype: null,
    columns: [],
    cards: [],
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
    oneWord: ["Thoughts"],
    KALM: ["Keep", "Add", "More", "Less"],
  };

  function setRetroType(type = "fourLs") {
    // Set the meeting columns, default to 4Ls
    setMeeting({ ...meeting, subtype: type, columns: retroColumns[type] });
  }

  function addCard(colIndex, colName) {
    const newState = { ...meeting };
    newState.cards.push({
      columnIndex: colIndex,
      columnName: colName,
      content: "",
      thumbsUp: 0,
      thumbsDown: 0,
    });
    setMeeting(newState);
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
      <div>
        <TimerPartyParrotHorizontal
          props={{
            totalTime: 600,
            timeLeft: 600,
          }}
        />
        <Grid className="retroBoardContainer" container spacing={2}>
          {meeting.columns.map((columnTitle, index) => (
            <RetroColumn
              props={{
                columnTitle,
                index,
                addCard,
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
