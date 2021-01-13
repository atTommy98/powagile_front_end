/* eslint-disable react-hooks/exhaustive-deps */
// React
import React, { useState, useEffect } from "react";

// Cookies
import Cookies from "universal-cookie";

// CSS
import "./UserPage.css";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

// Components

//User Dash
import UserDashboard from "../../components/UserDashboard/UserDashboard";

import StatsGraph from "../../components/StatsGraph/StatsGraph";
import MeetingStats from "../../components/MeetingStats/MeetingStats";

export default function UserPage() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const cookies = new Cookies();

  // Get and set user metadata, cookie
  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "powershellrangers.eu.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });

        // Add token to cookie
        cookies.set(
          "powAgile_user",
          { user, accessToken, userMetadata },
          {
            expires: new Date(Date.now() + 86400000),
          }
        );

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };

    if (user) {
      setTimeout(() => getUserMetadata(), 1000);
    }
  }, [getAccessTokenSilently, user]);

  return isAuthenticated ? (
    <div>
      <div id="userInfo">
        <UserDashboard></UserDashboard>
      </div>
      <MeetingStats></MeetingStats>
      <StatsGraph></StatsGraph>
    </div>
  ) : (
    <h2>🤔 You don't seem to be logged in!</h2>
  );
}
