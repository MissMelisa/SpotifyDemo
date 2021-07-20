export default function fetchData(url, token) {
  return fetch(`https://api.spotify.com/v1${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((result) => result.json());
}
