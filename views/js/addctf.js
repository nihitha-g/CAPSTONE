$(document).ready(function () {
$('#challenge-form').submit(function (e) {
  
    e.preventDefault();
   
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
  
})