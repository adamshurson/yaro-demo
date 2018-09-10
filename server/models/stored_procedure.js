const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose.model('StoredProcedure', new Schema({
    name: String,
    description: String,
    default_cost: Number
}));