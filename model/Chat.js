const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    msg: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Chat', chatSchema);