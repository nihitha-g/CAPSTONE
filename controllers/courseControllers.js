const courseCTRl = require('../models/courses')
const problems = require('../models/problem')
const moduleCTRl = require("../models/section");
const quizCTRl = require("../models/quize");
//new 
// async function addCurriculum(req,res){
//   const sections = req.body.sections
//   let addSectionName = moduleCTRl.Section({
//     sectionName:req.body.sections[0].sectionName,
//     modulesList: []
//   })
//   console.log(addSectionName)

//   let add_section = await addSectionName.save();
//   console.log(add_section)
//   let section_id = await moduleCTRl.Section.findOne({sectionName:req.body.sections[0].sectionName},{_id:1})

//   console.log("Section_id : ",section_id)
 

//   let addSectionCourse = await courseCTRl.Course.updateOne(
   
//     {
//       courseTitle:req.body.courseTitle
//     },
//     {
//       $push:{sections:section_id}
//     }
//   )
//   console.log('sectioncourse',addSectionCourse)

//   let modules = req.body.sections[0].moduleList
//   console.log(modules)
//   for(let i = 0; i < modules.length;i++){
//     let currentModule = {
//       moduleName:modules[i].moduleName,
//       videoLink:modules[i].videoLink,
//       moduleDescription:modules[i].courseDescription,
//       questions:modules[i].questions,
//       optionA:modules[i].optionA,
//       optionB:modules[i].optionB,
//       optionC:modules[i].optionC,
//       optionD:modules[i].optionD,
//       correctOption:modules[i].correctOption
//     }
//     console.log("moduksd",req.body.sections[0].sectionName)
//     console.log("sddsfs",currentModule)
//     let updateCourse = await moduleCTRl.Section.updateOne(
//       { sectionName:req.body.sections[0].sectionName},
//       {
//         $push:{
//           moduleList:currentModule
//         }
//       }
//     )
//     console.log("work")

//   }
 
 
// }
async function addCurriculum(req,res){

  const sections = req.body.sections;

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];

    let addSectionName = moduleCTRl.Section({
      sectionName: section.sectionName,
      modulesList: []
    });

    let addedSection = await addSectionName.save();

    let section_id = addedSection._id;

    let addSectionCourse = await courseCTRl.Course.updateOne(
      {
        courseTitle: req.body.courseTitle
      },
      {
        $push: { sections: section_id }
      }
    );

    let modules = section.moduleList;

    for(let j = 0; j < modules.length; j++){
      let currentModule = {
        moduleName: modules[j].moduleName,
        videoLink: modules[j].videoLink,
        moduleDescription: modules[j].courseDescription,
        questions: modules[j].questions,
        optionA: modules[j].optionA,
        optionB: modules[j].optionB,
        optionC: modules[j].optionC,
        optionD: modules[j].optionD,
        correctOption: modules[j].correctOption
      };

      let updateSection = await moduleCTRl.Section.updateOne(
        { _id: section_id },
        {
          $push:{
            moduleList: currentModule
          }
        }
      );
    }
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
        courseShortDescription:req.body.courseShortDescription,
        Instrutor_Email:req.body.Instrutor_Email
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
 
  try{
  let data=await courseCTRl.Course.find()
    .populate({
      path: "sections",

    })
    res.send(data);
}
catch (e) {
    console.log(e);
}
}

async function getCourse1(req, res) {
  const courseTitle = req.params.courseTitle;
  try{
  let data=await courseCTRl.Course.findOne({ courseTitle: courseTitle})
    .populate({
      path: "sections"

    })
    res.send(data);
}
catch (e) {
    console.log(e);
}
}

module.exports = {getProblem,addCourse,addCurriculum,problemcontent,getCourse,getCourse1}