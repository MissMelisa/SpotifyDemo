import AuthProvider, { AuthContext } from "../../Components/Token";
import MusicItem from "../../Components/MusicItem";
import { useContext, useEffect, useState } from "react";
import fetchData from "../../utils";
import "./style.css";

export default function AlbumsPage() {
  const [album, setAlbum] = useState([]);
  const { token } = useContext(AuthContext);

  console.log({ token });

  useEffect(() => {
    fetchData(`/me/albums`, token).then((result) => {
      const disks = result.items.map((item) => ({
        image: item.album.images[0].url,
        title: item.album.name,
        singer: item.album.artists.map((singer) => singer.name).join(),
      }));

      setAlbum(disks);
    });
  }, [token]);

  return (
    <div className="albumPage">
      <ul className="albumList">
        {album.map((item) => (
          <MusicItem
            key={item.id}
            image={item.image}
            title={item.title}
            singer={item.singer}
          />
        ))}
      </ul>
    </div>
  );
}
