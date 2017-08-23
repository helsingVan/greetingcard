/**
 * @file clock.js
 *
 *
 */

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var ctxWidth = canvas.clientWidth;
var ctxHeight = canvas.clientHeight;
var r = ctxWidth/2-10;

var drawCircle = function() {
	
 	
 	ctx.save();
 	ctx.beginPath();
 	ctx.lineWidth = 10;
 	ctx.arc(0,0,r,0,2*Math.PI);
 	ctx.stroke();
 	ctx.restore();
};

var drawNumber = function() {
    var numberArr = [3,4,5,6,7,8,9,10,11,12,1,2];
    var hu,x,y;
    ctx.save();
    numberArr.forEach(function(number,index) {
    	hu = index * Math.PI/6;
    	x = Math.cos(hu) * (r-38);
    	y = Math.sin(hu) * (r-38);
    	ctx.font = '20px microsoft yahei';
    	ctx.textAlign = 'center';
    	ctx.textBaseline = 'middle';
    	ctx.fillText(number,x,y);
    });
    ctx.restore();
}

var drawDot = function() {
	var x,y,hu,dotR;
	ctx.save();
	for(var i=0;i<60;i++) {
		hu = i*Math.PI/30;
		x = Math.cos(hu) * (r-20);
		y = Math.sin(hu) * (r-20);
		ctx.beginPath();
		if(i%5 === 0) {
			dotR = 4;
		}else {
			dotR = 2;
		}
		ctx.arc(x,y,dotR,0,2*Math.PI);
		ctx.fill();
	}
	ctx.restore();
}

var drawHour = function(hour,minute) {
	var hu1 = 2*Math.PI/12 * (hour);
	var hu2 = 2*Math.PI/12/60 * (minute);
	ctx.save();
	ctx.beginPath();
	ctx.lineCap = 'round';
	ctx.lineWidth = 10;
	ctx.rotate(hu1+hu2);
	ctx.moveTo(0,10);
	ctx.lineTo(0,-r/2);
	ctx.stroke();
	ctx.restore();
}
var drawMinute = function(minute) {
	var hu = 2*Math.PI/60 * (minute);
	ctx.save();
	ctx.beginPath();
	ctx.lineCap = 'round';
	ctx.lineWidth = 8;
	ctx.rotate(hu);
	ctx.moveTo(0,10);
	ctx.lineTo(0,-r/1.5);
	ctx.stroke();
	ctx.restore();
}
var drawSecond = function(second) {
	var hu = 2*Math.PI/60 * (second);
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = 'red';
	ctx.rotate(hu);
	ctx.moveTo(-2,10);
	ctx.lineTo(2,10);
	ctx.lineTo(1,-r/1.8);
	ctx.lineTo(-1,-r/1.3);
	ctx.fill();
	ctx.restore();
}
var drawCenterDot = function() {
	ctx.save();
	ctx.beginPath();
	ctx.arc(0,0,4,0,2*Math.PI);
	ctx.fillStyle = '#fff';
	ctx.fill();
	ctx.restore();
}

var draw = function() {

	ctx.clearRect(0,0,ctxWidth,ctxHeight);
	ctx.save();
	ctx.translate(ctxWidth/2,ctxHeight/2);
	drawCircle();
	drawNumber();
	drawDot();

	var time = new Date();
	var hour = time.getHours();
	var minute = time.getMinutes();
	var second = time.getSeconds();

	drawHour(hour,minute);
	drawMinute(minute);
	drawSecond(second);
	drawCenterDot();
	ctx.restore();
};

draw();
setInterval(function(){
	draw();
},1000)