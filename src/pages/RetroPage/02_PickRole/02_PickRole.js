// Material UI
import Button from "@material-ui/core/Button";
// Auth0
import { useAuth0 } from "@auth0/auth0-react";

export default function PickRole({ props }) {
  const { previousStep = null, nextStep = null } = props;
  const { user, isAuthenticated } = useAuth0();
  return isAuthenticated ? (
    <div>
      <h3 style={{ textAlign: "center" }}>Pick your role</h3>

      <br />
      <Button
        variant="contained"
        color="primary"
        size="large"
        className="Btn"
        onClick={() => nextStep("facilitator")}
      >
        Facilitator
      </Button>

      <br />
      <br />
      <br />
      <Button
        variant="contained"
        color="primary"
        size="large"
        className="Btn"
        onClick={() => nextStep("participant")}
      >
        Participant
      </Button>
      <br />
      <br />
      <button onClick={previousStep}>&larr; Back</button>
    </div>
  ) : (
    <div>
      <h3 style={{ textAlign: "center" }}>Pick your role</h3>
      <br />
      <Button
        variant="contained"
        color="primary"
        size="large"
        className="Btn"
        onClick={() => nextStep("participant")}
      >
        Participant
      </Button>
      <br />
      <br />
      <button onClick={previousStep}>&larr; Back</button>
    </div>
  );
}
