export default function PickRole({ props }) {
  const { previousStep = null, nextStep = null } = props;

  return (
    <div>
      <p>Pick your damn role you bloody mofo 😎</p>
      <br />
      <button onClick={() => nextStep("facilitator")}>
        Facilitator (should be disabled if not logged in)
      </button>
      <button onClick={() => nextStep("participant")}>Participant</button>
      <br />
      <button onClick={previousStep}>&larr; Back</button>
    </div>
  );
}
