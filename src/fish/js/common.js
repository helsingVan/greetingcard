
var canvas = document.getElementById('context');
var container = document.querySelector('.container');
var width = 0;
var height = 0;

function resizeCanvas() {
  width = container.clientWidth;
  height =container.clientHeight;
  canvas.width = width;
  canvas.height = height;
}

window.onresize = function() {
	resizeCanvas();
}

resizeCanvas();