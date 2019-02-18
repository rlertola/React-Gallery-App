import React from 'react';
import NotFound from './NotFound';
import GalleryItem from './GalleryItem';

const Gallery = (props) => {
  // console.log(props.data);
  const results = props.data;
  let images;
  let url;

  if (results.length > 0) {
    images = results.map((image) => {
      url = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;

      return <GalleryItem url={url} key={image.id} />
    })
  } else {
    images = <NotFound />
  }

  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>
        {images}
      </ul>
    </div>
  )
}

export default Gallery;
