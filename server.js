var express = require('express');

var app = express();

app.set('view engine', 'ejs');
app.use('/scripts', express.static('scripts'));

app.get('/', function(req, res){
	res.render('index');
});

app.get('/home', function(req, res){
	console.log(req.query);
	res.render('index');
});

// app.get('/txt', function(req, res){
// 	res.sendFile(__dirname + '/readMe.txt');
// });

// app.get('/profile/:name', function(req, res){
// 	var loc = {lat: 32, lng: 20};
// 	res.render('locator', {person: req.params.name, location: loc});
// });

app.listen(8080);
