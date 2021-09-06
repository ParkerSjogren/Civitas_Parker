require('./db')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const communitySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  address1: String,
  address2: String,
  city: String,
  province: String,
  postalCode: String,
  contactNumber: [{
    name: String,
    phoneNumber: String
  },],
  contactPerson: [{
    firstName: String,
    lastName: String
  },],
  emailAddress: String,
  membershipFee: Number,
  GST: Number,
  PST: Number,
  HST: Number,
  membershipStartPeriod: Date,    
  active: Boolean,
  dateAdded: Date,
  lastUpdateDate: Date
});

module.exports = mongoose.model('Community', communitySchema, 'community');