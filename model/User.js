const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        require: true
    },
    profile : {
        real_name: String
    },
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);