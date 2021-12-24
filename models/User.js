const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: String,
    firstname: String,
    lastname: String,
    password: String
})

var User = mongoose.model('User',UserSchema,'users');
module.exports = User;