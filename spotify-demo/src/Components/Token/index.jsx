import React, { useContext, useEffect, useState } from "react";

import { useHistory } from "react-router";

const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const SCOPES = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-library-read",
  "user-follow-read",
];

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";
export const AuthContext = React.createContext({});

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  const history = useHistory();

  useEffect(() => {
    if (hash.access_token) {
      localStorage.setItem("access_token", hash.access_token);
      setToken(hash.access_token);
    }
  }, []);

  function signOut() {
    localStorage.removeItem("access_token");
    history.pushState("/");
    setToken();
  }

  return (
    <AuthContext.Provider value={{ token, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${
  process.env.REACT_APP_PUBLIC_SPOTIFY_CLIENT_ID
}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
  "%20"
)}&response_type=token&show_dialog=true`;
