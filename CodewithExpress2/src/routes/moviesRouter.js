var express = require('express');
var moviesRouter = express.Router();
var fs = require('fs');

moviesRouter.route('/')
    .get(function(req,res){
                fs.readFile('movies.json', 'utf-8', function(err, data){
                    if (err) throw err;
                    res.send(data)
                })      
    });
    
moviesRouter.route('/details')
    .get(function(req,res){
        res.send("Movies details page");
    });


module.exports = moviesRouter; 