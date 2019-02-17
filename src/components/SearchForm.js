import React, { Component } from 'react';
import SearchButton from './SearchButton';

class SearchForm extends Component {
  state = {
    searchText: ''
  }
  render() {
    return (
      <form className="search-form">
        <input type="search" name="search" placeholder="Search" required />
        <SearchButton />
      </form>
    )
  }
}

export default SearchForm;
