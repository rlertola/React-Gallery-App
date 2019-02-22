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


class App extends Component {
  constructor() {
    super();
    this.state = {
      homeImages: [],
      searchImages: [],
      catImages: [],
      beachImages: [],
      guitarImages: [],
      loading: true,
      searchLoading: true
    }
  }

  componentDidMount() {
    this.getDataOnLoad();
    this.performSearch('sunsets');
  }

  getDataOnLoad = () => {
    this.setState({ loading: true });
    let errorMsg = 'Error fetching and parsing data';
    axios.all([
      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sunsets&per_page=24&format=json&nojsoncallback=1`).catch(error => console.log(errorMsg, error)),
      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=kittens&per_page=24&format=json&nojsoncallback=1`).catch(error => console.log(errorMsg, error)),
      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=beaches&per_page=24&format=json&nojsoncallback=1`).catch(error => console.log(errorMsg, error)),
      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=guitars&per_page=24&format=json&nojsoncallback=1`).catch(error => console.log(errorMsg, error))
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
      )
  }

  performSearch = query => {
    this.setState({ searchLoading: true });
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          searchImages: response.data.photos.photo,
          searchLoading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header onSearch={this.performSearch} />
          <Switch>
            <Route exact path="/" render={() => <Gallery data={this.state.homeImages} loading={this.state.loading} />} />
            <Route path="/search" render={() => <Gallery data={this.state.searchImages} loading={this.state.searchLoading} />} />
            <Route path="/cats" render={() => <Gallery data={this.state.catImages} loading={this.state.loading} />} />
            <Route path="/beaches" render={() => <Gallery data={this.state.beachImages} loading={this.state.loading} />} />
            <Route path="/guitars" render={() => <Gallery data={this.state.guitarImages} loading={this.state.loading} />} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
