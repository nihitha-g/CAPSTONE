$(document).ready(function() {
    // Listen for the form's submit event
    $('#challenge-form').submit(function(event) {
      // Prevent the default form submission behavior
      event.preventDefault();
      instrutor_email=window.localStorage.getItem("k")
      // Get the form data
      var formData = {
        description: $('#description').val(),
        category: $('#category').val(),
        instrutor_email: instrutor_email

      };
      
      // Send the form data via an HTTP POST request
      $.ajax({
        url: 'http://127.0.0.1:9999/live',
        type: 'POST',
        data: formData,
        success: function(response) {
          // Handle the response from the server
          console.log(response);
          alert('Class Created Successfully!');
          // reset the form
          $('#challenge-form').trigger('reset');
        },
        error: function(xhr, status, error) {
          // Handle errors
          console.log(error);
          alert('Error Creating Class!');
        }
      });
    });
  });