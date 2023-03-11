$(document).ready(function() {
    // Initialize the Quill editor
    const editor = new Quill('#editor', {
      modules: {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      },
      placeholder: 'Enter your course description here...',
      theme: 'snow'
    });
  
    // Wait for the quilleditor container to finish loading
    $('#quilleditor').ready(function() {
      $('#saveCourse').click(function(event) {
        event.preventDefault();
  
        // Get the values of the other form elements
        const courseTitle = $('#courseTitle').val();
        const courseShortDescription = $('#courseShortDescription').val();
        const courseImage = $('#courseImage')[0].files[0];
        const courseVideo = $('#courseVideo')[0].files[0];
        const courseUrl = $('#courseUrl').val();
  
        // Get the contents of the Quill editor
        const courseDescription = editor.root.innerHTML;
        

        // Do something with the form values
        console.log(courseTitle,
          courseShortDescription,
          courseDescription,
          courseImage,
          courseVideo,
          courseUrl);
          window.localStorage.setItem('courseTitle',courseTitle)
          const formData = new FormData();
          
          // Append form data to the FormData object
          formData.append('courseTitle', courseTitle);
          formData.append('courseShortDescription', courseShortDescription);
          formData.append('courseUrl', courseUrl);
          formData.append('courseDescription',courseDescription)
          formData.append('courseImage', courseImage);
          formData.append('courseVideo', courseVideo);
          formData.append('Instrutor_Email',window.localStorage.getItem('k'))
      
          for(let pair of formData.entries()){
            console.log(pair[0] + "-" + pair[1])
          }
          // Send AJAX request with the FormData object
          $.ajax({
            url: 'http://localhost:9999/courseDetails/savecourse',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
              console.log(response);
            },
            error: function(error) {
              console.log(error);
            }
          });
    
      });
    });
  });
  