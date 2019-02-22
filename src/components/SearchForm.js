import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import SearchButton from './SearchButton';


class SearchForm extends Component {
  state = {
    searchText: ''
  }

  onSearchChange = e => {
    this.setState({ searchText: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.state.searchText);
    this.props.history.push(`/search/${this.state.searchText}`);
    e.currentTarget.reset();
  }

  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit} >
        <input
          type="search"
          name="search" placeholder='Search...'
          onChange={this.onSearchChange}
          required />
        <SearchButton />
      </form>
    )
  }
}

export default withRouter(SearchForm);
