import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteTrack,
  fetchCurrentPLayback as fetchCurrentPlayback,
  nextTrack,
  playTrack,
  previousTrack,
  stopTrack,
} from "../../API";

import MusicItem from "../../Components/MusicItem";
import { AuthContext } from "../../Components/Token";
import {
  CaretRightOutlined,
  PauseOutlined,
  StepBackwardFilled,
  StepForwardFilled,
} from "@ant-design/icons";
import { CurrentPlayBack } from "../../Types";

import "./style.css";

export default function CurrentPlaybackPage() {
  const { token } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [isPlaying, setIsPlaying] = useState(true);

  const mutationPlay = useMutation(playTrack, {
    onMutate: () => {
      setIsPlaying(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("current");
    },
    onError: () => {
      setIsPlaying(false);
    },
  });
  const mutationPause = useMutation(stopTrack, {
    onMutate: () => {
      setIsPlaying(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("current");
    },
    onError: () => {
      setIsPlaying(true);
    },
  });

  const mutationNext = useMutation(nextTrack, {
    onSuccess: () => {
      queryClient.invalidateQueries("current");
    },
  });
  const mutationPrevious = useMutation(previousTrack, {
    onSuccess: () => {
      queryClient.invalidateQueries("current");
    },
  });
  const mutationDelete = useMutation(deleteTrack, {
    onSuccess: () => {
      queryClient.invalidateQueries("current");
    },
  });

  const { isLoading, error, data } = useQuery<CurrentPlayBack, Error>(
    "current",
    () => fetchCurrentPlayback(token)
  );
  if (isLoading) return <span>"Loading..."</span>;

  if (error) return <span>An error has occurred: {error.message}</span>;

  function handleOnPlay(uri?: string) {
    if (!uri) {
      return;
    }
    mutationPlay.mutate({ token, uri });
  }
  function handlePauseTrackOn() {
    mutationPause.mutate({ token });
  }
  function handleNextTrackOn() {
    mutationNext.mutate({ token });
  }

  function handlePreviousTrackOn() {
    mutationPrevious.mutate({ token });
  }

  function deteleItem(id) {
    mutationDelete.mutate({ token, id });
  }

  return (
    <div className={"currentPlayContainer"}>
      {data && (
        <MusicItem
          onClick={() => handleOnPlay(data.uri)}
          deleteItem={() => deteleItem(data.id)}
          key={data.id}
          title={data.name}
          id={data.id}
          singer={data.singer}
          image={data.image}
        />
      )}
      <div>
        <StepBackwardFilled
          onClick={handlePreviousTrackOn}
          style={{ color: "white" }}
        />
        {isPlaying === false ? (
          //stop
          <CaretRightOutlined
            onClick={() => handleOnPlay(data?.uri)}
            style={{ color: "white" }}
          />
        ) : (
          //play
          <PauseOutlined
            onClick={handlePauseTrackOn}
            style={{ color: "white" }}
          />
        )}
        <StepForwardFilled
          onClick={handleNextTrackOn}
          style={{
            color: "white",
          }}
        />
      </div>
    </div>
  );
}
