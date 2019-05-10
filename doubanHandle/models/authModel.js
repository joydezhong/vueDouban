var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthSchema = new Schema({
    username: String,
    userpswd: String
});

module.exports = mongoose.model('AuthInfo', AuthSchema, 'userinfo');