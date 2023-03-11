$(document).ready(function () {
    inputarray = []
  $("#addSection .modal-footer .btn-success").click(function () {

    var sectionName = $('#addSection input[type="text"]').val();
    console.log(sectionName);
    console.log($(".section").length + 1);
    var accordionItem =
      '<div class="section accordion-item mb-3">' +
      '<h6 class="accordion-header font-base" id="heading-' +
      ($(".section").length + 1) +
      '">' +
      '<button class="accordion-button fw-bold rounded d-inline-block collapsed d-block pe-5 sName" type="button" id="section' +
      ($(".section").length + 1) +
      '"data-bs-toggle="collapse" data-bs-target="#collapse-' +
      ($(".section").length + 1) +
      '" aria-expanded="false" aria-controls="collapse-' +
      ($(".section").length + 1) +
      '">' +
      sectionName +
      "</button>" +
      "</h6>" +
      '<div class="accordion-collapse collapse" id="collapse-' +
      ($(".section").length + 1) +
      '" aria-labelledby="heading-' +
      ($(".section").length + 1) +
      '" data-bs-parent=".sections">' +
      '<div class="accordion-body mt-3">' +
      '<div class="module-list"></div>' +
      '<button class="btn btn-sm btn-primary addmodule mt-3">Add module</button>' +
      "</div>" +
      "</div>" +
      "</div>";
    $(".sections").append(accordionItem);

    $("#addSection").modal("hide");
  });
  $("#addTopic .modal-footer .btn-success").click(function () {
    // Get the value of the input fields in the modal

    var moduleName = $('#addTopic input[name="TopicName"]').val();
    var videoLink = $('#addTopic input[name="videoLink"]').val();
    var courseDescription = $('#addTopic input[name="videoLink"]').val();
    var questions = $('#addTopic input[name="questions"]').val()
    var optionA = $('#addTopic input[name="optionA"]').val()
    var optionB = $('#addTopic input[name="optionB"]').val()
    var optionC = $('#addTopic input[name="optionC"]').val()
    var optionD = $('#addTopic input[name="optionD"]').val()
    var correctOption = $('#addTopic select[name="correctOption"]').val()
    var Instrutor_Email=window.localStorage.getItem('k')
    var roll = window.localStorage.getItem('ROLL')
    var inputObj = {
      moduleName: moduleName,
      videoLink: videoLink,
      courseDescription: courseDescription,
      questions: questions,
      optionA: optionA,
      optionB: optionB,
      optionC: optionC,
      optionD: optionD,
      correctOption:correctOption,
      // Instrutor_Email:Instrutor_Email
    };
    inputarray.push(inputObj);
    // Create the module HTML
    var moduleHTML =

      '<div class="accordion-body mt-3">'+
      '<div class="modulename d-flex justify-content-between align-items-center">' +
      '<div class="position-relative">' +
      '<a href="#" class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static"><i class="fas fa-play"></i></a>' +
      '<span class="ms-2 mb-0 h6 fw-light">' +
      moduleName +
      "</span>" +
      "</div>" +
      "<div>" +
      '<button class="btn btn-sm btn-danger-soft btn-round mb-0 removemodule"><i class="fas fa-fw fa-times"></i></button>' +
      "</div>" +
      "</div>" + "</div>";
    // Find the index of the section container that the module was added to
    var sectionIndex = $(this).closest(".section").index();
    console.log(sectionIndex);
    // Append the new module to the module list in the corresponding section container
    $(".sections")
      .find(".section")
      .eq(sectionIndex)
      .find(".module-list")
      .append(moduleHTML);

    $("#addTopic").modal("hide");

  });
  $(".sections").on("click", ".addmodule",function () {
    // Show the add topic modal
    $("#addTopic").modal("show");

  });
  $(".sections").on("click", ".removemodule", function (event) {
    event.preventDefault();
    $(this).closest(".modulename").remove();
  })
  $('#submitCurriculum').click(function(e){
    e.preventDefault();
    console.log("HI")
    var sectiondata = []
    console.log(inputarray)
    $('.section').each(function(index) {
      var sectionName = $(this).find('.sName').text();
      var moduleList = [];
      $(this).find('.modulename').each(function() {
        var moduleName = $(this).find('span').text();
        var moduleObj = inputarray.find(function(element) {
          return element.moduleName === moduleName;
        });
        moduleList.push(moduleObj);
      });
      var sectionObj = {
        sectionName: sectionName,
        moduleList: moduleList
      };
      sectiondata.push(sectionObj);
    });
    console.log(sectiondata);
    courseTitle = window.localStorage.getItem('courseTitle')
    
    var data = {
      courseTitle:courseTitle,
      sections:sectiondata,
    }
  let sectiontotal = JSON.stringify(data);
    console.log(sectiontotal)
    $.ajax({
      method:'POST',
      contentType: 'application/json',
      data:sectiontotal,
      url:'http://localhost:9999/course/Curriculum',
      success:function(result){
        alert("data saved successsfully")
      },

      error:(result)=>{
        alert(result)

      }
    })
  });
  
})


 