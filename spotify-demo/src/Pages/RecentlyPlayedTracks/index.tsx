import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { deleteTrack, fetchRecentlyPlayedTrack } from "../../API";
import MusicItem from "../../Components/MusicItem";
import { AuthContext } from "../../Components/Token";
import { ItemType } from "../../Types";

import "./style.css";

export default function RecentlyPlayedTracksPage() {
  const { token } = useContext(AuthContext);

  const queryClient = useQueryClient();
  const mutationDelete = useMutation(deleteTrack, {
    onSuccess: () => {
      queryClient.invalidateQueries("recentlyPlayed");
    },
  });
  const {
    isLoading,
    error,
    data = [],
  } = useQuery<ItemType[], Error>("recentlyPlayed", () =>
    fetchRecentlyPlayedTrack(token)
  );
  if (isLoading) return <span>"Loading..."</span>;

  if (error) return <span>An error has occurred: {error.message}</span>;

  function deteleItem(id) {
    mutationDelete.mutate({ token, id });
  }
  return (
    <div className="recentlyPlayedContainer">
      {data.map((item) => (
        <MusicItem
          deleteItem={() => deteleItem(item.id)}
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
