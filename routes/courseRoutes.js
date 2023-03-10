const express = require('express')
const routes = express.Router()

const courseRoute = require('../controllers/courseControllers')
const moduleRoute = require('../controllers/sectionControllers')
const upload = require('../middleware/upload')

//new course
routes.post('/Curriculum',courseRoute.addCurriculum)
//problem

routes.post('/problems',courseRoute.problemcontent)
routes.get('/getProblem/:questionid',courseRoute.getProblem)


routes.post('/savecourse',upload.fields([{ name: 'courseImage',maxCount:1},{ name:'courseVideo',maxCount:1}]),courseRoute.addCourse)
routes.post('/:course_name',moduleRoute.getSection)
routes.get('/course/:Instrutor_Email',moduleRoute.getInsCourse)
routes.get('/gc',courseRoute.getCourse)
routes.get('/gc1/:courseTitle',courseRoute.getCourse)

// routes.post('/getcourse',moduleRoute.getcourse)

module.exports = routes 