const path = require('path');
const { response } = require('express');
const hbs = require('hbs');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//! Define paths for Express Configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//! Setup handlebars engine and views location.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//! Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

//? Setting up route for index.hbs
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Stephen Lyssy',
  });
});

//? Setting up route for about.hbs
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Stephen Lyssy',
  });
});

//? Setting up route for help.hbs
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Welcome to the help page!',
    message:
      'Here you will find answers to the most common questions about this weather app.',
    name: 'Stephen Lyssy',
  });
});

//? Setting up the route for /weather

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'You must enter an address.',
    });
  }
  //* Setting default parameter value for destructured object to a blank object.
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }

    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      res.send({
        //* Using shorthand for objects with the same name for key and value
        //*  for location and address.
        location,
        forecast: forecastData,
        address,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('error404', {
    errorTitle: '404',
    errorMessage: 'Oops! We got nothing!',
    name: 'Stephen Lyssy',
  });
});

app.get('*', (req, res) => {
  res.render('error404', {
    errorTitle: '404',
    errorMessage: 'Oops! Page not found! Try a link above.',
    name: 'Stephen Lyssy',
  });
});

//% Starting up the Server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
