import { useContext, useEffect, useState } from "react";

import MusicItem from "../../Components/MusicItem";
import { AuthContext } from "../../Components/Token";
import fetchData from "../../utils";

import "./style.css";

export default function ArtistsPage() {
  const { token } = useContext(AuthContext);
  const [artist, setArtist] = useState([]);

  useEffect(() => {
    fetchData(`/me/following?type=artist&market=from_token`, token).then(
      (result) => {
        const singer = result.artists.items.map((item) => ({
          id: item.id,
          image: item.images && item.images[0].url,
          singer: item.name,
        }));
        setArtist(singer);
      }
    );
  }, [token]);

  return (
    <div className="artistPage">
      {artist.map((item) => (
        <MusicItem
          key={item.id}
          id={item.id}
          image={item.image}
          singer={item.singer}
        />
      ))}
    </div>
  );
}
