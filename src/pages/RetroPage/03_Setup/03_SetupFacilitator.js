// React
import { useEffect, useState } from "react";

// Material UI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import TextField from "@material-ui/core/TextField";

// Retro Types Icons
import Looks4Icon from "@material-ui/icons/Looks4";
import StarRateIcon from "@material-ui/icons/StarRate";
import StarIcon from "@material-ui/icons/Star";
import TrafficIcon from "@material-ui/icons/Traffic";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import AssignmentIcon from "@material-ui/icons/Assignment";

// Nano id
import { nanoid } from "nanoid";

// notistack
import { useSnackbar } from "notistack";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

// CSS
import "./03_Setup.css";

// Environment variables
require("dotenv").config();
const { REACT_APP_FRONT_END_URL } = process.env;

export default function SetupFacilitator({ props }) {
  const {
    previousStep,
    nextStep,
    participant,
    setParticipant,
    meeting,
    setMeeting,
  } = props;

  const { enqueueSnackbar } = useSnackbar();

  const { user, isLoading } = useAuth0();

  const [pickedRetro, setPickedRetro] = useState(0);

  const retroColumns = [
    {
      name: "Four Ls (4Ls)",
      columns: ["Liked", "Learned", "Lacked", "Longed For"],
      icon: <Looks4Icon />,
    },
    {
      name: "Starfish (Small)",
      columns: ["Keep", "More Of", "Less Of / Stop"],
      icon: <StarRateIcon />,
    },
    {
      name: "Starfish (Large)",
      columns: [
        "Keep Doing",
        "More Of",
        "Start Doing",
        "Stop Doing",
        "Less Of",
      ],
      icon: <StarIcon />,
    },
    {
      name: "Start, Stop, Continue",
      columns: ["Start", "Stop", "Continue"],
      icon: <TrafficIcon />,
    },
    {
      name: "Mad, Sad, Glad",
      columns: ["Mad", "Sad", "Glad"],
      icon: <EmojiEmotionsIcon />,
    },
    {
      name: "One Word Retro",
      columns: ["Your Thoughts In One Word"],
      icon: <ChatBubbleIcon />,
    },
    {
      name: "KALM Retro",
      columns: ["Keep", "Add", "More", "Less"],
      icon: <AssignmentIcon />,
    },
  ];

  function changeRetro(e) {
    const { name, columns, icon } = retroColumns[e.target.value];

    setPickedRetro(e.target.value);

    setMeeting({
      ...meeting,
      subtype: name,
      columns: columns,
      icon: icon,
    });
  }

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

  // Set Meeting Room ID
  useEffect(() => {
    if (meeting.roomId === null) {
      setMeeting({ ...meeting, roomId: nanoid() });
    }
    console.info(`Meeting room id set to ${meeting.roomId}`);
  });

  // Add avatar URL, if any
  useEffect(() => {
    if (user && user.picture && !isLoading) {
      setParticipant({ ...participant, avatar: user.picture, name: user.name });
    }
  }, [isLoading]);

  return (
    <section className="retroCreatePage">
      <Paper
        elevation={3}
        style={{ maxWidth: "700px", padding: "5px", margin: "10px auto" }}
      >
        <h3 style={{ textAlign: "center" }}>Facilitate a Retrospective</h3>

        <TextField
          className="inputFieldFacilitator"
          label="Your name"
          required
          variant="outlined"
          value={participant.name}
          onChange={(e) =>
            setParticipant({ ...participant, name: e.target.value })
          }
        />

        <br />
        <br />

        <TextField
          className="inputFieldFacilitator"
          label="Give your meeting a descriptive title"
          required
          variant="outlined"
          value={meeting.title}
          onChange={(e) => setMeeting({ ...meeting, title: e.target.value })}
        />

        <br />
        <br />

        <FormControl
          className="retrospectiveDropdown"
          variant="outlined"
          required
        >
          <InputLabel>Pick your retrospective</InputLabel>
          <Select
            value={pickedRetro}
            onChange={(e) => changeRetro(e)}
            label="Pick your retrospective"
          >
            {retroColumns.map((el, i) => (
              <MenuItem value={i}>
                {el.icon}&nbsp;{el.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
      </Paper>

      <center>
        <Button color="secondary" onClick={previousStep}>
          &larr; Back
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button color="primary" variant="contained" onClick={nextStep}>
          Start Retrospective™ &rarr;
        </Button>
      </center>
    </section>
  );
}
