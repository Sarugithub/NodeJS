var express = require('express');
var productsRouter = express.Router();
var fs = require('fs');

productsRouter.route('/')
.get(function(req,res){
            fs.readFile('prod.json', 'utf-8', function(err, data){
                if (err) throw err;
                res.send(data)
            })      
});

productsRouter.route('/details')
.get(function(req,res){
    res.send("Product details page")
});

module.exports = productsRouter;    