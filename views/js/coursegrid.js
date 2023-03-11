$.get("http://127.0.0.1:9999/courseDetails/gc", function(data) {
    console.log(data);
    $("#course-list").empty();
    $.each(data, function(index, course) {
        var cardItemHtml = '<div class="col-sm-7 p-3 col-xl-5">' +
            '<div class="card shadow h-100 course-card" data-course="' + course.courseTitle + '">' +
            '<img src="' + course.courseImage + '" class="card-img-top" alt="course image">' +
            '<div class="card-body pb-0">' +
            '<div class="d-flex justify-content-between mb-2">' +
            '<a href="#" class="h6 fw-light mb-0"><i class="far fa-heart"></i></a>' +
            '</div>' +
            '<h5 class="card-title">' + course.courseTitle+ '</h5>' +
            '<p class="mb-2 text-truncate-2">' + course.courseDescription + '</p>' +
            '<ul class="list-inline mb-0">' +
            '<li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>' +
            '<li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>' +
            '<li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>' +
            '<li class="list-inline-item me-0 small"><i class="fas fa-star text-warning"></i></li>' +
            '<li class="list-inline-item me-0 small"><i class="far fa-star text-warning"></i></li>' +
            '<li class="list-inline-item ms-2 h6 fw-light mb-0">' + 5 + '</li>' +
            '</ul>' +
            '</div>' +
            '<div class="card-footer pt-0 pb-3">' +
            '<hr>' +
            '<div class="d-flex justify-content-between">' +
            '<span class="h6 fw-light mb-0"><i class="far fa-clock text-danger me-2"></i>' + 10 + '</span>' +
            '<span class="h6 fw-light mb-0"><i class="fas fa-table text-orange me-2"></i>' + 10 + ' lectures</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        $("#course-list").append(cardItemHtml);
    });

    // Add a click event listener to each course card
    $(".course-card").click(function() {
        var courseTitle = $(this).data("course");
        window.localStorage.setItem('courseTitle',courseTitle)
        window.location.href = "course-detail.html?title=" + courseTitle;
    });

    // Add the "d-flex" class to the "course-list
    $("#course-list").addClass("d-flex");
})