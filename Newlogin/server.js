const app = require ('./app');
const express = require ('express');
const router = express.Router();
const port = 2700;


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname+'/public'));

app.get('/', (req,res) => {
res.render('index', {msg:req.query.msg?req.query.msg:''})
})


app.listen(port, () => {

    console.log(`Server is running on port ${port}`)
})





