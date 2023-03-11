const db = require('./conn').db
const mongoose = require('./conn').mongoose


const courseSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true
  },
  courseUrl:{
    type:String,
    required: true
  },
  courseDescription:{
    type:String,
    required: true
  },
  courseVideo:{
    type:String,
    required: true
  },
  courseImage:{
    type:String,
    required: true
  },  
  
  Instrutor_Email:{
    type: String
  },

  courseShortDescription: {
    type: String,
    required: true
  },
  sections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section'
    }
  ],
  

  Students_Enrolled:{
    type:[]
  }

});


const Course = mongoose.model('Course_A', courseSchema,'Course_A');

module.exports = {Course};
