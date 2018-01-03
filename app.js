var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var helpers = require('./helpers');

var indexRoutes = require('./routes/index.js');
var apiRoutes = require('./routes/api.js');
var adminRoutes = require('./routes/admin.js');

// Load up config
require('dotenv').config()

// Database connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, {useMongoClient: true});

// Initialize app
const app = express();

const stripe = require('stripe')(process.env.STRIPESECRET_KEY);

// App settings
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

var expressSession = require('express-session');
app.use(expressSession({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

var flash = require('connect-flash');
app.use(flash());

// Set locals
app.use(function(req, res, next) {
  res.locals.h = helpers;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success')
  next();
});

// Load in routes and router
app.use('/', indexRoutes);
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);


app.use(function(req, res, next){
  res.status(404);
  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }
  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  // default to plain-text. send()
  res.type('txt').send('Not found');
});

// Start server
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});