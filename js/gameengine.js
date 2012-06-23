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
    this.p1tank = null;
    this.bird = null;
    this.p1bullets = [];
    this.p1lastfired = null;
  }

GameEngine.prototype.init = function (ctx) {
	console.log('game initialized');
	this.ctx = ctx;
	this.ctx.scale(2,2);
	this.surfaceWidth = this.ctx.canvas.width/2;
	this.surfaceHeight = this.ctx.canvas.height/2;
	this.p1tank = new Tank(this.surfaceWidth/2,this.surfaceHeight/2);
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
      GEObj.p1tank.moveUp();
    }
    if(e.keyCode == 40) {
    	console.log("down pressed");
      GEObj.p1tank.moveDown();
    }
    if(e.keyCode == 39) {
    	console.log("right pressed");
      GEObj.p1tank.moveRight();
    }
    if(e.keyCode == 37) {
    	console.log("left pressed");
      GEObj.p1tank.moveLeft();
	}
	if(e.keyCode == 32) {
      console.log("fire");
      if((Date.now() - GEObj.p1lastfired) > 300) {
      var bullet = new Bullet(GEObj.p1tank.x,GEObj.p1tank.y,GEObj.p1tank.direction);
      GEObj.p1bullets.push(bullet);
      GEObj.p1lastfired = Date.now();
      }
	}
	}
GameEngine.prototype.fkeyup = function(e) {
	
	}   

GameEngine.prototype.draw = function () {
	this.ctx.clearRect(0,0,this.surfaceWidth,this.surfaceHeight);
	this.ctx.drawImage(this.p1tank.sprite,this.p1tank.x-this.p1tank.sprite.width/2,this.p1tank.y-this.p1tank.sprite.height/2);
	this.ctx.drawImage(this.bird.sprite,this.bird.x,this.bird.y);
	for(var i = 0; i < this.p1bullets.length; i++) {
		this.ctx.fillRect(this.p1bullets[i].x,this.p1bullets[i].y,2,2);
	}
}


GameEngine.prototype.update = function (){
	console.log('updated');
	document.body.addEventListener('keydown',this.fkeydown, false);
	document.body.addEventListener('keyup',this.fkeyup, false);
	for(var i = 0; i < this.p1bullets.length; i++) {
		this.p1bullets[i].move();
	}
	};

GameEngine.prototype.loop = function () {
	var now = Date.now();
	this.deltaTime = now - this.lastUpdateTimestamp;
	this.update();
	this.draw();
	this.lastUpdateTimestamp = now;
}

var GEObj = new GameEngine();
GEObj.init(ctx);
GEObj.start();