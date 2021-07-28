import { DeleteOutlined } from "@ant-design/icons";
import { Typography } from "antd";

import "./style.css";

type MusicItemProp = {
  image: string;
  title: string;
  id: string;
  singer?: string;
  onClick?: () => void;
  deleteItem?: () => void;
};

export default function MusicItem({
  image,
  title,
  singer,
  id,
  deleteItem,
  onClick,
}: MusicItemProp) {
  return (
    <div id={id} className="album" onClick={onClick}>
      <DeleteOutlined onClick={deleteItem} />
      <img src={image} alt={singer} className="image" />
      <div className="data">
        <Typography className="titleStyle">{title}</Typography>
        <Typography className="singerStyle">{singer}</Typography>
      </div>
    </div>
  );
}
