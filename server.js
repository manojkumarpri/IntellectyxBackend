const express = require('express');
var cors = require('cors')
var mongo = require('mongodb');
const bodyParser = require('body-parser');

// create express app
const app = express();
app.use(cors());

var port =process.env.PORT || 3001;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


var options = {
  "server": {
   "socketOptions": {
    "keepAlive": 300000, 
    "connectTimeoutMS": 30000 
		} 
	},
  "replset": { 
  	"socketOptions": { 
  		"keepAlive": 300000, 
  		"connectTimeoutMS": 30000 
		} 
	}
}
// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://manoj:manoj11@ds223738.mlab.com:23738/customer';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Connecting to the database
// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log("Successfully connected to the database");    
// }).catch(err => {
//     console.log('Could not connect to the database. Exiting now...');
//     process.exit();
// });


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to customer  application. Organize and keep track of all your customerss."});
});

//For specifying routes 
require('./app/routes/customer.routes.js')(app);

// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port "+port);
});
