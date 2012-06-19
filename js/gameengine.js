/**
 * @author Cory
 */
var canvas = document.getElementById("gamecanvas");
var ctx = canvas.getContext("2d");

window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
})();


function GameEngine () {
	this.entities = [];
	this.ctx = null;
	this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.tank = null;
    
  }

GameEngine.prototype.init = function (ctx) {
	console.log('game initialized');
	this.ctx = ctx;
	this.surfaceWidth = this.ctx.canvas.width;
	this.surfaceHeight = this.ctx.canvas.height;
	this.tank = new Tank(this.surfaceWidth/2,this.surfaceHeight/2);
	this.bird = new Eagle(Math.random()*this.surfaceWidth,Math.random()*this.surfaceHeight);
}

GameEngine.prototype.start = function() {
	console.log('battle started');
	GE = this;
	(function gameLoop() {
		GE.loop();
		requestAnimFrame(gameLoop,GE.ctx.canvas);
	})();
}


   

GameEngine.prototype.draw = function () {
	this.ctx.clearRect(0,0,this.surfaceWidth,this.surfaceHeight);
	this.ctx.save();
	this.ctx.drawImage(this.tank.sprite,this.tank.x,this.tank.y);
	this.ctx.drawImage(this.bird.sprite,this.bird.x,this.bird.y);
}

GameEngine.prototype.update = function (){
	console.log('updated');
}

GameEngine.prototype.loop = function () {
	var now = Date.now();
	this.deltaTime = now - this.lastUpdateTimestamp;
	this.update();
	this.draw();
	this.lastUpdateTimestamp = now;
}

var GEObj = new GameEngine()
GEObj.init(ctx);
GEObj.start();

