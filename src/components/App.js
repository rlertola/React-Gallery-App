import React, { Component } from 'react';
import axios from 'axios';
import '../css/index.css';
import apiKey from '../config';
import Header from './Header';
import Gallery from './Gallery';

// import {
//   BrowserRouter,
//   Route,
//   Switch
// } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      loading: false
    }
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = 'sunsets') => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          images: response.data.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    return (
      <div className="container">
        <Header onSearch={this.performSearch} />
        <Gallery data={this.state.images} />
      </div>
    );
  }
}

export default App;
