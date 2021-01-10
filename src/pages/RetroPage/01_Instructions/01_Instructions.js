export default function Instructions() {
  return (
    <div>
      <p>Some instructions go hereeeeeeee boiii</p>
      <br />
      <button>Next &rarr;</button>
    </div>
  );
}

export default function PickRole() {
  return (
    <div>
      <p>Pick your rooooooooooooole boiiii</p>
      <br />
      <button>Facilitator (should be disabled if not logged in)</button>
      <button>Participant</button>
    </div>
  );
}

export default function SetupFacilitator() {
  return (
    <div>
      <input>Your name (autofill if logged in)</input>
      <input>Meeting room name (optional)</input>
      <select>Retro type</select>
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
      <input>Your unique link - send this to your participants</input>
      <br />
      <button>&larr; Back</button>
      <button>Start session &rarr;</button>
    </div>
  );
}

export default function SetupParticipant() {
  return (
    <div>
      <input>Your name bruh</input>
      <input>Invite code / link</input>
      <br />
      <button>&larr; Back</button>
      <button>Connect &rarr;</button>
    </div>
  );
}

export default function MeetingInProgress() {
  return (
    <div>
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

export default function FinishedMeeting() {
  return (
    <div>
      <p>Some stuff here idk</p>
    </div>
  );
}
