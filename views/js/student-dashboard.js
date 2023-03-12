

$(document).ready(function() {
   const email=window.localStorage.getItem('k')
    $.get("http://localhost:9999/userProfile/"+email, function(data) {
        console.log(data)
        $('.avatar-img').each(function() {
          $(this).attr('src', data[0].imgFile);
          
        });
        $('#navemail').text(email)
        $('#navname').text(data[0].userName)

      var htmlCode = '<div>' +
                     '<h1 class="my-1 fs-4">' + data[0].userName + '</h1>' +
                     '<ul class="list-inline mb-0">' +
                     '<li class="list-inline-item me-3 mb-1 mb-sm-0">' +
                     '<span class="h6">' + data[0].email + '</span>' +
                     '<span class="text-body fw-light"></span>' +
                     '</li>' +
                     '<li class="list-inline-item me-3 mb-1 mb-sm-0">' +
                     '<span class="h6">' + data[0].address+ '</span>' +
                     '<span class="text-body fw-light"></span>' +
                     '</li>' +
                     '<li class="list-inline-item me-3 mb-1 mb-sm-0">' +
                     '<span class="h6">' + data[0].phone+ '</span>' +
                     '<span class="text-body fw-light"></span>' +
                     '</li>' +
                     '</ul>' +
                     '</div>';
      $('#p').append(htmlCode);
    });
  });
  