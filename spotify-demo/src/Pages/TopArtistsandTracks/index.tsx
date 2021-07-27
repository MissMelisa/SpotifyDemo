import { useContext } from "react";
import { useQuery } from "react-query";
import { fetchTopArtistsandTracks } from "../../API";

import MusicItem from "../../Components/MusicItem";
import { AuthContext } from "../../Components/Token";
import { ItemType } from "../../Types";

import "./style.css";

export default function TopArtistsandTracksPage() {
  const { token } = useContext(AuthContext);

  const {
    isLoading,
    error,
    data = [],
  } = useQuery<ItemType[], Error>("topArtist", () =>
    fetchTopArtistsandTracks(token)
  );
  if (isLoading) return <span>"Loading..."</span>;

  if (error) return <span>An error has occurred: {error.message}</span>;
  return (
    <div className="containerTop">
      {data.map((item) => (
        <MusicItem
          key={item.id}
          id={item.id}
          title={item.title}
          image={item.image}
          singer={item.singer}
        />
      ))}
    </div>
  );
}
