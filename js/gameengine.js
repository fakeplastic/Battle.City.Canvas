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
    this.bird = null;
    this.playerbullets = [];
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

GameEngine.prototype.fkeydown = function(e) {
	if(e.keyCode == 38) {
      console.log("up pressed");
      GEObj.tank.moveUp();
    }
    if(e.keyCode == 40) {
    	console.log("down pressed");
      GEObj.tank.moveDown();
    }
    if(e.keyCode == 39) {
    	console.log("right pressed");
      GEObj.tank.moveRight();
    }
    if(e.keyCode == 37) {
    	console.log("left pressed");
      GEObj.tank.moveLeft();
	}
	}
GameEngine.prototype.fkeypress = function(e) {
	if(e.keyCode == 32) {
      console.log("fire");
      GEObj.tank.moveUp();
	}   

GameEngine.prototype.draw = function () {
	this.ctx.clearRect(0,0,this.surfaceWidth,this.surfaceHeight);
	this.ctx.save();
	this.ctx.drawImage(this.tank.sprite,this.tank.x,this.tank.y);
	this.ctx.drawImage(this.bird.sprite,this.bird.x,this.bird.y);
}

GameEngine.prototype.update = function (){
	console.log('updated');
	document.body.addEventListener('keydown',this.fkeydown, false);
	document.body.addEventListener('keypress',this.fkeypress, false);
	};

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