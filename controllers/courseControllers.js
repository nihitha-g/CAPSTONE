const courseCTRl = require('../models/courses')
const problems = require('../models/problem')
const moduleCTRl = require("../models/section");
const quizCTRl = require("../models/quize");
//new
async function addCurriculum(req,res){
  console.log(req.body)
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
    }
    let updateCourse = await moduleCTRl.Section.updateOne(
      { sectionName:req.body.sectionName},
      {
        $push:{
          moduleList:currentModule
        }
      }
    )
  }
 
  console.log("work")
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

module.exports = {getProblem,addCourse,addCurriculum,problemcontent}