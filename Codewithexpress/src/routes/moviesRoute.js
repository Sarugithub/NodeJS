var express = require('express');
var moviesRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";


moviesRouter.route('/')
    .get(function(req,res){    
                    mongodb.connect(url, function(err, dc){
                     if(err) {
                         res.status(501).send('Error while connecting') 
                    }
                    else
                    {
                    var dbo = dc.db('DataDB');
                    dbo.collection('Movies').find({}).toArray(function(err,data){
                    if (err) {
                        res.status(501).send('Error fetching data')                
                    } else
                    {
                        res.send(data)
                    }
                })  

            }
        })

    });
    
    
            

                  /*  mongodb.connect(url, function (err, dc){
                    if(err)
                    {
                    
                        res.status(501).send("Error while connecting")
                    }
                    else
                    var dbo = dc.db('DataDB');
                    dbo.collection('Movies').find({}).toArray(function(err, data) {
                    if (err) {
                        res.status(501).send('Error fetching data')
                    } else
                    {
                        res.send(data)
                    };
                });
            });
        });

             */  
            
moviesRouter.route('/details')
    .get(function(req,res){
        res.send("Movies details page");
    });


module.exports = moviesRouter; 