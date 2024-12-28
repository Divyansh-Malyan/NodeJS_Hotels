//reponsible for connection setup to node js and mongodb 

// Using Node.js `require()`
const mongoose = require('mongoose');

// Using ES6 imports
// import mongoose from 'mongoose';

const mongoURL = 'mongodb://127.0.0.1:27017/hotel' // change the name with your database 

//setup mongodb connection 
// mongoose.connect(mongoURL,{
//  useNewUrlParser:true,
//  useUnifiedTopology:true
// })
mongoose.connect(mongoURL);


//get the default connection 
// mongoose maintains a default connection object representing the mongodb connection

const db = mongoose.connection;

//define event listener for database connection

db.on('connected', () =>{
    console.log('connected to mongoDB server');
});

db.on('error', (err) =>{
    console.log('error while connecting to mongodb server:', err);
});

db.on('disconnected', () =>{
    console.log(' mongodb server disconnected');
});

// export the database connection
module.exports = db;