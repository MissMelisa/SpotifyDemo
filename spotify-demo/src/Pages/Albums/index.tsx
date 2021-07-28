import { useContext, useState } from "react";

import { AuthContext } from "../../Components/Token";
import MusicItem from "../../Components/MusicItem";

import { useQuery } from "react-query";
import { fetchAlbums } from "../../API";
import { ItemType } from "../../Types";
import sortBy from "../../Utils";

import "./style.css";

export default function AlbumsPage() {
  const { token } = useContext(AuthContext);
  const [filter, setFilter] = useState<any | null>(null);

  const {
    isLoading,
    error,
    data = [],
  } = useQuery<ItemType[], Error>("albumsData", () => fetchAlbums(token));
  if (isLoading) return <span>"Loading..."</span>;

  if (error) return <span>An error has occurred: {error.message}</span>;

  return (
    <div className="albumPage">
      <label className="selectSortedBy">
        Sorted by
        <select
          className="selectOption"
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="artist">Artist</option>
          <option value="title"> Title</option>
          <option value="added"> Recently added</option>
        </select>
      </label>

      <ul className="albumList">
        {data
          .sort((a, b) => {
            if (!filter) return 0;
            if (filter === "artist") return sortBy<ItemType>(a, b, "singer");
            if (filter === "title") return sortBy<ItemType>(a, b, filter);
            if (filter === "added") return sortBy<ItemType>(a, b, "date");
            return 0;
          })
          .map((item) => (
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
