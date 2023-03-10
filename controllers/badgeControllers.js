const express = require('express')
const ChallengeCTRL = require('../models/ctf');
const UserCTRl = require('../models/allUsers')
const BadgeCTRL= require('../models/badge')
const courseCTRl = require('../models/courses')


async function updateModulePoints(req, res) {
  console.log(req.body)
  try {
    const userEmail= req.body.userEmail;
    const courseId = req.body.courseId;
    const moduleId = req.body.moduleId;
    const user = await UserCTRl.User.findOne({ email: userEmail });
    console.log(user)

    const courseIndex = user.coursesEnrolled.findIndex(course => course.course.toString() === courseId);
    console.log(courseIndex)
    if (courseIndex === -1) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const modulePoints = user.coursesEnrolled[courseIndex].modulePoints;
    const completedModules = modulePoints.completedModules;
    const moduleIndex = completedModules.findIndex(module => module.toString() === moduleId);
    if (moduleIndex === -1) {
      completedModules.push(moduleId);
      modulePoints.totalPoints += 10;
      await user.save();
      return res.status(200).json({ message: 'Module points updated successfully', data: user });
    } else {
      return res.status(400).json({ message: 'Module already completed' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating module points', error: error.message });
  }
}

async function updateQuizPoints(req, res) {
  try {
    const userEmail= req.body.userEmail;
    const courseId = req.body.courseId;
    const quizId = req.body.quizId;
    const user = await UserCTRl.User.findOne({ email: userEmail });

    const courseIndex = user.coursesEnrolled.findIndex(course => course.course.toString() === courseId);
    if (courseIndex === -1) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const quizPoints = user.coursesEnrolled[courseIndex].quizPoints;
    const completedQuizzes = quizPoints.completedQuizzes;
    const quizIndex = completedQuizzes.findIndex(quiz => quiz.toString() === quizId);
    if (quizIndex === -1) {
      completedQuizzes.push(quizId);
      quizPoints.totalPoints += 20;
      await user.save();
      return res.status(200).json({ message: 'Quiz points updated successfully', data: user });
    } else {
      return res.status(400).json({ message: 'Quiz already completed' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating quiz points', error: error.message });
  }
}

async function updateChallengePoints(req, res) {
  try {
    const userEmail= req.body.userEmail;
    const courseId = req.body.courseId;
    const challengeId = req.body.challengeId;
    const user = await UserCTRl.User.findOne({ email: userEmail });

    const courseIndex = user.coursesEnrolled.findIndex(course => course.course.toString() === courseId);
    if (courseIndex === -1) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const challengePoints = user.coursesEnrolled[courseIndex].challengePoints;
    const completedChallenges = challengePoints.completedChallenges;
    const challengeIndex = completedChallenges.findIndex(challenge => challenge.toString() === challengeId);
    if (challengeIndex === -1) {
      completedChallenges.push(challengeId);
      challengePoints.totalPoints += 30;
      await user.save();
      return res.status(200).json({ message: 'Challenge points updated successfully', data: user });
    } else {
      return res.status(400).json({ message: 'Challenge already completed' });
    }
}catch (error) {
  console.log(error);
  res.status(500).json({ message: 'Error updating challenge points', error: error.message });
}
}


async function awardBadge(req, res){1
    const userEmail = req.body.userEmail;
    console.log(userEmail)

    try {
        // Find the user in the database
        const user = await UserCTRl.User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Add badges to user's earned badges array based on their points
        if (user.points >= 500 && user.points < 800) {
            user.earnedBadges.push({
                name: "Beginner",
                image: req.files.Beginner[0].location
            });
        } else if (user.points >= 800 && user.points < 1000) {
            user.earnedBadges.push({
                name: "Intermediate",
                image: req.files.Intermediate[0].location
            });
        } else if (user.points >= 1000) {
            user.earnedBadges.push({
                name: "Expert",
                image: req.files.Expert[0].location
            });
        }

        // Save the user's updated profile to the database
        await user.save();
        res.status(500).send(user);
        // res.redirect('/profile');

    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating user profile');
    }
};


module.exports={awardBadge,updateModulePoints,updateQuizPoints,updateChallengePoints}