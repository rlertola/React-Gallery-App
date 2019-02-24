# Treehouse Project 7 - React Flickr Gallery App

Going for the exceeds expectations grade.

This project was built using React with React-Router, and Axios for data fetching. Running npm start launches the app.

This app allows you to view a gallery of flickr images by entering a keyword in the search box, or by selecting one of the default navlinks.

The 3 navlinks take you to default search terms, or you can search for anything using the input. Please see comments in the code for more info.

#### Components
**App.js** - Main component. Holds the two axios request functions; 1 for searches, and another calls the 4 initial requests on page load.
**ErrorPage.js** - Renders a 404 error page when a bad url is entered.
**Gallery.js** - Gets the url from the data and makes a GalleryItem component for each. Displays those, or the NoSearchResults component.
**GalleryItem.js** - Contains each image that fills the gallery.
**Header.js** - Contains the SearchForm and Nav components.
**Nav.js** - Contains all the navlinks.
**NoSearchResults.js** - This page loads when there are no results for a given keyword.
**SearchButton.js** - The performSearch function is called when this is clicked.
**SearchForm.js** - Contains the search box and button.

#### Routes
The page is routed using react-router-dom. There is a route for each of the navlinks, and search. The search navlink doesn't have to be selected to search. Once the search button is clicked, the page will switch to the search navlink and path.

#### Config.js File
Holds the flickr api key. Connects to the axios fetch in the App component.

#### Loading Message
A "Loading..." message will show when the page is refreshed, or when a new term is searched. Once the data is loaded, the search term will display in place of loading.

#### CSS Changes
Changed font in the title, and the size of the search input and button. Also added a flickr favicon.

