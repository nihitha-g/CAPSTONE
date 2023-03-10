const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
app.use(express.json())
app.use(cors())
const path = require('path')
mongoose.set('strictQuery', false);
app.use(express.static(path.join(__dirname,'views')))

const compilerRoutes = require('./routes/compiler')

//routes
const InstructorRoutes = require('./routes/Instuctor')
const admin_instruct_info = require('./routes/admin_ins')
// const CoursesRoutes = require('./routes/Courses')
const userRoutes = require('./routes/userRoutes')
const userProfileRoutes = require('./routes/user_profile')
const enrollRoutes = require('./routes/enroll')
const InstructorRoutesReg = require('./routes/ins_login')
const queriesroutes = require('./routes/queriesroute')

//routes
const allUsersRoutes = require("./routes/allUserRoutes")
const courseRoutes = require("./routes/courseRoutes")
const quizRoutes = require('./routes/quizRoutes')
const challengeRoutes = require('./routes/ctfRoutes')
const badgeRoutes=require('./routes/badgeRoutes')
const liveRoutes=require('./routes/liveRoutes')

//instructors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use('/a',allUsersRoutes)
//compiler 
app.use('/Addchallenge',challengeRoutes)
app.use('/badge',badgeRoutes)
app.use('/live',liveRoutes)

app.use('/',compilerRoutes)
//instructors
app.use('/AddInstructor',InstructorRoutes)
app.use('/getInstructors',admin_instruct_info)
app.use('/getInstructorInfo',admin_instruct_info)
app.use('/Instructor',InstructorRoutesReg)
app.use('/get_instructors_data',InstructorRoutes)

//instructor new
app.use('/instructor',InstructorRoutes)


app.use('/courseDetails',courseRoutes)

app.use('/course',courseRoutes)
app.use('/getproblems',courseRoutes)


app.use('/getusercount',userRoutes)
app.use('/approveOrDecline',admin_instruct_info)
app.use('/registerUser', userRoutes)
app.use('/LogOutUser', userRoutes)
app.use('/get_users_data',userRoutes)


//user profile routes
app.use('/userProfile', allUsersRoutes)

//enroll
app.use('/enroll',enrollRoutes)
app.use('/getUserDetails',enrollRoutes)
//queries
app.use('/get_queries_data',queriesroutes)
app.use('/getnoofqueries',queriesroutes)
app.use('/query',queriesroutes)


app.use('/',courseRoutes)

app.use('/quiz',quizRoutes)
//quiz
// app.use('/get_quiz_questions',CoursesRoutes)
/


app.listen(9999)
