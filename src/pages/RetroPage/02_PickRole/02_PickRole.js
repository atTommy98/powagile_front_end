export default function PickRole({ props }) {
  const { backButton = null, nextButton = null } = props;

  return (
    <div>
      <p>Pick your damn role you bloody mofo 😎</p>
      <br />
      <button onClick={() => nextButton("facilitator")}>
        Facilitator (should be disabled if not logged in)
      </button>
      <button onClick={() => nextButton("participant")}>Participant</button>
      <br />
      <button onClick={backButton}>&larr; Back</button>
    </div>
  );
}
