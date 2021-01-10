export default function SetupParticipant({ props }) {
  const { previousStep, nextStep } = props;

  return (
    <div>
      <p>Your name bruh</p>
      <input></input>
      <p>Invite code / link</p>
      <input></input>
      <br />
      <button onClick={previousStep}>&larr; Back</button>
      <button onClick={nextStep}>Connect &rarr;</button>
    </div>
  );
}
