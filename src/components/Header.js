import React from 'react';
import Nav from './Nav';
import SearchForm from './SearchForm';

// Header renders the title, search bar and nav links.
// Rendered in App.
const Header = (props) => {
  return (
    <div>
      <h1>Flickr Gallery</h1>
      <SearchForm onSearch={props.onSearch} />
      <Nav />
    </div>
  )
}

export default Header;
