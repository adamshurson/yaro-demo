const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose.model('Doctor', new Schema({
    practices: [{
        location_slug: String,
        distance: Number,
        lat: Number,
        lon: Number,
        uid: String,
        visit_address: {
            uid: String,
            city: String,
            lat: Number,
            lon: Number,
            state: String,
            state_long: String,
            street: String,
            zip: Number
        }
    }],
    profile: {
        first_name: String,
        last_name: String,
        image_url: String,
        slug: String
    }
}));