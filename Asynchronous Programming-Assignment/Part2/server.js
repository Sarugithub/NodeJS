var express = require ('express');
var app = express();
var port = 7600;
var request = require('request');

var apiurl = 'http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees'


// static file path

app.use(express.static(__dirname+ '/public'))

// view files

app.set('views', './src/views');

//view engine

app.set('view engine', 'ejs');


app.get('/employeelist', function (req, res)
{
    request(apiurl, (err, response, body)=> {
        if (err) throw err;
        else
        var output = JSON.parse(response.body)
        res.render('index', {title:'Employee Detail', result:output});
        //res.send(response.body); 
    })
})

app.listen(port, function (err)
{
if (err) throw err;
console.log(`Server is running on port ${port}`);
})