window.onload=function(){
    localStorage.setItem("k",1);
  }
  

  function addUser(){
    if(localStorage.getItem("usd")==null){
      localStorage.setItem("usd",JSON.stringify([]))
    }
    var userName=$("#userName").val();
    var email=$("#email").val();
    var phone=$("#phone").val();
    var password=$("#password").val();
    var address=$("#address").val();
    var imgFile = $('#imgFile')[0].files[0]
    console.log(imgFile)
    const formdata = new FormData()
    formdata.append('userName',userName)
    formdata.append('password',password)
    formdata.append('email',email)
    formdata.append('phone',phone)
    formdata.append('address',address)
    formdata.append('role','student')
    formdata.append('imgFile',imgFile)
    for(let pair of formdata.entries()){
      console.log(pair[0]+"-"+pair[1])
    }
    $.ajax({
      "method":"POST",contentType:false,processData:false,'data':formdata,'url':'http://localhost:9999/a',
      "success":(e)=>{alert("sucessfully added")},error:(e)=>{alert(e)}
    });

    // var dat=JSON.stringify(usd);
    // window.localStorage.setItem(email,dat);
    window.localStorage.setItem("usd",JSON.stringify(usda));
    
 
     window.alert("sign Up Successful");
    var jobj=JSON.stringify(obj);
    window.localStorage.setItem(email,jobj);
    window.localStorage.setItem("k",window.localStorage.getItem(email));
    
    window.location.href="./sign-in.html";
  }

  
  function validate() {
    const email = $('#user_email').val();
    const password = $('#user_pass2').val();
    const userData = {
      email,
      password,
    };
  
    if (email === 'admin@gmail.com' && password === 'admin') {
      window.location.href = './admin-dashboard.html';
    } else {
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(userData),
        url: 'http://localhost:9999/a/login',
        success: (response) => {
          if (response) {
            // Store the JWT token in the browser's local storage
            localStorage.setItem('token', response.token);
  
            // Store other user data in the local storage if needed
            localStorage.setItem('role', response.role);
            localStorage.setItem('k', email);
            
  
            // Redirect the user to the dashboard or home page
            window.location.href = 'index.html';
          } else {
            alert('Invalid email or password');
          }
        },
        error: (error) => {
          console.error(error);
          alert('Failed to log in. Please try again.');
        },
      });
    }
  }
  