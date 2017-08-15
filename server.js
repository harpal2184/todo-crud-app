var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var TodoModel = require('./todosModel');
var Todos = mongoose.model('Todos');
var PersonDetails = mongoose.model('PersonDetails');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//connect to db
mongoose.connect('mongodb://localhost/Harpaldb',{useMongoClient: true}, function(err){
	if(err)
		console.log('err');
	console.log('connected to mongodb server....');
});


//set the static html ui part 
app.use(express.static(__dirname + '/public')); // set static file location /public/img will be /img for user
 app.get('/', function(req,res){
 	res.sendFile('./public/index.html');
 });

//todos api 

app.get('/todos', function(req,res){
	Todos.find({}, function(err, todos){
		if(err)
			res.send(err);
		res.json(todos);
	});
});
app.post('/todos', function(req,res){
	Todos.create({
		name: req.body.name,		
	}, function(err, todo){
		if(err)
			res.send(err);
		res.json(todo);
	});
});
app.delete('/todos/:id', function(req,res){
	Todos.remove({_id: req.params.id}, function(err, todos){
		if(err)
			res.send(err);
		res.json(todos);
	});
});



//person api
app.get('/persondetails', function(req,res){
	PersonDetails.find({}, function(err, details){
		if(err)
			res.send(err);
		res.json(details);
	});
});
app.post('/persondetails', function(req,res){
	var new_person = new PersonDetails(req.body);
	new_person.save(function(err, details){
		if(err)
			res.send(err);
		res.json(details);
	});
});

app.get('/persondetails/:personId', function(req,res){
	PersonDetails.findById(req.params.personId, function(err, details){
		if(err)
			res.send(err);
		res.json(details);
	});
});
app.put('/persondetails/:personId', function(req,res){
	PersonDetails.findOneAndUpdate({_id: req.params.personId}, req.body, {new:true}, function(err, details){
		if(err)
			res.send(err);
		res.json(details);
	});
});
app.delete('/persondetails/:personId', function(req,res){
	PersonDetails.remove({_id: req.params.personId}, function(err, details){
		if(err)
			res.send(err);
		res.json(details);
	});
});

app.listen(port, function(){
	console.log("server running on port : "+ port);
});