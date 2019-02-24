import React from 'react';
import { NavLink } from 'react-router-dom';

// The /search path loads on page load, and will keep the
// images displayed until something else is searched for.
const Nav = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to="/search">Search</NavLink></li>
        <li><NavLink to="/cats">Cats</NavLink></li>
        <li><NavLink to="/beaches">Beaches</NavLink></li>
        <li><NavLink to="/guitars">Guitars</NavLink></li>
      </ul>
    </nav>
  )
}

export default Nav;
