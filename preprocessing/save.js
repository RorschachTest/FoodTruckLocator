var fs = require('fs');
var mongoose = require('mongoose');

//Connect Database
mongoose.connect('mongodb://rihazzahir:test@ds157040.mlab.com:57040/foodtrucklocator');
mongoose.Promise = global.Promise;

//Create Schema
var locSchema = new mongoose.Schema({
	NOISent: String,
	LocationDescription: String,
	updated_meta: String,
	created_meta: String,
	updated_at: Number,
	meta: String,
	//Location:
	Latitude: String,
	id: String,
	Status: String,
	geometry:{
		type: {type: String},
		coordinates: [Number]
	},
	PriorPermit: String,
	Schedule: String,
	locationid: String,
	ExpirationDate: String,
	lot: String,
	Address: String,
	cnn: String,
	Approved: String,
	Received: String,
	sid: String,
	Applicant: String,
	Longitude: String,
	FoodItems: String,
	blocklot: String,
	Y: String,
	X: String,
	FacilityType: String,
	created_at: Number,
	permit: String,
	position: Number,
	block: String,
	daysHours: String
});

locSchema.index({'geometry': '2dsphere'});

var Location = mongoose.model('Location', locSchema);

var input = {"NOISent": null, "LocationDescription": "MISSOURI ST: 20TH ST to SIERRA ST (500 - 630)", "updated_meta": "403253", "created_meta": "403253", "updated_at": 1458315884, "meta": null,
			"Location": ["{\"address\":\"\",\"city\":\"\",\"state\":\"\",\"zip\":\"\"}", "37.7593037663834", "-122.395902231236", null, false], "Latitude": "37.7593037663834", "id": "037D0000-9F1A-4EFB-BF22-BD013B54BD72",
			"Status": "EXPIRED", "PriorPermit": "1", "Schedule": "http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=13MFF-0102&ExportPDF=1&Filename=13MFF-0102_schedule.pdf",
			"locationid": "437211", "ExpirationDate": "2014-03-15T00:00:00", "lot": "031", "Address": "555 MISSOURI ST", "cnn": "9212000", "Approved": "2013-04-12T00:00:00", "Received": "2013-04-12", "sid": 740,
			"Applicant": "Natan's Catering", "Longitude": "-122.395902231236",
			"FoodItems": "Burgers: melts: hot dogs: burritos:sandwiches: fries: onion rings: drinks",
			"blocklot": "4101031", "Y": "2104493.013", "X": "6013632.016", "FacilityType": "Truck", "geometry": {"type": "Point", "coordinates": [-122.395902231236, 37.7593037663834]}, "created_at": 1458315884,
			"permit": "13MFF-0102", "position": 740, "block": "4101", "dayshours": "Mo-Fr:9AM-10AM/12PM-1PM"};

var itemOne = Location(input).save(function(err){
	if((err)) throw err;
	console.log('item saved');
});

// var readFile = fs.readFileSync(__dirname + '/output.json', 'utf8');

// db.collection.insert(readFile);

// console.log(data.stringify);