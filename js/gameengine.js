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
function AnimSS (x,y,spriteSheet,numSheets,time) {
	this.x = x;
	this.y = y;
	this.spritesheet = spritesheet;
	this.numSheets = numSheets;
}

function GameEngine () {
	this.entities = [];
	this.ctx = null;
	this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.p1tank = null;
    this.p2tank = null;
    this.bird = null;
    this.pbullets = [];
    this.p1lastfired = null;
    this.p2lastfired = null;
  }

GameEngine.prototype.init = function (ctx) {
	console.log('game initialized');
	document.body.addEventListener('keydown',this.fkeydown, false);
	document.body.addEventListener('keyup',this.fkeyup, false);
	this.ctx = ctx;
	this.ctx.scale(2,2);
	this.surfaceWidth = this.ctx.canvas.width/2;
	this.surfaceHeight = this.ctx.canvas.height/2;
	this.p1tank = new Tank(level1.start1x,level1.start1y,"P1");
	this.p2tank = new Tank(level1.start2x,level1.start2y,"P2");
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
      var bullet = new Bullet(GEObj.p1tank.x,GEObj.p1tank.y,GEObj.p1tank.direction, GEObj.p1tank.bulletsize,GEObj.p1tank.bulletvel);
      GEObj.pbullets.push(bullet);
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
	this.ctx.drawImage(city.BG,0,0);
	for(var i = 0; i < city.cityEnt.length; i++) {
		this.ctx.drawImage(city.cityEnt[i].sprite,city.cityEnt[i].x,city.cityEnt[i].y);
		this.ctx.beginPath();
	this.ctx.moveTo(city.cityEnt[i].bbox[0],city.cityEnt[i].bbox[2]);
	this.ctx.lineTo(city.cityEnt[i].bbox[1],city.cityEnt[i].bbox[3]);
	this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'green';
    this.ctx.stroke();
  };
	this.ctx.drawImage(this.bird.sprite,this.bird.x,this.bird.y);
	this.ctx.drawImage(this.p1tank.sprite,this.p1tank.x-this.p1tank.sprite.width/2,this.p1tank.y-this.p1tank.sprite.height/2);
	this.ctx.beginPath();
	this.ctx.moveTo(this.p1tank.bbox[0],this.p1tank.bbox[2]);
	this.ctx.lineTo(this.p1tank.bbox[1],this.p1tank.bbox[3]);
	this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'green';
    this.ctx.stroke();
	for(var i = 0; i < this.pbullets.length; i++) {
		this.ctx.fillStyle = "rgba(200, 45, 21, 0.5)";
		this.ctx.fillRect(this.pbullets[i].xt-(this.pbullets[i].size/2),this.pbullets[i].yt-(this.pbullets[i].size/2),this.pbullets[i].size+2,this.pbullets[i].size+2);
		this.ctx.fillStyle = "white";
		this.ctx.fillRect(this.pbullets[i].x-(this.pbullets[i].size/2),this.pbullets[i].y-(this.pbullets[i].size/2),this.pbullets[i].size,this.pbullets[i].size);
			this.ctx.beginPath();
	this.ctx.moveTo(this.pbullets[i].bbox[0],this.pbullets[i].bbox[2]);
	this.ctx.lineTo(this.pbullets[i].bbox[1],this.pbullets[i].bbox[3]);
	this.ctx.lineWidth = .5;
    this.ctx.strokeStyle = 'green';
    this.ctx.stroke();

	}
}


GameEngine.prototype.update = function (){
	if(GEObj.p1tank.moving) {GEObj.p1tank.move();}
	GEObj.p1tank.setSprite();
	for(var i = 0; i < this.pbullets.length; i++) {
		this.pbullets[i].move();
		this.pbullets[i].update
	}
	for(var i = this.pbullets.length-1; i >= 0; i-- ) {
		if(this.pbullets[i].isRemoved) {
			this.pbullets.splice(i,1);
		}
	}
	city.update();
	};

GameEngine.prototype.loop = function () {
	var now = Date.now();
	this.deltaTime = now - this.lastUpdateTimestamp;
	this.update();
	this.draw();
	this.lastUpdateTimestamp = now;
}

function rectCollision (objA, objB) {
	var xc = false;
	var yc = false;
	if(objA.bbox[0] > objB.bbox[0] && objA.bbox[0] < objB.bbox[1])
	{xc = true;}
	else if (objA.bbox[1] > objB.bbox[0] && objA.bbox[1] < objB.bbox[1])
	{xc = true;};
	
	if(objA.bbox[2] > objB.bbox[2] && objA.bbox[2] < objB.bbox[3])
	{yc = true;}
	else if (objA.bbox[3] > objB.bbox[2] && objA.bbox[3] < objB.bbox[3])
	{yc = true;};
	if (xc && yc) {
		return true;
	}
	else {
	return false;
	};
}

var GEObj = new GameEngine();
var city = new City();
GEObj.init(ctx);
GEObj.start();