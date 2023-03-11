

const courseTitle=localStorage.getItem('courseTitle')

console.log(courseTitle)
$.get("http://127.0.0.1:9999/courseDetails/gc1/"+ courseTitle, function(course) {
  
    console.log(course)
    localStorage.setItem('course_id',course._id) 
    localStorage.setItem('module_id',course.section[0])
  var sectionHtml = '<section class="bg-light py-0 py-sm-5">' +
  '<div class="container">' +
  '<div class="row py-5">' +
  '<div class="col-lg-8">' +
  '<h6 class="mb-3 font-base bg-primary text-white py-2 px-4 rounded-2 d-inline-block">' + course.category + '</h6>' +
  '<h1>' + course.courseTitle  + '</h1>' +
  '<button id="enroll-btn" type="button" class="btn btn-primary" onclick="enrol()" data-index="' + course._id + '">Enroll Now</button>' +
        '</div>' +
  '<p>' + course.courseShortDescription
+ '</p>' +'<section class="bg-light py-3">'+
'</section>' +
'<ul class="list-inline mb-0">' +

  '<li class="list-inline-item h6 me-3 mb-1 mb-sm-0"><i class="fas fa-star text-warning me-2"></i>' + course.rating + '</li>' +
  '<li class="list-inline-item h6 me-3 mb-1 mb-sm-0"><i class="fas fa-user-graduate text-orange me-2"></i>' + course.enrolled + '</li>' +
  '<li class="list-inline-item h6 me-3 mb-1 mb-sm-0"><i class="fas fa-signal text-success me-2"></i>' + course.level + '</li>' +
  '<li class="list-inline-item h6 me-3 mb-1 mb-sm-0"><i class="bi bi-patch-exclamation-fill text-danger me-2"></i>' + course.lastUpdated + '</li>' +
  '<li class="list-inline-item h6 mb-0"><i class="fas fa-globe text-info me-2"></i>' + course.language + '</li>' +
  '</ul>' +
  '</div>' +
  '</div>' +
  '</div>' +
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

var sec3html=`<div class="accordion-item mb-3">
<h6 class="accordion-header font-base" id="heading-1">
    <button class="accordion-button fw-bold rounded d-sm-flex d-inline-block collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-1" aria-expanded="true" aria-controls="collapse-1">
    ${course.sections.sectionName}
        <span class="small ms-0 ms-sm-2">   ${course.sections.length}</span> 
    </button>
</h6>
<div id="collapse-1" class="accordion-collapse collapse show" aria-labelledby="heading-1" data-bs-parent="#accordionExample2">
    <div class="accordion-body mt-3">
       
        <div class="d-flex justify-content-between align-items-center">
            <div class="position-relative d-flex align-items-center">
            
                <a href="${course.sections.moduleList.videoLink}" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                    <i class="fas fa-play me-0"></i>
                </a>
                <span class="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">${course[0].sections[0].moduleList[0].moduleName}</span>
            </div>
            <div>
            <button type="button" class="btn btn-success btn-sm" id="mark-completed">Completed</button>
        </div>
            <p class="mb-0">2m 10s</p>
            
        </div>
        <button type="button" class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#quiz-modal">
        Take Quiz
        </button>
        <hr>
        </div>
        </div>
</div>`;

$('#three').append(sec3html);

// Quiz Modal
var quizModal = `
<div class="modal fade" id="quiz-modal" tabindex="-1" aria-labelledby="quiz-modal-label" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<h5 class="modal-title" id="quiz-modal-label">Quiz</h5>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body" id="${course.sections.moduleList.questions}">
<h6>Question:</h6>
<p id="quiz-question">${course.sections.moduleList.questions}</p>
<div class="form-check">
<input class="form-check-input" name="question1" type="radio" name="quiz-radio" id="quiz-radio-1" value="1">
<label class="form-check-label" for="quiz-radio-1">
<span id="quiz-option-1">${course.sections.moduleList.optionA}</span>
</label>
</div>
<div class="form-check">
<input class="form-check-input"  name="question1" type="radio" name="quiz-radio" id="quiz-radio-2" value="2">
<label class="form-check-label" for="quiz-radio-2">
<span id="quiz-option-2">${course.sections.moduleList.optionB}</span>
</label>
</div>
<div class="form-check">
<input class="form-check-input"  name="question1" type="radio" name="quiz-radio" id="quiz-radio-3" value="3">
<label class="form-check-label " for="quiz-radio-3"   >
<span id="quiz-option-3">${course.sections.moduleList.optionC}</span>
</label>
</div>
<div class="form-check">
<input class="form-check-input"  name="question1" type="radio" name="quiz-radio" id="quiz-radio-4" value="4">
<label class="form-check-label " for="quiz-radio-4"   >
<span id="quiz-option-4">${course.sections.moduleList.optionD}</span>
</label>
</div>

  <div class="modal-footer">
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
<button type="button" id="quiz-submit-button" onclick="submit('${course.sections.moduleList.questions}','${course.sections.moduleList.correctOption}')" class="btn btn-primary">Submit</button>
</div>
</div>
</div>
</div>
</div>`
$('body').append(quizModal);

});
$(document).ready(function () {
    const markCompletedBtn = document.getElementById("mark-completed");
    markCompletedBtn.addEventListener("click", function() {
        alert("Module successfully completed!");
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
        
      // Make AJAX call to update module points
      $.ajax({
        method: "POST",
        contentType: "application/json",
        data: dat,
        url: 'http://127.0.0.1:9999/badge/addmp',
        success: function(data) {
          console.log(data.message);
          
        },
        error: function(error) {
          console.log(error.responseJSON.message);
        }
      });
    
  });

})
 function submit(quizId,correctAnswer) {
   {
    var quiz = document.getElementById(quizId);
    console.log(quiz)
    
        var selectedAnswer = quiz.querySelector('input[name=question1]:checked').value;
        console.log(selectedAnswer)
       
  
        if (selectedAnswer === correctAnswer) {
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
enroll_Button.textContent = isEnrolled ? "View Course" : "Enroll";
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
  
  
  function handleView(){
    window.location.href = "coursecontent.html";
    
  }
  
  
    }

  