var express = require ('express');
var app = express();
var port = 8000;
var request = require('request');

var apiurl = 'http://api.openweathermap.org/data/2.5/weather?q=amsterdam&appid=a1245f67173e13b57c386d83a0758f5b'


// static file path

app.use(express.static(__dirname+ '/public'))

// view files

app.set('views', './src/views');

//view engine

app.set('view engine', 'ejs');


app.get('/weather', function (req, res)
{
    request(apiurl, (err, response, body)=> {
        if (err) throw err;
        else
        var output = JSON.parse(response.body)
        res.render('index', {title:'Weather App', result:output});
        //res.send(response.body); 
    })
})

app.listen(port, function (err)
{
if (err) throw err;
console.log(`Server is running on port ${port}`);
})