var express = require('express');
var productRouter = express.Router();
var fs = require ('fs');
let lodash = require('lodash');

var prod = [
    {
        "ProjectId" : "101",
        "ProjectName" :  "Online Banking - ABS",
        "TechnologiesUsed" : "Node"
    },

    {
        "ProjectId" : "102",
        "ProjectName" :  "ECommerce Website - XYZ",
        "TechnologiesUsed" : "Java"

    },
    {
        "ProjectId" : "103",
        "ProjectName" :  "Library Management Portal - LLP",
        "TechnologiesUsed" : "Dot Net"

    }

]

productRouter.route('/')
    .get(function(req, res){
        //fs.readFile('prodetails.json','utf-8', function(err, data){
          //  if (err) throw err;
          res.render('productDisplay', {title: 'Product Display Page', dd:prod })
        });
    

productRouter.route('/details/:id')
    .get(function(req, res){
        var id = req.params.id;
        var x= lodash.filter(prod, {"ProjectId":id})
        res.render('productDetailsDisplay', {title:'Product Display Page', x:x })

        });


module.exports = productRouter;