const left = document.querySelector('.left');
const right = document.querySelector('.right');
const bar = document.querySelector('.bar');
const editor = document.querySelector('.editor');
const run = document.querySelector('.btn-run');
const iframe = document.querySelector('.iframe');
const darkMode = document.querySelector('.btn-dark');
const lightMode = document.querySelector('.btn-light');

const drag = (e) => {
  e.preventDefault();
  document.selection ? document.selection.empty() : window.getSelection().removeAllRanges();
  left.style.width = (e.pageX - bar.offsetWidth / 2) + 'px';
  editor.style.width = left.offsetWidth + 'px';
};

bar.addEventListener('mousedown', () => {
  document.addEventListener('mousemove', drag);
});

document.addEventListener('mouseup', () => {
  document.removeEventListener('mousemove', drag);
});

run.addEventListener('click', () => {
  const html = editor.textContent;
  iframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
});



darkMode.addEventListener('click', () => {
  editor.style.backgroundColor = '#353836';
  editor.style.color = '#eee';
});


lightMode.addEventListener('click', () => {
  editor.style.backgroundColor = '';
  editor.style.color = '';
});

document.querySelector('.live input[type="checkbox"]').onclick = function () {
  if (this.checked) {
    editor.addEventListener('input', onInput);
  } else {
    editor.removeEventListener('input', onInput);
  }
};

function onInput() {
  const html = editor.textContent;
  iframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);


}


$(document).ready(function() {
    var placeholder = "Start From Here"; //Change this to your placeholder text

    $("#editordiv").on("focus click", function() {
        if ($(this).html().trim() == placeholder) {
            $(this).html("");
        }
    }).on("focusout", function() {
        if (!$(this).html().trim().length) {
            $(this).html(placeholder);
        }
    });
});

