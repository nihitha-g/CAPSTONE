$(document).ready(function() {
    // Initialize Quill editor for course description
      $('#problem').click(function(event){
        event.preventDefault()
        console.log("HI")
        const problemStatement = $('#editor1').val()
        const inputFormat = $('#editor2').val();
        const outputFormat = $('#editor3').val();
        const constraints = $('#editor4').val();
        const sampleInputs = $('#editor5').val();
        const sampleOuputs = $('#editor6').val()
        const explanation = $('#editor7').val()
        console.log(problemStatement,
          inputFormat,
          outputFormat,
          constraints,
          sampleInputs,
          
                  
          sampleOuputs,
          explanation)
        $.ajax({
            url: 'http://localhost:9999/courseDetails/problems',
            method: 'POST',
            data: {
              problemStatement: problemStatement,
              constraints: constraints,
              inputFormat: inputFormat,
              outputFormat: outputFormat,
              explanation: explanation,
              sampleInputs:sampleInputs,
              sampleOutputs:sampleOuputs
            },
            success: function(response) {
              // Handle the server's response
              console.log(response);
              alert("Saved")
            },
            error: function(error) {
              // Handle errors
              console.log(error);
            }

          });
      })

  });


  
      // Initialize Quill editor for Lesson 3
   
    