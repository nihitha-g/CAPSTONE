

      
    $(document).ready(function() {
        // Load the JSON data using jQuery's $.get() function
        $.post('http://127.0.0.1:9999/userProfile/priyanshu@gmail.com', function(data) {
          // Log the data to the console to verify that it was loaded correctly
          console.log(data);
      
          // Initialize the DataTable with the data
          $('#enrolled-courses').dataTable({
            data: data,
            columns: [
              { title: "Course Title", data: "courseTitle" },
              
              { title: "Course Short Description", data: "courseShortDescription" },
          
              { title: "Students Enrolled", data: "Students_Enrolled.length" }
            ]
          });
        });
      });
      
      