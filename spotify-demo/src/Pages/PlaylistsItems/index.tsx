import { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { playlistsItems } from "../../API";
import MusicItem from "../../Components/MusicItem";

import { AuthContext } from "../../Components/Token";
import { ItemType } from "../../Types";

type Params = {
  id: string;
};

export default function PlaylistsItems() {
  const { id } = useParams<Params>();
  const { token } = useContext(AuthContext);

  const {
    isLoading,
    error,
    data = [],
  } = useQuery<ItemType[], Error>("playlist", () => playlistsItems(token, id));
  if (isLoading) return <span>"Loading..."</span>;

  if (error) return <span>An error has occurred: {error.message}</span>;
  return (
    <div>
      {data.map((item) => (
        <MusicItem
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
