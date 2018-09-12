const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose.model('Visit', new Schema({
    procedures: [{
        name: String,
        description: String,
        cost: Number
    }],
    doctor: {
        type: mongoose.Schema.ObjectId,
        ref: 'Doctor'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    date: String,
    location: {
        city: String,
        lat: Number,
        lon: Number,
        state: String,
        state_long: String,
        street: String,
        zip: Number
    }
}));