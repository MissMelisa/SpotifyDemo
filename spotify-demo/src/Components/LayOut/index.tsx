import { Menu } from "antd";
import { useContext } from "react";
import { Link } from "react-router-dom";
import CurrentPlaybackPage from "../../Pages/CurrentPlayback";
import { AuthContext } from "../Token";

export default function LayOut() {
  let spotifyToken = useContext(AuthContext);

  return (
    <div>
      {spotifyToken.token && (
        <Menu triggerSubMenuAction="hover" className="menu">
          <ul className="linkList">
            <li>
              <Link to="/" className="link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/yourmusic" className="link">
                Your music
              </Link>
            </li>
            <li>
              <Link to="/yourartist" className="link">
                Your artist
              </Link>
            </li>
            <li>
              <Link to="/yourplaylists" className="link">
                Your playlists
              </Link>
            </li>
            <li>
              <Link to="/topArtists" className="link">
                Top Artists and Tracks
              </Link>
            </li>

            <li className="link" onClick={spotifyToken.signOut}>
              Log out
            </li>
          </ul>
          <div>
            <CurrentPlaybackPage />
          </div>
        </Menu>
      )}
    </div>
  );
}
