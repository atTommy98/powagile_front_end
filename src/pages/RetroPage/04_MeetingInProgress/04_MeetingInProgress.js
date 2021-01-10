// React
import { useState, useEffect } from "react";

// Material UI
import Grid from "@material-ui/core/Grid";

// Custom componenets
import RetroColumn from "./RetroColumn/RetroColumn";

// Socket.io Client
import { io } from "socket.io-client";

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
    socket,
    setSocket,
  } = props;

  // Start the meeting
  useEffect(() => {
    if (!meeting.meetingStarted) {
      setMeeting({ ...meeting, meetingStarted: true });
    }
  });

  // Establish socket.io connection
  useEffect(() => {
    if (!socket) {
      // Destructure relevant info for connection
      const { roomId } = meeting;
      const { name, isFacilitator, avatar } = participant;

      // Establish socket connection
      setSocket(
        io("http://localhost:8080", {
          query: {
            roomId,
            name,
            isFacilitator,
            avatar,
          },
        })
      );
    }

    if (socket) {
      //// 👉 2 types of sources - local, and socket
      ////// 👉  With socket, we only render, but don't emit the card, to avoid an infinite loop
      ////// 👉  With local, we render AND emit the card, to send it to other participants
      const source = "socket";

      // "Receive" rules
      //
      // Add
      socket.on("addCard", (card) => {
        addCard({ source, card });
      });

      // Delete
      socket.on("deleteCard", (id) => {
        addCard({ source, id });
      });

      // Update Text
      socket.on("updateCardText", ({ id, content }) => {
        addCard({ source, id, content });
      });

      // Update Votes
      socket.on("updateCardVotes", (id) => {
        addCard({ source, id });
      });
    }

    // try an emit
  });

  return (
    <div>
      {/*Some sexy logic here where it picks up the time from the meeting*/}
      {/* <TimerPartyParrotHorizontal
          props={{
            totalTime: 600,
            timeLeft: 600,
          }}
        /> */}
      <div>
        <Grid
          className="retroBoardContainer"
          container
          spacing={2}
          wrap="nowrap"
        >
          {meeting.columns.map((columnTitle, index) => (
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
                  card.columnIndex === index && !card.isDeleted ? true : false
                ),
              }}
            ></RetroColumn>
          ))}
        </Grid>
      </div>
    </div>
  );
}
