const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookingSlots: [
    {
      date: {
        type: Date,
        required: true
      },
      time: {
        type: String,
        required: true
      }
    }
  ],
  bookingType: {
    type: String,
    enum: ['Single Session', 'Multiple Sessions'],
    default: 'Single Session'
  }
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;