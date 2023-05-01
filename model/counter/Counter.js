const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
    ip: { type: String, required: true },
    date: { type: String, required: true }
  });
  
module.exports = mongoose.model('Counter', CounterSchema);