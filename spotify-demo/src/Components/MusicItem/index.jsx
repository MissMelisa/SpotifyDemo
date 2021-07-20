import PropTypes from "prop-types";

import { Typography } from "antd";

import "./style.css";

export default function MusicItem({ image, title, singer, id }) {
  return (
    <div id={id} className="album">
      <img src={image} alt={singer} className="image" />
      <div className="data">
        <Typography className="titleStyle">{title}</Typography>
        <Typography className="singerStyle">{singer}</Typography>
      </div>
    </div>
  );
}
MusicItem.propTypes = {
  image: PropTypes.string.isRequired,
  singer: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
