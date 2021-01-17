// Material UI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Material Icons
import PersonPinRoundedIcon from "@material-ui/icons/PersonPinRounded";
import SupervisedUserCircleRoundedIcon from "@material-ui/icons/SupervisedUserCircleRounded";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

// CSS
import "./02_PickRole.css";

export default function PickRole({ props }) {
  const { previousStep = null, nextStep = null } = props;
  const { user } = useAuth0();
  return (
    <section className="retroSetupPage">
      <Paper
        elevation={3}
        style={{ maxWidth: "700px", padding: "5px", margin: "10px auto" }}
      >
        <h3 style={{ textAlign: "center" }}>Select your role</h3>

        <Grid className="roleContainer" container spacing={2}>
          <Grid item xs>
            <Card
              onClick={() => nextStep("facilitator")}
              className={!user ? "disabledCard" : null}
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    <PersonPinRoundedIcon /> Facilitator
                  </Typography>
                  <Typography variant="body2" component="p">
                    Facilitators can open a meeting rooms, select the type of
                    retrospective to run, choose a time limit, and invite
                    participants.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs>
            <Card onClick={() => nextStep("participant")}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    <SupervisedUserCircleRoundedIcon /> Participant
                  </Typography>
                  <Typography variant="body2" component="p">
                    Participants can join retrospective sessions set up by
                    facilitators. You can join an existing session even without
                    an account!
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      <br />

      <center>
        <Button color="secondary" onClick={previousStep}>
          &larr; Back
        </Button>
      </center>
    </section>
  );
}
