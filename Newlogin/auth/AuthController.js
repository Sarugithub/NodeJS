const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var config = require('../config');
const User = require('../user/User');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch')

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());


router.post('/register', (req,res) => {
    console.log(req.body)
    const hashedPassword = bcrypt.hashSync(req.body.password,8);

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }, (err, user) => {
        if (err) return res.status(500).send('Problem while register');
        //res.send('Registration successfull');
        const message = encodeURIComponent('Successfully registered please login now')
       res.redirect('/?msg=' +message)
      // res.send("User registered successfully")
    });
});


router.get('/users', (req, res) => {
User.find({}, (err, user) => {

    if(err) return res.status(500).send('Error while fetching user');
    res.send(user)
});
});


router.post('/login', (req, res) => {
User.findOne({email:req.body.email}, (err, user) => {
    if (err) return res.status(401  ).send('Problem while login');
    if(!user)
    {
        const message = encodeURIComponent('User does not exist')
        res.redirect('/?msg=' +message)
        //res.send("User does not exist");
    }
    else
    {
        const passwordIsValid = bcrypt.compareSync(req.body.password,user.password)
        if(!passwordIsValid)
        {
           const message = encodeURIComponent('Enter correct password')
            res.redirect('/?msg=' +message)
           // res.send("Password is invalid");
        }
        else
        {
            var token = jwt.sign({id:user._id}, config.secret,{ expiresIn: 86400 });
            // res.send({auth:true, token:token})
            localStorage.setItem('authToken', token)
            res.redirect('/users/profile')
        } 

    }

});
});

router.get('/getUser', (req, res) => {

    var token = req.headers['x-access-token'];
    if (!token)
    res.send(401).send({auth:false, message:'No Token Provided'});

    jwt.verify(token, config.secret, (err,decode) => {

        if(err) res.status(401).send({auth:false, message: 'Invalid token'});
        User.findById(decode.id, {password:0}, (err, user) => {
        if (err) return res.status(500).send('Problem while FINDING USER');
        if(!user) res.status(500).send('No user found')
        res.send(user)
        })
    })

})

module.exports = router;


///************************************ */


