// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================

// config files
var db = require('./config/db')
    
 //Sashikant
// set our port
var port = process.env.PORT || 8080; 

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url); 

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// routes ==================================================
require(__dirname+'/Route/route')(app); // configure our routes

// start app ===============================================S
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;                         
















/*var Scraper = require ('images-scraper')
  , google = new Scraper.Google();

google.list({
	keyword: 'banana',
	num: 15,
	detail: false,
	nightmare: {
		show: false
	}
})
.then(function (res) {
	console.log('first 10 results from google', res.length)
	console.log('first 10 results from google', res);
}).catch(function(err) {
	console.log('err', err);
});

// you can also watch on events
google.on('result', function (item) {
	console.log('out', item);
});*/