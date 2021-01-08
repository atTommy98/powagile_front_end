// React
import React, {useEffect} from "react";

//Auth0
import { useAuth0 } from "@auth0/auth0-react";

// CSS
import "./UserDashboard.css";

// MaterialUI
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";

export default function UserDashboard() {
  const { user, isAuthenticated } = useAuth0();

  // retrieve all meetings
  useEffect(() => {
    function retrieveMeetings() {
      fetch("https://powagile-back-end.herokuapp.com/meeting")
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
    retrieveMeetings();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="user-information">
        <h1>{user ? user.name : <h3>pws log in</h3>}</h1>
        <h3>Facilitator</h3>
        <h3>@ {user ? user.email : <h3>No e-mail</h3>}</h3>
      </div>
      <div className="img-container">
        {user ? (
          <Avatar alt={user.name} src={user.picture} className="avatar-home" />
        ) : null}
      </div>
    </div>
  );
}
