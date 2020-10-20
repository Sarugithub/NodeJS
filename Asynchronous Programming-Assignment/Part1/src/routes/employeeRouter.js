var express = require('express');
var employeeRouter = express.Router();
var fs = require ('fs');
var fetch = require('node-fetch');

let lodash = require('lodash');

var emp = [
    {
        "EmpId" : "9080",
        "Name" : "Riya",
        "Age" :  "25",
        "Company Name" : "Atos",
        "Contact Number" : "+91 267267627",
        "Job Title" : "Tester",
        "Address" : "abc 123",
        "ProjectId" : "101"
    
    },

    {
        "EmpId" : "9181",
        "Name" : "Rahul",
        "Age" :  "29",
        "Company Name" : "Capgemini",
        "Contact Number" : "+91 6565565665",
        "Job Title" : "Front end Developer",
        "Address" : "vbf road 456",
        "ProjectId" : "102"

    },
    {
        "EmpId" : "9282",
        "Name" : "Deepti",
        "Age" :  "34",
        "Company Name" : "Cogniazant",
        "Contact Number" : "+91 623623627",
        "Job Title" : "QA Analyst",
        "Address" : "ghghg 7767",
        "ProjectId" : "103"

    }

]


employeeRouter.route('/')
    .get(function(req, res){
       // fs.readFile('empinfo.json', 'utf-8', function(err, data){
         //   if (err) throw err;
           // res.send(data);

            res.render('empDisplay', {title: 'Employee Display Page', emp:emp })
        });



        employeeRouter.route('/details/:id')
        .get(function(req, res){
            var id = req.params.id;
            var x= lodash.filter(emp, {"EmpId":id})
            res.render('empDetailsDisplay', {title:'Employee Display Page', x:x })

        });

       
       
        employeeRouter.route('/employee/getemployeefulldetail')
             .get(function(req, res){

                fetch('empinfo.json')
                .then((res) => res.json())
                .then((data) => {

                    let output = '<h2> Users </h2>';
                    console.log(data);

                })
        })
    

    
            module.exports = employeeRouter;