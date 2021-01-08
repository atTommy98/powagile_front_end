// CSS
import "./04_MeetingFinished.css";

// npm module - Confetti
import Confetti from "react-confetti";

// Material UI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";

// Material Icons
import LockIcon from "@material-ui/icons/Lock";

export default function MeetingFinished({ props }) {
  const { minutesPerParticipant, meeting } = props;

  console.log({ minutesPerParticipant, meeting });

  function pickRandom(array) {
    const index = Math.floor(Math.random() * (array.length - 1));
    return array[index];
  }

  const congratulationsMessages = [
    "You smashed it! 💪",
    "Agile rockstars! 🤘",
    "Way to go! 🎉",
    "Great job! 😻",
    "Well done! 💃",
    "Hip, hip, hurrah! 🙌",
    "Nice one! 🥳",
    "Oh yeah! 😎",
    "Great work, team! 😍",
  ];

  const valuableStats = [
    "⌚ Fastest average day of the week",
    "📆 Best time to schedule a StandUp",
    "⏩ Longest ever StandUp meeting",
    "🤏 Shortest ever StandUp meeting",
    "👩‍👧 StandUp with the fewest participants",
    "👨‍👨‍👧‍👧 StandUp with the most participants",
    "🌍 Number of people running StandUps at the same time",
    "⏯ Addicted to pausing the timer",
  ];

  return (
    <div>
      <Confetti numberOfPieces={150} gravity={0.15} tweenDuration={1000} />

      <section className="finishedTitleArea">
        <h3 className="meetingFinishedTitle">
          {pickRandom(congratulationsMessages)}
        </h3>
        <h4 className="meetingFinishedSubtitle">You finished your stand up</h4>
      </section>
      <br />
      <Grid container spacing={3}>
        <Grid item xs>
          <Card className="statCard">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                ⌚ Total meeting time
              </Typography>
              <Typography variant="h5" component="h2">
                07:43
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs>
          <Card className="statCard">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                ⚡ Life in the fast lane
              </Typography>
              <Typography variant="h5" component="h2">
                Kawalpreet Kaur
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs>
          <Card className="statCard">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                ☕ Could use a coffee
              </Typography>
              <Typography variant="h5" component="h2">
                Stefan Kudev
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <div className="lockedStats">
        <div className="salesyMarketingMessage">
          <LockIcon fontSize="large" />
          <p className="salesyTitle">Unlock even more valuable stats</p>
          <p className="salesySubtitle">
            {" "}
            run better, faster, more productive meetings
          </p>

          <Button variant="outlined" size="large">
            Sign Up for free
          </Button>
        </div>

        <div className="blurryStats">
          <Grid container spacing={3}>
            {valuableStats.map((el) => (
              <Grid item xs={6} sm={3}>
                <Card className="statCard">
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {el}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      ?
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>

      <br />
      <p>
        Please wait while we upload the details this meeting to your account...
      </p>
      <p>Success! The meeting details were saved to your account</p>
      <p>
        Hmm... There was a problem saving this meeting to your account. Try
        again or contact our support team
      </p>
    </div>
  );
}
