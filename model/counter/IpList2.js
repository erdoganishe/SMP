const mongoose = require('mongoose');

const ipList2Schema = new mongoose.Schema({
  ip: String,
  count: Number
});
  
module.exports = mongoose.model('IpList2', ipList2Schema);