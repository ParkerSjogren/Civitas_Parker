require('./db')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  firstName: String,
  lastName: String,
  address1: String,
  address2: String,
  province: String,
  city: String,
  postalCode: String,
  contactNumber:[
    {
      name: String,
      phoneNumber: String
    },
  ],
  emailAddress:{
    type: String,
    required: true,
    unique: true,
    // trim:true
  },
  communityDetail :[{
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community"
    },
    userLevel:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "userLevel" 
    },
    renewalDate: Date,
    membershipPaidDate: Date,
    memberSince: Date,
    active: Boolean
  },],
  username:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    unique: true
  },
  active: Boolean,
  dateAdded: Date,
  lastUpdateDate: Date
});

module.exports = mongoose.model('Member', memberSchema, 'member');