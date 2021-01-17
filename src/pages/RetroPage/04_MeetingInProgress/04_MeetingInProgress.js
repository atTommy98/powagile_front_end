// React
import { useState, useEffect } from "react";

// Material UI
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FileCopyIcon from "@material-ui/icons/FileCopy";

// Custom componenets
import RetroColumn from "./RetroColumn/RetroColumn";
import TimerPartyParrotHorizontal from "../../../components/TimerPartyParrot/TimerPartyParrotHorizontal";

// notistack
import { useSnackbar } from "notistack";

// Socket.io Client
import { io } from "socket.io-client";

// Environment variables
require("dotenv").config();
const { REACT_APP_FRONT_END_URL, REACT_APP_BACK_END_URL } = process.env;

export default function MeetingInProgress({ props }) {
  const {
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
  } = props;

  // Snackbar notifications
  const { enqueueSnackbar } = useSnackbar();

  // Copy link function
  function copyLink() {
    const uniqueLink = document.getElementById("generated-meeting-url");
    uniqueLink.select();
    uniqueLink.setSelectionRange(0, 99999);
    document.execCommand("copy");

    enqueueSnackbar("Your unique room link has been copied", {
      persist: false,
      variant: "success",
    });
  }

  // Start the meeting
  useEffect(() => {
    if (!meeting.meetingStarted) {
      setMeeting({ ...meeting, meetingStarted: true });
    }
  });

  // Establish socket.io connection and rules (send/receive)
  const [rulesEstablished, setRulesEstablished] = useState(false);
  useEffect(() => {
    // Establish socket connection
    if (!socket) {
      // Destructure relevant info for connection
      const { roomId } = meeting;
      const { name, isFacilitator, avatar } = participant;

      setSocket(
        io(`${REACT_APP_BACK_END_URL}`, {
          query: {
            roomId,
            name,
            isFacilitator,
            avatar,
          },
        })
      );
    }

    //// 👉 2 types of sources - local, and socket
    ////// 👉  With socket, we only render, but don't emit the card, to avoid an infinite loop
    ////// 👉  With local, we render AND emit the card, to send it to other participants
    if (socket) {
      if (!rulesEstablished) {
        // 📲 Notification rules
        socket.on("notification", (notification) => {
          const variantKey = {
            user_connected: "info",
            user_disconnected: "warning",
          };

          enqueueSnackbar(notification.content, {
            persist: false,
            variant: variantKey[notification.type],
          });
        });

        //// 📥 "Receive" rules
        socket.on("updateMeeting", (meeting) => {
          setMeeting(meeting);
        });

        setRulesEstablished(true);
      }
    }

    // Emit initial meeting state
    if (socket && !participant.meetingEmitted) {
      socket.emit("startMeeting", meeting);
      setParticipant({ ...participant, meetingEmitted: true });
    }
  }, [
    addCard,
    deleteCard,
    enqueueSnackbar,
    meeting,
    moveCard,
    participant,
    rulesEstablished,
    setMeeting,
    setParticipant,
    setSocket,
    socket,
    updateCardText,
    updateCardVotes,
  ]);

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="meeting-title">
          <Typography variant="h4">{meeting.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl variant="filled" className="uniqueLinkReadOnlyField">
            <InputLabel htmlFor="generated-meeting-url">
              Your unique link - send this to your participants
            </InputLabel>
            <FilledInput
              readOnly
              id="generated-meeting-url"
              value={`${REACT_APP_FRONT_END_URL}/rituals/retro?roomId=${meeting.roomId}`}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="copy link"
                    onClick={copyLink}
                    edge="end"
                  >
                    <Button>
                      Copy &nbsp; <FileCopyIcon />
                    </Button>
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* TODO: Need some logic here, where the server determines the time of the meeting*/}
      <TimerPartyParrotHorizontal
        props={{
          totalTime: 600,
          timeLeft: 260,
        }}
      >
        <p>Finish button will go here</p>
      </TimerPartyParrotHorizontal>
      <div>
        <Grid
          className="retroBoardContainer"
          container
          spacing={2}
          wrap="nowrap"
        >
          {meeting.columns
            ? meeting.columns.map((columnTitle, index) => (
                <RetroColumn
                  key={`${columnTitle}_card${index}`}
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
                      card.columnIndex === index && !card.isDeleted
                        ? true
                        : false
                    ),
                    participant,
                  }}
                ></RetroColumn>
              ))
            : null}
        </Grid>
      </div>
    </div>
  );
}
