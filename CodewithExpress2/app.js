var express = require ('express');
var app = express();
var port = 6800;
var moviesRouter = require('./src/routes/moviesRouter');
var productsRouter = require('./src/routes/productsRouter');



app.get('/', function(req, res)
   {
        res.send("This is from express");       
   });



app.use('/movies', moviesRouter); // use is one of the property that helps to bind the routes
app.use('/products', productsRouter)

app.listen(port, function(err){

    if (err) throw err;
    console.log("Server is running on port no 6800")
});