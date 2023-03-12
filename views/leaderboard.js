// Define the number of rows per page
var rowsPerPage = 10;

// Load the data for the first page
loadPage(1);

// Load data for a specific page
function loadPage(pageNum) {
  $.ajax({
    url: "http://127.0.0.1:9999/courseDetails/leader/board",
    type: "GET",
    success: function(data) {
      // Clear the leaderboard element first
      $("#leaderboard").empty();

      // Sort the data by points in descending order
      data.sort(function(a, b) {
        return b.totalChallengePoints - a.totalChallengePoints;
      });

      // Calculate the start and end index of the rows to display on this page
      var startIdx = (pageNum - 1) * rowsPerPage;
      var endIdx = startIdx + rowsPerPage;

      // Loop through the data and create HTML elements for each user on this page
      for (var i = startIdx; i < endIdx && i < data.length; i++) {
        var rank = $("<td>").text(i + 1);
        var name = $("<td>").text(data[i].userName);
        var email = $("<td>").text(data[i].email);
        var points = $("<td>").text(data[i].totalChallengePoints);
        var row = $("<tr>").append(rank, name, email, points);
        $("#leaderboard").append(row);
      }

      // Add pagination buttons
      var numPages = Math.ceil(data.length / rowsPerPage);
      $("#pagination").empty();
      for (var i = 1; i <= numPages; i++) {
        var button = $("<button>").text(i).click(function() {
          loadPage($(this).text());
        });
        if (i == pageNum) {
          button.addClass("active");
        }
        $("#pagination").append(button);
      }
    },

    error: function(error) {
      console.log(error);
    }
  });
}
