get_req()
function get_req(){ return new Promise((res, rej) => {
    $.get("http://127.0.0.1:9999/a", function(data, status){
        res(console.log(data));
        count=1
        for(let i=0; i<data.length; i++){

            if(data[i].isInstructor!=null && data[i].isInstructor=='pending'){
 
            
            document.querySelector('#all_instructors').innerHTML+=`<tr class="inner-box">
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
            <div class="categories">
                <button id="showpdf" class="btn-primary" onclick="showpdf()" class="quiz-button">Show PDF</button>
              <object id="pdfobject" class="pdfobject" style="visibility: hidden;" data="" width="800px" height="100%"><button class="close-button" onclick="closeVideo()">close</button>
            </object>
            </div>
            </div><button id=showpdf" onclick="resume()" value="Resume">Resume</button>
            <embed id="resume" class = "resume" src="${data[i].Resume}" style="visibility: hidden;" width="100%" height ="100%"><button class="close-button" onclick="closeVideo()">close</button></embed>
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
            </div>`
            count=count+1
        }}
        
            console.log("onedone")
        //     abtn = document.getElementById("accept-button"+email)
        //     rbtn = document.getElementById("reject-button"+email)
        const ss = document.getElementById("all_instructors")
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