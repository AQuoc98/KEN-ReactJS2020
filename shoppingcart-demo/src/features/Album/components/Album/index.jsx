import React from 'react';
import PropTypes from 'prop-types';
import "./style.scss"

Album.propTypes = {
  album: PropTypes.object.isRequired,
};

function Album(props) {
  const { album } = props;
  return (
    <div className="album">
      <div className="album__thumbnail">
        <img src={album.thumbnailUrl} alt="" />
      </div>
      <p className="album__name">{album.name}</p>
    </div>
  );
}

export default Album;
