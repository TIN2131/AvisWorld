var canvas = document.getElementById('drawArea');
var ctx = canvas.getContext('2d');

var drawing = false;

canvas.addEventListener('mousedown', function(e) {
  drawing = true;
  draw(e);
});

canvas.addEventListener('mousemove', function(e) {
  if (drawing === true) {
    draw(e);
  }
});

canvas.addEventListener('mouseup', function(e) {
  if (drawing === true) {
    draw(e);
    drawing = false;
  }
});

function draw(e) {
  var rect = canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  ctx.fillRect(x, y, 5, 5);
}

document.getElementById('clearButton').addEventListener('click', function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
