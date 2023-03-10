const InstructorCTRL = require('../models/InstrictorModel')
const UserCTRl = require('../models/allUsers')


function becomeInstructor(req,res) {
    const userDetail = UserCTRl.User.find({email:req.body.email},(err,result) =>{
        if(err) throw err
        else{
            console.log(result)
            UserCTRl.User.updateOne({email:req.body.email},
                {$set:
                {isInstructor:"pending",Resume:req.file.location,addSummary:req.body.addSummary}},(err,data) =>{
                    if(err) throw err
                    else{
                        res.send(data)
                        console.log(data)
                    }
                }
                )
        }
    })
  }

function InstructorRegistrationController(req, res) {
    // console.log(req.body)
    let InstructorData = InstructorCTRL.InstructorModel({
        FullName: req.body.FullName,
        Email: req.body.Email,
        Message: req.body.Message,
        File: req.body.File,
        Linked: req.body.Linked,
        State: req.body.State,
        Password: req.body.Password
    })
    console.log(InstructorData)
    console.log("sd")
    InstructorData.save((err, result) => {
        if (err) {
            res.send("error")
        } else {
            res.send("User registered successfully")
        }
    })
}

function instructordata(req, res) { 
    InstructorCTRL.InstructorModel.find({ State: "Approved" }, (err, data) => { 
        if (err) throw err; 
        return res.json(data) }) 
    }

module.exports = {  becomeInstructor,InstructorRegistrationController,instructordata }