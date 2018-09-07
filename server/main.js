var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./models/user');

var port = 8080;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(morgan('dev'));

app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});
app.get('/setup', function(req, res) {
    const adam = new User({
        name: 'Adam Shurson',
        password: 'password'
    });
    adam.save(function(err) {
        if (err) throw err;
        console.log('User saved successfully');
        res.json({ success: true });
    });
});
// var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
// // decode token
// if (token) {
//
//     // verifies secret and checks exp
//     jwt.verify(token, app.get('superSecret'), function(err, decoded) {
//         if (err) {
//             return res.json({ success: false, message: 'Failed to authenticate token.' });
//         } else {
//             // if everything is good, save to request for use in other routes
//             req.decoded = decoded;
//             next();
//         }
//     });
//
// }
app.post('/authenticate', function(req, res) {

    // find the user
    User.findOne({
        name: req.body.name
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                    admin: user.admin
                };
                var token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn: 1440
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
});
app.listen(port);
console.log('Magic happens at http://localhost:' + port);