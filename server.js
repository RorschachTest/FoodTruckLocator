var express = require('express');
var mongoose = require('mongoose');
var app = express();

//Connect Database
mongoose.connect('mongodb://rihazzahir:test@ds157040.mlab.com:57040/testlocator');
mongoose.Promise = global.Promise;

//Create Schema
var locSchema = new mongoose.Schema({
	location: String,
	description: String,
	geometry:{
		type: {type: String},
		coordinates: [Number]
	}
});

locSchema.index({'geometry': '2dsphere'});

var Location = mongoose.model('Location', locSchema);

app.set('view engine', 'ejs');
app.use('/scripts', express.static('scripts'));

app.get('/', function(req, res){
	res.render('index');
});


app.get('/home', function(req, res){
	console.log(req.query);

	var query = {
	   	geometry: {
	      $geoWithin: { $centerSphere: [ [ req.query.lng, req.query.lat ], 0.00313922461 ] }
	   }
	};//query for search in 30KM in radian (0.00313922461)

	Location.find(query, function(err, docs){
		if(err) throw err;
		console.log(docs);
		res.send(docs);
	});
});

// app.get('/txt', function(req, res){
// 	res.sendFile(__dirname + '/readMe.txt');
// });

// app.get('/profile/:name', function(req, res){
// 	var loc = {lat: 32, lng: 20};
// 	res.render('locator', {person: req.params.name, location: loc});
// });

app.listen(8080);
