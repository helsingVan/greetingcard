// 海葵
function Haikui() {
  this.x = [];
  this.y = [];
  this.num = 50;
}
Haikui.prototype.init = function() {
  for(var i=0;i<this.num;i++) {
  	this.x[i] = i * 15 + Math.random() * 20;
  	this.y[i] = 100 + Math.random() * 50;
  }
};
Haikui.prototype.draw = function() {
  ctx2.save();
  ctx2.globalAlpha = 1;
  ctx2.lineWidth = 20;
  ctx2.lineCap = 'round';
  ctx2.strokeStyle = '#fff';
  for(var i=0;i<50;i++) {
  	ctx2.beginPath();
  	ctx2.moveTo(this.x[i],canHeight);
  	ctx2.lineTo(this.y[i],canHeight - this.y[i]);
  	
  	ctx2.stroke();
  }
  ctx2.restore();
};

// 果实
function FruitClass() {
  this.alive = [];
  this.x = [];
  this.y = [];
  this.orange = new Image();
  this.blue = new Image();
}
FruitClass.prototype.num = 30;
FruitClass.prototype.init = function() {
  for(var i = 0;i<this.num;i++) {
    this.alive[i] = true;
    // this.x[i] = 0;
    this.born(i);
  }
  this.orange.src = './image/fruit.png';
  this.blue.src = './image/blue.png';
};
FruitClass.prototype.draw = function() {
  var self = this;
  for(var i=0;i<this.num;i++) {
    this.orange.onload = function() {
      
      ctx2.drawImage(self.orange,10,10);
      
    }
    
  }
};
FruitClass.prototype.born = function(i) {
  var haikuiId = Math.floor(Math.random() * haikui.num);
  this.x[i] = haikui.x[haikuiId];
  this.y[i] = canHeight - haikui.y[haikuiId];
}
