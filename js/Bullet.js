/**
 * @author Cory
 */
var Bullet = function(x, y, direction) {
	this.x = x;
	this.y = y;
	this.vel = 2;
	this.direction = direction;
	this.isRemoved = false;
}

Bullet.prototype.move = function() {
	switch(this.direction) {
		case "up":
			for (var i = 0; i < this.vel; i++) {
				this.y--;
			}
			break;
		case "right":
			for (var i = 0; i < this.vel; i++) {
				this.x++;
			}
			break;
		case "down":
			for (var i = 0; i < this.vel; i++) {
				this.y++;
			}
			break;
		case "left":
			for (var i = 0; i < this.vel; i++) {
				this.x--;
			}
		default:
	}
}
