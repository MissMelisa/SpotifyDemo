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
  console.log(data);
  if (isLoading) return <span>"Loading..."</span>;

  if (error) return <span>An error has occurred: {error.message}</span>;
  return (
    <div className="artistPage">
      {data.map((item) => (
        <MusicItem
          key={item.id}
          id={item.id}
          title={item.singer}
          image={item.image}
        />
      ))}
    </div>
  );
}
