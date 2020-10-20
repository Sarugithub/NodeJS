var express = require('express');
var productsRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

productsRouter.route('/')
    .get(function(req,res){    
                    mongodb.connect(url, function(err, dc){
                     if(err) {
                         res.status(501).send('Error while connecting') 
                    }
                    else
                    {
                    var dbo = dc.db('DataDB');
                    dbo.collection('Products').find({}).toArray(function(err,data){
                    if (err) {
                        res.status(501).send('Error fetching data')                
                    } else
                    {
                        res.render('products', { title: 'Products Page', prod:data })
                    };
                });  

            };
        });
    });




/* productsRouter.route('/')
        .get(function(req, res)
        {
            res.render('products', {title: 'Products Page', prod:prod})
        
    }); 
*/

/* productsRouter.route('/')
.get(function(req,res){
            fs.readFile('prod.json', 'utf-8', function(err, data){
                if (err) throw err;
                res.render('products', {title: 'Products Page', prod:data})
                 
                // res.send(data)
            })      
});
*/

/*
productsRouter.route('/details/:id')
.get(function(req,res){

    var id = req.params.id;
    mongodb.connect(url, function(err, dc){
        if(err) {
            res.status(501).send('Error while connecting') 
       }
       else
       {
       var dbo = dc.db('DataDB');
       dbo.collection('Products').findOne({_id:id}), function(err,data){
       if (err) {
           res.status(501).send('Error fetching data')                
       } else
       {
            res.render('productDetails', {title: 'Products Details Page', prod:data})
       };
    };

};

});

return productsRouter
});
*/

productsRouter.route('/details/:id')
    .get(function(req,res){
        var id = req.params.id
        mongodb.connect(url, function(err, dc){
            if(err) {
                res.status(501).send('Error while connecting') 
           }
           else
           {
           var dbo = dc.db('DataDB');
           dbo.collection('Products').findOne({_id:id}, function(err,data){
           if (err) {
               res.status(501).send('Error fetching data')                
           } else
           {
               res.render('productDetails', {title: 'Products Details Page', prod:data})
           }    
       })

    }
})

});


module.exports = productsRouter;



