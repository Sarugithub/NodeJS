const express = require('express')
const router = express.Router();

const app = express();

const bodyParser = require('body-parser');  

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const config = require('../config');
const User = require('../user/User');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/register', (req, res) => {
const hashedPassword = bcrypt.hashSync(req.body.password, 8);
User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword    
}, (err, user) => { 
    if (err) return res.status(500).send('Problem while register');
    res.send('Registration successfull');
});

});

router.get('/users', (req, res) => {
User.find({}, (err, user) => {
if (err) return res.status(500).send('Error while fetching user')
else
res.send(user)
});
});


module.exports= router;







/////********************** */




