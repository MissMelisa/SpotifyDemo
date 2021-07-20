import "./App.css";
import fetchData from "./utils";
import AuthProvider, { AuthContext } from "./Components/Token";
import { Link, Route, Switch } from "react-router-dom";
import LogIn from "./Pages/Login";
import { useQuery } from "react-query";
import AlbumsPage from "./Pages/Albums";
import ArtistsPage from "./Pages/Artists";
import { useContext } from "react";

function App() {
  let spotifyToken = useContext(AuthContext);

  return (
    <div className="App">
      {spotifyToken.token && (
        <nav>
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
          </ul>
        </nav>
      )}
      <Switch>
        <Route path="/" exact>
          {!spotifyToken.token && <LogIn />}
        </Route>
        <Route path="/yourmusic" exact>
          <AlbumsPage />
        </Route>
        <Route path="/yourartist" exact>
          <ArtistsPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
