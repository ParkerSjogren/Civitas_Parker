require('./db')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventRegistrationSchema = new Schema({
  firstName: String,
  lastName: String,
  address1: String,
  address2: String,
  city: String,
  province: String,
  postalCode: String,
  contactNumber:[
    {
      name: String,
      phoneNumber: String
    },
  ],
  emailAddress: String,
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  numberOfAttendees: Number,
  feePaid: Boolean,
  active: Boolean,
  dateAdded: Date,
  lastUpdateDate: Date
});

module.exports = mongoose.model('EventRegistration', eventRegistrationSchema, 'eventRegistration');