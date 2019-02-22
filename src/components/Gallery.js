import React from 'react';
import GalleryItem from './GalleryItem';
import NoSearchResults from './NoSearchResults';

const Gallery = (props) => {
  const results = props.data;
  let loading = props.loading;
  let images;
  let url;

  if (results.length > 0) {
    images = results.map((image) => {
      url = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;

      return <GalleryItem url={url} key={image.id} />
    })
  } else {
    images = <NoSearchResults />
  }

  return (
    <div className="photo-container">
      {(loading) ? <h2>Loading...</h2> : <ul>{images}</ul>}
    </div>
  )
}

export default Gallery;
