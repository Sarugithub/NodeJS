var express = require ('express');
var app = express();
var port = 7800;
var moviesRouter = require('./src/routes/moviesRoute');
var productsRouter = require('./src/routes/productsRoute');

// static file path

app.use(express.static(__dirname+ '/public'))

// view files

app.set('views', './src/views');

//view engine

app.set('view engine', 'ejs');

app.get('/', function(req, res)
   {
        res.render('index')      
   });

app.use('/movies', moviesRouter); // use is one of the property that helps to bind the routes
app.use('/products', productsRouter)

app.listen(port, function(err){

    if (err) throw err;
    console.log("Server is running on port no 7800")
});


// CRUD
/* C - Create (Post operation)
   R - Read (Get - Read)
   U - Update (Put)
   D - Delete (Delete)

   */
  
    