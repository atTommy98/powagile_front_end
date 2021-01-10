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
