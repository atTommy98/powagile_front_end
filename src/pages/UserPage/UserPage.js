// React
import React, { useState, useEffect } from "react";

// CSS
import "./UserPage.css";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

// React-Charts
import { Line, Bar } from "react-chartjs-2";

export default function UserPage() {
  const { user, isAuthenticated } = useAuth0();
  const [stats, setStats] = useState("");

  useEffect(() => {
    fetch("https://powagile-back-end.herokuapp.com/meeting")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  console.log(stats);
  console.log(stats[4].meetingStartTime)

  const data = {
    labels: ["Stand Ups", "Retros"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        minBarLength: 0,
        data: [2, 3],
      },
    ],
  };

  return isAuthenticated ? (
    <div>
      <div id="userInfo">
        <img src={user.picture} alt={user.name} id="userImg" />
        <h4>{user.name}</h4>
        <p>{user.email}</p>
      </div>
      <div>
        <Bar
          data={data}
          options={{
            scales: {
              yAxes: [{ ticks: { suggestedMin: 0, suggestedMax: 5 } }],
            },
          }}
        />
      </div>
    </div>
  ) : (
    <h2>🤔 You don't seem to be logged in!</h2>
  );
}
