// CSS
import "./05_FinishedMeeting.css";

// npm module - Confetti
import Confetti from "react-confetti";

// Material UI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Zoom } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function FinishedMeeting({ props }) {
  const { meeting, participant } = props;
  const congratulationsMessages = [
    "You smashed it! 💪",
    "Agile rockstars! 🤘",
    "Way to go! 🎉",
    "Great job! 😍",
    "Well done! 💃",
    "Hip, hip, hurrah! 🙌",
    "Nice one! 🥳",
    "Oh yeah! 😎",
    "Awesome! 😃",
    "Great work, team! 😍",
    "Nice job! 👍",
    "Great work! 🎊",
  ];

  function pickRandom(array) {
    const index = Math.floor(Math.random() * (array.length - 1));
    return array[index];
  }

  function findTotalTime() {
    let mins = 0;
    let secs = Math.ceil(
      (meeting.meetingEndTime - meeting.meetingStartTime) / 1000
    );

    while (secs > 60) {
      secs -= 60;
      mins += 1;
    }

    if (mins < 10) {
      mins = `0${mins}`;
    }
    if (secs < 10) {
      secs = `0${mins}`;
    }

    return `${mins}:${secs}`;
  }

  function findTopContributor() {
    const array = meeting.cards.map((el) => el.addedBy);
    if (array.length === 0) {
      return "No one...";
    }
    let modeMap = {};
    let maxEl = array[0],
      maxCount = 1;
    for (let i = 0; i < array.length; i++) {
      var el = array[i];
      if (modeMap[el] == null) modeMap[el] = 1;
      else modeMap[el]++;
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    return maxEl;
  }

  function findBottomContributor() {
    const array = meeting.cards.map((el) => el.addedBy);
    if (array.length === 0) {
      return "No one...";
    }
    let modeMap = {};
    let minEl = array[0],
      minCount = 1;
    for (let i = 0; i < array.length; i++) {
      var el = array[i];
      if (modeMap[el] == null) modeMap[el] = 1;
      else modeMap[el]++;
      if (modeMap[el] < minCount) {
        minEl = el;
        minCount = modeMap[el];
      }
    }

    return minEl === findTopContributor() ? "No one..." : minEl;
  }

  function findTotalCardsCount() {
    return meeting.cards.filter((el) => !el.isDeleted).length;
  }

  function findLongestNoteCharCount() {
    return meeting.cards.reduce(
      (acc, cur) => (cur.content.length > acc ? cur.content.length : acc),
      0
    );
  }

  function findNumberOfDeletedCards() {
    return meeting.cards.filter((el) => el.isDeleted).length;
  }

  return (
    <div>
      <Confetti numberOfPieces={150} recycle={true} />
      <section className="finishedTitleArea">
        <h3 className="meetingFinishedTitle">
          {pickRandom(congratulationsMessages)}
        </h3>
        <h4 className="meetingFinishedSubtitle">
          You finished your retrospective
        </h4>
      </section>
      <br />
      <Grid container spacing={3}>
        <Grid item xs>
          <Zoom in={true} timeout={1000}>
            <Card className="statCard">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  ⌚ Total meeting time
                </Typography>
                <Typography variant="h5" component="h2">
                  {findTotalTime()}
                </Typography>
              </CardContent>
            </Card>
          </Zoom>
        </Grid>

        <Grid item xs>
          <Zoom in={true} timeout={1500}>
            <Card className="statCard">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  ⚡ Contributed the most
                </Typography>
                <Typography variant="h5" component="h2">
                  {findTopContributor()}
                </Typography>
              </CardContent>
            </Card>
          </Zoom>
        </Grid>
        <Grid item xs>
          <Zoom in={true} timeout={2000}>
            <Card className="statCard">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  ☕ Contributed the least
                </Typography>
                <Typography variant="h5" component="h2">
                  {findBottomContributor()}
                </Typography>
              </CardContent>
            </Card>
          </Zoom>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs>
          <Zoom in={true} timeout={1000}>
            <Card className="statCard">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  📝 Total number of cards
                </Typography>
                <Typography variant="h5" component="h2">
                  {findTotalCardsCount()} cards
                </Typography>
              </CardContent>
            </Card>
          </Zoom>
        </Grid>

        <Grid item xs>
          <Zoom in={true} timeout={1500}>
            <Card className="statCard">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  ✍ Longest card
                </Typography>
                <Typography variant="h5" component="h2">
                  {findLongestNoteCharCount()} characters
                </Typography>
              </CardContent>
            </Card>
          </Zoom>
        </Grid>
        <Grid item xs>
          <Zoom in={true} timeout={2000}>
            <Card className="statCard">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  ❌ Deleted cards
                </Typography>
                <Typography variant="h5" component="h2">
                  {findNumberOfDeletedCards()} cards
                </Typography>
              </CardContent>
            </Card>
          </Zoom>
        </Grid>
      </Grid>
      <br />
      {participant.isFacilitator ? (
        <Alert severity="success">
          This meeting was successfully saved to your account.
        </Alert>
      ) : (
        <Alert severity="success">
          Details about this meeting were successfully saved to the
          facilitator's account
        </Alert>
      )}
    </div>
  );
}
