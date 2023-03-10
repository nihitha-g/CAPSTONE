const express = require('express');
const routes = express.Router()

const InstructorDetail = require('../controllers/Instructor');
const upload = require('../middleware/upload');

routes.post('/', InstructorDetail.InstructorRegistrationController)
routes.get('/get_instructor',InstructorDetail.instructordata)

//new
routes.post('/request',upload.single('resume'),InstructorDetail.becomeInstructor)


module.exports = routes
