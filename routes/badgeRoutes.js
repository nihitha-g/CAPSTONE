const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeControllers');
const upload = require('../middleware/upload');

// router.post('/users/:userId/points', userController.addPoints);
// router.get('/users/:userId', userController.getUser);
router.post('/addBadges',upload.fields([{ name: 'Beginner',maxCount:1},{ name:'Intermediate',maxCount:1},{ name:'Expert',maxCount:1}]),badgeController.awardBadge);
router.post('/addmp',badgeController.updateModulePoints)
router.post('/addqp',badgeController.updateQuizPoints)
router.post('/addcp',badgeController.updateChallengePoints)
router.post('/getBadges',badgeController.getBadges)
router.post('/getBadges/:userEmail',badgeController.getUserBadges)

// router.get('/getBadges',badgeController.getBadge)//

module.exports = router;
