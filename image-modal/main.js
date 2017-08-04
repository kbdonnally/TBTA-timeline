var modal = document.getElementById('myModal'); // container
var btn = document.getElementById('test'); // button
var span = document.getElementsByClassName('close')[0];

// open/close

btn.addEventListener('click', function() {
  modal.style.display = "block";
});

span.addEventListener('click', function() {
  modal.style.display = "none";
});

function closeModal(event) {
  if (event.target == modal) { // height/width = 100%
    modal.style.display = "none";
  }
}
window.addEventListener('click', closeModal);

// populate modal text
// excellent: https://www.kirupa.com/html5/handling_events_for_many_elements.htm
function grabText(e) {
  var btnParent = e.target.parentNode;
  var id = btnParent.id;
  var entry = document.getElementById(id);
  //preview
  var para = entry.querySelector('p');
  var preview = document.getElementsByClassName('preview-text')[0];
  preview.textContent = 'Text Preview: ' + para.textContent.substr(0, 199) + '..."';
  //title
  var h3 = entry.querySelector('h3');
  var title = document.getElementsByClassName('title')[0];
  title.textContent = h3.textContent;
  //pic
  var img = entry.querySelector('img').cloneNode();
  img.style.height = '400px';
  var pic = document.getElementsByClassName('pic')[0];
  pic.innerHTML = img.outerHTML;
  //container height
  var container = document.getElementsByClassName('modal-content')[0];
  var height = pic.getBoundingClientRect().height;
  container.style.height = height;
}
btn.addEventListener('click', grabText);

var theParent = document.querySelector("#theDude");
theParent.addEventListener("click", doSomething, false);

function doSomething(e) {
    if (e.target !== e.currentTarget) {
        var clickedItem = e.target.id;
        alert("Hello " + clickedItem);
    }
    e.stopPropagation();
}
