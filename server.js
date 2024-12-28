const express = require('express');
const app = express();
const db = require('./db');

//Body Parcer: Body-parser is used to extract information from HTTP requests, especially when the information is contained in the body of the request. This is useful for handling data submitted through HTML forms, JSON data, and other formats.
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Model schema requiring


//--------------------------------------------------------------
//importing the router files
//person router
const PersonRouter = require('./Routes/PersonRoutes');
app.use('/person', PersonRouter);

//Menu Router
const MenuRouter = require('./Routes/MenuRoutes');
app.use('/Menu', MenuRouter);
//-------------------------------------------------------------

app.get('/', function (req, res) {
  res.send('Hello World')
})





app.listen(3000);