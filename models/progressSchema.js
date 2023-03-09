const db = require('./conn').db
const mongoose = require('./conn').mongoose

const progressSchema={
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  modulePoints: {
    completedModules: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section'
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
};

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
