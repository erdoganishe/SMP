const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statisticSchema = new Schema({
    hosts: Number,
    hits: Number,
    total: Number,
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Statistic', statisticSchema);