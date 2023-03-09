
const db = require('./conn').db
const mongoose = require('./conn').mongoose

const problem= {
    problemStatement:{
        type:String
    },
    constraints:{
        type: String
    },
    inputFormat:{
        type:String
    },
    outputFormat:{
        type:String
    },
    explanation:{
        type:String
    },
    sampleOutputs:{
        type:String
    },
    sampleInputs:{
        type:String
    }

}
const problems = mongoose.model('problems',problem)
module.exports = {problems}
