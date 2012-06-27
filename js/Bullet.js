/**
 * @author Cory
 */
var Bullet = function(x, y, direction) {
	this.x = x;
	this.xt = x;
	this.y = y;
	this.yt = y;
	this.vel = 2;
	this.direction = direction;
	this.isRemoved = false;
}

Bullet.prototype.move = function() {
	switch(this.direction) {
		case "up":
				this.y -= this.vel;
				this.yt = this.y+1;
			
			break;
		case "right":
				this.x += this.vel;
				this.xt = this.x-1;
			break;
		case "down":
				this.y += this.vel;
				this.yt = this.y-1;			
			break;
		case "left":
				this.x -= this.vel;
				this.xt = this.x+1;
		default:
	}
	this.outOfBounds();
}

Bullet.prototype.outOfBounds = function() {
	if(this.x < 0 || this.x > GEObj.surfaceWidth || this.y < 0 || this.y > GEObj.surfaceHeight) {
		this.isRemoved = true;
	}
}