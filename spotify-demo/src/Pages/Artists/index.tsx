import { useContext } from "react";
import { useQuery } from "react-query";
import { fetchArtists } from "../../API";

import MusicItem from "../../Components/MusicItem";
import { AuthContext } from "../../Components/Token";
import { ItemType } from "../../Types";

import "./style.css";

export default function ArtistsPage() {
  const { token } = useContext(AuthContext);

  const {
    isLoading,
    error,
    data = [],
  } = useQuery<ItemType[], Error>("artistData", () => fetchArtists(token));

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="artistPage">
      {data.map((item) => (
        <MusicItem
          key={item.id}
          id={item.id}
          title={item.singer}
          image={item.image}
          singer={item.singer}
        />
      ))}
    </div>
  );
}
