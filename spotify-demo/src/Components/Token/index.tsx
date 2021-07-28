import React, { useEffect, useState } from "react";

import { useHistory } from "react-router";

const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const SCOPES = [
  "user-read-recently-played",
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-library-read",
  "user-read-private",
  "user-follow-read",
  "user-read-email",
  "playlist-modify-public",
  "user-modify-playback-state",
  "playlist-modify-private",
  "user-modify-playback-state",
  "user-library-modify",
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
  }, {} as Record<string, any>);

window.location.hash = "";

type AuthContextType = { token: string; signOut: () => void };

const initialContext: AuthContextType = { token: "", signOut: () => {} };

export const AuthContext = React.createContext(initialContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState(
    localStorage.getItem("access_token") || ""
  );

  const history = useHistory();

  useEffect(() => {
    if (hash.access_token) {
      localStorage.setItem("access_token", hash.access_token);
      setToken(hash.access_token);
    }
  }, []);

  function signOut() {
    localStorage.removeItem("access_token");
    history.push("/");
    setToken("");
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
