/* Image gallery from Mozilla tutorial */

var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

function setBigImage(e) {
  var src = e.target.getAttribute('src');
  displayedImage.setAttribute('src', src);
}

/* Looping through images */
for (var i=1; i<=5; i++) {
  var newImage = document.createElement('img');
  newImage.setAttribute('src', "images/pic" + i + ".jpg");
  newImage.addEventListener('click', setBigImage);
  thumbBar.appendChild(newImage);
}

/* Wiring up the Darken/Lighten button */
function lightOrDark() {
  var setClass = function(className) {
    btn.setAttribute('class', className);
  };
  var text = function(content) {
    btn.textContent = content;
  };
  var rgba = function(content) {
    overlay.style.backgroundColor = 'rgba(0,0,0,' + content + ')';
  };
  switch (btn.getAttribute('class')) {
    case 'dark':
      text('Lighten')
      rgba('.5');
      console.log('test1');
      setClass('light');
      break;
    case 'light':
      text('Darken');
      rgba('0');
      console.log('test2');
      setClass('dark');
      break;
  }
}
/* NB: in future, could make function where these variables are called and
   you just fill out their values, e.g. changeButton(text,rgba,setClass).
   May even build objects this way, as in constructor? Still a litttle confused
   on how to use objects, but this seems relevant re setting properties */

btn.addEventListener('click', lightOrDark);
