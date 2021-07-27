import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../Components/Token";

import { fetchUsersProfile } from "../../API";

import { ProfileType } from "../../Types";
import Profile from "../../Components/Profile";

export default function UsersProfile() {
  const { token } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery<ProfileType, Error>(
    "userData",
    () => fetchUsersProfile(token)
  );
  if (isLoading) return <span>"Loading..."</span>;

  if (error) return <span>An error has occurred: {error.message}</span>;
  return (
    <div>
      {data && (
        <Profile
          email={data.email}
          images={data.images}
          name={data.name}
          followers={data.followers}
        />
      )}
    </div>
  );
}
