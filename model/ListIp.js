const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listIpSchema = new Schema({
    ip: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('ListIp', listIpSchema);