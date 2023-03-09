const courseCTRl = require('../models/courses')
const problems = require('../models/problem')
const moduleCTRl = require("../models/section");
const quizCTRl = require("../models/quize");
//new
async function addCurriculum(req,res){
  let addSectionName = moduleCTRl.Section({
    sectionName:req.body.sections[0].sectionName,
    modulesList: []
  })
  console.log(addSectionName)

  let add_section = await addSectionName.save();
  console.log(add_section)
  let section_id = await moduleCTRl.Section.findOne({sectionName:req.body.sections[0].sectionName},{_id:1})

  console.log("Section_id : ",section_id)
 

  let addSectionCourse = await courseCTRl.Course.updateOne(
   
    {
      courseTitle:req.body.courseTitle
    },
    {
      $push:{sections:section_id}
    }
  )
  console.log('sectioncourse',addSectionCourse)

  let modules = req.body.sections[0].moduleList
  console.log(modules)
  for(let i = 0; i < modules.length;i++){
    let currentModule = {
      moduleName:modules[i].moduleName,
      videoLink:modules[i].videoLink,
      moduleDescription:modules[i].courseDescription,
      questions:modules[i].questions,
      optionA:modules[i].optionA,
      optionB:modules[i].optionB,
      optionC:modules[i].optionC,
      optionD:modules[i].optionD,
      correctOption:modules[i].correctOption
    }
    console.log("moduksd",req.body.sections[0].sectionName)
    console.log("sddsfs",currentModule)
    let updateCourse = await moduleCTRl.Section.updateOne(
      { sectionName:req.body.sections[0].sectionName},
      {
        $push:{
          moduleList:currentModule
        }
      }
    )
    console.log("work")

  }
 
 
}

function getProblem(req, res) {
    const questionid = req.params.questionid;
    
    problems.problems.findOne(
      { _id: questionid},
      (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal server error");
        } else if (!data) {
          res.status(404).send("Problem not found");
        } else {
          res.send(data)
          console.log("worked")
        }
      }
    );
  }
  
function problemcontent(req,res){
  console.log(req.body)
    const problemq = problems.problems({
        problemStatement:req.body.problemStatement,
        constraints:req.body.constraints,
        inputFormat:req.body.inputFormat,
        outputFormat:req.body.outputFormat,
        explanation:req.body.explanation,
        sampleInputs:req.body.sampleInputs,
        sampleOutputs:req.body.sampleOutputs
    })

    problemq.save((err,result)=>{
        if(err){
            res.send(err)
            console.log("e")
        }
        else{
            res.send(result)
            
        }
    })
    }

function addCourse(req, res){
    // courseModule = []
    console.log(req.body) 
    const addCourseData = courseCTRl.Course({        
        courseImage: req.files.courseImage[0].location,
        courseVideo: req.files.courseVideo[0].location,
        courseTitle:req.body.courseTitle,
        courseUrl:req.body.courseUrl,
        courseDescription:req.body.courseDescription,
        courseShortDescription:req.body.courseShortDescription
    })
    console.log(addCourseData)
    addCourseData.save((err,result)=>{
        if(err){
            console.log("5000")
            res.send(err)
        }else{
            console.log("1000")
            res.send("Full Course added")
        }
    })

}

async function getCourse(req, res) {
  const courseName = req.body.course_name;
  try{
  let data=await courseCTRl.Course.findOne({ course_name: courseName })
    .populate({
      path: "sections",
      populate: {

        path: "moduleList.quiz",
        model: "Quiz",
      },
    })
    res.send(data);
}
catch (e) {
    console.log(e);
}
    // .exec((err, data) => {
    //   if (err) {
    //     res.status(500).send(err);
    //   } else {
    //     res.send(data);
    //   }
    // });
}

module.exports = {getProblem,addCourse,addCurriculum,problemcontent,getCourse}