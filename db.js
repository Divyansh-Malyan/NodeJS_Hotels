//reponsible for connection setup to node js and mongodb 

// Using Node.js `require()`
const mongoose = require('mongoose');
require('dotenv').config();

// Using ES6 imports
// import mongoose from 'mongoose';

//const mongoURL = process.env.MONGODBURLLOCAL // change the name with your database 
const MongoURL =process.env.MONGODBURL;

    //setup mongodb connection 
    // mongoose.connect(mongoURL,{
    //  useNewUrlParser:true,
    //  useUnifiedTopology:true
    // })
    mongoose.connect(MongoURL);


//get the default connection 
// mongoose maintains a default connection object representing the mongodb connection

const db = mongoose.connection;

//define event listener for database connection

db.on('connected', () => {
    console.log('connected to mongoDB server');
});

db.on('error', (err) => {
    console.log('error while connecting to mongodb server:', err);
});

db.on('disconnected', () => {
    console.log(' mongodb server disconnected');
});

// export the database connection
module.exports = db;