import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
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

  return (
    <div>
      {data && (
        <MusicItem
          onClick={() => handleOnPlay(data.uri)}
          key={data.id}
          title={data.name}
          id={data.id}
          singer={data.name}
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
        <audio controls>
          <source
            src="https://p.scdn.co/mp3-preview/b8bbc5ca9cc5fc1a9ddb73fa47107f00c59c422c?cid=d8270bf43b854af89672bd03c2395a04"
            type="audio/mpeg"
          />
        </audio>
      </div>
    </div>
  );
}
