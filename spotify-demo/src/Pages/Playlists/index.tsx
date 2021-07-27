import { useContext } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { fetchPlaylists, playlistsItems } from "../../API";
import MusicItem from "../../Components/MusicItem";
import { AuthContext } from "../../Components/Token";

import "./style.css";

export default function PlaylistsPage() {
  let history = useHistory();
  const { token } = useContext(AuthContext);

  const {
    isLoading,
    error,
    data = [],
  } = useQuery("playlist", () => fetchPlaylists(token));
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  function reDirect(id) {
    playlistsItems(token, id);
    history.push(`/yourplaylists/${id}`);
  }

  return (
    <div className="playlistPage">
      {data.map((item) => (
        <MusicItem
          onClick={() => reDirect(item.id)}
          key={item.id}
          id={item.id}
          image={item.image}
          title={item.title}
          singer={item.singer}
        />
      ))}
    </div>
  );
}
