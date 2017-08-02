function random(min, max) {
  var num = Math.floor(Math.random()*(max - min + 1))// + min;
  return num;
}

function color(opacity) {
  return 'rgba(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ',' + opacity + ')';
}


var divs = document.getElementsByTagName('div');
window.onload = function() {
  //var divs = document.getElementsByTagName('div');
  for (var i=0; i < divs.length; i++) {
    divs[i].style.backgroundColor = color(1);
  }
}

function runsOnScroll() {
  if (divs[0].scrollTop >= 20) {
      divs[7].textContent = 'SCROLLED!';
      console.log(divs[0].scrollTop);
    }
  var num = window.scrollY;
  console.log(num);
}

window.addEventListener('scroll', runsOnScroll);
