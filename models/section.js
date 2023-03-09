const db = require('./conn').db

const mongoose = require('./conn').mongoose


const sectionSchema = new mongoose.Schema({
    sectionName: {
      type: String,
      required: true
    },
    moduleList: [
      {
        module_name: {
          type: String,
          required: true
        },
        youtube_link: {
          type: String,
          required: true
        },
        quiz: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz'
          }],
      }
    ]
  });
  
const Section = mongoose.model('Section', sectionSchema, 'Section');

module.exports = {Section}