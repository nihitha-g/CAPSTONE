const mongoose = require('mongoose')
const url = 'mongodb+srv://venkatesh_967:venky@cluster0.mnt4wfj.mongodb.net/capstoneLMS'

mongoose.connect(url,  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
mongoose.Promise = global.Promise
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
module.exports = {db, mongoose}
