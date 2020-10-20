const express = require('express');
const app = express();
const port = 2600;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const mongourl= "mongodb://localhost:27017";
let db;
let col_name = "newtb";


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())



// Create (Post Call)
app.post('/addUser', (req,res) => {
    var id = Math.floor(Math.random()*10000)
    var data = {
        id:id,
        name:req.body.name,
        age:req.body.age,
        occup:req.body.occup,
        phone:req.body.phone,
        active:"true" 
    }
    db.collection(col_name).insert(data, (err, result) => {
        if (err)
        {
            res.status(401).send('Error in inserting')
        }
        else
        {
            res.send('Data Added')
        }
    }) 

})

// Update (PUT Call)

app.put('/updateUser', (req, res) => {
    db.collection(col_name).findOneAndUpdate({'id':req.body.id},{
            $set:{
                    id:req.body.id,
                    name:req.body.name,
                    age:req.body.age,
                    occup:req.body.occup,
                    phone:req.body.phone,
                    active:req.body.active
            }, 
    }, (err, result) => {
        if (err) {
            res.status(401).send('Error in updating')
        }
        else
        {
            res.send("Data Updated")
        }
                
    })
}) 

// Soft Delete (PUT Call)

app.put('/softDelete', (req, res) => {
    db.collection(col_name).findOneAndUpdate({'id':req.body.id},{
            $set:{
                    id:req.body.id,
                    name:req.body.name,
                    age:req.body.age,
                    occup:req.body.occup,
                    phone:req.body.phone,
                    active:false,
            }, 
    }, (err, result) => {
        if (err) {
            res.status(401).send('Error in updating')
        }
        else
        {
            res.send("Data Updated")
        }
                
    })
}) 


// Delete

app.delete('/deleteUser', (req, res) => {
    db.collection(col_name).findOneAndDelete({"id" : req.body.id},(err,result) => {
        if (err) {
            res.status(401).send('Error in deleting')
        }
        else
        {
            res.send("Data Deleted")
        }
                
    })

})

// Read (Get Call)

app.get('/user', (req, res) => {

db.collection(col_name).find({"active":"true"}).toArray((err, result) => {
    
    if (err) {
        res.status(401).send('Error in fetching')
    }
    else
    {
        res.send(result)
    }
})
})

MongoClient.connect(mongourl,(err,client) => {
if (err) console.log("Error while connecting");
db = client.db("test");
app.listen(port, (err) => {
console.log(`Server listening to port ${port}`)

})

})

