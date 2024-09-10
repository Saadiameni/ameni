const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
   backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  borderBottomColor: {
    type: String,
    default: '#000000'
  },
  iconColor: {
    type: String,
    default: '#09ff90'
  },
  textColor: {
    type: String,
    default: '#000000'
  },

}, { timestamps: true });

module.exports = mongoose.model('Config', configSchema);
