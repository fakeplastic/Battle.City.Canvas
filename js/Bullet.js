/**
 * @author Cory
 */
var Bullet = function(x, y, direction, size, vel, dam, player) {
	this.x = x;
	this.ox = x;
	this.xt = x-1;
	this.y = y;
	this.oy = y;
	this.yt = y-1;
	this.vel = vel;
	this.direction = direction;
	this.isRemoved = false;
	this.size = size;
	this.range = 100;
	this.damage = dam;
	this.player = player
	this.bbox = [];
}

Bullet.prototype.move = function() {
	switch(this.direction) {
		case "up":
				this.y -= this.vel;
				this.yt = this.y+1;
			break;
		case "right":
				this.x += this.vel;
				this.xt = this.x-3;
			break;
		case "down":
				this.y += this.vel;
				this.yt = this.y-3;
			break;
		case "left":
				this.x -= this.vel;
				this.xt = this.x+1;
			break;	
		default:
	}

	this.outOfBounds();
	this.outOfRange();
	this.bbox = [this.x-this.size/2,this.x+this.size/2,this.y-this.size,this.y+this.size/2,];
	this.collision();	

}

Bullet.prototype.outOfBounds = function() {
	if(this.x < 0 || this.x > GEObj.surfaceWidth || this.y < 0 || this.y > GEObj.surfaceHeight) {
		this.isRemoved = true;
	}
}

Bullet.prototype.outOfRange = function() {
	if (Math.abs(this.x-this.ox) > this.range || Math.abs(this.y-this.oy) > this.range) {
		this.isRemoved = true;
		var explosion = new AnimSS(ASM.getImg("img/explosions/MISC_EXPLOSION.png"),"b",this.x,this.y,this.size/4,9,50,false)
		GEObj.explosions.push(explosion);
		
	}
}


Bullet.prototype.collision = function () {
	if (this.player == "P2") {
	if(rectCollision(this,GEObj.p1tank)) {
			this.isRemoved = true;
			var explosion = new AnimSS(ASM.getImg("img/explosions/MISC_EXPLOSION.png"),"b",this.x,this.y,this.size/2,9,50,false);
			GEObj.explosions.push(explosion);
			GEObj.p1tank.life = GEObj.p1tank.life - (this.damage * GEObj.p1tank.defense);
			if(GEObj.p1tank.life <= 0) {
				var explosion3 = new AnimSS(ASM.getImg("img/explosions/EXPLOSION2.png"),"b", GEObj.p1tank.x + GEObj.p1tank.sprite.width/2,GEObj.p1tank.y + GEObj.p1tank.sprite.height,0.5,20,75,false);
				GEObj.explosions.push(explosion3);
			}
		}
	}
	if (this.player == "P1") {
		if(rectCollision(this,GEObj.p2tank)) {
				this.isRemoved = true;
				var explosion = new AnimSS(ASM.getImg("img/explosions/MISC_EXPLOSION.png"),"b",this.x,this.y,this.size/2,9,50,false);
				GEObj.explosions.push(explosion);
				GEObj.p2tank.life = GEObj.p2tank.life - (this.damage * GEObj.p2tank.defense);
				if(GEObj.p2tank.life <= 0) {
					var explosion4 = new AnimSS(ASM.getImg("img/explosions/EXPLOSION2.png"),"b", GEObj.p2tank.x + GEObj.p2tank.sprite.width/2,GEObj.p2tank.y + GEObj.p2tank.sprite.height,0.5,20,75,false);
					GEObj.explosions.push(explosion4);
				}
		}
	}
	for(var i = 0; i < city.cityEnt.length; i++) {
			if(rectCollision(this,city.cityEnt[i])) {
			this.isRemoved = true;
			var explosion = new AnimSS(ASM.getImg("img/explosions/MISC_EXPLOSION.png"),"b",this.x,this.y,this.size/2,9,50,false);
			GEObj.explosions.push(explosion);
			city.cityEnt[i].damage++;
			var explosion2 = new AnimSS(ASM.getImg("img/explosions/EXPLOSION.png"),"c",city.cityEnt[i].x + (city.cityEnt[i].sprite.width/2),city.cityEnt[i].y + (city.cityEnt[i].sprite.height/4),0.5,20,75,false);
			GEObj.explosions.push(explosion2);
		}
	}
	
}