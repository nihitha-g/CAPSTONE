$(document).ready(function(){
    $('#becomeInstructor').click(function(event){
        event.preventDefault()
        const username =  $('#username').val()
        const resume = $('#resume')[0].files[0]
        const email = $('#email').val()
        const phone = $('#phone').val()
        const addSummary = $('#addSummary').val()

        const formdata = new FormData()
        formdata.append('username',username)
        formdata.append('resume',resume)
        formdata.append('email',email)
        formdata.append('phone',phone)
        formdata.append('addSummary',addSummary)

        for(let pair of formdata.entries())
        {
            console.log(pair[0] +'-'+pair[1])
        }
        $.ajax({
            method:'POST',
            contentType: false,
            processData:false,
            data:formdata,
            url:'http://localhost:9999/instructor/request',
      
            success:function(result){
              alert("Request Sent Successfully")
            },
      
            error:(result)=>{
              alert(result)
      
            }
          })
    })
})