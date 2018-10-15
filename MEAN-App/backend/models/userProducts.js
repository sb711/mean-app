var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userProductSchema = new Schema({
    name: { type: String, required: true },
    user: { type: String, required: true }
});

module.exports = mongoose.model('UserProduct', userProductSchema);