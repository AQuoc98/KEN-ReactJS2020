import React from 'react';
import PropTypes from 'prop-types';
import AlbumList from './components/AlbumList';

AlbumFeature.propTypes = {
    
};

function AlbumFeature(props) {
    const albumList = [
        {
            id: 1,
            name: 'Nhạc xuân hay nhất',
            thumbnailUrl: "https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/e/9/9/2/e9920467447b291ac02b17e11f196ead.jpg"
        },
        {
            id: 2,
            name: 'K-POP: Những Bản Hits Quốc Dân',
            thumbnailUrl: "https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/a/d/8/9/ad89ed74f82efd427a0f9610ce6da328.jpg"
        },
        {
            id: 3,
            name: 'V-Pop Nhạc Mới Nổi Bật',
            thumbnailUrl: "https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/5/9/3/a/593ac489368dad55865b7968e6be5ea4.jpg"
        }
    ]
    return (
        <div>
            <AlbumList albumList={albumList}/>
            
        </div>
    );
}

export default AlbumFeature;