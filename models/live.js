
const db = require('./conn').db
const mongoose = require('./conn').mongoose

const LiveSchema = {
    link: {
      type: String,
      required: true
    },
  
    course_name:      {
        type: String,
        required: true
      },
    instrutor_email:{
      type: String
    },
   
  };
  
  let Live = mongoose.model('Live', LiveSchema,'Live')
module.exports = {Live}