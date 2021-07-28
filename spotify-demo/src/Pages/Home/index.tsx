import { Typography } from "antd";
import RecentlyPlayedTracksPage from "../RecentlyPlayedTracks";
import UsersProfile from "../UsersProfile";

import "./style.css";

export default function HomePage() {
  return (
    <div>
      <UsersProfile />
      <div>
        <Typography className="typography">Hello! Your music</Typography>
        <RecentlyPlayedTracksPage />
      </div>
      <div>
        <Typography className="typography">You are listening...</Typography>
      </div>
    </div>
  );
}
