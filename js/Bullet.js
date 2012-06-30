/**
 * @author Cory
 */
var Bullet = function(x, y, direction, size, vel) {
	this.x = x;
	this.xt = x+1;
	this.y = y;
	this.yt = y+1;
	this.vel = vel;
	this.direction = direction;
	this.isRemoved = false;
	this.size = size;
	this.bbox = []
}

Bullet.prototype.move = function() {
	switch(this.direction) {
		case "up":
				this.y -= this.vel;
				this.yt = this.y+2;
			break;
		case "right":
				this.x += this.vel;
				this.xt = this.x;
			break;
		case "down":
				this.y += this.vel;
				this.yt = this.y;
			break;
		case "left":
				this.x -= this.vel;
				this.xt = this.x+2;
			break;	
		default:
	}
	this.outOfBounds();
	this.bbox = [this.x-this.size/2,this.x+this.size/2,this.y-this.size,this.y-this.size/2,];
}

Bullet.prototype.outOfBounds = function() {
	if(this.x < 0 || this.x > GEObj.surfaceWidth || this.y < 0 || this.y > GEObj.surfaceHeight) {
		this.isRemoved = true;
	}
}