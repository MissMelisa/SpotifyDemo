import { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";

import { AuthContext } from "./Components/Token";
import LogIn from "./Pages/Login";
import AlbumsPage from "./Pages/Albums";
import ArtistsPage from "./Pages/Artists";
import PlaylistsPage from "./Pages/Playlists";
import TopArtistsandTracksPage from "./Pages/TopArtistsandTracks";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./Pages/Home";
import PlaylistsItems from "./Pages/PlaylistsItems";
import LayOut from "./Components/LayOut";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  let spotifyToken = useContext(AuthContext);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <LayOut />

        <Switch>
          <Route path="/" exact>
            {!spotifyToken.token ? <LogIn /> : <HomePage />}
          </Route>
          <Route path="/yourmusic" exact component={AlbumsPage} />
          <Route path="/yourartist" exact component={ArtistsPage} />

          <Route path="/yourplaylists" exact component={PlaylistsPage} />

          <Route path="/yourplaylists/:id" exact component={PlaylistsItems} />

          <Route path="/topArtists" exact component={TopArtistsandTracksPage} />
        </Switch>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
