import { useContext } from "react";

import { AuthContext } from "../../Components/Token";
import MusicItem from "../../Components/MusicItem";

import "./style.css";
import { useQuery } from "react-query";
import { fetchAlbums } from "../../API";
import { ItemType } from "../../Types";

export default function AlbumsPage() {
  const { token } = useContext(AuthContext);

  const {
    isLoading,
    error,
    data = [],
  } = useQuery<ItemType[], Error>("albumsData", () => fetchAlbums(token));
  if (isLoading) return <span>"Loading..."</span>;

  if (error) return <span>An error has occurred: {error.message}</span>;

  return (
    <div className="albumPage">
      <ul className="albumList">
        {data.map((item) => (
          <MusicItem
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            singer={item.singer}
          />
        ))}
      </ul>
    </div>
  );
}
