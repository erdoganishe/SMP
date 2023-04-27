const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ipList2Schema = new Schema({
    ip: {
        type: String,
        require: true
    },
    count: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('IpList2', ipList2Schema);