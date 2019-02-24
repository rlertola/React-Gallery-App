import React from 'react';

// Gets the url from the Gallery component.
const GalleryItem = (props) => {
  return (
    <li>
      <img src={props.url} alt="" />
    </li>
  )
}

export default GalleryItem;
