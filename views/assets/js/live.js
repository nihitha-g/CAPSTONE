const form = document.querySelector('#meeting-form');


form.addEventListener('submit', e => {
  e.preventDefault();
  
  const title = form.querySelector('#meeting-title').value;
  const date = form.querySelector('#meeting-date').value;
  const time = form.querySelector('#meeting-time').value;
  const duration = form.querySelector('#meeting-duration').value;
  const link = form.querySelector('#meeting-link').value;
  
  const data = {
   title: title,
    date:date,
    time:time,
    duration:duration,
    link:link
  };
  console.log(data)
 const dat=JSON.stringify(data)
 $.ajax({
  method: "POST",
   contentType: "application/json",
   data: dat,
  url: 'http://127.0.0.1:9999/live',
  success: function(response) {
    console.log(response);
  },
  error: function(xhr, status, error) {
    console.error(error);
  }
});
})