const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose.model('Message', new Schema({
    doctor: {
        type: mongoose.Schema.ObjectId,
        ref: 'Doctor'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    senderType: String,
    date: String,
    content: String
}));