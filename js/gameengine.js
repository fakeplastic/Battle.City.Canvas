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
function AnimSS (spriteSheet, loc, x, y, scale, numSheets,frameTime,loop) {
	this.scale = scale;
	this.spriteSheet = spriteSheet;
	this.frameHeight = this.spriteSheet.height;
	this.numSheets = numSheets;
	this.frameWidth = this.spriteSheet.width / this.numSheets;
	this.totaltime = frameTime * numSheets;
	this.frameTime = frameTime;
	this.loop = loop;
	this.starttime = Date.now();
	this.elapsedtime = 0;
	this.isRemoved = false;
	this.locx = x - (this.frameWidth / 2)*this.scale;
	switch(loc) {
		case "c":
			this.locy = y - (this.frameHeight / 2)*this.scale;
			break;
		case "b":
			this.locy = y - this.frameHeight*this.scale;
			break; 
	}
}

AnimSS.prototype.drawFrame = function (ctx) {
	this.elapsedtime = Date.now() - this.starttime;
	if (this.loop) {
		if (this.elapsedtime >= this.totaltime)
			{this.elapsedtime = 0;}
	}
	else if (this.elapsedtime >= this.totaltime)
		{this.isRemoved = true;
			return;}
	var index = Math.floor(this.elapsedtime / this.frameTime);
	ctx.drawImage(this.spriteSheet,
					index * this.frameWidth, 0,
					this.frameWidth, this.frameHeight,
					this.locx, this.locy,
					this.frameWidth * this.scale, this.frameHeight * this.scale);
}


function GameEngine () {
	this.entities = [];
	this.ctx = null;
	this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.p1tank = null;
    this.p2tank = null;
    this.p1eagle = null;
    this.p2eagle = null;
    this.pbullets = [];
    this.explosions = [];
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
	this.p1eagle = new Eagle(level1.goal1x,level1.goal1y,"P1");
	this.p2eagle = new Eagle(level1.goal2x,level1.goal2y,"P2");
	this.pbullets = [];
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
      if((Date.now() - GEObj.p1tank.lastFired) > 300) {
      	var bullet = new Bullet(GEObj.p1tank.x,GEObj.p1tank.y,GEObj.p1tank.direction, GEObj.p1tank.bulletsize,GEObj.p1tank.bulletvel,  GEObj.p1tank.player);
      	GEObj.pbullets.push(bullet);
      	GEObj.p1tank.lastFired = Date.now();
      	}
      }
    if(e.keyCode == 87) {
      console.log("p2 up pressed");
      GEObj.p2tank.direction = "up";
      GEObj.p2tank.moving = 1;
    }
    if(e.keyCode == 90) {
    	console.log("p2 down pressed");
    	GEObj.p2tank.direction = "down";
    	GEObj.p2tank.moving = 1;
    }
    if(e.keyCode == 83) {
    	console.log("p2 right pressed");
    	GEObj.p2tank.direction = "right";
    	GEObj.p2tank.moving = 1;
    }
    if(e.keyCode == 65) {
    	console.log("p2 left pressed");
    	GEObj.p2tank.direction = "left";
    	GEObj.p2tank.moving = 1;
	}
	if(e.keyCode == 67) {
      console.log("p2 fire");
      if((Date.now() - GEObj.p2tank.lastFired) > 300) {
      	var bullet = new Bullet(GEObj.p2tank.x,GEObj.p2tank.y,GEObj.p2tank.direction, GEObj.p2tank.bulletsize,GEObj.p2tank.bulletvel, GEObj.p2tank.player);
      	GEObj.pbullets.push(bullet);
      	GEObj.p2tank.lastFired = Date.now();
      	}
		}
	}
GameEngine.prototype.fkeyup = function(e) {
	if(e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 39 || e.keyCode == 37) {
		GEObj.p1tank.moving = 0;}
	if(e.keyCode == 87 || e.keyCode == 90 || e.keyCode == 83 || e.keyCode == 65) {
		GEObj.p2tank.moving = 0;}   
	}

GameEngine.prototype.draw = function () {
	this.ctx.clearRect(0,0,this.surfaceWidth,this.surfaceHeight);
	this.ctx.drawImage(city.BG,0,0);
	for(var i = 0; i < city.cityEnt.length; i++) {
		this.ctx.drawImage(city.cityEnt[i].sprite,city.cityEnt[i].x,city.cityEnt[i].y);
  		};
	this.ctx.drawImage(this.p1eagle.sprite,this.p1eagle.x,this.p1eagle.y);
	this.ctx.drawImage(this.p2eagle.sprite,this.p2eagle.x,this.p2eagle.y);
	this.ctx.drawImage(this.p1tank.sprite,this.p1tank.x-this.p1tank.sprite.width/2,this.p1tank.y-this.p1tank.sprite.height/2);
	this.ctx.drawImage(this.p2tank.sprite,this.p2tank.x-this.p2tank.sprite.width/2,this.p2tank.y-this.p2tank.sprite.height/2);
	for(var i = 0; i < this.pbullets.length; i++) {
		this.ctx.fillStyle = "rgba(200, 45, 21, 0.5)";
		this.ctx.fillRect(this.pbullets[i].xt-(this.pbullets[i].size/2),this.pbullets[i].yt-(this.pbullets[i].size/2),this.pbullets[i].size+2,this.pbullets[i].size+2);
		this.ctx.fillStyle = "white";
		this.ctx.fillRect(this.pbullets[i].x-(this.pbullets[i].size/2),this.pbullets[i].y-(this.pbullets[i].size/2),this.pbullets[i].size,this.pbullets[i].size);
	}
	for(var i = 0; i < this.explosions.length; i++) {
		this.explosions[i].drawFrame(this.ctx);
	}
}


GameEngine.prototype.update = function (){
	if(GEObj.p1tank.moving) {GEObj.p1tank.move();}
	GEObj.p1tank.setSprite();
	if(GEObj.p2tank.moving) {GEObj.p2tank.move();}
	GEObj.p2tank.setSprite();
	for(var i = 0; i < this.pbullets.length; i++) {
		this.pbullets[i].move();
		this.pbullets[i].update
	}
	for(var i = this.pbullets.length-1; i >= 0; i-- ) {
		if(this.pbullets[i].isRemoved) {
			this.pbullets.splice(i,1);
		}
	}
	for(var i = this.explosions.length-1; i >= 0; i-- ) {
		if(this.explosions[i].isRemoved) {
			this.explosions.splice(i,1);
		}
	}
	GEObj.p1tank.update()
	GEObj.p2tank.update()
	city.update();
	}

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
var ASM = new AssetMan();
ASM.AddQueue("img/explosions/MISC_EXPLOSION.png")
ASM.AddQueue("img/explosions/EXPLOSION.png")

ASM.dnLoad(function() {
GEObj.init(ctx);
GEObj.start();
})
