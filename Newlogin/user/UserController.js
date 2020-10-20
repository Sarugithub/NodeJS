const express = require('express');
const router = express.Router();

const app = express();

const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

var config = require('../config');
const User = require('../user/User');

const LocalStorage= require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch')

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname+'/public'));


router.get('/signup', (req,res) => {
    res.render('signup')
})

router.get('/profile', (req, res) => {
    var token = localStorage.getItem('authToken');
    if(!token)
    {
        const message = encodeURIComponent('Login first for profile page')
        res.redirect('/?msg'+message)
    }
    jwt.verify(token, config.secret, (err, decode) => {
        if (err) {
            const message = encodeURIComponent('Invalid Token')
            res.redirect('/?msg'+message)
        }
        User.findById(decode.id, {password:0}, (err, user) => {
            const message = encodeURIComponent('Invalid Token')
            const message1 = encodeURIComponent('No user found')
            if(err) {res.redirect('/?msg=' +message)}
            if(!user)
            {
                res.redirect('/?msg=', +message1)
            }
            res.render('profile',{user})
        })

    })
})

 module.exports = router;

