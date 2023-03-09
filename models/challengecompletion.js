const db = require('./conn').db
const mongoose = require('./conn').mongoose

const challengeCompletionSchema = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true
  },
 points: {
    type: Number,
    default: 0
  }
};

const ChallengeCompletion = mongoose.model('ChallengeCompletion', challengeCompletionSchema);

module.exports = ChallengeCompletion;
