const express = require('express')
const ChallengeCTRL = require('../models/ctf');
const UserCTRl = require('../models/allUsers')
const BadgeCTRL = require('../models/badge')
const courseCTRl = require('../models/courses')


async function updateModulePoints(req, res) {
  console.log(req.body)
  try {
    const userEmail = req.body.userEmail;
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
    const userEmail = req.body.userEmail;
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
    const userEmail = req.body.userEmail;
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating challenge points', error: error.message });
  }
}


// async function awardBadge(req, res){
//     const userEmail = req.body.userEmail;
//     console.log(userEmail)

//     try {
//         // Find the user in the database
//         const user = await UserCTRl.User.findOne({ email: userEmail },);

//         if (!user) {
//             return res.status(404).send('User not found');
//         }
//         const points =
//         // Add badges to user's earned badges array based on their points
//         if (user.points >= 50 && user.points < 80) {
//             user.earnedBadges.push({
//                 name: "Beginner",
//                 image: req.files.Beginner[0].location
//             });
//         } else if (user.points >= 80 && user.points < 100) {
//             user.earnedBadges.push({
//                 name: "Intermediate",
//                 image: req.files.Intermediate[0].location
//             });
//         } else if (user.points >= 100) {
//             user.earnedBadges.push({
//                 name: "Expert",
//                 image: req.files.Expert[0].location
//             });
//         }
//         // Save the user's updated profile to the database
//         await user.save();
//         res.status(500).send(user);
//         // res.redirect('/profile');

//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error updating user profile');
//     }
// };

async function awardBadge(req, res) {
  const userEmail = req.body.userEmail;

  try {
    // Find the user in the database
    const user = await UserCTRl.User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const coursePoints = {};

    // Calculate total points for each course the user is enrolled in
    for (const course of user.coursesEnrolled) {
      const courseId = course.course;

      const modulePoints = course.modulePoints.totalPoints;
      const quizPoints = course.quizPoints.totalPoints;
      const challengePoints = course.challengePoints.totalPoints;

      const totalPoints = modulePoints + quizPoints + challengePoints;

      if (courseId in coursePoints) {
        coursePoints[courseId] += totalPoints;
      } else {
        coursePoints[courseId] = totalPoints;
      }
    }

    for (const courseId in coursePoints) {
      const totalPoints = coursePoints[courseId];

      // Add badges to user's earned badges array based on their points
     // Add badges to user's earned badges array based on their points
if (totalPoints >= 50 && totalPoints < 80) {
  // Check if user already has the badge for the course
  const badgeExists = user.earnedBadges.some(
    (badge) => badge.name === 'Beginner' && badge.course.includes(courseId)
  );
  console.log(badgeExists)
  if (!badgeExists) {
    user.earnedBadges.push({
      name: 'Beginner',
      course: [courseId],
      image:
        'https://www.shutterstock.com/image-vector/beginner-3d-gold-badge-red-260nw-327339653.jpg',
    });
  }
} else if (totalPoints >= 80 && totalPoints < 100) {
  // Check if user already has the badge for the course
  const badgeExists = user.earnedBadges.some(
    (badge) => badge.name === 'Intermediate' && badge.course.includes(courseId)
  );
  if (!badgeExists) {
    user.earnedBadges.push({
      name: 'Intermediate',
      course: [courseId],
      image: 'https://www.ticklinks.com/Login/images/Silver.png',
    });
  }
} else if (totalPoints >= 100) {
  // Check if user already has the badge for the course
  const badgeExists = user.earnedBadges.some(
    (badge) => badge.name === 'Expert' && badge.course.includes(courseId)
  );
  if (!badgeExists) {
    user.earnedBadges.push({
      name: 'Expert',
      course: [courseId],
      image:
        'https://www.shutterstock.com/image-vector/excellence-3d-gold-badge-red-260nw-313985456.jpg',
    });
  }
}

    }

<<<<<<< HEAD
    // Save the user's updated profile to the database
    await user.save();
    res.status(200).json(user);

  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating user profile');
  }
}

// async function awardBadge(req, res) {
//   const userEmail = req.body.userEmail;

//   try {
//     // Find the user in the database
//     const user = await UserCTRl.User.findOne({ email: userEmail });

//     if (!user) {
//       return res.status(404).send('User not found');
//     }

//     const coursePoints = {};

//     // Calculate total points for each course the user is enrolled in
//     for (const course of user.coursesEnrolled) {
//       const courseId = course.course;

//       const modulePoints = course.modulePoints.totalPoints;
//       const quizPoints = course.quizPoints.totalPoints;
//       const challengePoints = course.challengePoints.totalPoints;

//       const totalPoints = modulePoints + quizPoints + challengePoints;
//        console.log(coursePoints)
//       if (courseId in coursePoints) {
//         coursePoints[courseId] += totalPoints;
//       } else {
//         coursePoints[courseId] = totalPoints;
//       }
//     }

//     console.log(coursePoints)
//      const courseId = Object.keys(coursePoints)[0]; // '6409d3f1dfc1433d5bda5b68'
//      const totalPoints = coursePoints[courseId]; // 60

//     // Add badges to user's earned badges array based on their points
//     if (totalPoints >= 50 && totalPoints < 80) {
//       user.earnedBadges.push({
//         name: "Beginner",
//         course: courseId,
//         image: "https://www.shutterstock.com/image-vector/beginner-3d-gold-badge-red-260nw-327339653.jpg"
//       });
//     } else if (coursePoints['courseId1'] >= 80 && coursePoints['courseId1'] < 100) {
//       user.earnedBadges.push({
//         name: "Intermediate",
//         course: courseId,
//         image: "https://www.ticklinks.com/Login/images/Silver.png"
//       });
//     } else if (coursePoints['courseId1'] >= 100) {
//       user.earnedBadges.push({
//         name: "Expert",
//         course: courseId,
//         image: "https://www.shutterstock.com/image-vector/excellence-3d-gold-badge-red-260nw-313985456.jpg"
//       });
//     }
//     console.log(user)

//     // Save the user's updated profile to the database
//     await user.save();
//     res.status(200).json(user);

//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error updating user profile');
//   }
// }


async function getUserBadges(req, res) {
  const userEmail = req.params.userEmail;

  try {
    // Find the user in the database
    const user = await UserCTRl.User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const badges = [];

    for (const badge of user.earnedBadges) {
      // Find the course name for the badge using the course ID
      const courseId = badge.course.toString();
      const course = await courseCTRl.Course.findById(courseId);

      if (!course) {
        continue;
      }

      const courseName = course.courseTitle;

      badges.push({
        name: badge.name,
        image: badge.image,
        courseId: courseId,
        courseName: courseName,
      });
=======
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
>>>>>>> a623e5b7bb18a3337a11dec0a586ecc118671099
    }

    res.status(200).json(badges);

  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving user badges');
  }
}





async function getBadges(req, res) {
  const userEmail = req.body.email;

  try {
    // Find the user in the database
    const user = await UserCTRl.User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Return the user's earned badges
    res.send(user.earnedBadges);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving user badges');
  }
}



module.exports = { awardBadge,getUserBadges, getBadges, updateModulePoints, updateQuizPoints, updateChallengePoints }