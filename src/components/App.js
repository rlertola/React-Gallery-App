import React, { Component } from 'react';
import axios from 'axios';
import '../css/index.css';
import apiKey from '../config';

// React-router-dom components.
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

// App components.
import Header from './Header';
import Gallery from './Gallery';
import ErrorPage from './ErrorPage';


// App handles state for all the images from Flickr.
// Titles are passed through so it can display in Gallery.
class App extends Component {
  constructor() {
    super();
    this.state = {
      searchImages: [],
      catImages: [],
      catTitle: 'cats',
      beachImages: [],
      beachTitle: 'beaches',
      guitarImages: [],
      guitarTitle: 'guitars',
      searchTitle: '',
      loading: true,
      searchLoading: true
    }
  }

  // getDataOnLoad only runs when the app is first loaded.
  // It handles the initial fetching for the navlinks.
  // performSearch runs with default 'sunsets' so either
  // the search nav or the / path will show that when the page is loaded.
  componentDidMount() {
    this.getDataOnLoad();
    this.performSearch('sunsets');
  }

  // loading state is set to true when these two axios requests first run,
  // and then set to false when they're done. This is so 'Loading...' can display.
  getDataOnLoad = () => {
    this.setState({ loading: true });
    let errorMsg = 'Error fetching and parsing data';
    axios.all([
      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`).catch(error => console.log(errorMsg, error)),
      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=beaches&per_page=24&format=json&nojsoncallback=1`).catch(error => console.log(errorMsg, error)),
      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=guitars&per_page=24&format=json&nojsoncallback=1`).catch(error => console.log(errorMsg, error))
    ])
      .then(axios.spread((catRes, beachRes, guitarRes) => {
        this.setState({
          catImages: catRes.data.photos.photo,
          beachImages: beachRes.data.photos.photo,
          guitarImages: guitarRes.data.photos.photo,
          loading: false
        });
      })
      )
  }

  performSearch = query => {
    this.setState({ searchLoading: true });
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          searchImages: response.data.photos.photo,
          searchLoading: false,
          searchTitle: query
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  // Each route is passed data, loading and title states to the Gallery component.
  render() {
    return (
      <BrowserRouter basename="/react-gallery-app">
        <div className="container">
          <Header onSearch={this.performSearch} />
          <Switch>
            <Route exact path="/" render={() => <Gallery data={this.state.searchImages}
              loading={this.state.loading} title={this.state.searchTitle} />} />
            <Route path="/search" render={() => <Gallery data={this.state.searchImages}
              loading={this.state.searchLoading} title={this.state.searchTitle} />} />
            <Route path="/cats" render={() => <Gallery data={this.state.catImages}
              loading={this.state.loading} title={this.state.catTitle} />} />
            <Route path="/beaches" render={() => <Gallery data={this.state.beachImages}
              loading={this.state.loading} title={this.state.beachTitle} />} />
            <Route path="/guitars" render={() => <Gallery data={this.state.guitarImages}
              loading={this.state.loading} title={this.state.guitarTitle} />} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
