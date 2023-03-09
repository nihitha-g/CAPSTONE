const db = require('./conn').db

const mongoose = require('./conn').mongoose


const sectionSchema = new mongoose.Schema({
    sectionName: {
      type: String,
      required: true
    },
    moduleList: [
      {
        moduleName: {
          type: String,
          required: true
        },
        videoLink: {
          type: String,
          required: true
        },
        moduleDescription: {
          type:String
        },
        questions:{
          type:String
        },
        optionA:{
          type:String
        },
        optionB:{
          type:String
        },
        optionC:{
          type:String

        },
        optionD:{
          type:String

        },
        correctOption:{
          type:String

        }
      }
    ]
  });
  
const Section = mongoose.model('Section', sectionSchema, 'Section');

module.exports = {Section}