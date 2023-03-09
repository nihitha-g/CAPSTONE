const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeControllers');

// router.post('/users/:userId/points', userController.addPoints);
// router.get('/users/:userId', userController.getUser);
router.post('/addBadges', badgeController.awardBadge);
router.post('/addmp',badgeController.updateModulePoints)
router.post('/addqp',badgeController.updateQuizPoints)
router.post('/addcp',badgeController.updateChallengePoints)
// router.get('/getBadges',badgeController.getBadge)//

module.exports = router;
