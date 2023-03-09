const db = require('./conn').db
const mongoose = require('./conn').mongoose

const badgeSchema = {
    name: {
      type: String,
      required: true
    },
    threshold: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  };
  

  const Badge = mongoose.model('Badge', badgeSchema);
  
  module.exports = {  Badge };