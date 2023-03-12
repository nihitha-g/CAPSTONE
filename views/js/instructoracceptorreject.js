get_req()
function get_req(){ return new Promise((res, rej) => {
    $.get("http://127.0.0.1:9999/a", function(data, status){
        res(console.log(data));
        count=1
        for(let i=0; i<data.length; i++){

            if(data[i].isInstructor!=null && data[i].isInstructor=='pending'){
 
            
            document.querySelector('#instructorslist').innerHTML+=`<tr class="inner-box">
            <th scope="row">
            <div class="event-date">
            <span>${count}</span>
            </div>
             </th>
            <td>
            <div class="event-wrap" >
            <h3><a href="#">${data[i].userName}</a></h3>
            <div class="meta">
            <div class="organizers">
            <a href="#">${data[i].addSummary}</a>
            </div>
            <div class="time">
            <span id="${data[i].email}">${data[i].email}</span>
            </div>
            
            </div><button id=showpdf" class="btn btn-primary-soft" onclick="resume()" value="Resume">Resume</button>
            <embed id="resume" class = "resume" src="${data[i].Resume}" style="display: none;" width="100%" height ="100%"><button class="btn btn-danger-soft" onclick="closeVideo()">close</button></embed>
            </td>
            <td>
            <div class="r-no">
            <span>${data[i].isInstructor}</span>
            </div>
            </td>
            <td>
            <div class="primary-btn">
            <a class="btn btn-success"  name="ab" id="${data[i]._id}" href="#">Accept</a>
            <a class="btn btn-danger-soft"  name="rb" id="${data[i]._id}" href="#">Reject</a>
            </div>
            </td>
            </tr>
            `
            count=count+1
        }}
        
            console.log("onedone")
        //     abtn = document.getElementById("accept-button"+email)
        //     rbtn = document.getElementById("reject-button"+email)
        const ss = document.getElementById("instructorslist")
        console.log(ss)
        ss.addEventListener("click",(e) => {
            if(e.target.nodeName==='A' && (e.target.name === "ab" || e.target.name === "rb"))
            {
                const email = e.target.email
                console.log(email)
                const id = e.target.id
                console.log(id)
            if(e.target.name === "ab"){
                    const obj = {
                            _id:id,
                            task:"Approve"
                    }
                    let ins=JSON.stringify(obj);
                    console.log("accept",ins)
                    $.ajax({
                        "method":"POST",contentType:"application/json",'data':ins,'url':'http://127.0.0.1:9999/a/acceptOrReject',
                    "success":(e)=>{console.log("sucessfully accepted")},error:(e)=>{alert(e)}
                    }); 
                    location.reload()
            }else if(e.target.name === "rb"){
                    var obj = {
                            _id:id,
                            task:"Decline"
                    }
                    let ins=JSON.stringify(obj);
                    $.ajax({
                        "method":"POST",contentType:"application/json",'data':ins,'url':'http://127.0.0.1:9999/a/acceptOrReject',
                    "success":(e)=>{console.log("sucessfully rejected")},error:(e)=>{alert(e)}
                    });  
                    location.reload()
            }
            }
        })    
})
})
}


function resume() {
    var resume = document.getElementById("resume");
    var showResumeButton = document.getElementById("showpdf");
    if (resume.style.display === "none") {
      resume.style.display = "block";
      showResumeButton.innerText = "Hide Resume";
    } else {
      resume.style.display = "none";
      showResumeButton.innerText = "Show Resume";
    }
  }
  function closeVideo() {
    var resume = document.getElementById("resume");
    var showResumeButton = document.getElementById("showResume");
    resume.style.display = "none";
    showResumeButton.innerText = "Show Resume";
  }
  