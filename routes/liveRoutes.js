const express = require('express');
const routes = express.Router()

const liveDetails = require('../controllers/liveController')
routes.post('/', liveDetails.addZoomLink)
routes.get('/getLive',liveDetails.getZoomLink)

module.exports = routes