
$('#challenge-form').submit(function (e) {
    console.log("1")
    e.preventDefault();
    console.log("2")
    var formData = {
              title: $('#title').val(),
              description: $('#description').val(),
              category: $('#category').val(),
              flag: $('#flag').val(),
              points: $('#points').val(),
              hint: $('#hint').val(),
              solvedBy: []
            };
            console.log("3")
           var formDat=JSON.stringify(formData)
            console.log(formDat)
            $.ajax({
                method: "POST",
                contentType: "application/json",
                data: formDat,
                url: "http://127.0.0.1:9999/Addchallenge/create",
                success: (result) => {
                  alert("sucessfully added");
                },
                error: (result) => {
                  alert(result);
                },
              });
 
  });
  
// function addChallenge() {
//     // Get the form data
//     var formData = {
//       title: $('#title').val(),
//       description: $('#description').val(),
//       category: $('#category').val(),
//       flag: $('#flag').val(),
//       points: $('#points').val(),
//       hint: $('#hint').val(),
//       solvedBy: []
//     };
//   console.log(formData)
//     // Send the data using AJAX
//     $.ajax({
//       type: 'POST',
//       url: 'http://127.0.0.1:9999/Addchallenge/create',
//       data: formData,
//       dataType: 'json',
//       encode: true
//     })
//     .done(function(data) {
//       // Handle the response from the server
//       console.log(data);
//       alert('Challenge added successfully!');
//     })
//     .fail(function(data) {
//       // Handle errors
//       console.log(data);
//       alert('Error adding challenge!');
//     });
//   }
  


