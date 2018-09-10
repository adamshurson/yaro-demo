// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');
const port = 5000;

// require routes
const route_auth = require('./routes/auth');
const route_stored_procedures = require('./routes/stored_procedure');
const route_doctors = require('./routes/doctors');
const route_visits = require('./routes/visits');

// connect to db
mongoose.connect(config.database);

// use body parser and allow CORS
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// use debugging
app.use(morgan('dev'));
app.use(cors());

// map urls to route handlers
app.use('/auth', route_auth);
app.use('/stored_procedures', route_stored_procedures);
app.use('/doctors', route_doctors);
app.use('/visits', route_visits);

// start app
app.listen(port);
console.log('Server running on port:' + port);