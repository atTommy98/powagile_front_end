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

// Customer Components
import FourLsRetro from "./FourLsRetro";
import TimerPartyParrotHorizontal from "../../components/TimerPartyParrot/TimerPartyParrotHorizontal";

function Retro() {
  const dummyMeeting = {
    type: "retro",
    subtype: null,
    cards: [],
    meetingStartTime: null,
    meetingEndTime: null,
  };

  const [meeting, setMeeting] = useState(dummyMeeting);

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

  const retroSpecial = {
    sailboat: true,
    speedcar: true,
  };

  return (
    <div className="Retro">
      <h2>Pow!Agile Retrospective Board™</h2>
      <p>Pick your retro type:</p>
      <div>
        <Button color="primary">Four Ls (4Ls)</Button>
        <Button color="primary">Starfish (Small)</Button>
        <Button color="primary">Starfish (Large)</Button>
        <Button color="primary">Start, Stop, Continue</Button>
        <Button color="primary">Mad, Sad, Glad</Button>
        <Button color="primary">One Word Retrospective</Button>
        <Button color="primary">KALM Retrospective</Button>
      </div>
      <div>
        <FourLsRetro />
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
