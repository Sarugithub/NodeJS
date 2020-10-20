const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

name: String,
email: String,
password: String

});

mongoose.model('userdetails', UserSchema);

module.exports = mongoose.model('userdetails')





