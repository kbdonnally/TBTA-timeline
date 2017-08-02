var modal = document.getElementById('myModal'); // container
var btn = document.getElementById('myBtn'); // button
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

// generate content

var pic = document.getElementsByClassName('pic')[0];
var container = document.getElementsByClassName('modal-content')[0];
var height = window.getComputedStyle(pic).getPropertyValue('height');
container.style.height = height;
console.log(height);
