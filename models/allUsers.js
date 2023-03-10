const db = require('./conn').db
const mongoose = require('./conn').mongoose

const user = {
    userName:{
        type:String,
    },
    imgFile:{
        type:String
    },
    password: {
        type:String,
    },
    coursesEnrolled: [{
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Course',
          required: true
        },
        modulePoints: {
          completedModules: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Module'
          }],
          totalPoints: {
            type: Number,
            default: 0
          }
        },
        quizPoints: {
          completedQuizzes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz'
          }],
          totalPoints: {
            type: Number,
            default: 0
          }
        },
        challengePoints: {
          completedChallenges: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Challenge'
          }],
          totalPoints: {
            type: Number,
            default: 0
          }
        }
      }],
    email:{
        type:String
    },
    phone:{
        type:String
    },
    address:{
        type:String
    },
    role:{
        type:String
    },
    isInstructor:{
        type:String
    },
    Message:{
        type:String
    },
    File:{
        type:String
    },
    Linked:{
        type:String
    },
    Status:{
        type: String,
    },
    earnedBadges: [{
        name: {
          type: String,
          required: true
        },
        image: {
          type: String,
          required: true
        }
      }],
}

let User = mongoose.model('ALL_USERS', user,'ALL_USERS')
module.exports = {User}