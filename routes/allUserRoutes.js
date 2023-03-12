const express = require('express')
const routes = express.Router()

const userDetail = require('../controllers/allUsersControllers')
const upload = require('../middleware/upload')


routes.post('/courseComplete',userDetail.courseCompletion)
routes.post('/',upload.single('imgFile'),userDetail.addUser)
routes.get('/',userDetail.instructorInfo)
routes.post('/login',userDetail.authUser)
// routes.post('/instructorUpdate',userDetail.studentToUserStep1)
routes.post('/instructorUpdate',upload.single('file'),userDetail.studentToUserStep1)
routes.post('/acceptOrReject',userDetail.acceptInstructor)
routes.post('/status',userDetail.getinstructorInfo)
routes.get('/:email',userDetail.userProfileDetails)
routes.post('/:userEmail',userDetail.getUserEnrolledCourses)
routes.get('/get/:Instrutor_Email',userDetail.getCoursesByInstructorEmail)
// routes.get('/leaderboard',userDetail.getUsersWithChallengePoints)
routes.get('/lb',userDetail.getUsersWithChallengePoints)
module.exports = routes