const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Food', foodSchema);