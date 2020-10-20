
var express = require ('express');
var app = express();
var port = 9600;
var employeeRouter = require ('./src/routes/employeeRouter');
var productRouter = require ('./src/routes/productRouter');


// static file path
app.use(express.static(__dirname+'/public')) 

// view files
app.set('views', './src/views');

//view engine
app.set('view engine', 'ejs');

app.get('/', function(req, res)
{
    res.render('home1')
    
});

app.use('/employee', employeeRouter);
app.use('/product', productRouter);


app.listen(port, function(err){

    if (err) throw err;
    console.log("Server is running on port no 9600")
});