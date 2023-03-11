const courseTitle = localStorage.getItem("courseTitle"); 
console.log(courseTitle);
$.get(
  "http://127.0.0.1:9999/courseDetails/gc1/" + courseTitle,
  function (course) {
    console.log(course);
    localStorage.setItem("course_id", course._id);
    $("[id=courseTitle]").each(function () {
      $(this).text(course.courseTitle);
    });
    $("#courseShortDescription").html(course.courseSDescription);
    $("#courseVideo").attr({
      poster: course.courseImage,
      src: course.courseVideo,
    });
    $('#courseDescription').html(course.courseDescription)
    $("#course-pills-2").css("display", "none");

    for (let i = 0; i < course.Students_Enrolled.length; i++) {
      if (localStorage.getItem("k") === course.Students_Enrolled[i]) {
        $("#course-pills-2").css("display", "block");
        break; // stop looping once the email is found
      }
    }
  }
);

localStorage.setItem('module_id'+ j ,course.sections[0].moduleList[0]._id)
