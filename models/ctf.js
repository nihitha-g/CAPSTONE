
const db = require('./conn').db
const mongoose = require('./conn').mongoose





const ChallengeSchema = {
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['Web', 'Reverse Engineering', 'Crypto', 'Forensics', 'Misc'] },
  points: { type: Number, required: true, min: 0 },
  flag: { type: String, required: true },
  hint: { type: String },
  solvedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
};

// Virtual for challenge's URL


// Export model
let Challenge = mongoose.model('Challenge', ChallengeSchema,'Challenge')
module.exports = {Challenge}

