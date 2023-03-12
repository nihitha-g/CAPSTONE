

const courseTitle=localStorage.getItem('courseTitle')

console.log(courseTitle)
$.get("http://127.0.0.1:9999/courseDetails/gc1/"+ courseTitle, function(course) {
  
    console.log(course)
    $("#course-pills-2").css("display", "none");

    for (let i = 0; i < course.Students_Enrolled.length; i++) {
      if (localStorage.getItem("k") === course.Students_Enrolled[i]) {
        $("#course-pills-2").css("display", "block");
        break; // stop looping once the email is found
      }
    }
    localStorage.setItem('course_id',course._id) 
    localStorage.setItem('module_id',course.section)
  var sectionHtml = '<section class="bg-light py-0 py-sm-5">' +
  '<div class="container">' +
  '<div class="row py-5">' +
  '<div class="col-lg-8">' +
  '<h6 class="mb-3 font-base bg-primary text-white py-2 px-4 rounded-2 d-inline-block">COURSE</h6>' +
  '<h1>' + course.courseTitle  + '</h1>' +
  '<button id="enroll-btn" type="button" class="btn btn-primary" onclick="enrol()" data-index="' + course._id + '">Enroll Now</button>' +
        '</div>' +
  '<p>' + course.courseShortDescription
+ '</p>' 

  '</section>';

// Append the section to the DOM
$('#one').append(sectionHtml);

const enrollButton = document.getElementById('enroll-btn');
console.log(enrollButton)
a()

var sec2html=`
<p class="mb-3">Welcome to the <strong> ${course.courseTitle}</strong></p>
<p class="mb-3">to become a  expert with this <strong> ${course.courseDescription}</strong></p>
<p class="mb-3">If you wish to find out the skills that should be covered in a basic digital marketing course syllabus in India or anywhere around the world, then reading this blog will help. Before we delve into the advanced <strong><a href="#" class="text-reset text-decoration-underline">digital marketing course</a></strong> syllabus, let’s look at the scope of digital marketing and what the future holds.</p>
<p class="mb-0">We focus a great deal on the understanding of behavioral psychology and influence triggers which are crucial for becoming a well rounded Digital Marketer. We understand that theory is important to build a solid foundation, we understand that theory alone isn’t going to get the job done so that’s why this course is packed with practical hands-on examples that you can follow step by step.</p>`
$('#two').append(sec2html)
console.log("hi")

// Loop over all sections
for (let i = 0; i < course.sections.length; i++) {
  const section = course.sections[i];
  let moduleHtml = '';

  // Loop over all modules in this section
  for (let j = 0; j < section.moduleList.length; j++) {
    const module = section.moduleList[j];
    const quizId = `quiz-modal-${i}-${j}`; // create a unique ID for the quiz modal
    moduleHtml += `
      <div class="d-flex justify-content-between align-items-center">
        <div class="position-relative d-flex align-items-center">
        <a  class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static" data-bs-toggle="modal" data-bs-target="#videoModal">
        <i class="fas fa-play me-0"></i>
        </a>
      
          <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">${module.moduleName}</span>
        </div>
        <div>\
        <button type="button" class="btn btn-success btn-sm" onclick="updatemodulepoints('${module._id}')" data-moduleid="${module._id}" id="mark-completed">Mark as Completed</button>

        </div>
        <p class="mb-0"></p>
      </div>
      <button type="button" class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#${quizId}">
        Take Quiz
      </button>
      <hr>
      <div class="modal fade" id="${quizId}" tabindex="-1" aria-labelledby="${quizId}-label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="${quizId}-label">Quiz</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h6 id="${quizId}-question">${module.questions}</h6>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="${quizId}-radio" id="${quizId}-radio-1" value="1">
                <label class="form-check-label" for="${quizId}-radio-1">
                  <span id="${quizId}-option-1">${module.optionA}</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="${quizId}-radio" id="${quizId}-radio-2" value="2">
                <label class="form-check-label" for="${quizId}-radio-2">
                  <span id="${quizId}-option-2">${module.optionB}</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="${quizId}-radio" id="${quizId}-radio-3" value="3">
                <label class="form-check-label" for="${quizId}-radio-3">
                  <span id="${quizId}-option-3">${module.optionC}</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="${quizId}-radio" id="${quizId}-radio-4" value="4">
                <label class="form-check-label" for="${quizId}-radio-4">
                <span id="${quizId}-option-4">${module.optionD}</span>
                </label>
                </div>
                <div id="${quizId}-feedback"></div>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="${quizId}-submit" onclick="submit('${quizId}','${module.correctOption}')">Submit</button>
                </div>
                </div>
                </div>
                </div>
                

    

    `;

    videoHtml = `<div class="modal fade" id="videoModal" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="videoModalLabel">Video Title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="embed-responsive embed-responsive-16by9">
            <video width="640" height="360" controls>
            <source src="${module.videoLink}" type="video/mp4">
          </video>
          
            </div>
        </div>
      </div>
    </div>
  </div>
  `
 
  }

  // Create HTML for the section
  const secHtml = `
    <div class="accordion-item mb-3">
      <h6 class="accordion-header font-base" id="heading-${i}">
        <button class="accordion-button fw-bold rounded d-sm-flex d-inline-block" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${i}" aria-expanded="true" aria-controls="collapse-${i}">
          ${section.sectionName}
          <span class="small ms-2">${section.moduleList.length} modules</span>
        </button>
      </h6>
      <div id="collapse-${i}" class="accordion-collapse collapse show" aria-labelledby="heading-${i}" data-bs-parent="#accordionExample2">
        <div class="accordion-body mt-3">
          ${moduleHtml}
        </div>
      </div>
    </div>
  `;

  $('#three').append(secHtml);
  $('body').append(videoHtml)
  
}


// Quiz Modal


});
function updatemodulepoints(moduleId) {
  // Make sure the module ID is not undefined or null
  if (!moduleId) {
    console.error("Module ID is not defined.");
    return;
  }

  // Make AJAX call to update module points
  const userEmail = window.localStorage.getItem('k');
  const courseId = window.localStorage.getItem('course_id');
  const data = {
    userEmail: userEmail,
    courseId: courseId,
    moduleId: moduleId
  };
  const dat = JSON.stringify(data);

  $.ajax({
    method: "POST",
    contentType: "application/json",
    data: dat,
    url: 'http://127.0.0.1:9999/badge/addmp',
    success: function(data) {
      console.log(data.message);
      // alert("Module successfully completed!");
   
    },
    error: function(error) {
      console.log(error.responseJSON.message);
    }
  });
}

 function submit(quizId,correctOption) {
   {
    var quiz = document.getElementById(quizId);
    console.log(quiz)
    console.log(correctOption)
    
    const selectedAnswer = document.querySelector('input[name="'+quizId+'-radio"]:checked').value;


        console.log(selectedAnswer)
       
  
        if (selectedAnswer === correctOption) {
          alert('Correct answer!');
          userEmail=window.localStorage.getItem('k')
          courseId=window.localStorage.getItem('course_id')
          moduleId=window.localStorage.getItem('module_id')
      
         
          let data={
            userEmail: userEmail,
            courseId: courseId,
            moduleId: moduleId

        }
        let dat= JSON.stringify(data)
        console.log(dat)
        
        
    // Make AJAX call to update quiz points
    $.ajax({
        method: "POST",
        contentType: "application/json",
        data: dat,
        url: 'http://127.0.0.1:9999/badge/addqp',
        success: function(data) {
          console.log(data.message);
          
        },
        error: function(error) {
          console.log(error.responseJSON.message);
        }
      });

        } else {
          alert('Incorrect answer. Please try again.');
        }
      
      }
     
    

    }
    
    function a(){

   const email= window.localStorage.getItem('k')
  
    
  
  $.ajax({
    method: 'GET',
    url: " http://127.0.0.1:9999/userProfile/"+email,
    success: (data) => {
      const email =  window.localStorage.getItem("k")
      console.log(data)
      
      const course_title=window.localStorage.getItem("course_id")
      console.log(course_title)
     
      console.log('Email:', email);
      console.log('course_title:',course_title);
      let course = data.coursesEnrolled;
      let isEnrolled = false;
      console.log(data[0].coursesEnrolled.length)
      for(i=0;i<data[0].coursesEnrolled.length;i++){
        const courseName =data[0].coursesEnrolled[i].course;
        console.log(courseName)
    
        if (courseName== course_title) { //Coursetitle[i] data[i].Course_Name data[0].Course_name
          isEnrolled = true;
        
          break;
        }
        
      }
      console.log(isEnrolled)
    
const enroll_Button = document.querySelector(`button[data-index="${course_title}"]`);
console.log(enroll_Button)
enroll_Button.textContent = isEnrolled ? "Enrolled" : "Enroll";
enroll_Button.onclick = isEnrolled ? handleView : enrol;

     
    //   const enroll_Button = document.querySelector(`button[data-index="${course_title}"]`);
    // //   const enroll_Button = document.getElementById('#enroll-btn')
   
    //   console.log(enroll_Button)
      
    //   enroll_Button.textContent = isEnrolled ? "View Course" : "Enroll";
  
  
    //   enroll_Button.onclick = isEnrolled ? handleView : enroll;
       
       
       
    }
   
        
  })

  // })
  
  
      // if (isEnrolled) {
      //   // Update button text
      //   document.getElementById("enroll-button").innerHTML = "View Course";
      
      //   // Add onclick functionality
      //   document.getElementById("enroll-button").onclick = function() {
      //     // Redirect user to course page
      //     window.location.href = "https://example.com/course";
      //   }
      // } else {
      //   // Add onclick functionality
      //   document.getElementById("enroll-button").onclick = function() {
      //     // Enroll user and redirect to course page
      //     enroll();
          
      //   }
      // }
      // const request = new XMLHttpRequest();
      // request.onreadystatechange = function() {
      //   if (this.readyState === 4 && this.status === 200) {
      //     const enrollButton = document.getElementById("enroll-Button");
      //     console.log(enrollButton)
      //     enrollButton.textContent = isEnrolled ? "View Course" : "Enroll";
      //     enrollButton.onclick = isEnrolled ? handleView : enroll;
          
      //   }
      // };
      // request.open("GET", "/path/to/button", true);
      // request.send();
      // const enrolButton = document.getElementById("enroll-Button");
      // console.log(enrolButton)
      
      // document.addEventListener('DOMContentLoaded', function() {
       
      //   });
      // }_)
      
    //   var actionButton = document.getElementById("enroll-button");
     
    // actionButton.textContent = isEnrolled ? "View Course" : "Enroll";
    // actionButton.onclick = isEnrolled ? handleView : enroll;
  
   
  
  function enrol(){
    const enrollButton = document.getElementById("enroll-btn");
    enrollButton.innerHTML = "You are now enrolled";
          enrollButton.style.backgroundColor = "grey";
          enrollButton.disabled = true;
          const course_title = window.localStorage.getItem('course_id');
          console.log(course_title)
  
          obj={
            email: email,
            coursesEnrolled:course_title,
            }
          console.log("s")
          console.log(obj)
          obj = JSON.stringify(obj)
          $.ajax({
            method: 'POST',
            contentType: "application/json",
            "data": obj,
            url: 'http://localhost:9999/enroll/e',
             success: (e) => {
              console.log('Successfully enrolled in course:', obj);
            },
            error: (error) => {
              console.error('Error enrolling in course:', error);
            }
          });
    
      }
    
    error: (error) => {
      console.error('Error fetching user details:', error);
    }
  
  // else{
  //   const loginButton = document.getElementById('enroll-button');
  //   loginButton.addEventListener('click', () => {
  //     window.location.href = 'login (2).html';
  //   });
  // }
  console.log(email)
  
  

  
  
    }

  