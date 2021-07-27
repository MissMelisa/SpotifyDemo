import { useContext } from "react";
import { useQuery } from "react-query";

import { fetchPut, fetchRecentlyPlayedTrack } from "../../API";
import MusicItem from "../../Components/MusicItem";
import { AuthContext } from "../../Components/Token";
import { ItemType } from "../../Types";

import "./style.css";

export default function RecentlyPlayedTracksPage() {
  const { token } = useContext(AuthContext);

  const {
    isLoading,
    error,
    data = [],
  } = useQuery<ItemType[], Error>("recentlyPlayed", () =>
    fetchRecentlyPlayedTrack(token)
  );
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  function handleOnStart(uri: any) {
    fetchPut(
      `/me/player/play`,
      {
        context_uri: uri,
      },
      token
    );
  }
  return (
    <div className="recentlyPlayedContainer">
      {data.map((item) => (
        <MusicItem
          onClick={() => handleOnStart(item.uri)}
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
