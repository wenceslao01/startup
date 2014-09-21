var express = require('express'),
    path = require('path'),
    Twit = require('twit');

var app = express();
var T = new Twit(require('./keys.json'));

app.configure(function(){
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.static(path.join(__dirname, 'public')));
});

/**
 * Root
 */
app.get('/', function (req, res) {
  res.set('Content-Type', 'text/plain');
  res.send('Twitter API is running...');
});

//
app.get('/timeline', function (req, res) {
    T.get('statuses/home_timeline', req.query, function(err, data, response) {
      return res.json(data);
    })
});

//http://localhost:3000/myplace?lat=-38.7116780&long=-62.2680780
app.get('/myplace', function(req, res) {
  console.log(req);
  T.get('/trends/closest', req.query, function(err, data, response) {
      return res.json(data);
  })
});

//http://localhost:3000/trends?id=23424747
app.get('/trends', function(req, res) {
  T.get('/trends/place', req.query, function(err, data, response) {
      return res.json(data);
  })
});

//http://localhost:3000/search?q=%23TanBionicaCocaColaFM
app.get('/search', function(req, res) {
  T.get('/search/tweets', req.query, function(err, data, response) {
      return res.json(data);
  })
});

app.listen(3000);
