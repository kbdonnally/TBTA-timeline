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
    // below: slow b/c innerHTML, fix if possible
    preview.innerHTML = '<b>Text Preview:</b> ' + para.textContent.substr(0, 151) + '...';
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
    var img = entry.querySelector('img');
    var pic = document.getElementsByClassName('pic')[0];
    if (img !== null) {
      var modalImage = img.cloneNode();
      modalImage.height = '300'; // glitches if px
      pic.innerHTML = modalImage.outerHTML + numMsg();
      pic.style.lineHeight = 'normal';
    }
    else {
      pic.innerHTML = 'No image yet exists for this event.';
      pic.style.lineHeight = '250px';
    }
    //container height
    var container = document.getElementsByClassName('modal-content')[0];
    var height = pic.getBoundingClientRect().height;
    container.style.height = height;
    console.log(height);
  }
  e.stopPropagation();
}
// execute w/ bubbling:
var theParent = document.querySelector("#theDude");
theParent.addEventListener("click", grabText);
//open:
var btns = theParent.querySelectorAll("button");
for (var i = 0; i < btns.length; i++) {
  if (btns[i].class ==='btn' || btns[i].id === 'toggle-on') {
    continue;
  }
  btns[i].addEventListener("click", function() {
    modal.style.display = "block";
  });
}
//close:
function closeModal(event) {
  if (event.target == modal) { // height/width = 100%
    modal.style.display = "none";
  }
}
window.addEventListener('click', closeModal);

// lazy load images:
// https://developers.google.com/web/updates/2016/04/intersectionobserver

//button
var sidebarCtrls = (function() {
  var btn = document.getElementsByClassName('btn')[0];
  var sidebar = document.getElementsByClassName('sidebar')[0];
  var main = document.getElementsByClassName('main')[0];
  var clear = document.getElementsByClassName('clear')[0];

  sidebar.addEventListener('mouseenter', function() {
    btn.classList.toggle('show');
  });
  sidebar.addEventListener('mouseleave', function() {
    btn.classList.toggle('show');
  });
  // show button when hover on sidebar,
  // hide button when leave sidebar
  btn.addEventListener('click', function(e) {
    sidebar.classList.toggle('hide-sidebar');
    btn.classList.toggle('hide');
    main.classList.toggle('margin-main');
    //if (btn.classList[2] === 'hide' && sidebar.classList.length === 2) {
      //btn.classList.remove('hide');
      //btn.classList.add('show');
    //}
    //if (btn.style.right !==)
  });
  // click button -> hide sidebar
  function showButton(e) {
    if (sidebar.classList.length === 2 && e.clientX/window.innerWidth > .9) {
        btn.classList.toggle('hide');
        btn.classList.toggle('ready-to-show');
    }
    console.log(btn.classList);
  }
  clear.addEventListener('mouseenter', showButton);
  clear.addEventListener('mouseleave', showButton);
  //
}());
