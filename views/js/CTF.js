get_req();
function get_req() {
  $.get("http://127.0.0.1:9999/Addchallenge/get", function (data, status) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      document.querySelector("#challengelist").innerHTML += `  
        <div class="card challenge-card" data-bs-toggle="modal"  data-bs-target="#challenge-details-modal" data-challenge-id="${i}" onclick="showChallengeDetails('${data[i].title}')">
                    <div class="card-body">
                        <h3 class="card-title"> ${data[i].title}</h3>
                        <p class="card-text challenge-points"> Points : ${data[i].points}</p>
                    </div>
        </div>`;
    }
  });
}

function showChallengeDetails(challengeTitle) {
  $.get(
    `http://127.0.0.1:9999/Addchallenge/${challengeTitle}`,
    function (data, status) {
      // display challenge details in a modal or a separate section of the page
      // for example:
      console.log(data);
      console.log(data[0]._id);
      const challengeId = window.localStorage.setItem(
        "challengeId",
        data[0]._id
      );
      const CourseId = window.localStorage.setItem(
        "CourseId",
        data[0].category
      );
      const correct_flag = data[0].flag;
      const title = data[0].title;
      // localStorage.setItem('flag',correct_flag)
      document.querySelector("#challenge-details-title").innerHTML =
        data[0].title;
      document.querySelector("#challenge-details-description").innerHTML =
        data[0].description;
      document.querySelector("#challenge-details-points").innerHTML =
        data[0].points;
      // document.querySelector('#challenge-details-hint').innerHTML = data[0].hint;
      $("#challenge-details-hint").text("Hint:" + "    " + data[0].hint);

      var modal = document.querySelector("#challenge-details-modal");
      // var instance = M.Modal.init(modal);
      // instance.open();
      console.log(document.querySelector("#submit-flag-btn"));
      document.querySelector("#submit-flag-btn").onclick = function (event) {
        event.preventDefault();
        let flag = document.querySelector("#flag").value;

        if (flag === correct_flag) {
          // M.toast({html: 'Congratulations! Challenge solved!', classes: 'green'});

          const userEmail = window.localStorage.getItem("k");
          const challengeId = window.localStorage.getItem("challengeId");
          const courseId = window.localStorage.getItem("CourseId");
          var data = {
            userEmail: userEmail,
            challengeId: challengeId,
            courseId: courseId,
          };
          console.log(data);
          const dat = JSON.stringify(data);
          $.ajax({
            method: "POST",
            contentType: "application/json",
            data: dat,
            url: "http://127.0.0.1:9999/badge/addcp",

            success: function (response) {
              console.log(response);
              alert("Congratulations! Challenge solved!");
            },
            error: function (xhr, status, error) {
              console.error(error);
            },
          });

          // perform any other actions you want to take after solving the challenge
        } else {
        alert("Oops Try Again")
        }
      };
    }
  );
}
// var m = document.querySelector('#submit')
// console.log(m)

//     m.addEventListener("click", () => {

//     // Get the entered flag from the input field
//     const flag = document.querySelector('#flag-input').value;
//  const  correct_flag=localStorage.getItem('flag')
//     // Check if the entered flag is correct (replace with your own logic)
//     if (flag === correct_flag) {
//       // Show a success message in a popup
//       M.toast({html: 'Congratulations! Challenge solved!', classes: 'green'});
//     } else {
//       // Show an error message in a popup
//       M.toast({html: 'Oops! Incorrect flag. Try again.', classes: 'red'});
//     }
//   }
// )
