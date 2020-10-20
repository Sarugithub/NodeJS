const express = require('express');
const mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1:27017/Orderapp');
var user = require('./models/usermodel');
var app = express();
var port = 3000;
  
var connection = mongoose.connection;

connection.on('connected', function(){

    console.log('connected to db');

});

app.get('/getUser', (req, res) =>{

user.find(function(err,data){
    if(err)
    res.status(500).send(err);
    else
    res.json(data);
})

})


app.post('/postUser', (req, res) => {

user.create(req.body, function(err, data){

    if (err) 
    res.status(500).send(err);
    else
    res.send('Data inserted');
})

})

app.get('/', function(req, res) {
res.send('Welcome to API');

});

app.listen(port, function(){
console.log("running");

});

module.exports= connection;