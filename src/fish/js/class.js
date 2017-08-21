// 海葵
function Haikui() {
  this.x = [];
  this.y = [];
  this.num = 50;
}
Haikui.prototype.init = function() {
  for(var i=0;i<this.num;i++) {
  	this.x[i] = i * 16 + Math.random() * 20;
  	this.y[i] = 100 + Math.random() * 50;
  }
};
Haikui.prototype.draw = function() {
  ctx2.save();
  ctx2.globalAlpha = 0.5;
  ctx2.lineWidth = 20;
  ctx2.lineCap = 'round';
  ctx2.strokeStyle = '#ff7800';
  for(var i=0;i<50;i++) {
  	ctx2.beginPath();
  	ctx2.moveTo(this.x[i],canHeight);
  	ctx2.lineTo(this.x[i],canHeight - this.y[i]);
  	
  	ctx2.stroke();
  }
  ctx2.restore();
};

// 果实
function FruitClass() {
  this.alive = [];
  this.x = [];
  this.y = [];
  this.l = [];
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
  for(var i=0;i<self.num;i++) {
    if(self.l[i] < 14) {
      self.l[i] += 0.01*deltaTime;
      
    }else {
      // this.y[i] -= 0.1 * deltaTime;
    }
    ctx2.drawImage(self.orange,
        self.x[i] - self.l[i]*0.5,
        self.y[i] - self.l[i],
        self.l[i],
        self.l[i]);
    ctx2.clearRect(self.x[i]-self.l[i]*0.5,
      self.y[i],
      self.l[i],
      self.l[i]);
  }
};
FruitClass.prototype.born = function(i) {
  var haikuiId = Math.floor(Math.random() * haikui.num);
  this.x[i] = haikui.x[haikuiId];
  this.y[i] = canHeight - haikui.y[haikuiId];
  this.l[i] = 0;
}
