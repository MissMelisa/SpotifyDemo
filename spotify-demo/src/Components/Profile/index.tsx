import { Typography } from "antd";

import "./style.css";

type ProfileProps = {
  images: string;
  name: string;
  followers: number;
  email: string;
};

export default function Profile({
  images,
  name,
  followers,
  email,
}: ProfileProps) {
  return (
    <div className="containerProfile">
      <img src={images} alt={name} className="imageProfile" />

      <Typography className="nameProfile">{name}</Typography>
      {/* <Typography className="nameProfile">Email:{email}</Typography> */}
      <Typography className="nameProfile"> Followers: {followers}</Typography>
    </div>
  );
}
