var modal = document.getElementById('myModal'); // container
var span = document.getElementsByClassName('close')[0];

// populate modal
// excellent: https://www.kirupa.com/html5/handling_events_for_many_elements.htm
function grabText(e) {
  if (e.target !== e.currentTarget) {
    var parent = e.target.parentNode;
    var id = parent.id;
    var entry = document.getElementById(id);
    //preview text
    var para = entry.querySelector('p');
    var preview = document.getElementsByClassName('preview-text')[0];
    preview.textContent = 'Text Preview: ' + para.textContent.substr(0, 199) + '..."';
    //title
    var h3 = entry.querySelector('h3');
    var title = document.getElementsByClassName('title')[0];
    title.textContent = h3.textContent;
    //pic caption
    var num = entry.getAttribute('data-item-number');
    var numMsg = function() {
      if (num === 'none') {
        return '<div class="num-msg">No artifact currently exists for this event.</div>';
      } else {
        return '<div class="num-msg">Item #' + num + '</div>';
      }
    }
    //link href
    var link = document.getElementsByClassName('link')[0];
    link.setAttribute('href', 'http://takeback.scholarslab.org/items/show/' + num);
    //pic
    var img = entry.querySelector('img').cloneNode();
    img.style.height = '400px';
    var pic = document.getElementsByClassName('pic')[0];
    pic.innerHTML = img.outerHTML + numMsg();
    //container height
    var container = document.getElementsByClassName('modal-content')[0];
    var height = pic.getBoundingClientRect().height;
    container.style.height = height;
  }
  e.stopPropagation();
}
// execute w/ bubbling:
var theParent = document.querySelector("#theDude");
theParent.addEventListener("click", grabText);
//open:
var btns = document.querySelectorAll("button");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    modal.style.display = "block";
  });
}
//close:
span.addEventListener('click', function() {
  modal.style.display = "none";
});
function closeModal(event) {
  if (event.target == modal) { // height/width = 100%
    modal.style.display = "none";
  }
}
window.addEventListener('click', closeModal);
