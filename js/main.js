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
  console.log(btns[i].classList);
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
/* NB: should lazy load images:
https://developers.google.com/web/updates/2016/04/intersectionobserver */
// ALSO COOL CSS STUFF: https://davidwalsh.name/ways-css-javascript-interact
// end modal

// start sidebar
var sidebarCtrls = (function() {
  var btn = document.getElementsByClassName('btn')[0];
  var sidebar = document.getElementsByClassName('sidebar')[0];
  var main = document.getElementsByClassName('main')[0];
  var btnZone = document.getElementsByClassName('btn-zone')[0];
  // show button when hover on sidebar:
  sidebar.addEventListener('mouseenter', function() {
    btn.classList.remove('eight-rem');
    btn.classList.add('ten-rem', 'black-text');
    console.log(sidebar.getBoundingClientRect(), btn.getBoundingClientRect());
  });
  sidebar.addEventListener('mouseleave', function() {
    btn.classList.remove('ten-rem', 'black-text');
    btn.classList.add('eight-rem');
  });
  // show button when hover on btn-zone: (sidebar hidden)
  btnZone.addEventListener('mouseenter', function(e) {
    if (sidebar.classList.length === 3 /*&& e.clientX/window.innerWidth > .9*/) {
      btn.classList.remove('neg2-rem');
      btn.classList.add('zero-rem');
    }
  });
  btnZone.addEventListener('mouseleave', function(e) {
    if (sidebar.classList.length === 3 /*&& e.clientX/window.innerWidth > .9*/) {
      btn.classList.remove('zero-rem');
      btn.classList.add('neg2-rem');
    }
  });
  // show/hide sidebar w/ button:
  btn.addEventListener('click', function() {
    if (btn.classList.contains('zero-rem')) {
      btn.classList.remove('zero-rem');
      btn.classList.add('ten-rem');
    } else {
      btn.classList.remove('ten-rem');
      btn.classList.add('neg2-rem');
    }
    sidebar.classList.toggle('hide-sidebar');
    main.classList.toggle('main-margin-right');
    console.log(main.classList);
  });
}());

// fingers crossed:
(function () {
  var main = document.getElementsByClassName('main')[0];
  var sidebar = document.getElementsByClassName('sidebar')[0];
  var btn = document.getElementsByClassName('btn')[0];
  var init = main.getBoundingClientRect().top;
  console.log(init);
//  window.addEventListener('scroll', function() {
    console.log();
    //if (document.body.scrollTop >= init - window.innerHeight) {
      sidebar.classList.add('fixed');
      main.classList.add('margin');
      btn.classList.add('btn-visible');
  /*  } else if (document.body.scrollTop < init - window.innerHeight) {
      sidebar.classList.remove('fixed');
      main.classList.remove('margin');
      btn.classList.remove('btn-visible');
    }
  }); */
}());
