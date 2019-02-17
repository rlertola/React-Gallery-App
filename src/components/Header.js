import React from 'react';
import Nav from './Nav';
import SearchForm from './SearchForm';

const Header = (props) => {
  return (
    <div>
      <h1>React Gallery</h1>
      <SearchForm />
      <Nav />
    </div>

  )
}

export default Header;
