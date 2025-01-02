const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const Passport = require('./Auth');


//Body Parcer: Body-parser is used to extract information from HTTP requests, especially when the information is contained in the body of the request. This is useful for handling data submitted through HTML forms, JSON data, and other formats.
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;


//Middleware function

const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to ${req.originalURL}`); //new Date().toLocalString(), req.originalURL
  next(); // Move to next phase 
}
app.use(logRequest);


app.use(Passport.initialize());

const LocalAuthMiddleWear = Passport.authenticate('local', {session:false});
app.get('/',LocalAuthMiddleWear,  (req, res) => {
  res.send("Welcome to our Hotel ")
})



//--------------------------------------------------------------
//importing the router files
//person router
const PersonRouter = require('./Routes/PersonRoutes');
app.use('/person',LocalAuthMiddleWear, PersonRouter);

//Menu Router
const MenuRouter = require('./Routes/MenuRoutes');

// const passport = require('passport');
app.use('/Menu',LocalAuthMiddleWear, MenuRouter);
//-------------------------------------------------------------

app.listen(PORT);