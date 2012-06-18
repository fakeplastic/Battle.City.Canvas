/**
 * @author Cory
 */
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

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var tank = new Tank(canvas.width/2,canvas.height/2);
  
var bird = new Eagle(canvas.width/2,canvas.height/2);


function GameEngine () {
	this.entities = [];
	this.ctx = null;
	this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
   }

GameEngine.prototype.draw = function(callback) {
	this.ctx.clearRect(0,0,this.surfaceWidth,this.surfaceHeight);
	this.ctx.drawImage(tank.sprite,tank.x,tank.y);
}

GameEngine.prototype.update = function (){
	
}

GameEngine.prototype.loop = function () {
	var now = Date.now();
	this.ctx = ctx;
	this.deltaTime = now - this.lastUpdateTimestamp;
	this.update();
	
	this.draw();
	this.lastUpdateTimestamp = now;
	var GE = this;
	(function gameLoop() {
		GE.loop();
		requestAnimFrame(gameLoop,GE.ctx.canvas);
	})();
	
GameEngine.loop();
};
