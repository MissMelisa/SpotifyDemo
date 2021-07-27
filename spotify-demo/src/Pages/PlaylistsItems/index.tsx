import { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { playlistsItems } from "../../API";
import MusicItem from "../../Components/MusicItem";

import { AuthContext } from "../../Components/Token";

export default function PlaylistsItems() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const {
    isLoading,
    error,
    data = [],
  } = useQuery("playlist", () => playlistsItems(token, id));
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data);
  return (
    <div>
      {data.map((item) => (
        <MusicItem
          key={item.id}
          id={item.id}
          image={item.image}
          title={item.name}
          singer={item.singer}
        />
      ))}
    </div>
  );
}
