var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
	name: {
		type: String,
		required: 'Please enter name of task'
	},
	created_date: {
		type: Date,
		defailt: Date.now
	}
}) ;
module.exports = mongoose.model('Todos', TodoSchema);


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PersonDetilsSchema = new Schema({
	_id:{
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: 'Please enter name'
	},
	email: {
		type: String,
		required: 'please enter email'
	}
});
module.exports = mongoose.model('PersonDetails', PersonDetilsSchema);
