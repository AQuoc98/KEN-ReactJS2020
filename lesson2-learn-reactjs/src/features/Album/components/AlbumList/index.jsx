import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import Album from '../Album';

Albumlist.propTypes = {
    albumList: PropTypes.array.isRequired
};

function Albumlist(props) {
    const { albumList } = props
    return (
        <ul className='album-list'>
            {albumList.map(album => (
                <li key={album.id}>
                    <Album album={album} />
                </li>
            ))}
        </ul>
    );
}

export default Albumlist;