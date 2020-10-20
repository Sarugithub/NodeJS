const mongoose = require ('mongoose');

const UserSchema = new mongoose.Schema({

    name: String,
    email: String,
    password: String
});

mongoose.model('table1', UserSchema);

module.exports = mongoose.model('table1')
