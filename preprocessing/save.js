var fs = require('fs');
var mongoose = require('mongoose');

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

var input = {	
				location: 'Roorkee', 
				description: 'Snapdeal',
				geometry:{
					type: 'Point',
					coordinates: [77.893783, 29.864686]
				}
			};

var itemOne = Location(input).save(function(err){
	if((err)) throw err;
	console.log('item saved');
});

// var readFile = fs.readFileSync(__dirname + '/output.json', 'utf8');

// db.collection.insert(readFile);

// console.log(data.stringify);