export default function PickRole({ props }) {
  const { previousStep = null, nextStep = null } = props;

  return (
    <div>
      <p>Pick your role</p>
      <br />
      <button onClick={() => nextStep("facilitator")}>
        Facilitator (should be disabled if not logged in)
      </button>
      <br />
      <button onClick={() => nextStep("participant")}>Participant</button>
      <br />
      <br />
      <button onClick={previousStep}>&larr; Back</button>
    </div>
  );
}
