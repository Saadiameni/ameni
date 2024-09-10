const mongoose = require('mongoose');
const signatureSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  configId: { type: mongoose.Schema.Types.ObjectId, ref: 'Config' },
  template_id: {
    type: Number
  },
  address: {
    type: String,
    required: true
  },

  company: {
    type: String,

  },  
  email: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
  },

  linkedin: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  objet: {
    type: String,
    default: 'Cordialement,'
  },
  phone: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  skype: {
    type: String
  },
  twitter: {
    type: String
  },
  github: {
    type: String
  },
  twitter: {
    type: String
  },
  website: {
    type: String
  }
});

module.exports = mongoose.model('Signature', signatureSchema);
