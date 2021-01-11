export default function SetupParticipant({ props }) {
  const {
    previousStep,
    nextStep,
    participant,
    setParticipant,
    meeting,
    setMeeting,
  } = props;

  return (
    <div>
      <p>Your name *</p>
      <input
        onChange={(e) =>
          setParticipant({ ...participant, name: e.target.value })
        }
      ></input>
      <p>Invite code / link *</p>
      <input
        value={meeting.roomId}
        onChange={(e) => setMeeting({ ...meeting, roomId: e.target.value })}
      ></input>
      <br />
      <br />
      <button onClick={previousStep}>&larr; Back</button>
      <button onClick={nextStep}>Connect &rarr;</button>
    </div>
  );
}
