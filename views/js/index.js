  window.onload=function(){
      if(window.localStorage.getItem("k")!=null && window.localStorage.getItem("k")!=1){
          document.getElementById("intro1").className="nav-item intro";
          document.getElementById("intro2").className="nav-item";
          // document.getElementById("intro3").className="nav-item";
          // var ans=JSON.parse(window.localStorage.getItem("k"));
          document.getElementById("user").innerHTML="Hello "+localStorage.getItem("k")+"!";
      }
  }
  function fun3(){
    console.log("Hi")
    //console.log(window.localStorage.getItem("k"))
    const email=window.localStorage.getItem("k")
    // bhi = JSON.stringify({Email:window.localStorage.getItem("k")})
    // console.log(bhi)
    $.ajax({
        "method": "GET", "url": "http://localhost:9999/userProfile/"+email,
    "success": (data) => {
          console.log(data)
          if(data[0].role=='student'){
            window.location.href="student-dashboard.html"

          }
          else if(data[0].role=='Instructor'){
            window.location.href="instructor-dashboard.html"
          }
      //alert("Successfully registered")
     
      
  }, error:(e) => {alert(e)}
    });
   
  
}
  
function fun2(){
    console.log("Hi")
    //console.log(window.localStorage.getItem("k"))
    bhi = JSON.stringify({Email:window.localStorage.getItem("k")})
    console.log(bhi)
    $.ajax({
        "method": "POST", contentType: "application/json","data":bhi , "url": "http://localhost:9999/LogOutUser/logout",
    "success": (e) => {
      //alert("Successfully registered")
      window.localStorage.setItem("k",1)
       location.href="index.html"
  }, error:(e) => {alert(e)}
    });
    window.localStorage.setItem("k",1);
    window.localStorage.setItem("ROLL",1);
  document.getElementById("Intro1").className="nav-item";
  document.getElementById("intro2").className="nav-item intro-tag";
  
}
