import React from 'react';
import GalleryItem from './GalleryItem';
import NoSearchResults from './NoSearchResults';

// Iterates through the images and makes a url and GalleryItem out of them.
// If no images are loaded, the NoSearchResults component will display.
const Gallery = (props) => {
  const results = props.data;
  let loading = props.loading;
  let title = props.title;
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

  // 'Loading...' will display until the images are fully loaded,
  // then will be replaced by the keyword.
  return (
    <div className="photo-container">
      {
        (loading)
          ? <h2>Loading...</h2>
          :
          <div>
            <h2>{title}</h2>
            <ul>{images}</ul>
          </div>
      }
    </div>
  )
}

export default Gallery;
