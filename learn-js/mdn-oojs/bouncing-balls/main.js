// set up canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// shape constructor

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

// ball constructor

function Ball(x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists);
  this.color = color;
  this.size = size;
}
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;
// draw ball
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
  ctx.fill();
}
// move ball
Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }
  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }
  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }
  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}
// collision detection
Ball.prototype.collisionDetect = function() {
  for (var j=0; j<balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx*dx + dy*dy);
      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')';
      }
    }
  }
}

// evil circle constructor
function EvilCircle(x, y) {
  Shape.call(this, x, y); // nb: only need to call properties you want
  // remember: you're selecting what parts of a fxn definition you want to use
  this.velX = 20;
  this.velY = 20;
  this.color = 'white';
  this.size = 10;
}
EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;
// evil draw
EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
  ctx.stroke();
}
// keep inside canvas
EvilCircle.prototype.checkBounds = function() {
  if ((this.x + this.size) >= width) {
    this.x -= this.size;
  }
  if ((this.x - this.size) <= 0) {
    this.x += this.size;
  }
  if ((this.y + this.size) >= height) {
    this.y -= this.size;
  }
  if ((this.y - this.size) <= 0) {
    this.y += this.size;
  }
}
// set keyboard controls
EvilCircle.prototype.setControls = function() {
  var _this = this;
  function keyControls(e) { // e = keyboard event
    if (e.code === 'ArrowLeft') {
      _this.x -= _this.velX;
    } else if (e.code === 'ArrowRight') {
      _this.x += _this.velX;
    } else if (e.code === 'ArrowUp') {
      _this.y -= _this.velY;
    } else if (e.code === 'ArrowDown') {
      _this.y += _this.velY;
    }
  }
  window.addEventListener('keydown', keyControls);
}
// eat ball if collide
EvilCircle.prototype.collisionDetect = function() {
  for (var j=0; j<balls.length; j++) { // var = j b/c copied skeleton from Ball
    if (balls[j].exists === true) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx*dx + dy*dy);
      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
      }
    }
  }
}

// ANIMATION TIME //

var villain = new EvilCircle(random(0,width), random(0,height));
var balls = [];
var para = document.querySelector('p');
var span = document.createElement('span');

para.appendChild(span); // count goes here
villain.setControls(); // arrow controls

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,.25)'; // canvas bg color
  ctx.fillRect(0, 0, width, height); // canvas size and origin

  villain.draw();
  villain.checkBounds();
  villain.collisionDetect();

  while (balls.length < 25) {
    var ball = new Ball( // x,y start; x,y px/frame; color; radius
      random(0,width),
      random(0,height),
      random(-7,7),
      random(-7,7),
      true,
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')',
      random(10,20)
    );
    balls.push(ball); // add ball to bucket
  }

  var count = 0;
  for (var i=0; i<balls.length; i++) { // for each ball: draw, then update spatial data to use next loop
    if (balls[i].exists === true) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
      count += 1;
    }
  }
  span.textContent = count; // update # balls that exist
  requestAnimationFrame(loop); // call definition of this function
}

loop(); // start animation
