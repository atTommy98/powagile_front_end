// React
import React, { useState } from "react";

// Material UI
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Input } from "@material-ui/core";

// Icons
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
// Retro Types Icons
import Looks4Icon from "@material-ui/icons/Looks4";
import StarRateIcon from "@material-ui/icons/StarRate";
import StarIcon from "@material-ui/icons/Star";
import TrafficIcon from "@material-ui/icons/Traffic";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import AssignmentIcon from "@material-ui/icons/Assignment";

// Customer Components
import FourLsRetro from "./FourLsRetro";
import TimerPartyParrotHorizontal from "../../components/TimerPartyParrot/TimerPartyParrotHorizontal";

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

  return (
    <div className="Retro">
      <h2 className="pageTitle" style={{ textAlign: "center" }}>
        <span className="companyName">Pow!Agile</span>{" "}
        <span className="productName">Retrospective™</span>
      </h2>
      <p>Pick your retro type:</p>
      <div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Looks4Icon />}
        >
          Four Ls (4Ls)
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<StarRateIcon />}
        >
          Starfish (Small)
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<StarIcon />}
        >
          Starfish (Large)
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<TrafficIcon />}
        >
          Start, Stop, Continue
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<EmojiEmotionsIcon />}
        >
          Mad, Sad, Glad
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<ChatBubbleIcon />}
        >
          One Word Retro
        </Button>

        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AssignmentIcon />}
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
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper>
              <h3 className="columnTitle">Liked</h3>
              <Card className="participantCard">
                <Input
                  disableUnderline
                  multiline
                  rows={2}
                  placeholder="Your card text goes here..."
                />
                <Button>
                  <DeleteForeverIcon size="large" />
                </Button>

                <ButtonGroup
                  fullWidth
                  variant="text"
                  size="small"
                  color="black"
                >
                  <Button>
                    <ChevronLeftIcon />
                  </Button>
                  <Button>
                    <ThumbDownIcon />
                  </Button>
                  <Button>
                    <ThumbUpIcon />
                  </Button>
                  <Button>
                    <ChevronRightIcon />
                  </Button>
                </ButtonGroup>
              </Card>
              <Button style={{ width: "100%" }}>+</Button>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>
              <h3>Learned</h3>
              <Button style={{ width: "100%" }}>+</Button>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>
              <h3>Lacked</h3>
              <Button style={{ width: "100%" }}>+</Button>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>
              <h3>Longed For</h3>
              <Button style={{ width: "100%" }}>+</Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Retro;
