/**
 * @author Cory
 */
var canvas = document.getElementById("gamecanvas");
var ctx = canvas.getContext("2d");
var img = new Image();
img.onload = function () {
	ctx.drawImage(img,300,300);
}
img.src = "img/NES_Battle_Citty_Eagle.gif";


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
/*

function GameEngine () {
	this.entities = [];
	this.ctx = null;
	this.surfaceWidth = null;
    this.surfaceHeight = null;
  }

GameEngine.prototype.init = function (ctx) {
	console.log('game initialized');
	this.ctx = ctx;
	this.surfaceWidth = this.ctx.canvas.width;
	this.surfaceHeight = this.ctx.canvas.height;
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
	this.ctx.drawImage(Tank.sprite,Tank.x,Tank.y);
}

GameEngine.prototype.update = function (){
	console.log('updated');
}

GameEngine.prototype.loop = function () {
	var now = Date.now();
	this.ctx = ctx;
	this.deltaTime = now - this.lastUpdateTimestamp;
	this.update();
	this.draw();
	this.lastUpdateTimestamp = now;
}


GameEngine.init(ctx);
GameEngine.start();
*/
