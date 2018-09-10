const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose.model('User', new Schema({
    username: String,
    password: {
        hash: String,
        salt: String
    },
    first_name: String,
    last_name: String,
    address: String,
    insurance: String,
    birth_date: String
}));