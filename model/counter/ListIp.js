const mongoose = require('mongoose');

const listIpSchema = new mongoose.Schema({
    ip: String,
    date: String
});

module.exports = mongoose.model('ListIp', listIpSchema);