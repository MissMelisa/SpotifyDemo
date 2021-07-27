import { useContext } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";

import { AuthContext } from "./Components/Token";
import LogIn from "./Pages/Login";
import AlbumsPage from "./Pages/Albums";
import ArtistsPage from "./Pages/Artists";
import PlaylistsPage from "./Pages/Playlists";
import TopArtistsandTracksPage from "./Pages/TopArtistsandTracks";
import CurrentPlaybackPage from "./Pages/CurrentPlayback";
import { Menu } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./Pages/Home";
import PlaylistsItems from "./Pages/PlaylistsItems";

const queryClient = new QueryClient();

function App() {
  let spotifyToken = useContext(AuthContext);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
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
              <li>
                <Link to="/player" className="link">
                  Current Playback
                </Link>
              </li>
              <li className="link" onClick={spotifyToken.signOut}>
                Log out
              </li>
            </ul>
          </Menu>
        )}
        <Switch>
          <Route path="/" exact>
            {!spotifyToken.token ? <LogIn /> : <HomePage />}
          </Route>
          <Route path="/yourmusic" exact>
            <AlbumsPage />
          </Route>
          <Route path="/yourartist" exact>
            <ArtistsPage />
          </Route>
          <Route path="/yourplaylists" exact>
            <PlaylistsPage />
          </Route>
          <Route path="/yourplaylists/:id" exact>
            <PlaylistsItems />
          </Route>
          <Route path="/topArtists" exact>
            <TopArtistsandTracksPage />
          </Route>
          <Route path="/player" exact>
            <CurrentPlaybackPage />
          </Route>
        </Switch>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
