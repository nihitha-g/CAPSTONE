const db = require('./conn').db
const mongoose = require('./conn').mongoose



const liveSchema = {
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  link: {
    type: String,
    required: true
  }
};

const Live= mongoose.model('Live', liveSchema);

module.exports = {Live}
