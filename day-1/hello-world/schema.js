var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	autodesk: {
		clientId: String,
		token: String
	}
});day

module.exports = mongoose.model('User', userSchema);