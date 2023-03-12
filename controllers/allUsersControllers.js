const express = require('express')
const UserCTRl = require('../models/allUsers')
const courseCTRl= require('../models/courses')
const jwt = require('jsonwebtoken')

function addUser(req, res){
    console.log(req.body)
    let addUserData = UserCTRl.User({
        imgFile:req.file.location,
        userName:req.body.userName,
        password:req.body.password,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address,
        role:req.body.role
    })
    console.log(addUserData)   
    addUserData.save((err,result)=>{
        if(err){
            console.log("5000")
            res.send(err)
        }else{
            console.log("1000")
            res.send("User added")
        }
    })
}



function authUser(req, res) {
    UserCTRl.User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: 'Internal server error' });
      } else if (!user) {
        res.status(401).send({ message: 'Invalid email or password' });
      } else if (user.password !== req.body.password) {
        res.status(401).send({ message: 'Invalid email or password' });
      } else {
        // Generate a JWT token with the user ID and email as payload
        const token = jwt.sign({ userId: user._id, email: user.email }, 'capstonelms', { expiresIn: '1h' });
  
        // Send the token and user data as response
        res.status(200).send({ token, user });
      }
    });
  }
  
function instructorInfo(req, res){
    UserCTRl.User.find({},(err,docs) =>{
        if(err){
            console.log(err)
        }else{
            res.send(docs)
    }
})
}

function studentToUserStep1(req, res){
    UserCTRl.User.find({email:req.body.email},(err,docs) =>{
        if(err){
            console.log(err)
        }else{
            console.log(docs)
            // let message = req.body.Message
            // let Files = req.body.File
            // let Linked = req.body.Linked
            // console.log(typeof(req.body.Message))
            console.log(req.body)
            
            UserCTRl.User.updateOne({email:req.body.email},
                {$set:{isInstructor:"pending",Message:req.body.Message,File:req.file.location,Linked:req.body.Linked}},(err,docs) =>{
                if(err){
                    console.log(err)
                }else{
                    res.send(docs)
                }
            })
                // res.send(docs)
            }
        })
}


function getinstructorInfo(req, res){
    UserCTRl.User.findOne({email:req.body.email},(err,docs) =>{
        // console.log(req.body.email.docs)
        // console.log(docs)
        if(err){
            console.log(err)
        }else{
            res.send(docs.isInstructor)
            //res.send(docs.State)

    }
})
}

function acceptInstructor(req, res){
    console.log(req.body)
    if(req.body.task == "Approve"){
        UserCTRl.User.updateOne({_id:req.body._id},{$set:{isInstructor:"Approved"}},(err,docs) =>{
        if(err){
            console.log(err)
        }else{
            console.log("accc")
            res.send(docs)
        }
})
    UserCTRl.User.updateOne({_id:req.body._id}, {$set:{role:"Instructor"}},(err,docs) =>{
        if(err) console.log(err)
        else{
            console.log(docs)
            console.log("ins")
        }
    })
    // UserCTRl.User.updateOne({_id:req.body._id}, {$unset:{coursesEnrolled:""}},(err,docs) =>{
    //     if(err) console.log(err)
    //     else{
    //         console.log(docs)
    //         //res.send(docs)
    //     }
    // })
    }else if(req.body.task ==="Decline"){
        UserCTRl.User.updateOne({_id:req.body._id},{$set:{isInstructor:"Declined"}},(err,docs) =>{
            if(err){
                console.log(err)
            }else{
                console.log(req.body.id)
                res.send(docs)
        }
    })        
    }
}

function courseCompletion(req,res){
    console.log(req.body)
    // course= req.body.course_name
    UserCTRl.User.findOne({email:req.body.email},(err,data) =>{
        if(err){
            res.send("error");
        }
        else{
            // if(data != null){
            //     res.send("already completed the module");
            // }
            // else{
                console.log(data)
                courses = data.coursesEnrolled
                // console.log(courses)
                for(var i=0; i<courses.length; i++){
                    if(courses[i].name === req.body.course_name){
                        console.log(courses[i].name)
                        for(var j=0; j < courses[i].modules.length; j++){
                            if(courses[i].modules[j] === req.body.module){
                                var flag = 1;
                                res.send("Already enrolled")
                                break;
                            }
                        }
                    }
                }
                if(flag != 1){
                for(let i = 0; i < courses.length; i++) {
                    if(courses[i].name === req.body.course_name){
                        console.log(courses[i])
                        courses[i].modules.push(req.body.module)
                        console.log(courses[i])
                        UserCTRl.User.updateOne({email: req.body.email}, {$set:{coursesEnrolled: courses}},(err,docs) =>{
                            if(err){
                                console.log(err)
                            }else{
                                res.send(docs)
                        }
                    })       
                    }
                // }
                // UserCTRl.User.updateOne(
                //     {email:req.body.k,"coursesEnrolled.name":req.body.course_name},
                //     {$push:{"coursesEnrolled.0.modules":req.body.module}},(err,docs) =>{
                //         if(err){
                //             console.log(err)
        
                //         }else{
                //             console.log(docs)
                //         }
                //     }
                // )
            }
        }
            //res.send("not found")
        }
    })
}

function userProfileDetails(req, res){
    UserCTRl.User.find({email:req.params.email},(err,docs) =>{
        if(err){
            console.log(err)
        }else{
            console.log(docs)
            res.send(docs)
        }
    })
}
const getUserEnrolledCourses = async (req, res) => {
    try {
      // Get user email from request params
      const userEmail = req.params.userEmail;
      console.log(userEmail)
  
      // Find user by email and populate the coursesEnrolled field with the Course model
      const user = await UserCTRl.User.findOne({ email: userEmail }).populate({
        path: 'coursesEnrolled.course',
        model: courseCTRl.Course
      });
  
      // If user not found, return 404 status code
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
       console.log(user)
       console.log(user.coursesEnrolled)
      // If coursesEnrolled field not defined, return empty array
      const enrolledCourses = user.coursesEnrolled ? user.coursesEnrolled.map(course => course.course) : [];
  
      // Fetch course details from database and add them to enrolledCourses array
      for (let i = 0; i < enrolledCourses.length; i++) {
        const course = await courseCTRl.Course.findById(enrolledCourses[i]._id);
        enrolledCourses[i] = course;
      }
  
      // Return enrolled courses as response
      res.json(enrolledCourses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };


  async function getCoursesByInstructorEmail( req, res, next) {
  const Instrutor_Email = req.params.Instrutor_Email;
  try {
    const courses = await courseCTRl.Course.find({ Instrutor_Email: Instrutor_Email });
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};


async function getUsersWithChallengePoints(req, res) {
    try {
        const users = await UserCTRl.User.aggregate([
          {
            $project: {
              _id: 0,
              userName: 1,
              email: 1,
              totalChallengePoints:{ $sum: "$coursesEnrolled.challengePoints.totalPoints" }
            }
          }
        ]);
    
        res.json(users);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    };
  
  


/* db.collection.update(
    { "_id": ID, "playlists._id": "58"},
    { "$push": 
        {"playlists.$.musics": 
            {
                "name": "test name",
                "duration": "4.00"
            }
        }
    }
) */


module.exports ={addUser,getUsersWithChallengePoints, authUser, getCoursesByInstructorEmail,acceptInstructor, studentToUserStep1 , getUserEnrolledCourses, instructorInfo, getinstructorInfo , courseCompletion, userProfileDetails}