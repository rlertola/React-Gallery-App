import React, { Component } from 'react';
import axios from 'axios';
import '../css/index.css';
import apiKey from '../config';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

// App components.
import Header from './Header';
import Gallery from './Gallery';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // images: [],
      homeImages: [],
      catImages: [],
      beachImages: [],
      guitarImages: [],
      loading: false
    }
  }

  componentDidMount() {
    this.performSearch();
  }

  // performSearch = (query = 'sunsets') => {
  //   axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
  //     .then(response => {
  //       this.setState({
  //         images: response.data.photos.photo,
  //         loading: false
  //       });
  //     })
  //     .catch(error => {
  //       console.log('Error fetching and parsing data', error);
  //     });
  // }

  performSearch = (query = 'sunsets') => {
    axios.all([
      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`),
      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=kittens&per_page=24&format=json&nojsoncallback=1`),
      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=beaches&per_page=24&format=json&nojsoncallback=1`),
      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=guitars&per_page=24&format=json&nojsoncallback=1`)
    ])
      .then(axios.spread((homeRes, catRes, beachRes, guitarRes) => {
        this.setState({
          homeImages: homeRes.data.photos.photo,
          catImages: catRes.data.photos.photo,
          beachImages: beachRes.data.photos.photo,
          guitarImages: guitarRes.data.photos.photo,
          loading: false
        });
      })
        // .catch(error => {
        //   console.log('Error fetching and parsing data', error);
        // }));
      )

  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" render={() => <Gallery data={this.state.homeImages} />} />
          <Route exact path="/cats" render={() => <Gallery data={this.state.catImages} />} />
          <Route exact path="/beaches" render={() => <Gallery data={this.state.beachImages} />} />
          <Route exact path="/guitars" render={() => <Gallery data={this.state.guitarImages} />} />

        </div>
      </BrowserRouter>
    )
  }
}

export default App;
