  window.onload=function(){
      if(window.localStorage.getItem("k")!=null && window.localStorage.getItem("k")!=1){
          document.getElementById("intro1").className="nav-item intro";
          document.getElementById("intro2").className="nav-item";
          // document.getElementById("intro3").className="nav-item";
          // var ans=JSON.parse(window.localStorage.getItem("k"));
          document.getElementById("user").innerHTML="Hello "+localStorage.getItem("k")+"!";
      }
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
