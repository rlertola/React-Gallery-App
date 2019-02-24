import React, { Component } from 'react';
// withRouter gives the component access the history.
import { withRouter } from 'react-router-dom';
import SearchButton from './SearchButton';


// SearchForm displays even when the nav isn't clicked.
// User can search no matter what nav is clicked on, and
// it will switch to the search nav and /search path.
class SearchForm extends Component {
  state = {
    searchText: ''
  }

  onSearchChange = e => {
    this.setState({ searchText: e.target.value });
  }

  // Calls the axios request in App, and will route to /search/[searchtext].
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
