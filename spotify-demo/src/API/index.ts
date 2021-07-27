import { CurrentPlayBack } from "../Types";

export default function fetchData(token: string, url: string | null) {
  return fetch(`https://api.spotify.com/v1${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((result) => result.json());
}
export function fetchPut(token: string, url: string | null, body: any) {
  return fetch(`https://api.spotify.com/v1${url}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  }).then((result) => {
    if (result.status === 204) {
      return;
    }
    return result.json();
  });
}

export function fetchPost(token: string | null, url: string | null) {
  return fetch(`https://api.spotify.com/v1${url}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  }).then((result) => {
    if (result.status === 204) {
      return;
    }

    return result.json();
  });
}

type ItemImage = {
  url: string;
};
type Album = {
  name: string;
  images: ItemImage[]; // Array<string>
  artists: ItemSinger[];
};
type ItemAlbums = {
  album: Album;
};
type ItemSinger = { name: string };

export function fetchAlbums(token: string | null) {
  return fetchData(`/me/albums`, token).then((result) => {
    const disks = result.items.map((item: ItemAlbums) => ({
      image: item.album.images[0].url,
      title: item.album.name,
      singer: item.album.artists.map((singer) => singer.name).join(),
    }));
    return disks;
  });
}
type ItemFetchData = {
  id: string;
  images: ItemImage[];
  name: string;
};
export function fetchArtists(token: string | null) {
  return fetchData(`/me/following?type=artist&market=from_token`, token).then(
    (result) => {
      const singers = result.artists.items.map((item: ItemFetchData) => ({
        id: item.id,
        images: item.images && item.images[0].url,
        singer: item.name,
      }));
      return singers;
    }
  );
}

type fetchCurrentArtist = { name: string };

export function fetchCurrentPLayback(
  token: string | null
): Promise<CurrentPlayBack> {
  return fetchData(`/me/player`, token).then((result) => {
    const song = {
      uri: result.context.uri,
      id: result.item.id,
      singer: result.item.name,
      image: result.item.album.images && result.item.album.images[0].url,
      name:
        result.item.artists &&
        result.item.artists.map((artist: fetchCurrentArtist) => artist.name),
    };

    return song;
  });
}

type SpotifyPlaylist = {
  id: string;
  name: string;
  owner: { display_name: string };
  images: ItemImage[];
};

export function fetchPlaylists(token: string | null) {
  return fetchData(`/me/playlists`, token).then((result) => {
    const playlists = result.items.map((item: SpotifyPlaylist) => ({
      id: item.id,
      title: item.name,
      singer: item.owner.display_name,
      image: item.images[0].url,
    }));
    return playlists;
  });
}

type RecentlyPlayedTrackType = {
  id: string;
  name: string;
  album: { images: ItemImage[] };
  artists: fetchCurrentArtist[];
};

type TrackType = {
  track: RecentlyPlayedTrackType;
  context: { uri: string };
};
export function fetchRecentlyPlayedTrack(token: string | null) {
  return fetchData(`/me/player/recently-played?limit=8`, token).then(
    (result) => {
      const playlists = result.items.map((item: TrackType) => ({
        id: item.track.id,
        title: item.track.name,
        image: item.track.album.images && item.track.album.images[0].url,
        singer: item.track.artists.map((artist) => artist.name),
        uri: item.context.uri,
      }));

      return playlists;
    }
  );
}

export function fetchTopArtistsandTracks(token: string) {
  return fetchData(`/me/top/artists`, token).then((result) => {
    const disks = result.items.map((item: ItemFetchData) => ({
      id: item.id,
      image: item.images && item.images[0].url,
      singer: item.name,
    }));
    return disks;
  });
}

export function fetchUsersProfile(token: string) {
  return fetchData(`/me`, token).then((result) => {
    const user = {
      images: result.images && result.images[0].url,
      name: result.display_name,
      email: result.email,
      followers: result.followers.total,
    };

    return user;
  });
}
type PlaylistItemsType = {
  id: string;
  name: string;
  uri: string;
  album: { images: ItemImage[] };
};
type TrackPlaylist = { track: PlaylistItemsType };

export function playlistsItems(token: string, playlist_id: string) {
  return fetchData(`/playlists/${playlist_id}/tracks?limit=12`, token).then(
    (result) => {
      const track = result.items.map((item: TrackPlaylist) => ({
        id: item.track.id,
        name: item.track.name,
        uri: item.track.uri,
        images: item.track.album && item.track.album.images[0].url,
      }));
      return track;
    }
  );
}
type ParametersFetch = {
  token: string;
  uri?: { context_uri: any };
};

export function playTrack({ token, uri }: ParametersFetch) {
  return fetchPut(`/me/player/play`, { context_uri: uri }, token);
}
export function stopTrack({ token }: ParametersFetch) {
  return fetchPut(`/me/player/pause`, {}, token);
}
export function nextTrack({ token }: ParametersFetch) {
  return fetchPost(`/me/player/next`, token);
}

export function previousTrack({ token }: ParametersFetch) {
  return fetchPost(`/me/player/previous`, token);
}
