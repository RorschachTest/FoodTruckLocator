var express = require('express');
var mongoose = require('mongoose');
var app = express();

//set ejs as view engine 
app.set('view engine', 'ejs');
//used for static request, maps.js in this case
app.use('/scripts', express.static('scripts'));

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

//index the schema with '2dsphere'for $geowithin queries
locSchema.index({'geometry': '2dsphere'});

var Location = mongoose.model('Location', locSchema);

//initial get request is on 'localhost:8080' 
app.get('/', function(req, res){
	res.render('index');
});

//get request send by ajax is handled here
app.get('/home', function(req, res){
	console.log(req.query);

	//query is created 
	var query = {
	   	geometry: {
	      $geoWithin: { $centerSphere: [ [ req.query.lng, req.query.lat ], 0.00313922461 ] }
	   }
	};//query for search in 30KM in radian (0.00313922461)

	//query on the db using model Location for above query the response from the db is in docs variable
	Location.find(query, function(err, docs){
		if(err) throw err;
		console.log(docs);
		res.send(docs);
	});
});

app.listen(8080);
