var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

var w = (canvas.width = innerWidth);
var h = (canvas.height = innerHeight);

// Variables
var mouse = {
   x: undefined,
   y: undefined
};

var colors = [
   "#5a0f57",
   "#000000",
   "#FFE451",
   "#a7b0ac",
   "#399263"
   
];

// Event Listeners
addEventListener("mousemove", function(event) {
   mouse.x = event.clientX;
   mouse.y = event.clientY;
});

addEventListener("resize", function() {
   w = canvas.width = innerWidth;
   h = canvas.height = innerHeight;
   init();
});

// Utility Functions
function randomIntFromRange(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
   return colors[Math.floor(Math.random() * colors.length)];
}

function Dot(x, y, color) {
   this.x = x;
   this.y = y;
   this.dx = x;
   this.dy = y;
   this.color = color;
   this.radius = 6;
   
//    this.distanceFromCenter = randomIntFromRange(50, 120);
}
Dot.prototype.update = function() {
   var rad = 50;
   var disX = mouse.x - this.x;
   var disY = mouse.y - this.y;
   var ds =  Math.sqrt(disX * disX + disY * disY);
   var angle = Math.atan2(disY, disX) ;
   // var dist = rad / ds;
   if (ds < rad) {
      this.x += Math.cos(angle) * ds * 0.1;
      this.y += Math.sin(angle) * ds * 0.1;
   }
   this.draw();
};
Dot.prototype.draw = function() {
   c.beginPath();
   c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
   c.fillStyle = this.color;
   c.fill();
   c.closePath();
};

var dots = [];
var spacing = 20;

function init() {
   dots = [];
   for (var x = spacing / 2; x < w; x += spacing) {
      for (var y = spacing / 2; y < h; y += spacing) {
         var color = randomColor(colors);
         var dot = new Dot(x, y, color);
         dots.push(dot);
         dot.draw();
      }
   }
}

function animate() {
   c.clearRect(0, 0, canvas.width, canvas.height);
   dots.forEach(dot => {
      dot.update();
   });
   requestAnimationFrame(animate);
}

init();
animate();
