

      
    $(document).ready(function() {
        const email = window.localStorage.getItem('k')
          // Load the JSON data using jQuery's $.get() function
          $.get('http://127.0.0.1:9999/courseDetails/gc', function(data) {
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
        
  