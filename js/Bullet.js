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
			for (var i = 0; i < this.vel; i++) {
				this.yt = this.y+1;
				this.y--;
			}
			break;
		case "right":
			for (var i = 0; i < this.vel; i++) {
				this.xt = this.x-1;
				this.x++;
			}
			break;
		case "down":
			for (var i = 0; i < this.vel; i++) {
				this.yt = this.y-1;
				this.y++;
			}
			break;
		case "left":
			for (var i = 0; i < this.vel; i++) {
				this.xt = this.x+1;
				this.x--;
			}
		default:
	}
}
