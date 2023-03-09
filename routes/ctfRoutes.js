const express = require('express');
const routes = express.Router();

const challenge_controller = require('../controllers/challengeControllers');

// GET request for creating a new Challenge. NOTE This must come before routes that display Challenge (uses id).
// routes.get('/create', challenge_controller.challenge_create_get);

// POST request for creating Challenge.
routes.get('/get', challenge_controller.getChallenge);
routes.get('/:title', challenge_controller.getChallenge1);
routes.post('/create', challenge_controller.createChallenge);
routes.post('/solvedby',challenge_controller.submitFlag)
module.exports = routes
