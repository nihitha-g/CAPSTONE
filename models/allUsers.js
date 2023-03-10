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
    addSummary:{
        type:String
    },
    Resume:{
        type:String
    },
    Status:{
        type: String,
    },
    earnedBadges: [{
        name: {
          type: String,
<<<<<<< HEAD
=======
        },
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Course',
>>>>>>> a623e5b7bb18a3337a11dec0a586ecc118671099
        },
        course:[{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Course'

          

        }],

        image: {
          type: String,
        }
      }],
}

let User = mongoose.model('ALL_USERS', user,'ALL_USERS')
module.exports = {User}