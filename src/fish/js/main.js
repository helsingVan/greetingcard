
var can1 = document.querySelector('#c1');
var can2 = document.querySelector('#c2');
var ctx1 = can1.getContext('2d');
var ctx2 = can2.getContext('2d');
var canHeight = can2.clientHeight;
console.log(canHeight);
// var lastTime = Date.now();
// var deltaTIme = 0;
var haikui = new Haikui();
haikui.init();
var fruit = new FruitClass();
fruit.init();
console.log(fruit);

var game = {
	init: function() {
	  
	  var backgroundImage = new Image();
	  backgroundImage.src = './image/background.jpg';

	  backgroundImage.onload = function() {
	  	ctx2.drawImage(backgroundImage,0,0);
	  }


	  gameLoop();
	}
}

// 帧绘制
function gameLoop() {
  // var now = Date.now();
  // deltaTime = now - lastTime;
  // lastTime = now;

  fruit.draw();
 
  // requestAnimFrame(gameLoop);
}







game.init();