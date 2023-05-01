const mongoose = require('mongoose');

const statisticSchema = new mongoose.Schema({
  hosts: Number,
  hits: Number,
  total: Number,
  date: String
});
  
module.exports = mongoose.model('Statistic', statisticSchema);