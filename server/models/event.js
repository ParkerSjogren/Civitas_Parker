require('./db')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address1: String,
  address2: String,
  city: String,
  province: String,
  start: Date,
  end: Date,
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community"
  },
  fee: Number,
  contactNumber:[
    {
      name: String,
      phoneNumber: String
    },
  ],
  active: Boolean,
  dateAdded: Date,
  lastUpdateDate: Date
});

module.exports = mongoose.model('Event', eventSchema, 'event');
