$.ajax({
type: "GET",
url: "http://localhost:9999/get_users_data/get_user",
success: function(result) {
    const students = result.filter(obj => obj.role === "student");
    const instructors = result.filter(obj => obj.role === "Instructor");
    //         const studentCount = students.length;
    //         console.log(studentCount)
    //     const instructorCount = instructors.length;
    // console.log(result)
    $("#usercount").text(students.length);
}
});
$.ajax({
type: "GET",
url: "http://localhost:9999/get_users_data/get_user",

success: function(result) {
    const students = result.filter(obj => obj.role === "student");
    const instructors = result.filter(obj => obj.role === "Instructor");
    
    //         const studentCount = students.length;
    //         console.log(studentCount)
    //     const instructorCount = instructors.length;
    // console.log(result)
   
   
    $("#inscount").text(instructors.length);
}
});

$.ajax({
type: "GET",
url: "http://localhost:9999/course/savecourse",
success: function(result) {
    console.log(result)
    $("#courseCount").text(result.length);
}
});

$.ajax({
type: "GET",
url: "http://localhost:9999/getinstructor/getinstdetails",
success: function(result) {
    $("#instructorCount").text(result.count);
}
});

$.ajax({
type: "GET",
url: "http://localhost:9999/getnoofqueries/getqueries",
success: function(result) {
    $("#countqueries").text(result.count);
}
});


