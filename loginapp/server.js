const app = require('./app');
const express = require ('express');

const port = 6700;


app.listen(port, () => {

console.log (`Server is running on port ${port}`)

})

