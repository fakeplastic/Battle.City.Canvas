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
function AnimSS ()

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
	this.p1tank = new Tank(level1.startx,level1.starty);
	this.bird = new Eagle(level1.goalx,level1.goaly);
	
	city.createLevel(level1);
	

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
      GEObj.p1tank.direction = "up";
      GEObj.p1tank.moving = 1;
    }
    if(e.keyCode == 40) {
    	console.log("down pressed");
    	GEObj.p1tank.direction = "down";
    	GEObj.p1tank.moving = 1;
    }
    if(e.keyCode == 39) {
    	console.log("right pressed");
    	GEObj.p1tank.direction = "right";
    	GEObj.p1tank.moving = 1;
    }
    if(e.keyCode == 37) {
    	console.log("left pressed");
    	GEObj.p1tank.direction = "left";
    	GEObj.p1tank.moving = 1;
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
	if(e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 39 || e.keyCode == 37) {
		GEObj.p1tank.moving = 0;
	}
	}   

GameEngine.prototype.draw = function () {
	this.ctx.clearRect(0,0,this.surfaceWidth,this.surfaceHeight);
	for(var i = 0; i < city.cityEnt.length; i++) {
		this.ctx.drawImage(city.cityEnt[i].sprite,city.cityEnt[i].x,city.cityEnt[i].y);};
	this.ctx.drawImage(this.p1tank.sprite,this.p1tank.x-this.p1tank.sprite.width/2,this.p1tank.y-this.p1tank.sprite.height/2);
	this.ctx.drawImage(this.bird.sprite,this.bird.x,this.bird.y);
	for(var i = 0; i < this.p1bullets.length; i++) {
		this.ctx.fillStyle = "rgba(200, 45, 21, 0.3)";
		this.ctx.fillRect(this.p1bullets[i].xt-1,this.p1bullets[i].yt-1,4,4);
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(this.p1bullets[i].x,this.p1bullets[i].y,2,2);

	}
}


GameEngine.prototype.update = function (){
	console.log('updated');
	document.body.addEventListener('keydown',this.fkeydown, false);
	document.body.addEventListener('keyup',this.fkeyup, false);
	if(GEObj.p1tank.moving) {GEObj.p1tank.move();}
	GEObj.p1tank.setSprite();
	for(var i = 0; i < this.p1bullets.length; i++) {
		this.p1bullets[i].move();
		this.p1bullets[i].update
	}
	for(var i = this.p1bullets.length-1; i >= 0; i-- ) {
		if(this.p1bullets[i].isRemoved) {
			this.p1bullets.splice(i,1);
		}
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
var city = new City();
GEObj.init(ctx);
GEObj.start();