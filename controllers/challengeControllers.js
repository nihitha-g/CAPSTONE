const express = require('express')
const ChallengeCTRL = require('../models/ctf');
const UserCTRl = require('../models/allUsers')



// Display Challenge create form on GET.
// exports.challenge_create_get = function(req, res) {
//   res.render('challenge_form', { title: 'Create Challenge' });
// };

// Handle Challenge create on POST.

async function createChallenge(req, res) {
  console.log(req.body);

  let courseId = await courseCTRL.Course.findOne({courseTitle: "python"}, {_id: 1});
  console.log("Course Id:", courseId);

  let challenge = new ChallengeCTRL.Challenge({
    category: [courseId],
    title: req.body.title,
    description: req.body.description,
    flag: req.body.flag,
    points: req.body.points,
    hint: req.body.hint
  });

  challenge.save((err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error creating challenge');
    } else {
      console.log(result);
      res.status(200).send('Challenge created');
    }
  });
};


function getChallenge(req,res){
    ChallengeCTRL.Challenge.find({},(err,docs) =>{
        if(err){
            console.log(err)
        }else{
            res.send(docs)
        }
    })
}
// function getCourseController(req,res){
//     var Course_Name = req.params.Course_Name;
//     CourseCTRl.CourseModel.find({Course_Name:Course_Name},(err,docs) =>{
//         if(err){
//             console.log(err)
//         }else{
//             res.send(docs)
//         }
//     })
// }

function getChallenge1(req,res){

    var title=req.params.title
    ChallengeCTRL.Challenge.find({title:title},(err,docs) =>{
        if(err){
            console.log(err)
        }else{
            res.send(docs)
        }
    })
}

async function submitFlag(req, res) {
  const title = req.body.title;
  const flag = req.body.flag;
  const userEmail = req.body.userEmail;

  try {
    // Find the challenge with the given title
    const challenge = await ChallengeCTRL.Challenge.findOne({ title: title });

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found.' });
    }

    // Check if the submitted flag is correct
    if (challenge.flag === flag) {
      // Look up the user by email
      const user = await UserCTRl.User.findOne({ email: userEmail });

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Add the user's ID to the solvedBy array
      challenge.solvedBy.push(user._id);
      await challenge.save();
      console.log(user.points)
      console.log(challenge.points)
      user.points += challenge.points;
      
      await user.save();
      // Return success response
      return res.status(200).json({ message: 'Flag submitted successfully!' });
    } else {
      // Return error response
      return res.status(400).json({ message: 'Incorrect flag. Please try again.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
}

  

module.exports = { createChallenge,getChallenge ,getChallenge1,submitFlag};


