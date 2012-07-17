/**
 * @author Cory
 */
var Bullet = function(x, y, direction, size, vel) {
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
	this.damage = 25;
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
		var explosion = new AnimSS("img/explosions/MISC_EXPLOSION.png",this.x,this.y,9,50,false)
		GEObj.explosions.push(explosion);
		
	}
}


Bullet.prototype.collision = function () {
	for(var i = 0; i < city.cityEnt.length; i++) {
		if(rectCollision(this,city.cityEnt[i])) {
			this.isRemoved = true;
			var explosion = new AnimSS("img/explosions/MISC_EXPLOSION.png",this.x,this.y,9,50,false)
			GEObj.explosions.push(explosion);
			city.cityEnt[i].isRubble = true
			var explosion2 = new AnimSS("img/explosions/EXPLOSION.png",city.cityEnt[i].x + (city.cityEnt[i].sprite.width/2),city.cityEnt[i].y,20,75,false);
			GEObj.explosions.push(explosion2);
		}
	}
	
}